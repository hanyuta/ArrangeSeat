import React, { useState } from "react";
import './TopPage.css';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

function TopPage() {
  // 10個の要素のレイアウト初期値
  const layout = [
    { i: '1', x: 0, y: 0, w: 2, h: 2 },
    { i: '2', x: 2, y: 0, w: 2, h: 2 },
    { i: '3', x: 4, y: 0, w: 2, h: 2 },
    { i: '4', x: 6, y: 0, w: 2, h: 2 },
    { i: '5', x: 8, y: 0, w: 2, h: 2 },
    { i: '6', x: 0, y: 2, w: 2, h: 2 },
    { i: '7', x: 2, y: 2, w: 2, h: 2 },
    { i: '8', x: 4, y: 2, w: 2, h: 2 },
    { i: '9', x: 6, y: 2, w: 2, h: 2 },
    { i: '10', x: 8, y: 2, w: 2, h: 2 },
  ];

  // 各ボックスの回転角度をstateで管理（初期値0度）
  const [rotations, setRotations] = useState(Array(10).fill(0));

  // ドットにhoverしたときの処理
  const handleDotHover = (index) => {
    setRotations(prev => {
      const newRotations = [...prev];
      newRotations[index] = (newRotations[index] + 90) % 360;
      return newRotations;
    });
  };

  return (
    <div>
      <GridLayout
        className="layout"
        layout={layout}
        cols={10}
        rowHeight={40}
        width={1000}
        isResizable={false}
        isDraggable={true}
        compactType={null}
      >
        {Array.from({ length: 10 }, (_, i) => (
          <div key={String(i + 1)} style={{ border: '1px solid #333', background: '#fff', textAlign: 'center', lineHeight: '80px', position: 'relative' }}>
            <div
              style={{
                width: '100%',
                height: '100%',
                transition: 'transform 0.3s',
                transform: `rotate(${rotations[i]}deg)`
              }}
            >
              {i + 1}
              <span
                className="rotate-dot"
                onClick={e => { e.stopPropagation(); handleDotHover(i); }}
                title="ここにカーソルを乗せると回転します"
              >
                ・
              </span>
            </div>
          </div>
        ))}
      </GridLayout>
    </div>
  );
}

export default TopPage;