import { PathLike } from 'fs'
import trebuchet from './day01'
import { partOne, partTwo } from './day02'
import { inputs } from './inputs'

type Day =
  | 'day01'
  | 'day02'
  | 'day03'
  | 'day04'
  | 'day05'
  | 'day06'
  | 'day07'
  | 'day08'
  | 'day09'
  | 'day10'
  | 'day11'
  | 'day12'
  | 'day13'
  | 'day14'
  | 'day15'
  | 'day16'
  | 'day17'
  | 'day18'
  | 'day19'
  | 'day20'
  | 'day21'
  | 'day22'
  | 'day23'
  | 'day24'
  | 'day25'

const ANSWERS = {
  day01: (path: PathLike) => trebuchet(path),
  day02: [(path: PathLike) => partOne(path), (path: PathLike) => partTwo(path)],
}
// eslint-disable-next-line
function getDayAnswer(day: Day): number {
  const inputPath = inputs[day]

  // @ts-expect-error wait while it well be 25
  const answerFunc = ANSWERS[day]

  return Array.isArray(answerFunc)
    ? {
        partOne: answerFunc[0](inputPath),
        partTwo: answerFunc[1](inputPath),
      }
    : answerFunc(inputPath)
}

// console.log(getDayAnswer('day01'))
// console.log(getDayAnswer('day02'))
