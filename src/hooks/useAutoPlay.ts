import { useEffect } from "react";
import type { Dot, GameState } from "../types/types";

interface UseAutoPlayProps {
  autoPlay: boolean;
  gameState: GameState;
  dots: Dot[];
  nextDotId: number;
  onDotClick: (dot: Dot) => void;
  delay?: number;
}

export function useAutoPlay({
  autoPlay,
  gameState,
  dots,
  nextDotId,
  onDotClick,
  delay,
}: UseAutoPlayProps) {
  useEffect(() => {
    if (!autoPlay || gameState !== "PLAYING") return;
    if (dots.length === 0) return;
    
    const targetDot = dots.find((dot) => dot.id === nextDotId);
    if (!targetDot) return;

    const timer = setTimeout(() => {
      onDotClick(targetDot);
    }, delay);

    return () => clearTimeout(timer);
  }, [autoPlay, gameState, dots, onDotClick, nextDotId, delay]);
}