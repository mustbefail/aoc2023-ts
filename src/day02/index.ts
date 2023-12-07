import { PathLike, readFileSync } from 'fs'

export default function cubeConundrum(inputPath: PathLike): number {
  const res = readFileSync(inputPath, 'utf-8').trim().split('\n')
  const { game, subset } = res[0].split(':')
  console.log(res)
  return 0
}

function parseGame
