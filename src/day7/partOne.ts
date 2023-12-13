import { PathLike } from 'fs'
import { readInput } from '../utils'

export enum CombinationTypes {
  FiveOfKind = 7,
  FourOfKind = 6,
  FullHouse = 5,
  TreeOfAKind = 4,
  TwoPairs = 3,
  OnePair = 2,
  HighCard = 1,
}

export interface GroupedCards {
  [key: number]: HandInfo[]
}

export interface Card {
  label: string
  strength: number
}

export interface Hand {
  combination: string
  bid: number
}

export interface HandInfo extends Hand {
  combinationType: CombinationTypes
  handStrength: number[] // [ 13, 13, 13, 13, 13 ]
}

const cards = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'T',
  'J',
  'Q',
  'K',
  'A',
]

export function serializeCards(cards: Array<string>): Card[] {
  return cards.map<Card>((card, index) => ({
    label: card,
    strength: index + 1,
  }))
}

export function serializeHand(line: string): Hand {
  const [hand, bid] = line.split(' ')
  return {
    combination: hand,
    bid: Number(bid),
  }
}

export function getCombinationType(combination: string, map: Card[]): number {
  const comb = map.filter(({ label }) => label !== 'J').reduce<number[]>((acc, card) => {
    const { label } = card
    const match = combination.match(new RegExp(label, 'g'))

    if(!match) {
      return acc
    }

    switch (Number(match.length)) {
      case 1:
        return [...acc, CombinationTypes.HighCard]
      case 2:
        return [...acc, CombinationTypes.OnePair]
      case 3:
        return [...acc, CombinationTypes.TreeOfAKind]
      case 4:
        return [...acc, CombinationTypes.FourOfKind]
      case 5:
        return [...acc, CombinationTypes.FiveOfKind]
      default:
        return acc
    }
  }, [])

  if(comb.includes(CombinationTypes.TreeOfAKind)) {
    if(comb.includes(CombinationTypes.OnePair)) {
      return CombinationTypes.FullHouse
    }
  }

  if(comb.filter((type) => type === CombinationTypes.OnePair).length === 2) {
    return CombinationTypes.TwoPairs
  }
  return comb.sort((a, b) => b - a)[0]
}

export function getHandStrength(combination: string, map: Card[]): string {
  return map.reduce((str, card) => {
    const {
      label,
      strength,
    } = card
    return str.replace(new RegExp(label, 'g'), `${strength} `)
  }, combination)
}

function getHandInfo(hand: Hand, cardsMap: Card[]): HandInfo {
  const {
    combination,
    bid,
  } = hand
  return {
    combination,
    combinationType: getCombinationType(combination, cardsMap),
    handStrength: getHandStrength(combination, cardsMap).trimEnd().split(' ').map(Number),
    bid,
  }
}

export function compare(arrayA: number[], arrayB: number[]) {
  for(let idx = 0; idx < arrayA.length; idx += 1) {
    if(arrayA[idx] > arrayB[idx]) {
      return 1
    }
    if(arrayA[idx] < arrayB[idx]) {
      return -1
    }
  }
  return 0
}

export function groupHandsByType(hands: HandInfo[]): GroupedCards {
  const grouped = hands.reduce<GroupedCards>((res, hand) => {
    const { combinationType } = hand
    return res[combinationType] ? {
      ...res,
      [combinationType]: [...res[combinationType], hand],
    } : {
      ...res,
      [combinationType]: [hand],
    }
  }, {} as GroupedCards)
  for(const key in grouped) {
    grouped[key].sort((a, b) => compare(a.handStrength, b.handStrength))
  }
  return grouped
}

export default function partOne(input: PathLike): number {
  const cardsMap = serializeCards(cards)
  const hands = readInput(input).map(serializeHand).map((hand) => getHandInfo(hand, cardsMap))
  return Object.values(groupHandsByType(hands)).flat()
    .map((hand, index) => ({
      ...hand,
      position: index + 1,
    }))
    .reduce<number>((sum, hand) => {
    return sum + (hand.position * hand.bid)
  }, 0)
}
