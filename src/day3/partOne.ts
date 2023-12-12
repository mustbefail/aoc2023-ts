import { PathLike } from 'fs'
import { readInput } from '../day2'

interface NumberInfo {
  fIndex: number,
  lIndex: number,
  touch: boolean,
}

export const isSymbol = (char: string): boolean => new RegExp(/[^a-z.0-9]/).test(char)
export const isNumber = (char: string): boolean => !isNaN(parseInt(char))
const isContainsSymbols = (line: string): boolean => line ? line.split('').some(isSymbol) : false
const isNumbersInLine = (arrSlice: string[]): boolean => arrSlice.some(isNumber)

const findNumberInfo = (line: string): NumberInfo[] => {
  return line.split('').reduce((numInfo, char, charIndex, array) => {
    const currentNumber = numInfo.length - 1
    if(isNumber(char)) {
      if(!isNumber(array[charIndex - 1])) {
        numInfo[currentNumber]['fIndex'] = charIndex
        numInfo[currentNumber]['touch'] = isSymbol(array[charIndex - 1])
      }
      if(!isNumber(array[charIndex + 1])) {
        numInfo[currentNumber]['lIndex'] = charIndex
        if(!numInfo[currentNumber]['touch']) {
          numInfo[currentNumber]['touch'] = isSymbol(array[charIndex + 1])
        }
      }
    }
    if(isNumbersInLine(array.slice(charIndex)) && numInfo[currentNumber].fIndex >= 0 && numInfo[currentNumber].lIndex >= 0) {
      return [
        ...numInfo,
        {
          fIndex: -1, lIndex: -1, touch: false,
        },
      ]
    }
    return numInfo
  }, [{
    fIndex: -1, lIndex: -1, touch: false,
  }] as NumberInfo[])
}

export default function partOne(input: PathLike): number {
  const rawLines = readInput(input)
  return rawLines.map(findNumberInfo)
    .reduce((sum, line, lineIndex) => {
      const sumOfLine = line
        .filter(({ fIndex, lIndex }) => fIndex >= 0 && lIndex >= 0)
        .reduce((sum, position) => {
          const { fIndex, lIndex, touch } = position
          const number = parseInt(rawLines[lineIndex].slice(fIndex, lIndex + 1))

          if(touch) {
            return sum + number
          }

          const sliceIndexStart = fIndex > 0 ? fIndex - 1 : fIndex
          const sliceIndexEnd = lIndex + 2 ? lIndex + 2 : lIndex
          const prevLineSlice = rawLines[lineIndex - 1]?.slice(sliceIndexStart, sliceIndexEnd)
          const nextLineSlice = rawLines[lineIndex + 1]?.slice(sliceIndexStart, sliceIndexEnd)

          return [
            prevLineSlice,
            nextLineSlice,
          ].some(isContainsSymbols)
            ? sum + number
            : sum
        }, 0)

      return sumOfLine + sum
    }, 0)
}


