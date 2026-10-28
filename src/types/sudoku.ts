export interface CellData {
  row: number
  col: number
  value: number | null
  fixed: boolean
  notes: Set<number> 
}

