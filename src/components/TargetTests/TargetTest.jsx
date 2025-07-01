import React, { useRef, useEffect, useState } from 'react';

// Load success audio (you must place 'success.mp3' inside /public folder)
import successAudio from '../../assets/audios/effects/success.wav';

// Total hover time required in milliseconds
const ACTIVATION_TIME = 3000;

// Size and offset constants
const RECT_SIZE = 100;
const OFFSET = 50;

const TargetTest = ({onFinish}) => {
    const audioRef = useRef(null);

  // Keep track of hover times and activation state
  const [hoverTimes, setHoverTimes] = useState(Array(5).fill(0));
  const [activated, setActivated] = useState(Array(5).fill(false));
  const [count, setCount] = useState(0);

  // Timer refs for each rect
  const timers = useRef(Array(5).fill(null));

  // Called when mouse enters a rect
  const handleMouseEnter = (index) => {
    if (activated[index]) return;

    timers.current[index] = setInterval(() => {
      setHoverTimes((prev) => {
        const newTimes = [...prev];
        newTimes[index] += 10; // increase by 10ms (0.01s)

        // Check activation
        if (newTimes[index] >= ACTIVATION_TIME && !activated[index]) {
            clearInterval(timers.current[index]);
            setActivated((prev) => {
            const updated = [...prev];
            updated[index] = true;
            return updated;
            });
            //   successAudio.play();
            if (audioRef.current) {
                audioRef.current?.play().catch(error => console.log("Reproducción bloqueada:", error));
                setCount(count+1);
                if (count >= 4) {
                    onFinish();
                }
            }
        }

        return newTimes;
      });
    }, 10); // 10ms interval
  };

  // Called when mouse leaves a rect
  const handleMouseLeave = (index) => {
    clearInterval(timers.current[index]);
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      timers.current.forEach((t) => clearInterval(t));
    };
  }, []);

  // Position data for the rects
  const positions = [
    { x: OFFSET, y: OFFSET },                                     // top-left
    { x: window.innerWidth - RECT_SIZE - OFFSET, y: OFFSET },     // top-right
    { x: OFFSET, y: window.innerHeight - RECT_SIZE - OFFSET },    // bottom-left
    { x: window.innerWidth - RECT_SIZE - OFFSET, y: window.innerHeight - RECT_SIZE - OFFSET }, // bottom-right
    { x: window.innerWidth / 2 - RECT_SIZE / 2, y: window.innerHeight / 2 - RECT_SIZE / 2 }    // center
  ];

  return (
    <>
        <audio ref={audioRef} src={successAudio} />
        <svg width="100vw" height="100vh" style={{ position: 'absolute', top: 0, left: 0 }}>
        {positions.map((pos, index) => (
            <g key={index}>
            <rect
                x={pos.x}
                y={pos.y}
                width={RECT_SIZE}
                height={RECT_SIZE}
                fill={activated[index] ? '#2db72d' : '#0e9186'}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
            />
            <text
                x={pos.x + RECT_SIZE / 2}
                y={pos.y + RECT_SIZE / 2 + 5}
                fontSize="16"
                fill="white"
                textAnchor="middle"
                style={{ pointerEvents: 'none' }}
            >
                {((ACTIVATION_TIME - hoverTimes[index]) / 1000).toFixed(2)}
            </text>
            </g>
        ))}
        </svg>
    </>
  );
};

export default TargetTest;