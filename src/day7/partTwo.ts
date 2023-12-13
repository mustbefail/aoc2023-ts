import { PathLike } from 'fs'
import { readInput } from '../utils'
import {
  Card,
  CombinationTypes,
  getCombinationType,
  getHandStrength,
  groupHandsByType,
  Hand,
  HandInfo,
  serializeCards,
  serializeHand,
} from './partOne'


const cards = [
  'J',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'T',
  'Q',
  'K',
  'A',
]


export function getHandInfo(hand: Hand, cardsMap: Card[]): HandInfo {
  const {
    combination,
    bid,
  } = hand
  const combType = getCombinationType(combination, cardsMap)
  const finalCombination = checkForJokers(combination, combType)
  return {
    combination,
    combinationType: finalCombination,
    handStrength: getHandStrength(combination, cardsMap).trimEnd().split(' ').map(Number),
    bid,
  }
}

function checkForJokers(combination: string, combinationType: CombinationTypes): CombinationTypes {
  const jokers = combination.match(new RegExp('J', 'g'))?.length
  if(!jokers) return combinationType
  if(jokers === 5) return CombinationTypes.FiveOfKind
  switch (combinationType) {
    case 1: {
      if(jokers === 1) {
        return CombinationTypes.OnePair
      }
      if(jokers === 2) {
        return CombinationTypes.TreeOfAKind
      }
      if(jokers === 3) {
        return CombinationTypes.FourOfKind
      }
      if(jokers === 4) {
        return CombinationTypes.FiveOfKind
      }
    }
      break
    case 2: {
      if(jokers === 1) {
        return CombinationTypes.TreeOfAKind
      }
      if(jokers === 2) {
        return CombinationTypes.FourOfKind
      }
      if(jokers === 3) {
        return CombinationTypes.FiveOfKind
      }
    }
      break
    case 3: {
      if(jokers === 1) {
        return CombinationTypes.FullHouse
      }
    }
      break
    case 4: {
      if(jokers === 1) {
        return CombinationTypes.FourOfKind
      }
      if(jokers === 2) {
        return CombinationTypes.FiveOfKind
      }
    }
      break
    case 5:
      break
    case 6: {
      return combinationType + jokers
    }
  }
  return combinationType
}

export default function partTwo(input: PathLike) {
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
