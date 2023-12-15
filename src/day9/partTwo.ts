import { PathLike } from 'fs'
import { getNumbersFromLine, readInput, sumOfArray } from '../utils'
import { getLast } from './partOne'

export default function partTwo(input: PathLike):number {
  const numberLines = readInput(input).map(getNumbersFromLine(' '))
  return numberLines.map((line) => getLast(line.reverse())).reduce(sumOfArray)
}
