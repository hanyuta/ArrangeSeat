import React from "react";
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
      >
        {Array.from({ length: 10 }, (_, i) => (
          <div key={String(i + 1)} style={{ border: '1px solid #333', background: '#fff', textAlign: 'center', lineHeight: '80px' }}>
            ドラッグできる要素{i + 1}
          </div>
        ))}
      </GridLayout>
    </div>
  );
}

export default TopPage;