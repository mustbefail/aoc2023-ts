import { PathLike } from 'fs'
import { readInput } from '../utils'

export interface Race {
  time: number
  distRecord: number
}

export function getNumbers(line: string): number[] {
  return line.split(':')[1].trim().split(' ').map((e) => Number(e)).filter(Boolean)
}

export function getRaces(times: number[], records: number[]): Race[] {
  return times.reduce<Race[]>((record, time:number, index:number) => {
    return [
      ...record,
      {
        time, distRecord: records[index],
      },
    ]
  }, [])
}

export default function partOne(input: PathLike): number {
  const [
    raceTimes,
    raceRecords,
  ] = readInput(input).map(getNumbers)

  const races: Race[] = getRaces(raceTimes, raceRecords)
  const results = races.reduce<number[][]>((res, race) => {
    return [
      ...res,
      new Array(Math.ceil(race.time)).fill(1).map((x, idx) => x + idx).filter((holdValue) => {
        return holdValue < race.time && holdValue * ( race.time - holdValue ) > race.distRecord
      }

      ),
    ]
  }, [])

  return results.reduce<number>((multiply, race) => {
    return multiply * race.length
  }, 1)
}

