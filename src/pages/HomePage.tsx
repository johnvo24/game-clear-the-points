import { useCallback, useRef, useState } from "react";
import type { Dot, GameState } from "../types/types";
import { useTimer } from "../hooks/useTimer";
import { generateDots } from "../utils/generateDots";
import { N_DOTS } from "../utils/constants";
import { GameBoard } from "../components/GameBoard";
import { useAutoPlay } from "../hooks/useAutoPlay";
import { useConfetti } from "../hooks/useConfetti";

function HomePage() {
  const [gameState, setGameState] = useState<GameState>('READY');
  const [autoPlay, setAutoPlay] = useState(false);
  const [bestTime, setBestTime] = useState(0.0);
  const [numberOfDots, setNumberOfDots] = useState(N_DOTS);
  const [dots, setDots] = useState<Dot[]>([]);
  const [nextDotId, setNextDotId] = useState(1);
  const [hidingDots, setHidingDots] = useState<Map<number, number>>(new Map()); // id, deadline to hide
  const { elapsedTime, restartTime } = useTimer(gameState === 'PLAYING');
  const timeoutsRef = useRef<Set<number>>(new Set());

  const handlePlayClick = () => {
    if (gameState === 'READY') {
      setGameState('PLAYING');
      setDots(generateDots(numberOfDots));
      setHidingDots(new Map());
    }
  };

  const handleRestartClick = () => {
    setGameState('PLAYING');
    setDots(generateDots(numberOfDots));
    restartTime();
    setNextDotId(1);
    setHidingDots(new Map());
    clearAllTimeouts();
    timeoutsRef.current.clear();
    setAutoPlay(false);
  };

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(timeoutId => clearTimeout(timeoutId));
    timeoutsRef.current.clear();
  };

  const handleDotClick = useCallback((clickedDot: Dot) => {
    if (gameState !== 'PLAYING') return;
    if (hidingDots.has(clickedDot.id)) return;
    
    if (clickedDot.id === nextDotId) {
      const deadline = performance.now() + 3000;
      setHidingDots(prev => new Map(prev).set(clickedDot.id, deadline));
      setNextDotId(prev => (prev + 1) > numberOfDots ? 1 : prev + 1);

      const timeoutId = setTimeout(() => {
        setDots(prev => {
          const newDots = prev.filter(dot => dot.id !== clickedDot.id);
          
          if (newDots.length === 0) {
            setGameState('ALL_CLEARED');
            const currentTime = (elapsedTime + 3000) / 1000;
            if (bestTime === 0 || currentTime < bestTime) {
              setBestTime(currentTime);
            }
          }
          
          return newDots;
        });
        
        // Remove from hidingDots after timeout
        setHidingDots(prev => {
          const newMap = new Map(prev);
          newMap.delete(clickedDot.id);
          return newMap;
        });

        timeoutsRef.current.delete(timeoutId);
      }, 3000);

      timeoutsRef.current.add(timeoutId);
    } else {
      // Click on wrong dot
      setGameState('GAME_OVER');
      clearAllTimeouts();   
    }
  }, [gameState, hidingDots, nextDotId, numberOfDots, elapsedTime, bestTime]);

  const handleNumberOfDotsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setNumberOfDots(value);
    } else {
      setNumberOfDots(N_DOTS);
    }
  };

  useAutoPlay({
    autoPlay,
    gameState,
    dots,
    nextDotId,
    onDotClick: handleDotClick,
    delay: 1500,
  });

  useConfetti(gameState === 'ALL_CLEARED');

  return (
    <div className="container max-w-[900px] min-w-[798px] mx-auto p-8">
      <div className="bg-gray-900 border border-white/8 rounded-2xl shadow-lg overflow-hidden">
        <div className="game-hud px-4 py-3 gap-4 flex justify-between items-center border-b border-b-gray-50/6">
          <div className="metrics flex items-center gap-2 text-base">
            <div className="title title w-34 font-extrabold text-xl">
              {(gameState === 'READY' || gameState === 'PLAYING') && (
                <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent font-bold">
                  LET'S PLAY
                </span>
              )}
              {gameState === 'GAME_OVER' && (
                <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent font-bold">
                  GAME OVER
                </span>
              )}
              {gameState === 'ALL_CLEARED' && (
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent font-bold">
                  ALL CLEARED
                </span>
              )}
            </div>
            <div className="metric flex">
              Time:
              <p className="ml-2 w-12">{(elapsedTime/1000).toFixed(1)}s</p>
            </div>
            <div className="metric flex">
              Best:
              <p className="ml-2 w-12">{bestTime.toFixed(1)}s</p>
            </div>
            <div className="metric">
              Points:
              <input
                type="text"
                onChange={handleNumberOfDotsChange}
                className="ml-2 w-18 px-2 py-1 rounded font-semibold bg-gray-700/30 text-white border border-gray-600 focus:outline-none"
                placeholder="5"
              />
            </div>
          </div>
          <div className="controls flex gap-2 items-center">
            {gameState === 'READY' && (
              <button onClick={handlePlayClick} className="button w-[72px] text-sm">Play</button>
            )}
            {gameState === 'PLAYING' && (
              <>
                <button onClick={() => setAutoPlay(!autoPlay)} className="button text-sm">{!autoPlay ? 'Auto Play ON' : 'Auto Play OFF'}</button>
                <button onClick={handleRestartClick} className="button w-[72px] text-sm">Restart</button>
              </>
            )}
            {(gameState === 'GAME_OVER' || gameState === 'ALL_CLEARED') && (
              <button onClick={handleRestartClick} className="button text-sm">Restart</button>
            )}
          </div>
        </div>
        <div className="game-area p-4">
          <GameBoard
            dots={dots}
            hidingDots={hidingDots}
            nextDotId={nextDotId}
            onDotClick={handleDotClick}
            gameState={gameState}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
