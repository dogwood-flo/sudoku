import { useCallback, useEffect, useState, type KeyboardEvent } from 'react'
import { createInitialBoard, getRelatedCells } from './utils/board'
import type { CellPosition } from './types/sudoku'
import Board from './components/Board'
import NumberPad from './components/NumberPad'
import ModeChangePad from './components/ModeChangePad'
import NoteToggle from './components/NoteToggle'



function App() {
  const [board, setBoard] = useState(createInitialBoard)
  const [selectedCell, setSelectedCell] = useState<CellPosition | null>(null)
  const [mode, setMode] = useState<'edit' | 'solve'>('edit')
  const [notes, setNotes] = useState(false)

  const handleModeChange = useCallback((nextMode: 'edit' | 'solve') => {
    setMode(nextMode)
    if (nextMode === 'edit') {
      setNotes(false)
    }
  }, [])

  useEffect(() => {
    const handleShortcut = (e: globalThis.KeyboardEvent) => {
      if (e.defaultPrevented || e.isComposing || e.ctrlKey || e.metaKey || e.altKey) return

      const target = e.target
      if (target instanceof HTMLElement && (
        target.isContentEditable || target.closest('input, textarea, select, [role="textbox"]')
      )) return

      if (e.key.toLowerCase() === 'm') {
        e.preventDefault()
        if (!e.repeat) {
          handleModeChange(mode === 'edit' ? 'solve' : 'edit')
        }
      } else if (e.key === ' ') {
        e.preventDefault()
        if (mode === 'solve' && !e.repeat) {
          setNotes((prevNotes) => !prevNotes)
        }
      }
    }

    window.addEventListener('keydown', handleShortcut)
    return () => window.removeEventListener('keydown', handleShortcut)
  }, [handleModeChange, mode])

  const handleInputNumber = (num: number | null) => {
    if (!selectedCell) return;

    const { row, col } = selectedCell
    const currentCell = board[row][col]

    if (mode == 'solve' && currentCell.fixed) {
      return;
    }

    setBoard((prevBoard) => {
      const relatedCells = getRelatedCells(prevBoard, row, col)

      return prevBoard.map((rList, rIdx) =>
        rList.map((cell, cIdx) => {
          if (rIdx === row && cIdx === col) {
            let nextNotes = cell.notes

            if (notes) {
              nextNotes = new Set(cell.notes)
              if (num === null) {
                nextNotes.clear()
              } else if (nextNotes.has(num)) {
                nextNotes.delete(num)
              } else {
                nextNotes.add(num)
              }
            } else if (num !== null) {
              nextNotes = new Set<number>()
            }

            return {
              ...cell,
              value: notes ? cell.value : num,
              notes: nextNotes,
              fixed: mode === 'edit' ? num !== null : cell.fixed
            };
          }

          if (
            mode === 'solve' &&
            !notes &&
            num !== null &&
            relatedCells.has(cell) &&
            cell.notes.has(num)
          ) {
            const nextNotes = new Set(cell.notes)
            nextNotes.delete(num)
            return { ...cell, notes: nextNotes }
          }

          return cell;
        })
      )
    });
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
      setSelectedCell({ row: 0, col: 0 })
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
    setSelectedCell({ row, col })
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-mono font-bold text-black-600">
        Sudoku Visualizer
      </h1>
      <Board
        board={board}
        mode={mode}
        selectedCell={selectedCell}
        setSelectedCell={setSelectedCell}
        handleKeyDown={handleKeyDown}
      />
      <div className="flex w-full max-w-sm items-center justify-between gap-2 px-2">
        <ModeChangePad setMode={handleModeChange} mode={mode} />
        <NoteToggle setNotes={setNotes} notes={notes} mode={mode} />
      </div>
      <NumberPad handleInputNumber={handleInputNumber} />
    </div>
  )
}

export default App
