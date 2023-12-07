import { PathLike, readFileSync } from 'fs'

type Color = 'red' | 'green' | 'blue'
type Cube = [qty: string, color: Color]

interface Record {
  gameId: number
  red: number
  green: number
  blue: number
}

const bagCapacity = {
  red: 12,
  green: 13,
  blue: 14,
}

export function partOne(inputPath: PathLike): number {
  return readInput(inputPath)
    .map(parseRecord)
    .filter((record) => {
      const { red, green, blue } = record
      return (
        bagCapacity['red'] >= red &&
        bagCapacity['blue'] >= blue &&
        bagCapacity['green'] >= green
      )
    })
    .reduce((sum, record) => (sum += record.gameId), 0)
}

export function partTwo(inputPath: PathLike): number {
  return readInput(inputPath)
    .map(parseRecord)
    .reduce((sum, { red, green, blue }) => (sum += red * green * blue), 0)
}

function readInput(inputPath: PathLike): string[] {
  return readFileSync(inputPath, 'utf-8').trim().split('\n')
}

function parseRecord(record: string): Record {
  const [game, subsets] = record.split(':')
  const [, gameId] = game.split(' ')
  const sets = subsets.split(';')
  const maxShowed = sets.reduce(
    (acc, element) => {
      const cubes = element.split(',')
      cubes.forEach((cube) => {
        const [qty, color] = cube.trim().split(' ') as Cube
        acc[color] = acc[color] > Number(qty) ? acc[color] : Number(qty)
      })
      return acc
    },
    { red: 0, green: 0, blue: 0 },
  )

  return { gameId: Number(gameId), ...maxShowed }
}
