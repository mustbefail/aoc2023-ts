import { PathLike, readFileSync } from 'fs'

export function readInput(inputPath: PathLike): string[] {
  return readFileSync(inputPath, 'utf-8').trim().split('\n')
}
