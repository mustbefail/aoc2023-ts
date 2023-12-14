import { PathLike } from 'fs'
import { argv } from 'process'
import trebuchet from './day1'
import * as day2 from './day2'
import * as day3 from './day3'
import * as day4 from './day4'
import * as day5 from './day5'
import * as day6 from './day6'
import * as day7 from './day7'
import * as day8 from './day8'
import { inputs } from './inputs'

type Day =
  | 'day1'
  | 'day2'
  | 'day3'
  | 'day4'
  | 'day5'
  | 'day6'
  | 'day7'
  | 'day8'
  | 'day9'
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

interface Answer {
  partOne: number,
  partTwo: number
}

const ANSWERS = {
  day1: [() => `missed`, (path: PathLike) => trebuchet(path)],
  day2: [(path: PathLike) => day2.partOne(path), (path: PathLike) => day2.partTwo(path)],
  day3: [(path: PathLike) => day3.partOne(path), (path: PathLike) => day3.partTwo(path)],
  day4: [(path: PathLike) => day4.partOne(path), (path: PathLike) => day4.partTwo(path)],
  day5: [(path: PathLike) => day5.partOne(path), (path: PathLike) => day5.partTwo(path)],
  day6: [(path: PathLike) => day6.partOne(path), (path: PathLike) => day6.partTwo(path)],
  day7: [(path: PathLike) => day7.partOne(path), (path: PathLike) => day7.partTwo(path)],
  day8: [(path: PathLike) => day8.partOne(path), (path: PathLike) => day8.partTwo(path)],
}

// eslint-disable-next-line
function getDayAnswer(dayNumber: number): Answer {
  if(isNaN(dayNumber) || dayNumber > 25) {
    throw new Error(`Invalid day number: ${dayNumber}`)
  }

  const day = `day${dayNumber}` as Day


  const inputPath = inputs[day]

  // @ts-expect-error wait while it well be 25
  const answerFunc = ANSWERS[day]

  return {
    partOne: answerFunc[0](inputPath),
    partTwo: answerFunc[1](inputPath),
  }
}

const days: Day[] = argv.slice(2) as Day[]

try {
  days
    .map((day) => getDayAnswer(parseInt(day)))
    .forEach(({
      partOne,
      partTwo,
      // eslint-disable-next-line no-console
    }, index) => console.log(`day ${index + 1} | part one: ${partOne}, part two: ${partTwo}`))
} catch (e) {
  console.error(e)
}
