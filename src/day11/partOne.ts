import { PathLike } from 'fs'
import { readInput, sumOfArray } from '../utils'

const UNIVERSE_EXPAND = 2

export interface Coords {
  x: number,
  y: number
}

export type Map = string[][]

export interface Numbers {
  [key: string]: Coords
}

export enum Turn {
  right,
  left,
}

export enum Lift {
  up,
  down,
}

export function replaceHashWithNumbers(lines: Map): Map {
  let match = 0
  const targets = []
  return lines.map((line) => line.map((char) => {
    return char === '#' ? (match += 1, targets.push(match), match.toString()) : char
  }))
}

export function flip(arr: Map) {
  return arr[0].map((_, index) => arr.map((row) => row[index]))
}

export function expander(galaxyMap: Map, line: string[], sign: string): Map {
  if(line.every((cell) => ['.', '*', '+'].includes(cell))) {
    galaxyMap.push([...line.map(() => sign)])
  } else {
    galaxyMap.push(line)
  }
  return galaxyMap
}

export function expandArray(data: Map): Map {
  const expanded = flip(data).reduce<Map>((map, line) => expander(map, line, '*'), [])
  return flip(expanded).reduce<Map>((map, line) => expander(map, line, '+'), [])
}

export function findNumbersCoords(map: Map): Numbers {
  return map.reduce((res, line, lineIndex) => {
    const numbersInLine = line.reduce<Numbers>((coords, el, index) => {
      if(!['.', '*', '+'].includes(el)) {
        return {
          ...coords,
          [el]: {
            x: index,
            y: lineIndex,
          },
        }
      }
      return coords
    }, {})
    return {
      ...res,
      ...numbersInLine,
    }
  }, {})
}

export function getDistance(coordA: Coords, coordB: Coords, galaxyMap: Map, universeExpand: number): number {
  let currentX = coordA.x
  let currentY = coordA.y
  const turn = currentX > coordB.x ? Turn.left : Turn.right
  const lift = currentY > coordB.y ? Lift.up : Lift.down

  let action = 'lift'
  let path = 0
  const pathRec = []

  while(!(currentX === coordB.x && currentY === coordB.y)) {
    if(action === 'lift' && currentY !== coordB.y) {
      currentY = lift === Lift.down ? currentY + 1 : currentY - 1
      path = galaxyMap[currentY][currentX] === '+' ? path + universeExpand : path + 1
    } else if(action === 'turn' && currentX !== coordB.x) {
      currentX = turn === Turn.right ? currentX + 1 : currentX - 1
      if(galaxyMap[currentY][currentX] === '+' && galaxyMap[currentY - 1][currentX] === '*') {
        path += universeExpand
      } else {
        path = galaxyMap[currentY][currentX] === '*' ? path + universeExpand : path + 1
      }
    }
    pathRec.push([currentX, currentY, galaxyMap[currentY][currentX]])
    if(currentX === coordB.x) {
      action = 'lift'
    } else if(currentY === coordB.y) {
      action = 'turn'
    } else {
      action = action === 'turn' ? 'lift' : 'turn'
    }
  }
  return path
}

export default function partOne(input: PathLike): number {
  const rawLines = readInput(input).map((line) => line.split(''))
  const replacedLines = replaceHashWithNumbers(rawLines)
  const galaxyMap = expandArray(replacedLines)
  const coords = findNumbersCoords(galaxyMap)
  const keys = Object.keys(coords)

  const dist = keys.reduce<number[]>((dis, key, index) => {
    const from = coords[key]
    const distancesToGalaxies = keys.slice(index + 1).reduce<number[]>((
      acc,
      toKey,
    ) => [...acc, getDistance(from, coords[toKey], galaxyMap, UNIVERSE_EXPAND)], [])
    return [...dis, ...distancesToGalaxies]
  }, [])

  return dist.reduce(sumOfArray)
}
