export interface CellPosition {
  row: number
  col: number
}

export interface CellData extends CellPosition {
  value: number | null
  fixed: boolean
  notes: Set<number> 
}

