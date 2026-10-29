import { useRef } from 'react'

const boardShortcuts = [
  ['1–9', 'Enter a number, or toggle a candidate when Notes is on.'],
  ['Backspace / Delete', 'Clear the number, or all candidates when Notes is on.'],
  ['↑ ↓ ← → / W A S D', 'Move up, down, left, or right.'],
  ['Tab / Shift + Tab', 'Move to the next or previous cell.'],
  ['Enter / Shift + Enter', 'Move to the cell below or above.'],
]

const pageShortcuts = [
  ['M', 'Switch between Edit and Solve.'],
  ['Space', 'Toggle Notes in Solve mode.'],
]

export default function KeyboardHelp() {
  const dialogRef = useRef<HTMLDialogElement>(null)

  return (
    <div className="font-mono" data-keyboard-shortcuts="off">
      <button
        type="button"
        aria-label="Show keyboard shortcuts"
        aria-haspopup="dialog"
        aria-controls="keyboard-help"
        title="Keyboard shortcuts"
        onClick={() => dialogRef.current?.showModal()}
        className="absolute left-4 top-4 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-2 border-neutral-500 bg-white text-neutral-700 hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2"
      >
        <span aria-hidden="true" className="font-mono text-xl font-bold">?</span>
      </button>

      <dialog
        ref={dialogRef}
        id="keyboard-help"
        aria-labelledby="keyboard-help-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) dialogRef.current?.close()
        }}
        className="fixed inset-0 m-auto max-h-[calc(100dvh_-_2rem)] w-[calc(100%_-_2rem)] max-w-lg overflow-y-auto rounded-2xl border border-neutral-200 bg-white p-0 text-neutral-800 shadow-xl backdrop:bg-black/30"
      >
        <div className="p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 id="keyboard-help-title" className="text-lg font-bold">Keyboard shortcuts</h2>
            <button
              type="button"
              aria-label="Close"
              onClick={() => dialogRef.current?.close()}
              className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-2xl text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <h3 className="font-bold">Board controls</h3>
          <p className="mt-1 text-sm text-neutral-500">Click the board first to use these controls.</p>
          <dl className="mt-2 text-sm">
            {boardShortcuts.map(([keys, description]) => (
              <div key={keys} className="flex flex-col gap-2 border-b border-neutral-100 py-3 last:border-0 sm:flex-row sm:items-baseline sm:gap-4">
                <dt className="shrink-0 sm:w-48">
                  <kbd className="rounded border border-neutral-300 bg-neutral-100 px-2 py-1 font-mono text-xs">{keys}</kbd>
                </dt>
                <dd>{description}</dd>
              </div>
            ))}
          </dl>

          <h3 className="mt-5 font-bold">Global shortcuts</h3>
          <p className="mt-1 text-sm text-neutral-500">These work even when the board is not focused.</p>
          <dl className="mt-2 text-sm">
            {pageShortcuts.map(([keys, description]) => (
              <div key={keys} className="flex flex-col gap-2 border-b border-neutral-100 py-3 last:border-0 sm:flex-row sm:items-baseline sm:gap-4">
                <dt className="shrink-0 sm:w-48">
                  <kbd className="rounded border border-neutral-300 bg-neutral-100 px-2 py-1 font-mono text-xs">{keys}</kbd>
                </dt>
                <dd>{description}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-5 text-sm text-neutral-500">
            Press <kbd className="font-mono">Esc</kbd> or click outside this dialog to close.
          </p>
        </div>
      </dialog>
    </div>
  )
}
