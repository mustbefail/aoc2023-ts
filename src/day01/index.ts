import fs from 'node:fs'
import { PathLike } from 'fs'

const numbersDict = {
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

type NumbersNames = Array<keyof typeof numbersDict>

const numbersNames: NumbersNames = Object.keys(numbersDict) as NumbersNames

function convertToDigit(substr: string): string {
  if (!substr || substr.length < 3) return ''
  let number = ''
  numbersNames.forEach((name) => {
    if (substr.includes(name)) {
      const replaced = substr.replace(new RegExp(name), `${numbersDict[name]}`)
      number = replaced.replace(/[^0-9]+/g, '')
    }
  })
  return number
}

function findNumbers(str: string): string {
  let first, last
  for (let i = 0; i <= str.length; i += 1) {
    first = convertToDigit(str.slice(0, i))
    if (first) {
      break
    } else if (!isNaN(parseInt(str[i]))) {
      first = str[i]
      break
    }
  }

  for (let i = str.length - 1; i >= 0; i -= 1) {
    last = convertToDigit(str.slice(i))
    if (last) {
      break
    } else if (!isNaN(parseInt(str[i]))) {
      last = str[i]
      break
    }
  }

  return `${first}${last?.slice(-1)}`
}

export default function trebuchet(filePath: PathLike): number {
  return fs
    .readFileSync(filePath, 'utf-8')
    .trim()
    .split('\n')
    .reduce((acc, el) => {
      const numbers = findNumbers(el)
      return acc + Number(numbers)
    }, 0)
}
