import { useState } from 'react'
import Board from './components/Board'
import { createInitialBoard } from './utils/board'

function App() {
  const [board] = useState(createInitialBoard)

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold text-blue-600">
        Sudoku Visualizer
      </h1>
      <Board board={board} />
    </div>
  )
}

export default App
