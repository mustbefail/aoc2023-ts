import { PathLike, readFileSync } from 'fs'

export function readInput(inputPath: PathLike): string[] {
  return readFileSync(inputPath, 'utf-8').trim().split('\n')
}

export const getNumbersFromLine = (separator: string) =>
  (line: string): number[] => line.split(separator).filter(Boolean).map(Number)


export function chunk<T>(array: T[]): T[][] {
  return new Array(Math.ceil(array.length / 2)).fill(0).map((_, index) => {
    return array.slice(index * 2, (index + 1) * 2)
  })
}

export const sumOfArray = (sum: number, number: number) => sum + number
