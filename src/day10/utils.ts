import { DirectionsCoordinates } from './interfaces'

export function getDirections(startIndex: number, startLine: number): DirectionsCoordinates {
  return {
    up: {
      line: startLine - 1,
      element: startIndex,
    },
    bottom: {
      line: startLine + 1,
      element: startIndex,
    },
    left: {
      line: startLine,
      element: startIndex - 1,
    },
    right: {
      line: startLine,
      element: startIndex + 1,
    },
  }
}

export const opposites = {
  up: 'bottom',
  bottom: 'up',
  left: 'right',
  right: 'left',
}

export function findStart(map: string[][]): number[] {
  let position: number[] = []
  map.forEach((line, index) => {
    const entranceIndex = line.indexOf('S')
    if(entranceIndex >= 0) {
      position = [index, entranceIndex]
    }
  })
  return position
}
