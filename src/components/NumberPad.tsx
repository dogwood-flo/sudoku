type NumberPadProps = {
    handleInputNumber: (num: number | null) => void
}

export default function NumberPad({ handleInputNumber }: NumberPadProps) {
    return (
        <div className="flex gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                    key={num}
                    className="px-3 h-10 bg-blue-50 text-blue-600 border border-blue-200 rounded font-bold hover:bg-blue-100"
                    onClick={() => {
                        console.log(`Clicked number ${num}`)
                        handleInputNumber(num)
                    }}
                >
                    {num}
                </button>
            ))}
            <button
                className="px-3 h-10 bg-red-50 text-red-600 border border-red-200 rounded font-bold hover:bg-red-100"
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