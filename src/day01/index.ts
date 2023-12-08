import fs from 'node:fs'
import { PathLike } from 'fs'

const numbersDict: { [key: string]: number } = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
}

const numbersNames = Object.keys(numbersDict)

const isNumeric = (string: string): boolean => !isNaN(parseInt(string))

function convertToDigit(substr: string): string {
  const foundName = numbersNames.find((name) => new RegExp(name).test(substr))
  return foundName ? String(numbersDict[foundName]) : ''
}

function findFirstAndLastNumbers(inputString: string): string {
  let firstNumber, lastNumber
  const lastCharIdx = inputString.length - 1

  for (let i = 0; i <= inputString.length; i += 1) {
    if (!firstNumber) {
      if (!firstNumber && isNumeric(inputString[i])) {
        firstNumber = inputString[i]
      } else {
        firstNumber = convertToDigit(inputString.slice(0, i + 1))
      }
    }
    if (!lastNumber) {
      if (isNumeric(inputString[lastCharIdx - i])) {
        lastNumber = inputString[lastCharIdx - i]
      } else {
        lastNumber = convertToDigit(inputString.slice(-i - 1))
      }
    }
    if (firstNumber && lastNumber) {
      break
    }
  }

  return `${firstNumber}${lastNumber}`
}

export default function trebuchet(filePath: PathLike): number {
  return fs
    .readFileSync(filePath, 'utf-8')
    .trim()
    .split('\n')
    .reduce((acc, el) => {
      const numbers = findFirstAndLastNumbers(el)
      return acc + Number(numbers)
    }, 0)
}
