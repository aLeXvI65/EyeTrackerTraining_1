import React, { useRef, useEffect, useState } from 'react';

const ACTIVATION_TIME = 3000; // in milliseconds
const GRID_SIZE = 4; // 4x4 grid
const CELL_COUNT = GRID_SIZE * GRID_SIZE;

const TargetTest2 = ({onFinish}) => {
  const [hoverTimes, setHoverTimes] = useState(Array(CELL_COUNT).fill(0));
  const [activated, setActivated] = useState(Array(CELL_COUNT).fill(false));
  const timers = useRef(Array(CELL_COUNT).fill(null));

  // Mouse enter handler
  const handleMouseEnter = (index) => {
    if (activated[index]) return;

    timers.current[index] = setInterval(() => {
      setHoverTimes((prev) => {
        const newTimes = [...prev];
        newTimes[index] += 10;

        if (newTimes[index] >= ACTIVATION_TIME && !activated[index]) {
          //clearInterval(timers.current[index]);
          setActivated((prevActivated) => {
            const updated = [...prevActivated];
            updated[index] = true;
            return updated;
          });
        }

        return newTimes;
      });
    }, 10);
  };

  // Mouse leave handler
  const handleMouseLeave = (index) => {
    clearInterval(timers.current[index]);
  };

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      timers.current.forEach((t) => clearInterval(t));
    };
  }, []);

  // Get screen dimensions
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const cellWidth = screenWidth / GRID_SIZE;
  const cellHeight = screenHeight / GRID_SIZE;

  return (
    <>
    <svg width={screenWidth} height={screenHeight} style={{ position: 'absolute', top: 0, left: 0 }}>
      {Array.from({ length: CELL_COUNT }).map((_, index) => {
        const row = Math.floor(index / GRID_SIZE);
        const col = index % GRID_SIZE;
        const x = col * cellWidth;
        const y = row * cellHeight;

        return (
          <g key={index}>
            <rect
              x={x}
              y={y}
              width={cellWidth}
              height={cellHeight}
              fill={activated[index] ?  '#2db72d44' : '#d3d3d3'}
              stroke="white"
              strokeWidth="2"  
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            />
            <text
              x={x + cellWidth / 2}
              y={y + cellHeight / 2 + 5}
              fontSize="20"
              fill="black"
              textAnchor="middle"
              style={{ pointerEvents: 'none' }}
            >
              {(hoverTimes[index] / 1000).toFixed(2)}
            </text>
          </g>
        );
      })}
    </svg>
    <button
        style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '10px 20px',
            fontSize: '16px',
            borderRadius: '8px',
            backgroundColor: '#131313',
            color: 'white',
            border: 'none',
            cursor: 'pointer'
        }}
        onClick={() => onFinish()}
        >
        Continue
        </button>
</>
  );
};

export default TargetTest2;