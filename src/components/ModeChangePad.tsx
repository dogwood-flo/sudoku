type ModeChangePadProps = {
    setMode: (mode: 'edit' | 'solve') => void
    mode: 'edit' | 'solve'
}

export default function ModeChangePad({ setMode, mode }: ModeChangePadProps) {
    return (
        <button
            type="button"
            role="switch"
            aria-label="Solve mode"
            aria-keyshortcuts="M"
            title="モード切り替え（M）"
            aria-checked={mode === 'solve'}
            onClick={() => setMode(mode === 'edit' ? 'solve' : 'edit')}
            className="
                inline-flex min-h-11 shrink-0 cursor-pointer items-center gap-2
                font-mono rounded-lg px-2 font-bold
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-sky-500 focus-visible:ring-offset-2
            "
        >
            <span className={mode === 'edit' ? 'text-sky-600' : 'text-neutral-500'}>
                Edit
            </span>

            <span
                aria-hidden="true"
                className={`
                    inline-flex h-6 w-11 shrink-0 items-center rounded-full p-0.5
                    transition-colors motion-reduce:transition-none
                    ${mode === 'solve' ? 'bg-lime-500' : 'bg-sky-500'}
                `}
            >
                <span
                    className={`
                        h-5 w-5 rounded-full bg-white shadow-sm
                        transition-transform motion-reduce:transition-none
                        ${mode === 'solve' ? 'translate-x-5' : 'translate-x-0'}
                    `}
                />
            </span>

            <span className={mode === 'solve' ? 'text-lime-600' : 'text-neutral-500'}>
                Solve
            </span>
        </button>
    )
}
