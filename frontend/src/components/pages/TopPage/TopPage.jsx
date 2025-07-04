import React, { useState, useCallback } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./TopPage.css";

const GRID_SIZE = 20;
const CELL_SIZE = 32; // px
const BOX_TYPE = "BOX";

// 1マス分のグリッドセル
function GridCell({ x, y, isOver, canDrop, onDrop, children }) {
  const [{ isOverCurrent, canDropCurrent }, drop] = useDrop({
    accept: BOX_TYPE,
    drop: () => onDrop(x, y),
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
        border: '1px solid #ddd',
        boxSizing: 'border-box',
        position: 'relative',
      }}
    >
      {children}
    </div>
  );
}

// ドラッグ可能なボックス
function DraggableBox({ x, y }) {
  const [{ isDragging }, drag] = useDrag({
    type: BOX_TYPE,
    item: { x, y },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  return (
    <div
      ref={drag}
      className="draggable-box"
      style={{
        width: CELL_SIZE - 6,
        height: CELL_SIZE - 6,
        background: '#4af',
        borderRadius: 6,
        opacity: isDragging ? 0.5 : 1,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
        position: 'absolute',
        top: 3,
        left: 3,
        zIndex: 2,
        cursor: 'grab',
      }}
    >
      ■
    </div>
  );
}

function TopPage() {
  // ボックスの座標（グリッド単位）
  const [boxPos, setBoxPos] = useState({ x: 2, y: 2 });

  // ドロップ時に座標を更新
  const handleDrop = useCallback((x, y) => {
    setBoxPos({ x, y });
  }, []);

  // グリッドを2次元配列で描画
  const grid = [];
  for (let y = 0; y < GRID_SIZE; y++) {
    const row = [];
    for (let x = 0; x < GRID_SIZE; x++) {
      const isBoxHere = boxPos.x === x && boxPos.y === y;
      row.push(
        <GridCell key={x + '-' + y} x={x} y={y} onDrop={handleDrop}>
          {isBoxHere && <DraggableBox x={x} y={y} />}
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
    <DndProvider backend={HTML5Backend}>
      <div style={{ padding: 24 }}>
        <div style={{ display: 'inline-block', border: '2px solid #bbb', background: '#f8f8f8' }}>
          {grid}
        </div>
      </div>
    </DndProvider>
  );
}

export default TopPage;