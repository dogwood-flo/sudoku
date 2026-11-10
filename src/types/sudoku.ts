export interface CellPosition {
  row: number
  col: number
}

export interface CellData extends CellPosition {
  value: number | null
  valueTag: VisualTag | null
  fixed: boolean
  notes: Set<number>
  notesTags: Array<VisualTag | null>
  candidates: Set<number>
}

export const visual_tags = [
  'assist_eliminated',
  'assist_placed'
]

export type VisualTag = typeof visual_tags[number]
