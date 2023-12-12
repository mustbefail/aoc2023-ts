import { PathLike } from 'fs'
import { readInput } from '../day2'

export default function partOne(input: PathLike): number {
  const rawLines = readInput(input)
  console.log(rawLines)
  return 0
}

partOne('/home/codelance/projects/aoc/src/tests/day6/mockups/input.txt')
