import type { CellData } from '../types/sudoku'

export function createInitialBoard(): CellData[][] {
  const board: CellData[][] = []

  for (let row = 0; row < 9; row++) {
    board[row] = []
    for (let col = 0; col < 9; col++) {
      board[row][col] = {
        row,
        col,
        value: null,
        fixed: false,
        notes: new Set<number>(),
      }
    }
  }

  return board
}
