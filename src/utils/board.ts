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


export function getRelatedCells(board: CellData[][], row: number, col: number): Set<CellData> {
  const relatedCells: Set<CellData> = new Set()

  if (row < 0 || row >= 9 || col < 0 || col >= 9) {
    return relatedCells
  }

  // Add cells in the same row
  for (let c = 0; c < 9; c++) {
    if (c !== col) {
      relatedCells.add(board[row][c])
    }
  }

  // Add cells in the same column
  for (let r = 0; r < 9; r++) {
    if (r !== row) {
      relatedCells.add(board[r][col])
    }
  }

  // Add cells in the same 3x3 box
  const boxRow = Math.floor(row / 3) * 3
  const boxCol = Math.floor(col / 3) * 3
  for (let r = boxRow; r < boxRow + 3; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      if (r !== row && c !== col) {
        relatedCells.add(board[r][c])
      }
    }
  }

  return relatedCells
}


export function hilightCells(
  cell: CellData,
  mode: 'create' | 'solve',
  relatedCells: Set<CellData>,
  selectedCell: { row: number; col: number, value: number | null } | null,
  isSelected: boolean
): string {
  let backgroundColor = ''
  let illegalFlag = false

  if (isSelected) {
    backgroundColor = 'bg-blue-200'
  } else if (selectedCell?.value != null && cell.value === selectedCell.value) {
    backgroundColor = 'bg-blue-100'
    illegalFlag = relatedCells.has(cell) ? true : false
  } else if (relatedCells.has(cell)) {
    backgroundColor = 'bg-gray-200'
  }

  let textColor = mode === 'create' || !cell.fixed ? 'text-blue-600' : 'text-slate-900'

  if (illegalFlag) {
    backgroundColor = 'bg-red-200'
    textColor = 'text-red-600'
  }

  return `${backgroundColor} ${textColor}`.trim()
}
