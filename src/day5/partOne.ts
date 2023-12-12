import { PathLike, readFileSync } from 'fs'
import { isNumber } from '../day3/partOne'


interface Map {
  to: number
  from: number
  range: number
  offset: number
  sourceEnd: number
}

interface Almanac {
  seeds: number[]
  seedToSoil: Map[]
  soilToFertilizer: Map[]
  fertilizerToWater: Map[]
  waterToLight: Map[]
  lightToTemperature: Map[]
  temperatureToHum: Map[]
  humToLocation: Map[]
}

function serializeValues(string: string): Map {
  const [
    to,
    from,
    range,
  ] = string.split(' ').map(Number)
  return {
    to,
    from,
    range,
    offset: to - from,
    sourceEnd: from + range - 1,
  }
}

export function getValues(string: string): Map[] {
  const [
    , ...values
  ] = string.split('\n')
  return [...values.map(serializeValues) ].sort((a, b) => a.from - b.from)
}

function serializeMap(path: PathLike): Almanac {
  const [
    seeds,
    seedToSoil,
    soilToFertilizer,
    fertilizerToWater,
    waterToLight,
    lightToTemp,
    tempToHum,
    humToLocation,
  ] = readFileSync(path, 'utf-8').trim().split('\n\n')

  const parsedSeeds = seeds.split(' ').filter(isNumber).map(Number)
  return {
    seeds: parsedSeeds,
    seedToSoil: getValues(seedToSoil),
    soilToFertilizer: getValues(soilToFertilizer),
    fertilizerToWater: getValues(fertilizerToWater),
    waterToLight: getValues(waterToLight),
    lightToTemperature: getValues(lightToTemp),
    temperatureToHum: getValues(tempToHum),
    humToLocation: getValues(humToLocation),
  } as Almanac
}

export function isOutOfRange(number: number, rangeStart: number, rangeEnd: number) {
  return number < rangeStart || number > rangeEnd
}

export function convert(number: number, maps: Map[]): number {
  return maps.reduce((value, map) => {
    const {
      to,
      from,
      range,
      sourceEnd,
    } = map
    if(isOutOfRange(number, from, sourceEnd)) {
      if(value > 0) {
        return value
      } else {
        return number
      }
    }
    return (range - 1 - (sourceEnd - number) + to)
  }, -1)
}

export default function partOne(path: PathLike): number {
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
  const locations = seeds
    .map((seed) => convert(seed, seedToSoil))
    .map((soil) => convert(soil, soilToFertilizer))
    .map((fertilizer) => convert(fertilizer, fertilizerToWater))
    .map((water) => convert(water, waterToLight))
    .map((light) => convert(light, lightToTemperature))
    .map((temp) => convert(temp, temperatureToHum))
    .map((hum) => convert(hum, humToLocation))

  return Math.min(...locations)
}
