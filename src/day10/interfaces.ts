export interface Pipe {
  symbol: PipeTypes,
  sides: string[]
  coords: Coordinates
  entrance: string
}

export interface Coordinates {
  line: number
  element: number
}

export enum PipeTypes {
  Start = 'S',
  Vertical = '|',
  Horizontal = '-',
  TopRight = 'L',
  TopLeft = 'J',
  BottomRight = 'F',
  BottomLeft = '7',
}

export interface Coordinates {
  line: number
  element: number
}

export interface DirectionsCoordinates {
  up: Coordinates
  bottom: Coordinates
  left: Coordinates
  right: Coordinates
}

export type Direction = 'up' | 'bottom' | 'left' | 'right'

export type Pipes = {
  [key in PipeTypes]: Pipe
}
