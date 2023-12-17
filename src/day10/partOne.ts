import { PathLike } from 'fs'
import { readInput } from '../utils'
import { Direction, DirectionsCoordinates, Pipe, PipeTypes } from './interfaces'
import { pipes } from './constants'
import { findStart, getDirections, opposites } from './utils'

export function getLoop(map: string[][]): Pipe[] {
  const [entranceLine, entranceIndex] = findStart(map)
  let nextCoordinates = getDirections(entranceIndex, entranceLine)
  const { start } = getNextPipe(map, pipes[PipeTypes.Start], nextCoordinates)
  let currentPipe: Pipe = start
  const loop = [start]

  while(currentPipe.symbol !== pipes[PipeTypes.Start].symbol) {
    nextCoordinates = getDirections(currentPipe.coords.element, currentPipe.coords.line)
    currentPipe = getNextPipe(map, currentPipe, nextCoordinates).start
    loop.push(currentPipe)
  }

  return loop
}

export function getNextPipe(map: string[][], currentPipe: Pipe, coordinates: DirectionsCoordinates): { start: Pipe, end: Pipe } {
  const { sides, entrance } = currentPipe

  const fPipes: Pipe[] = sides.filter((side) => side !== entrance).reduce<Pipe[]>((resPipes, direction) => {
    const { line, element } = coordinates[direction as Direction]
    const pipeSymbol = map?.[line]?.[element] as PipeTypes
    if(!pipes[pipeSymbol]) {
      return [...resPipes]
    }
    if(pipes[pipeSymbol].sides.includes(opposites[direction as Direction])) {
      return [...resPipes, {
        ...pipes[pipeSymbol],
        coords: {
          line,
          element,
        },
        entrance: opposites[direction as Direction],
      }]
    }
    return resPipes
  }, [])

  return {
    start: fPipes[0],
    end: fPipes[1],
  }
}

export default function partOne(input: PathLike): number {
  const rawLines = readInput(input)
  const map = rawLines.map((line) => line.split(''))
  const loop = getLoop(map)
  return loop.reduce((string, pipe) => string.concat(pipe.symbol), '').length / 2
}
