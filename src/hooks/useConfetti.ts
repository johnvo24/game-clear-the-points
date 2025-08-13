import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export const useConfetti = (trigger: boolean) => {
  useEffect(() => {
    if (trigger) {
      const celebrationInterval = setInterval(() => {
        // Left side confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { x: 0.1, y: 0.6 },
          colors: ["#facc15", "#f472b6", "#60a5fa", "#22c55e"],
          startVelocity: 30,
          gravity: 0.8,
        });

        // Right side confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { x: 0.9, y: 0.6 },
          colors: ["#facc15", "#f472b6", "#60a5fa", "#22c55e"],
          startVelocity: 30,
          gravity: 0.8,
        });

        // Center burst after a short delay
        setTimeout(() => {
          confetti({
            particleCount: 50,
            spread: 120,
            origin: { x: 0.5, y: 0.4 },
            colors: ["#facc15", "#f472b6", "#60a5fa", "#22c55e"],
            startVelocity: 45,
          });
        }, 300);
      }, 1000); // Repeat every 1 second

      // Cleanup interval when component unmounts or trigger changes
      return () => clearInterval(celebrationInterval);
    }
  }, [trigger]);
};