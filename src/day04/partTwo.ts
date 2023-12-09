import { PathLike } from 'fs'
import { readInput } from '../day02'
import { Card, getIntersections, parseCard } from './partOne'


function getPrize(card: Card, map: { [key: string]: number }): void {
  const {
    id,
    numbersToWin,
    numbersOnCard,
    origin,
  } = card
  const winCombination = getIntersections(numbersOnCard, numbersToWin)
  const prize = origin.slice(id, id + winCombination.length)
  prize.forEach((card) => {
    card.origin = origin
  })

  if(!map[id.toString()]) {
    map[id.toString()] = 1
  } else {
    map[id.toString()] += 1
  }
  return prize.forEach((el) => getPrize(el, map))
}

export default function partTwo(path: PathLike): number {
  const map: { [key: string]: number } = {}

  const rawLines = readInput(path)
  const parsedCards = rawLines
    .map(parseCard)
    .map((card, _, array) => ({
      ...card,
      origin: array,
    }))
  parsedCards.forEach((el) => getPrize(el, map))

  return Object.values(map).reduce((a, b) => a + b)
}
