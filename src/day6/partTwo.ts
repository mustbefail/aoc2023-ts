import { PathLike } from 'fs'
import { readInput } from '../utils'
import { Race } from './partOne'

function getNumber(line: string): number {
  return Number(line.split(':')[1].trim().split(' ').filter(Boolean).join(''))
}

function getRace(time: number, record: number): Race {
  return {
    time,
    distRecord: record,
  }
}

export default function partTwo(input: PathLike): number {
  const [
    time,
    record,
  ] = readInput(input).map(getNumber)
  const race = getRace(time, record)
  const results = new Array(Math.floor(race.time / 2)).fill(1).map((x, idx) => x + idx).filter((holdValue) => {
    return holdValue < race.time && holdValue * (race.time - holdValue) > race.distRecord
  })
  return results.length * 2
}
