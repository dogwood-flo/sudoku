import type { CellData } from '../types/sudoku'

// 上にあるアルゴリズムほど優先して実行する。
export const ALGORITHM_ORDER = [
    'direct-elimination',
    'naked-pair',
    'hidden-pair',
    'xy-wing',
] as const

export type AlgorithmId = typeof ALGORITHM_ORDER[number]

export type AssistBoard = ReadonlyArray<
    ReadonlyArray<Readonly<Pick<CellData, 'value'>>>
>

export type CandidateGrid = Set<number>[][]

export function initCandidateGrid(): CandidateGrid {
    return Array.from({ length: 9 }, () =>
        Array.from({ length: 9 }, () =>
            new Set([1, 2, 3, 4, 5, 6, 7, 8, 9])
        )
    )
}

export function initAssistBoard(board: CellData[][]): AssistBoard {
    return board.map((row) =>
        row.map((cell) =>
            ({ value: cell.value })
        )
    )
}

export type Elimination = {
    row: number
    col: number
    digit: number
}

// 各アルゴリズムは候補集合を直接変更せず、削除する候補の一覧を返す。
export type CandidateAlgorithm = (
    board: AssistBoard,
    candidates: ReadonlyArray<ReadonlyArray<ReadonlySet<number>>>,
) => Elimination[]

export type AssistFunction = (
    board: AssistBoard,
    algorithmIds: ReadonlySet<AlgorithmId>,
) => CandidateGrid

export const directElimination: CandidateAlgorithm = (board, candidates) => {
    const eliminations: Elimination[] = []

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            // 確定済みのセルには候補を残さない。
            if (board[row][col].value !== null) {
                for (const digit of candidates[row][col]) {
                    eliminations.push({ row, col, digit })
                }
                continue
            }

            const usedDigits = new Set<number>()
            for (let index = 0; index < 9; index++) {
                const rowValue = board[row][index].value
                const colValue = board[index][col].value
                if (rowValue !== null) usedDigits.add(rowValue)
                if (colValue !== null) usedDigits.add(colValue)
            }

            const boxRow = Math.floor(row / 3) * 3
            const boxCol = Math.floor(col / 3) * 3
            for (let r = boxRow; r < boxRow + 3; r++) {
                for (let c = boxCol; c < boxCol + 3; c++) {
                    const value = board[r][c].value
                    if (value !== null) usedDigits.add(value)
                }
            }

            for (const digit of candidates[row][col]) {
                if (usedDigits.has(digit)) {
                    eliminations.push({ row, col, digit })
                }
            }
        }
    }

    return eliminations
}

export const nakedPair: CandidateAlgorithm = (_board, _candidates) => {
    throw new Error('Naked Pair is not implemented yet.')
}

export const hiddenPair: CandidateAlgorithm = (_board, _candidates) => {
    throw new Error('Hidden Pair is not implemented yet.')
}

export const xyWing: CandidateAlgorithm = (_board, _candidates) => {
    throw new Error('XY-Wing is not implemented yet.')
}

const ALGORITHMS: Record<AlgorithmId, CandidateAlgorithm> = {
    'direct-elimination': directElimination,
    'naked-pair': nakedPair,
    'hidden-pair': hiddenPair,
    'xy-wing': xyWing,
}

export const runAssist: AssistFunction = (board, algorithmIds) => {
    const candidates = initCandidateGrid()

    for (const id of ALGORITHM_ORDER) {
        if (!algorithmIds.has(id)) continue

        const eliminations = ALGORITHMS[id](board, candidates)
        for (const { row, col, digit } of eliminations) {
            candidates[row][col].delete(digit)
        }
    }

    return candidates
}
