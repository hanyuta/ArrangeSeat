import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./TopPage.css";

const BOX = "BOX";
const GRID_SIZE = 5; // 5x2のグリッド

// ドラッグ対象のボックス
function DraggableBox({ id, x, y, rotation, onMove, onRotate }) {
  const [{ isDragging }, drag] = useDrag({
    type: BOX,
    item: { id, x, y },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className="box"
      style={{
        gridColumn: x + 1,
        gridRow: y + 1,
        opacity: isDragging ? 0.5 : 1,
        transform: `rotate(${rotation}deg)`,
        transition: "transform 0.3s",
        cursor: "move",
        position: "relative",
      }}
    >
      {id + 1}
      <span
        className="rotate-dot"
        onClick={(e) => {
          e.stopPropagation();
          onRotate(id);
        }}
        title="クリックで90度回転"
        style={{
          position: "absolute",
          top: 5,
          right: 5,
          zIndex: 2,
          fontSize: "1.5rem",
          color: "#666",
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        ・
      </span>
    </div>
  );
}

// グリッドの各マス
function GridCell({ x, y, onDropBox, children }) {
  const [, drop] = useDrop({
    accept: BOX,
    drop: (item) => {
      onDropBox(item.id, x, y);
    },
  });

  return (
    <div
      ref={drop}
      className="grid-cell"
      style={{
        border: "1px solid #eee",
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      {children}
    </div>
  );
}

function TopPage() {
  // 10個のボックスの位置と回転を管理
  const [boxes, setBoxes] = useState(
    Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: i % GRID_SIZE,
      y: Math.floor(i / GRID_SIZE),
      rotation: 0,
    }))
  );

  // ボックスの移動
  const moveBox = (id, x, y) => {
    setBoxes((prev) =>
      prev.map((box) =>
        box.id === id ? { ...box, x, y } : box
      )
    );
  };

  // ボックスの回転
  const rotateBox = (id) => {
    setBoxes((prev) =>
      prev.map((box) =>
        box.id === id
          ? { ...box, rotation: (box.rotation + 90) % 360 }
          : box
      )
    );
  };

  // グリッドの描画
  const gridCells = [];
  for (let y = 0; y < 2; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      const box = boxes.find((b) => b.x === x && b.y === y);
      gridCells.push(
        <GridCell key={`${x}-${y}`} x={x} y={y} onDropBox={moveBox}>
          {box && (
            <DraggableBox
              id={box.id}
              x={box.x}
              y={box.y}
              rotation={box.rotation}
              onMove={moveBox}
              onRotate={rotateBox}
            />
          )}
        </GridCell>
      );
    }
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className="grid"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${GRID_SIZE}, 100px)`,
          gridTemplateRows: "repeat(2, 100px)",
          gap: "8px",
          width: `${GRID_SIZE * 108}px`,
          margin: "40px auto",
        }}
      >
        {gridCells}
      </div>
    </DndProvider>
  );
}

export default TopPage;