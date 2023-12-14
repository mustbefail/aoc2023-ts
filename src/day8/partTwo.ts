import { PathLike } from 'fs'
import { readInput } from '../utils'
import { parseBranch, Tree } from './partOne'

function findWaysLength(tree: Tree, steps: string): number[] {
  const instructions = steps.split('')
  const startNodes: string[] = Object.keys(tree).filter((key) => key.endsWith('A'))
  return startNodes.map((node) => {
    let stepNumber: number = 0
    let stepCount: number = 0
    let currentNode = node
    while(!currentNode.endsWith('Z')) {
      if(stepNumber > instructions.length - 1) {
        stepNumber = 0
      }
      const branch = tree[currentNode]
      currentNode = branch[instructions[stepNumber]]

      stepNumber += 1
      stepCount += 1
    }
    return stepCount
  })
}

function lcm(array: number[]): number {
  return array.reduce((acc, number) => (acc * number) / gcd(acc, number));
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

export default function partTwo(input: PathLike):number {
  const [steps, ...branches] = readInput(input).filter(Boolean)
  const tree = branches.reduce<Tree>(parseBranch, {})
  const res = findWaysLength(tree, steps)
  return lcm(res)
}
