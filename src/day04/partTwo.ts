import { PathLike } from 'fs'
import { readInput } from '../day02'
import { Card, getIntersections, parseCard } from './partOne'

interface Map {
  [key: string]: number
}

function getPrize(map: Map, card: Card): Map {
  const {
    id,
    numbersToWin,
    numbersOnCard,
  } = card
  return getIntersections(numbersOnCard, numbersToWin)
    .reduce((cardsMap, _, index): Map => {
      cardsMap[id + index + 1] += cardsMap[id]
      return cardsMap
    }, map)
}

export default function partTwo(path: PathLike): number {
  const rawLines = readInput(path)
  const map:Map = rawLines.reduce((map, _, index) => ({
    ...map,
    [index + 1]: 1,
  }), {})
  const mappedCards = rawLines
    .map(parseCard)
    .reduce(getPrize, map)

  return Object.values(mappedCards).reduce((a, b) => a + b)
}

partTwo('/home/codelance/projects/aoc/src/day04/day04Input.txt')
