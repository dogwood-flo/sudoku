import type { CellData } from '../types/sudoku'

type BoardProps = {
  board: CellData[][]
}

export default function Board({ board }: BoardProps) {
  return (
    <div
      role="group"
      aria-label="数独の盤面"
      className="grid w-full max-w-sm grid-cols-9 border-2 border-slate-700 bg-white"
    >
      {board.flat().map((cell) => (
        <div
          key={`${cell.row}-${cell.col}`}
          className={`flex aspect-square items-center justify-center text-lg
            ${cell.col === 2 || cell.col === 5 ? 'border-r-2 border-r-slate-700' : cell.col < 8 ? 'border-r border-r-slate-300' : ''}
            ${cell.row === 2 || cell.row === 5 ? 'border-b-2 border-b-slate-700' : cell.row < 8 ? 'border-b border-b-slate-300' : ''}`}
        >
          {cell.value}
        </div>
      ))}
    </div>
  )
}
