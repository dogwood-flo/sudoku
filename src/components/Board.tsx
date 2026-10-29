import type { KeyboardEvent } from 'react'
import type { CellData } from '../types/sudoku'
import { getRelatedCells, hilightCells } from '../utils/board'

type BoardProps = {
  board: CellData[][]
  mode: 'create' | 'solve'
  handleKeyDown: (e: KeyboardEvent<HTMLDivElement>) => void
  selectedCell: { row: number; col: number, value: number | null } | null
  setSelectedCell: (cell: { row: number; col: number, value: number | null } |  null ) => void
}

export default function Board({ board, mode, selectedCell, setSelectedCell, handleKeyDown }: BoardProps) {
    const isSelected = (row: number, col: number) => {
        return selectedCell?.row === row && selectedCell?.col === col
    }

    const relatedCells = getRelatedCells(board, selectedCell?.row ?? -1, selectedCell?.col ?? -1)

  return (
    <div
      role="group"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={(e) => e.currentTarget.focus()}
      aria-label="数独の盤面"
      className="relative w-full max-w-sm border-2 border-slate-700 bg-white focus:outline-none"
    >
        <div className="grid grid-cols-9">
            {board.flat().map((cell) => (
                <div
                    key={`${cell.row}-${cell.col}`}
                    onClick={() => {
                        console.log(`Clicked cell at row ${cell.row}, col ${cell.col}`)

                        const alreadySelected = isSelected(cell.row, cell.col)
                        setSelectedCell( alreadySelected ? null : { row: cell.row, col: cell.col, value: cell.value })
                    }}
                    className={`flex aspect-square items-center justify-center border-b border-r border-slate-300 text-lg
                        [&:nth-child(9n)]:border-r-0 [&:nth-last-child(-n+9)]:border-b-0
                        ${hilightCells(cell, mode, relatedCells, selectedCell, isSelected(cell.row, cell.col))}
                    `}
                >
                    {cell.value}
                </div>
            ))}
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid grid-cols-3 grid-rows-3">
            {[...Array(9)].map((_, i) => (
                <div key={i} className="border-b-2 border-r-2 border-slate-700 [&:nth-child(3n)]:border-r-0 [&:nth-last-child(-n+3)]:border-b-0" />
            ))}
        </div>
    </div>
  )
}
