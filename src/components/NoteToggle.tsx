type NoteToggleProps = {
    setNotes: (isNotes: boolean) => void
    notes: boolean
    mode: 'edit' | 'solve'
}


export default function NoteToggle({ setNotes, notes, mode }: NoteToggleProps) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={notes}
            aria-keyshortcuts="Space"
            title="Notes切り替え（Space）"
            disabled={mode === 'edit'}
            onClick={() => setNotes(!notes)}
            className="
                inline-flex min-h-11 cursor-pointer items-center gap-3
                rounded-lg px-2 font-medium text-slate-700
                disabled:cursor-not-allowed disabled:opacity-40
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-blue-500 focus-visible:ring-offset-2
            "
        >
            <span>Notes</span>

            <span
                aria-hidden="true"
                className={`
                    inline-flex h-6 w-11 shrink-0 items-center rounded-full p-0.5
                    transition-colors motion-reduce:transition-none
                    ${notes ? 'bg-blue-500' : 'bg-slate-300'}
                `}
            >
                <span
                    className={`
                        h-5 w-5 rounded-full bg-white shadow-sm
                        transition-transform motion-reduce:transition-none
                        ${notes ? 'translate-x-5' : 'translate-x-0'}
                    `}
                />
            </span>
        </button>
    )
}
