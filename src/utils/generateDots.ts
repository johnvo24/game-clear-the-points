import { random } from "lodash";
import type { Dot } from "../types/types";
import { BOARD, DOT_RADIUS } from "./constants";

export function generateDots(number: number): Dot[] {
  const dots: Dot[] = [];
  const minDistance = DOT_RADIUS * 2.5;
  const checkRange = 20; // range to check for overlaps

  while (dots.length < number) {
    let x = 0, y = 0;

    for (let attempt = 0; attempt < 20; attempt++) {
      x = random(DOT_RADIUS, BOARD.w - DOT_RADIUS * 2);
      y = random(DOT_RADIUS, BOARD.h - DOT_RADIUS * 2);

      let hasOverlap = false;
      const recentDots = dots.slice(-checkRange);
      for (const dot of recentDots) {
        if ((x - dot.x) * (x - dot.x) + (y - dot.y) * (y - dot.y) < minDistance * minDistance) {
          hasOverlap = true;
          break;
        }
      }

      if (!hasOverlap) {
        break;
      }
    }

    dots.push({ id: dots.length + 1, x, y });
  }
  return dots;
}