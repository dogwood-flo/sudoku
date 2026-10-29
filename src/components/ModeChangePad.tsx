export default function ModeChangePad({ setMode, mode }: { setMode: (mode: 'create' | 'solve') => void; mode: 'create' | 'solve' }) {
    return (
        <div className="flex gap-2">
            <button 
                onClick={() => {
                    console.log('Switched to create mode')
                    setMode('create')
                }}
                className={`
                    text-white px-4 py-2 rounded border-2
                    ${mode === 'create' ? 'bg-blue-500 border-blue-500' : 'bg-blue-200 border-blue-200'}
                    hover:border-blue-500
                `}
                aria-pressed={mode === 'create'}
            >
                Create
            </button>
            <button
                onClick={() => {
                    console.log('Switched to solve mode')
                    setMode('solve')
                }}
                className={`
                    text-white px-4 py-2 rounded border-2
                    ${mode === 'solve' ? 'bg-green-500 border-green-500' : 'bg-green-200 border-green-200'}
                    hover:border-green-500
                `}
                aria-pressed={mode === 'solve'}
            >
                Solve
            </button>
        </div>
    )
}