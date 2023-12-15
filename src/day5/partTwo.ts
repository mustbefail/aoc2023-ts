import { PathLike, readFileSync } from 'fs'
import { isNumber } from '../day3/partOne'
import { getValues } from './partOne'
import { chunk } from '../utils'

interface Map {
  to: number
  from: number
  range: number
  offset: number
  sourceEnd: number
}

interface Seed {
  start: number,
  end: number,
}

interface Almanac {
  seeds: Seed[]
  seedToSoil: Map[]
  soilToFertilizer: Map[]
  fertilizerToWater: Map[]
  waterToLight: Map[]
  lightToTemperature: Map[]
  temperatureToHum: Map[]
  humToLocation: Map[]
}

function serializeMap(path: PathLike): Almanac {
  const map = readFileSync(path, 'utf-8').trim().split('\n\n')

  const parsedSeeds = map
    .slice(0, 1)[0]
    .split(' ')
    .filter(isNumber)
    .map(Number)

  const [
    seedToSoil,
    soilToFertilizer,
    fertilizerToWater,
    waterToLight,
    lightToTemperature,
    temperatureToHum,
    humToLocation,
  ] = map.slice(1).map(getValues)

  return {
    seeds: chunk(parsedSeeds).map(([seed, range]) => ({
      start: seed,
      end: seed + range - 1,
    })),
    seedToSoil,
    soilToFertilizer,
    fertilizerToWater,
    waterToLight,
    lightToTemperature,
    temperatureToHum,
    humToLocation,
  }
}

function isSeedPresent(seed: number, seedRanges: Seed[]) {
  return seedRanges.some(({
    start,
    end,
  }) => start <= seed && seed <= end)
}

function getSeedByLocation(location: number, maps: Map[][]): number {
  return [...maps]
    .reverse()
    .reduce((src, map) => getSrcByMap(src, map), location)
}

function getSrcByMap(dst: number, map: Map[]) {
  const mapEntry = map.find(
    ({
      to,
      range,
    }) =>
      dst >= to && dst <= to + range - 1,
  )

  if(!mapEntry) {
    return dst
  }

  const offset = dst - mapEntry.to
  return mapEntry.from + offset
}

export default function partTwo(path: PathLike): number {
  const {
    seeds,
    seedToSoil,
    soilToFertilizer,
    fertilizerToWater,
    waterToLight,
    lightToTemperature,
    temperatureToHum,
    humToLocation,
  } = serializeMap(path)
  const maps = [
    seedToSoil,
    soilToFertilizer,
    fertilizerToWater,
    waterToLight,
    lightToTemperature,
    temperatureToHum,
    humToLocation,
  ]
  // eslint-disable-next-line no-constant-condition
  for(let location = 0;; location += 1) {
    const seed = getSeedByLocation(location, maps)

    if(isSeedPresent(seed, seeds)) {
      return location
    }

  }
}
