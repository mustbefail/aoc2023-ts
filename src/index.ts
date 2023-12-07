import trebuchet from './day01'

import path from 'node:path'
import { PathLike } from 'fs'
import cubeConundrum from './day02'

const ANSWERS = {
  day01: (path: PathLike) => trebuchet(path),
  day02: (path: PathLike) => cubeConundrum(path),
}

console.log(
  ANSWERS.day02(path.resolve(__dirname, 'tests/day02/mockups/records.txt')),
)
