export type GameState = 'READY' | 'PLAYING' | 'GAME_OVER' | 'ALL_CLEARED';
export type Dot = {
  id: number;
  x: number;
  y: number;
}