import { useId, useState } from 'react'
import { initAssistBoard, runAssist, type AlgorithmId, type CandidateGrid } from '../solver/assist'
import type { CellData } from '../types/sudoku'

const DEFAULT_ALGORITHMS: ReadonlyArray<{ id: AlgorithmId; label: string }> = [
    { id: 'direct-elimination', label: 'Direct Elimination' },
    { id: 'naked-pair', label: 'Naked Pair' },
    { id: 'hidden-pair', label: 'Hidden Pair' },
]

type SolverMenuProps = {
  board: CellData[][]
  solverSettings: ReadonlySet<AlgorithmId>
  setSolverSettings: (newSettings: Set<AlgorithmId>) => void
  onCandidatesGenerated: (candidates: CandidateGrid) => void
}

export default function SolverMenu({ board, solverSettings, setSolverSettings, onCandidatesGenerated }: SolverMenuProps) {
  const [isDefaultExpanded, setIsDefaultExpanded] = useState(true)
  const [assistError, setAssistError] = useState<string | null>(null)
  const defaultOptionsId = useId()
  const isDefaultChecked = DEFAULT_ALGORITHMS.every(({ id }) => solverSettings.has(id))
  const isDefaultPartial = !isDefaultChecked && DEFAULT_ALGORITHMS.some(({ id }) => solverSettings.has(id))

  const handleAlgorithmsChange = (ids: ReadonlyArray<AlgorithmId>, checked: boolean) => {
    const newSettings = new Set(solverSettings)
    for (const id of ids) {
      if (checked) {
        newSettings.add(id)
        console.log(`Added algorithm ${id} to solver settings.`)
      } else {
        newSettings.delete(id)
        console.log(`Removed algorithm ${id} from solver settings.`)
      }
    }

    setSolverSettings(newSettings)
  }

  const handleAssist = () => {
    try {
      const assistBoard = initAssistBoard(board)
      const candidates = runAssist(assistBoard, solverSettings)
      onCandidatesGenerated(candidates)
      setAssistError(null)
    } catch (error) {
      setAssistError(error instanceof Error ? error.message : 'Unable to generate candidates.')
    }
  }

  return (
    <fieldset data-keyboard-shortcuts="off" className="flex h-full w-full max-w-sm flex-col rounded-lg border border-neutral-300 bg-white p-4 font-mono">
      {/* <legend className="px-1 text-sm font-bold text-neutral-700">Solver settings</legend> */}
      <p className="text-sm text-center font-bold text-neutral-700 pb-1">Solver Settings</p>
      <p className="text-xs font-bold text-neutral-700 border-b mt-2 pb-1 border-neutral-300">Elimination Algorithms</p>
      <div className="flex items-center justify-between gap-2 text-xs">
        <label className="flex items-center gap-2 text-neutral-700">
          <input
            type="checkbox"
            checked={isDefaultChecked}
            aria-checked={isDefaultPartial ? 'mixed' : isDefaultChecked}
            ref={(input) => {
              // indeterminateはHTML属性ではなくDOMのプロパティ。
              if (input) input.indeterminate = isDefaultPartial
            }}
            onChange={(event) => handleAlgorithmsChange(
              DEFAULT_ALGORITHMS.map(({ id }) => id),
              event.currentTarget.checked,
            )}
            className="h-4 w-4 accent-lime-600"
          />
          Defaults
        </label>
        <button
          type="button"
          aria-expanded={isDefaultExpanded}
          aria-controls={defaultOptionsId}
          aria-label={isDefaultExpanded ? 'Hide algorithms' : 'Show algorithms'}
          title={isDefaultExpanded ? 'Hide algorithms' : 'Show algorithms'}
          onClick={() => setIsDefaultExpanded((expanded) => !expanded)}
          className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded text-neutral-600 transition-colors duration-200 hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 motion-reduce:transition-none"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`h-4 w-4 transition-transform duration-200 ease-in-out motion-reduce:transition-none ${isDefaultExpanded ? 'rotate-180' : 'rotate-0'}`}
          >
            <path d="M5 8h14l-7 9z" />
          </svg>
        </button>
      </div>
      <div
        id={defaultOptionsId}
        aria-hidden={!isDefaultExpanded}
        inert={!isDefaultExpanded}
        className={`grid transition-[grid-template-rows,opacity] duration-200 ease-in-out motion-reduce:transition-none ${isDefaultExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="ml-2 mt-3 space-y-3 border-l border-neutral-200 pl-4">
            {DEFAULT_ALGORITHMS.map(({ id, label }) => (
              <label key={id} className="flex cursor-pointer items-center gap-2 text-xs text-neutral-700">
                <input
                  type="checkbox"
                  checked={solverSettings.has(id)}
                  onChange={(event) => handleAlgorithmsChange([id], event.currentTarget.checked)}
                  className="h-4 w-4 accent-lime-600"
                />
                {label}
              </label>
            ))}
          </div>
        </div>
      </div>
      <p className="text-xs font-bold text-neutral-700 border-b pb-1 mt-4 border-neutral-300">Notes</p>
      <label className="flex items-center gap-2 text-neutral-700 pt-2 text-xs">
        <input
          type="checkbox"
          className="h-4 w-4 accent-lime-600"
          // onChange={(event) => }
        />
        Overwrite Notes During Assist or Auto Solving
      </label>
      <p className="text-xs font-bold text-neutral-700 border-b pb-1 mt-4 border-neutral-300">Numbers</p>
      <label className="flex items-center gap-2 text-neutral-700 pt-2 text-xs">
        <input
          type="checkbox"
          className="h-4 w-4 accent-lime-600"
          // onChange={(event) => }
        />
        Auto-Fill Singles
      </label>
      {assistError && (
        <p role="alert" className="mt-3 text-xs text-amber-700">{assistError}</p>
      )}
      <div className="mt-auto grid grid-cols-2 gap-5 font-bold text-sm border-t border-neutral-300 text-neutral-700 pt-3">
        <button
          type="button"
          className="bg-neutral-50 p-2"
          onClick={handleAssist}
        >
          Assist
        </button>
        <button
          className="bg-neutral-50 p-2"
        >
          Auto Solve
        </button>
      </div>
    </fieldset>
  )
}
