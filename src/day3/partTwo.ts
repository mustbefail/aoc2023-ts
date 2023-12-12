import { PathLike } from 'fs'
import { readInput } from '../day2'
import { isNumber } from './partOne'

const findFullNumber = (slice: string, seekBack: boolean): string => {
  let result = ''
  let str = slice
  if(seekBack) {
    str = slice.split('').reverse().join('')
  }

  for(let i = 0; i < str.length; i += 1) {
    if(isNumber(str[i])) {
      result += str[i]
    } else {
      break
    }
  }

  return seekBack ? result.split('').reverse().join('') : result
}

function findGearPower(line: string, lineIndex: number, linesArray: string[]): string[][] {
  return line.split('').reduce((acc, char, charIndex, charArray) => {
    const isOnTopLine = !linesArray[lineIndex - 1]
    const isOnBottomLine = !linesArray[lineIndex + 1]

    if(char === '*') {
      const numbers = []
      const left = charArray[charIndex - 1]
      const right = charArray[charIndex + 1]
      const top = linesArray[lineIndex - 1]?.[charIndex]
      const topRight = linesArray[lineIndex - 1]?.[charIndex + 1]
      const topLeft = linesArray[lineIndex - 1]?.[charIndex - 1]
      const bottom = linesArray[lineIndex + 1]?.[charIndex]
      const bottomRight = linesArray[lineIndex + 1]?.[charIndex + 1]
      const bottomLeft = linesArray[lineIndex + 1]?.[charIndex - 1]
      if(isNumber(left)) {
        numbers.push(findFullNumber(charArray.join('').slice(0, charIndex), true))
      }
      if(isNumber(right)) {
        numbers.push(findFullNumber(charArray.join('').slice(charIndex + 1, charArray.length), false))
      }
      if(!isOnTopLine) {
        if(isNumber(top)) {
          const fullNumber = findFullNumber(linesArray[lineIndex - 1].slice(0, charIndex), true).concat(
            findFullNumber(linesArray[lineIndex - 1].slice(charIndex, charArray.length), false),
          )
          numbers.push(fullNumber)
        } else {
          if(isNumber(topRight)) {
            numbers.push(findFullNumber(linesArray[lineIndex - 1].slice(charIndex + 1, charArray.length), false))
          }
          if(isNumber(topLeft)) {
            numbers.push(findFullNumber(linesArray[lineIndex - 1].slice(0, charIndex), true))
          }
        }
      }
      if(!isOnBottomLine) {
        if(isNumber(bottom)) {
          const fullNumber = findFullNumber(linesArray[lineIndex + 1].slice(0, charIndex), true).concat(
            findFullNumber(linesArray[lineIndex + 1].slice(charIndex, charArray.length), false),
          )
          numbers.push(fullNumber)
        } else {
          if(isNumber(bottomRight)) {
            numbers.push(findFullNumber(linesArray[lineIndex + 1].slice(charIndex + 1, charArray.length), false))
          }
          if(isNumber(bottomLeft)) {
            numbers.push(findFullNumber(linesArray[lineIndex + 1].slice(0, charIndex), true))
          }
        }
      }
      acc.push(numbers)
    }
    return acc
  }, [] as string[][])
}

export default function partTwo(input: PathLike): number {
  const rawLines: string[] = readInput(input);
  return rawLines.map(findGearPower)
    .flat()
    .filter((arr) => arr.length > 1)
    .reduce((sum, gear) => {
      const power = gear.reduce((number1, number2) => number1 * parseInt(number2), 1)
      return sum + power
    }, 0)
}

