import React, { TouchEventHandler, useEffect, useRef, useState } from 'react';
import style from "./Sass/App.module.scss"
function App() {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  // 移动事件处理函数

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLButtonElement) {
      return
    } else {
      startDrag(e.clientX, e.clientY);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      startDrag(touch.clientX, touch.clientY);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    }
    e.preventDefault();
  };

  const startDrag = (clientX: number, clientY: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      setPosition({
        x: clientX - rect.width / 2,
        y: clientY - rect.height / 2,
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (ref.current) {
      updatePosition(e.clientX, e.clientY);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      updatePosition(touch.clientX, touch.clientY);
    }
  };

  const updatePosition = (clientX: number, clientY: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      setPosition({
        x: clientX - rect.width / 2,
        y: clientY - rect.height / 2,
      });
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleTouchEnd = () => {
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
  };

  return (
    <div style={{
      left: position.x,
      top: position.y,
    }} className={style.UI} ref={ref}>
      <div className={style.Title} onMouseDown={handleMouseDown} onTouchStart={handleTouchStart}>ReviewTools Version _ 0.1 Alpha <button onClick={() => { setIsExpand(!isExpand) }}
        className={style.Expand}>口</button></div>
      <div className={style.Main} hidden={!isExpand}>
        233
      </div>
    </div>
  );
}

export default App;
