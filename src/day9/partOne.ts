import { PathLike } from 'fs'
import { getNumbersFromLine, readInput, sumOfArray } from '../utils'


export function extrapolateLine(line: number[]): number[] {
  return line.reduce<number[]>((res, number, index, array) => {
    const next = array[index + 1]
    if(next !== undefined) {
      return [...res, next - number ]
    }
    return res
  }, [])
}

function getTails(line: number[]): number[] {
  const tails: number[] = [line.at(-1) || 0]
  let currentLine: number[] = line

  while(currentLine.some((x) => x !== 0)) {
    currentLine = extrapolateLine(currentLine)
    tails.push(currentLine.at(-1) || 0)
  }
  return tails
}

export function getLast(line: number[]) {
  return getTails(line).reduce(sumOfArray)
}

export default function partOne(input: PathLike): number {
  const numberLines = readInput(input).map(getNumbersFromLine(' '))
  return numberLines.map(getLast).reduce(sumOfArray)
}
