import { useEffect, useRef, useState } from 'react';

export function useTimer(running: boolean) {
  const [elapsedTime, setElapsedTime] = useState(0.0);
  const startRef = useRef<number | null>(null);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (running) {
      if (startRef.current === null) startRef.current = performance.now();
      const tick = (t: number) => {
        if (startRef.current !== null) {
          setElapsedTime(t - startRef.current);
          raf.current = requestAnimationFrame(tick);
        }
      };
      raf.current = requestAnimationFrame(tick);
    } else {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = null;
      startRef.current = null;
    }
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [running]);

  const restartTime = () => { 
    setElapsedTime(0.0);
    startRef.current = performance.now();
  };

  const endTime = () => {
    setElapsedTime(elapsedTime);
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = null;
    startRef.current = null;
  };

  return { elapsedTime, restartTime, endTime };
}