import path from 'node:path'

const buildPath = (relativePath: string): string =>
  path.resolve(__dirname, relativePath)

export const inputs = {
  day1: buildPath('./day1/day1Input.txt'),
  day2: buildPath('./day2/day2Input.txt'),
  day3: buildPath('./day3/day3Input.txt'),
  day4: buildPath('./day4/day4Input.txt'),
  day5: buildPath('./day5/day5Input.txt'),
  day6: buildPath('./day06/day06Input.txt'),
  day7: buildPath('./day07/day07Input.txt'),
  day8: buildPath('./day08/day08Input.txt'),
  day9: buildPath('./day09/day09Input.txt'),
  day10: buildPath('./day10/day10Input.txt'),
  day11: buildPath('./day11/day11Input.txt'),
  day12: buildPath('./day12/day12Input.txt'),
  day13: buildPath('./day13/day13Input.txt'),
  day14: buildPath('./day14/day14Input.txt'),
  day15: buildPath('./day15/day15Input.txt'),
  day16: buildPath('./day16/day16Input.txt'),
  day17: buildPath('./day17/day17Input.txt'),
  day18: buildPath('./day18/day18Input.txt'),
  day19: buildPath('./day19/day19Input.txt'),
  day20: buildPath('./day20/day20Input.txt'),
  day21: buildPath('./day21/day21Input.txt'),
  day22: buildPath('./day22/day22Input.txt'),
  day23: buildPath('./day23/day23Input.txt'),
  day24: buildPath('./day24/day24Input.txt'),
  day25: buildPath('./day25/day25Input.txt'),
}
