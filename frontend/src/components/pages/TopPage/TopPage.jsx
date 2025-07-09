import React, { useState, useCallback, useEffect, forwardRef, useImperativeHandle } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./TopPage.css";

const GRID_SIZE = 18;
const CELL_SIZE = 50; // px
const CELL_SIZE_HEIGHT = 40; // px
const CELL_SIZE_WIDTH = 50; // px

const BOX_TYPE = "BOX";

// 1マス分のグリッドセル
function GridCell({ x, y, isOver, canDrop, onDrop, children }) {
  const [{ isOverCurrent, canDropCurrent }, drop] = useDrop({
    accept: BOX_TYPE,
    drop: (item) => onDrop(x, y, item.id),
    collect: (monitor) => ({
      isOverCurrent: monitor.isOver(),
      canDropCurrent: monitor.canDrop(),
    }),
  });
  return (
    <div
      ref={drop}
      className="grid-cell"
      style={{
        width: CELL_SIZE,
        height: CELL_SIZE,
        background: isOverCurrent && canDropCurrent ? '#aaf' : '#fff',
        border: '1px solid #fafafa',
        boxSizing: 'border-box',
        position: 'relative',
      }}
    >
      {children}
    </div>
  );
}

// ドラッグ可能なボックス
function DraggableBox({ id, x, y, onDelete, rotation, onRotate }) {
  const [{ isDragging }, drag] = useDrag({
    type: BOX_TYPE,
    item: { id, x, y },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  return (
    <div
      ref={drag}
      className="draggable-box"
      style={{
        width: CELL_SIZE_WIDTH - 5,
        height: CELL_SIZE_HEIGHT - 5,
        borderRadius: 3,
        opacity: isDragging ? 0.5 : 1,
        boxShadow: '0 2px 8px rgba(255, 255, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#000',
        fontWeight: 'bold',
        fontSize: 30,
        position: 'absolute',
        zIndex: 1,
        cursor: 'grab',
        background: `hsl(${(id * 137.5) % 360}, 70%, 60%)`,
        transform: `rotate(${rotation || 0}deg)`
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        onDelete(id);
      }}
      onClick={(e) => {
        e.stopPropagation();
        onRotate(id);
      }}
      title="クリックで回転・右クリックで削除"
    >
      {id}
    </div>
  );
}

const TopPage = forwardRef((props, ref) => {
  // ボックスの配列（各ボックスにID、x、y座標、rotationを持つ）
  const [boxes, setBoxes] = useState([
    { id: 1, x: 2, y: 2, rotation: 0 }
  ]);
  // 次のボックスID
  const [nextBoxId, setNextBoxId] = useState(2);
  // ズームレベル（0.5〜2.0の範囲）
  const [zoomLevel, setZoomLevel] = useState(1.0);
  // Ctrlキーが押されているかどうか
  const [isCtrlPressed, setIsCtrlPressed] = useState(false);

  // 新しいボックスを追加
  const addBox = useCallback(() => {
    let newX = 0, newY = 0;
    let found = false;
    for (let y = 0; y < GRID_SIZE && !found; y++) {
      for (let x = 0; x < GRID_SIZE && !found; x++) {
        const isOccupied = boxes.some(box => box.x === x && box.y === y);
        if (!isOccupied) {
          newX = x;
          newY = y;
          found = true;
        }
      }
    }
    const newBox = { id: nextBoxId, x: newX, y: newY, rotation: 0 };
    setBoxes(prev => [...prev, newBox]);
    setNextBoxId(prev => prev + 1);
  }, [boxes, nextBoxId]);

  // ボックスを削除
  const deleteBox = useCallback((id) => {
    setBoxes(prev => prev.filter(box => box.id !== id));
  }, []);

  // ボックスを回転
  const rotateBox = useCallback((id) => {
    setBoxes(prev => prev.map(box =>
      box.id === id ? { ...box, rotation: ((box.rotation || 0) + 90) % 360 } : box
    ));
  }, []);

  // ドロップ時に座標を更新
  const handleDrop = useCallback((x, y, droppedBoxId) => {
    setBoxes(prev => {
      // ドロップ先に既にボックスがあるか判定
      const targetBox = prev.find(box => box.x === x && box.y === y);
      if (targetBox && targetBox.id !== droppedBoxId) {
        // 既存ボックスを一番近い空きマスに移動
        // まず空きマスを全てリストアップ
        const occupied = new Set(prev.map(box => `${box.x},${box.y}`));
        let found = false;
        let newPos = { x: 0, y: 0 };
        // 距離が近い順に空きマスを探す
        const queue = [];
        for (let yy = 0; yy < GRID_SIZE; yy++) {
          for (let xx = 0; xx < GRID_SIZE; xx++) {
            if (!occupied.has(`${xx},${yy}`)) {
              const dist = Math.abs(xx - x) + Math.abs(yy - y);
              queue.push({ x: xx, y: yy, dist });
            }
          }
        }
        queue.sort((a, b) => a.dist - b.dist);
        if (queue.length > 0) {
          newPos = { x: queue[0].x, y: queue[0].y };
          found = true;
        }
        if (found) {
          // 既存ボックスを空きマスに移動し、ドラッグしたボックスをドロップ先に移動
          return prev.map(box => {
            if (box.id === droppedBoxId) {
              return { ...box, x, y };
            } else if (box.id === targetBox.id) {
              return { ...box, x: newPos.x, y: newPos.y };
            } else {
              return box;
            }
          });
        } else {
          // 空きマスがなければ何もしない
          return prev;
        }
      } else {
        // ドロップ先にボックスがなければ普通に移動
        return prev.map(box =>
          box.id === droppedBoxId ? { ...box, x, y } : box
        );
      }
    });
  }, []);

  // ズームレベルを変更
  const handleZoomChange = useCallback((delta) => {
    setZoomLevel(prevZoom => {
      const newZoom = prevZoom + delta;
      return Math.max(0.5, Math.min(2.0, newZoom));
    });
  }, []);

  // キーボードイベントの処理
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Control') {
        setIsCtrlPressed(true);
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'Control') {
        setIsCtrlPressed(false);
      }
    };

    // マウスホイールイベントの処理
    const handleWheel = (e) => {
      if (isCtrlPressed) {
        e.preventDefault(); // デフォルトのブラウザズームを防ぐ

        // マウスホイールの方向に応じてズーム
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        handleZoomChange(delta);
      }
    };

    // イベントリスナーを追加
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('wheel', handleWheel, { passive: false });

    // クリーンアップ
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener('wheel', handleWheel);
    };
  }, [isCtrlPressed, handleZoomChange]);

  // 保存API呼び出し
  const saveBoxes = useCallback(async () => {
    console.log(boxes);
    try {
      const res = await fetch('/api/boxes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(boxes)
      });
      if (res.ok) {
        alert('保存しました');
      } else {
        alert('保存に失敗しました');
      }
    } catch (e) {
      alert('サーバーエラー');
    }
  }, [boxes]);

  // refでsaveBoxesを公開
  useImperativeHandle(ref, () => ({
    saveBoxes
  }));

  // グリッドを2次元配列で描画
  const grid = [];
  for (let y = 0; y < GRID_SIZE; y++) {
    const row = [];
    for (let x = 0; x < GRID_SIZE; x++) {
      const boxAtPosition = boxes.find(box => box.x === x && box.y === y);
      row.push(
        <GridCell key={x + '-' + y} x={x} y={y} onDrop={handleDrop}>
          {boxAtPosition && (
            <DraggableBox
              id={boxAtPosition.id}
              x={x}
              y={y}
              rotation={boxAtPosition.rotation || 0}
              onDelete={deleteBox}
              onRotate={rotateBox}
            />
          )}
        </GridCell>
      );
    }
    grid.push(
      <div key={y} style={{ display: 'flex' }}>
        {row}
      </div>
    );
  }

  return (
    <div>
    {/* 保存ボタンをヘッダー直下に配置 */}
    <div style={{ padding: '8px 24px', background: '#f8f8f8', borderBottom: '1px solid #ddd' }}>
      <button
        onClick={saveBoxes}
        style={{
          padding: '8px 20px',
          fontSize: 16,
          background: '#1976d2',
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
        }}
      >
        保存
      </button>
    </div>
    <DndProvider backend={HTML5Backend}>
      <div style={{ padding: 24 }}>
        {/* コントロールパネル */}
        <div style={{
          marginBottom: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          background: '#f5f5f5',
          padding: 12,
          borderRadius: 8,
          border: '1px solid #ddd'
        }}>
          <button
            onClick={addBox}
            style={{
              padding: '8px 16px',
              fontSize: 14,
              cursor: 'pointer',
              background: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              fontWeight: 'bold'
            }}
          >
            + ボックス追加
          </button>
          <span style={{ fontSize: 14, color: '#666' }}>
            ボックス数: {boxes.length}
          </span>
          <span style={{ fontSize: 14, color: '#666' }}>
            ズーム: {Math.round(zoomLevel * 100)}%
          </span>
          <span style={{ fontSize: 12, color: '#999' }}>
            💡 Ctrl + マウスホイールでズーム、右クリックで削除
          </span>
        </div>

        {/* ズーム対象のグリッドコンテナ */}
        <div style={{
          display: 'inline-block',
          transform: `scale(${zoomLevel})`,
          transformOrigin: 'top left',
          transition: 'transform 0.1s ease-out'
        }}>
          <div style={{
            border: '2px solid #bbb',
            background: '#f8f8f8',
            display: 'inline-block'
          }}>
            {grid}
          </div>
        </div>
      </div>
    </DndProvider>
    </div>
  );
});

export default TopPage;