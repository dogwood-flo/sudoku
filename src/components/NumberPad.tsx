type NumberPadProps = {
    handleInputNumber: (num: number | null) => void
}

export default function NumberPad({ handleInputNumber }: NumberPadProps) {
    return (
        <div className="flex gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                    key={num}
                    className="px-3 h-10 bg-neutral-50 text-neutral-600 border border-neutral-200 rounded font-bold hover:bg-neutral-100"
                    onClick={() => {
                        console.log(`Clicked number ${num}`)
                        handleInputNumber(num)
                    }}
                >
                    {num}
                </button>
            ))}
            <button
                className="px-3 h-10 bg-rose-50 text-rose-600 border border-rose-200 rounded font-mono font-bold hover:bg-rose-100"
                onClick={() => {
                    console.log('Clicked clear button')
                    handleInputNumber(null)
                }}
            >
                Clear
            </button>
        </div>
    )
}
