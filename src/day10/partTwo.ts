import { PathLike } from 'fs'
import { readInput } from '../utils'
import { getLoop } from './partOne'
import { Pipe } from './interfaces'

function getLoopInteriorPoints(loop: Pipe[]): number {
  // Gauss's area formula + Pick's formula
  const coords = loop.map(({ coords }) => [coords.element, coords.line])

  const sum = coords.reduce((s, point, index, array) => {
    const [x, y] = point
    const nextIndex = (index + 1) % array.length
    const [nextX, nextY] = array[nextIndex]
    return s + x * nextY - y * nextX
  },0)

  return (Math.abs(sum) / 2) - (loop.length / 2) + 1
}

export default function partTwo(input: PathLike):number {
  const rawLines = readInput(input)
  const map = rawLines.map((line) => line.split(''))
  const loop = getLoop(map)
  return getLoopInteriorPoints(loop)
}

// nice
// That's not the right answer; your answer is too low.
// Curiously, it's the right answer for someone else;
// you might be logged in to the wrong account or just unlucky.
