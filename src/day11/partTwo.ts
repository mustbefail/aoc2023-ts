import { PathLike } from 'fs'
import { expandArray, findNumbersCoords, getDistance, replaceHashWithNumbers } from './partOne'
import { readInput, sumOfArray } from '../utils'

const UNIVERSE_EXPAND = 1000000

export default function partTwo(input: PathLike):number {
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
