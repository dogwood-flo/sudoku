import type { KeyboardEvent } from 'react'
import type { CellData, CellPosition } from '../types/sudoku'
import { getRelatedCells, hilightCells } from '../utils/board'

type BoardProps = {
  board: CellData[][]
  mode: 'edit' | 'solve'
  handleKeyDown: (e: KeyboardEvent<HTMLDivElement>) => void
  selectedCell: CellPosition | null
  setSelectedCell: (cell: CellPosition | null) => void
}

export default function Board({ board, mode, selectedCell, setSelectedCell, handleKeyDown }: BoardProps) {
    const isSelected = (row: number, col: number) => {
        return selectedCell?.row === row && selectedCell?.col === col
    }

    const relatedCells = getRelatedCells(board, selectedCell?.row ?? -1, selectedCell?.col ?? -1)
    const selectedValue = selectedCell ? board[selectedCell.row][selectedCell.col].value : null

  return (
    <div
      role="group"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={(e) => e.currentTarget.focus()}
      aria-label="数独の盤面"
      className="relative w-full max-w-sm border-2 border-neutral-700 bg-white focus:outline-none"
    >
        <div className="grid aspect-square grid-cols-9 grid-rows-9">
            {board.flat().map((cell) => (
                <div
                    key={`${cell.row}-${cell.col}`}
                    onClick={() => {
                        console.log(`Clicked cell at row ${cell.row}, col ${cell.col}, value ${cell?.value}`)

                        const alreadySelected = isSelected(cell.row, cell.col)
                        setSelectedCell( alreadySelected ? null : { row: cell.row, col: cell.col })
                    }}
                    className={`flex min-h-0 min-w-0 items-center justify-center border-b border-r border-neutral-300 text-2xl
                        [&:nth-child(9n)]:border-r-0 [&:nth-last-child(-n+9)]:border-b-0
                        ${hilightCells(cell, mode, relatedCells, selectedValue, isSelected(cell.row, cell.col))}
                    `}
                >
                    {cell.value !== null ? (cell.value) : (
                        <div className="grid h-full w-full grid-cols-3 grid-rows-3 p-0.2">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                                <div
                                    key={n}
                                    className={`flex items-center justify-center text-xs
                                        ${n === selectedValue ? 'font-bold text-neutral-800' : 'font-normal text-neutral-500'}
                                    `}
                                >
                                    {cell.notes.has(n) ? n : null}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid grid-cols-3 grid-rows-3">
            {[...Array(9)].map((_, i) => (
                <div key={i} className="border-b-2 border-r-2 border-neutral-700 [&:nth-child(3n)]:border-r-0 [&:nth-last-child(-n+3)]:border-b-0" />
            ))}
        </div>
    </div>
  )
}
