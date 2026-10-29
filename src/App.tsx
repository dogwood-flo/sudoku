import { useState, type KeyboardEvent } from 'react'
import { createInitialBoard } from './utils/board'
import Board from './components/Board'
import NumberPad from './components/NumberPad'
import ModeChangePad from './components/ModeChangePad'



function App() {
  const [board, setBoard] = useState(createInitialBoard)
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number, value: number | null } | null>(null)
  const [mode, setMode] = useState<'create' | 'solve'>('create')

  const handleInputNumber = (num: number | null) => {
    if (!selectedCell) return;

    const { row, col } = selectedCell
    const currentCell = board[row][col]

    if (mode == 'solve' && currentCell.fixed) {
      return;
    }

    setBoard((prevBoard) => 
      prevBoard.map((rList, rIdx) => 
        rList.map((cell, cIdx) => {
          if (rIdx === row && cIdx === col) {
            return {
              ...cell,
              value: num,
              fixed: mode === 'create' ? num !== null : cell.fixed 
            };
          }
          return cell;
        })
      )
    );
    setSelectedCell({ row, col, value: num })
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.nativeEvent.isComposing || e.ctrlKey || e.metaKey || e.altKey) return

    if (/^[1-9]$/.test(e.key)) {
      e.preventDefault()
      console.log(`Pressed number key ${e.key}`)
      handleInputNumber(parseInt(e.key, 10))
      return
    }

    if (e.key === 'Backspace' || e.key === 'Delete') {
      e.preventDefault()
      console.log('Pressed clear key')
      handleInputNumber(null)
      return
    }

    const movementKeys: Record<string, string> = {
      w: 'ArrowUp',
      a: 'ArrowLeft',
      s: 'ArrowDown',
      d: 'ArrowRight',
    }
    const key = movementKeys[e.key.toLowerCase()] ?? e.key

    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'].includes(key)) return

    if (!selectedCell) {
      e.preventDefault()
      setSelectedCell({ row: 0, col: 0 , value: board[0][0].value})
      return
    }

    let { row, col } = selectedCell

    switch (key) {
      case 'ArrowUp':
        row = Math.max(0, row - 1)
        break
      case 'ArrowDown':
        row = Math.min(8, row + 1)
        break
      case 'ArrowLeft':
        col = Math.max(0, col - 1)
        break
      case 'ArrowRight':
        col = Math.min(8, col + 1)
        break
      case 'Tab': {
        const nextIndex = row * 9 + col + (e.shiftKey ? -1 : 1)
        // At the ends, let Tab move focus outside the board.
        if (nextIndex < 0 || nextIndex >= 81) return
        row = Math.floor(nextIndex / 9)
        col = nextIndex % 9
        break
      }
      case 'Enter':
        row = Math.max(0, Math.min(8, row + (e.shiftKey ? -1 : 1)))
        break
    }

    e.preventDefault()
    setSelectedCell({ row, col, value: board[row][col].value })
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold text-blue-600">
        Sudoku Visualizer
      </h1>
      <Board
        board={board}
        mode={mode}
        selectedCell={selectedCell}
        setSelectedCell={setSelectedCell}
        handleKeyDown={handleKeyDown}
      />
      <ModeChangePad setMode={setMode} mode={mode} />
      <NumberPad handleInputNumber={handleInputNumber} />
    </div>
  )
}

export default App
