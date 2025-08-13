import confetti from "canvas-confetti";
import type { Dot, GameState } from "../types/types";
import { DOT_RADIUS } from "../utils/constants";

interface GameBoardProps {
  dots: Dot[];
  hidingDots: Map<number, number>;
  nextDotId: number;
  onDotClick: (dot: Dot) => void;
  gameState: GameState;
}

export function GameBoard({ dots, hidingDots, nextDotId, onDotClick, gameState }: GameBoardProps) {
  const handleClick = (dot: Dot, e: React.MouseEvent<HTMLDivElement>) => {
    if (dot.id === nextDotId) {
      const rect = (e.target as HTMLDivElement).getBoundingClientRect();
      const originX = (rect.left + rect.width / 2) / window.innerWidth;
      const originY = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 30,
        spread: 60,
        origin: { x: originX, y: originY },
        colors: ["#facc15", "#f472b6", "#60a5fa"], // vàng, hồng, xanh
      });
    }

    onDotClick(dot);
  };

  return (
    <>
      <div className="board relative w-[512px] h-[512px] mx-auto bg-gray-950/50 rounded-2xl border-2 border-white/8">
        {[...dots].reverse().map((dot) => (
          <div
            key={dot.id}
            onClick={(e) => handleClick(dot, e)}
            className="dot cursor-pointer transition-opacity duration-300"
            style={{
              left: dot.x - DOT_RADIUS,
              top: dot.y - DOT_RADIUS,
              opacity: hidingDots.has(dot.id)
                ? Math.max(0, Math.min(1, (hidingDots.get(dot.id)! - performance.now()) / 3000))
                : 1,
              backgroundColor: hidingDots.has(dot.id) ? '#000dff5d' : '#0b1220',
            }}
          >
            <p>{dot.id}</p>
            {hidingDots.get(dot.id) ? (
              <p className="!text-[10px]">
                {((hidingDots.get(dot.id)! - performance.now()) / 1000).toFixed(1)}s
              </p>
            ) : null}
          </div>
        ))}
        <div className={`banner ${gameState === 'ALL_CLEARED' ? 'show banner-win' : gameState === 'GAME_OVER' ? 'show banner-lose' : ''}`}>
          {gameState === 'ALL_CLEARED' && <h2>ALL CLEARED</h2>}
          {gameState === 'GAME_OVER' && <h2>GAME OVER</h2>}
        </div>
      </div>
      <div className="game-tips w-[512px] mx-auto mt-1 text-base text-gray-600 flex justify-between">
        <span>
          Next: <span className="next-node font-semibold text-gray-400">{nextDotId}</span>
        </span>
        <span className="italic">Tip: "Click on the dots to clear them"</span>
      </div>
    </>
  );
}