import { Pipes, PipeTypes } from './interfaces'

export const pipes: Pipes = {
  [PipeTypes.Start]: {
    symbol: PipeTypes.Start,
    coords: {
      line: 0,
      element: 0,
    },
    entrance: '',
    sides: ['up', 'bottom', 'left', 'right'],
  },
  [PipeTypes.Vertical]: {
    symbol: PipeTypes.Vertical,
    entrance: '',
    sides: ['up', 'bottom'],
    coords: {
      line: 0,
      element: 0,
    },
  },
  [PipeTypes.Horizontal]: {
    symbol: PipeTypes.Horizontal,
    entrance: '',
    sides: ['left', 'right'],
    coords: {
      line: 0,
      element: 0,
    },
  },
  [PipeTypes.TopRight]: {
    symbol: PipeTypes.TopRight,
    entrance: '',
    sides: ['up', 'right'],
    coords: {
      line: 0,
      element: 0,
    },
  },
  [PipeTypes.TopLeft]: {
    symbol: PipeTypes.TopLeft,
    entrance: '',
    sides: ['up', 'left'],
    coords: {
      line: 0,
      element: 0,
    },
  },
  [PipeTypes.BottomLeft]: {
    symbol: PipeTypes.BottomLeft,
    entrance: '',
    sides: ['bottom', 'left'],
    coords: {
      line: 0,
      element: 0,
    },
  },
  [PipeTypes.BottomRight]: {
    symbol: PipeTypes.BottomRight,
    entrance: '',
    sides: ['bottom', 'right'],
    coords: {
      line: 0,
      element: 0,
    },
  },
}
