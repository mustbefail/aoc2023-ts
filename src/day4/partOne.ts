import { PathLike } from 'fs'
import { readInput } from '../day2'

export interface Card {
  id: number,
  numbersToWin: Set<number>
  numbersOnCard: Set<number>
  points: number
  prize: Array<Card> | []
  origin: Card[] | []
}


export function parseCard(rawCard: string): Card {
  const [
    cardName,
    numbers,
  ] = rawCard.split(':')
  const [
    , id,
  ] = cardName.split(' ').filter(Boolean)
  const [
    winningSeq,
    cardSeq,
  ] = numbers.split('|')
  const wNumbers = winningSeq.trim().split(' ').filter(Boolean).map(Number)
  const cNumbers = cardSeq.trim().split(' ').filter(Boolean).map(Number)

  return {
    id: parseInt(id),
    numbersToWin: new Set(wNumbers),
    numbersOnCard: new Set(cNumbers),
    points: 0,
    prize: [],
    origin: [],
  }
}

export function getIntersections(set1: Set<number>, set2: Set<number>): number[] {
  return [...set1].filter((x) => set2.has(x))
}

function countPoints(card: Card): Card {
  const {
    numbersToWin,
    numbersOnCard,
  } = card
  const winCombination = getIntersections(numbersOnCard, numbersToWin)
  const points = winCombination.reduce((points) => {
    return points > 0 ? points * 2 : 1
  }, 0)
  return {
    ...card,
    points,
  }
}

function countScratchcards(points: number, card: Card): number {
  return points + card.points
}


export default function partOne(path: PathLike): number {
  return readInput(path).map(parseCard).map(countPoints).reduce(countScratchcards, 0)
}

// partOne('/home/codelance/projects/aoc/src/day4/day4Input.txt')

