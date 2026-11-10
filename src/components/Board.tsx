import type { KeyboardEvent } from 'react'
import type { CellData, CellPosition } from '../types/sudoku'
import { getRelatedCells, hilightCells, hilightNotes} from '../utils/board'

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
                      console.log(`Clicked cell at
                        row ${cell.row},
                        col ${cell.col},
                        value ${cell?.value}.\n
                        valueTag: ${cell?.valueTag}\n
                        Cell Information:\n
                        Fixed: ${cell.fixed}\n
                        Notes: ${Array.from(cell.notes).join(', ')}\n
                        NotesTags: ${Array.from(cell.notesTags).join(', ')}\n
                        Candidates: ${Array.from(cell.candidates).join(', ')}`)

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
                                        ${hilightNotes(cell, n, selectedValue)}
                                    `}
                                >
                                    {cell.notes.has(n) || cell.notesTags[n - 1] != null ? n : null}
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



// function getCompletionStatus(board: CellData[][]) : 'complete' | 'incomplete' | 'invalid' {
//     for (const cell of board.flat()) {
//         if (cell.value === null) {
//             return 'incomplete'
//         }



//         const box_row_idx = Math.floor(cell.row / 3) * 3
//         const box_col_idx = Math.floor(cell.col / 3) * 3


//     }
// }
