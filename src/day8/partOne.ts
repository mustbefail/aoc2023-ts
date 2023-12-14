import { PathLike } from 'fs'
import { readInput } from '../utils'

export interface Branch {
  [key: string]: string
}
export interface Tree {
  [key: string]: Branch
}

export function parseBranch(tree: Tree, branch: string): Tree {
  const [node, leaves] = branch.split('=')
  const [L, R] = leaves.replace(new RegExp(/\W/g), ' ').split(' ').filter(Boolean)
  return {
    ...tree,
    [node.trim()]: {
      L, R,
    },
  }
}

function findWayLength(tree: Tree, steps: string): number {
  const instructions = steps.split('')
  let stepNumber: number = 0
  let stepCount = 0
  let currentNode: string = 'AAA'

  while(currentNode !== 'ZZZ') {
    if(stepNumber > instructions.length - 1) {
      stepNumber = 0
    }
    const currentTurn = instructions[stepNumber]
    const branch = tree[currentNode]
    currentNode = branch[currentTurn]

    stepNumber += 1
    stepCount += 1
  }
  return stepCount
}

export default function partOne(input: PathLike):number {
  const [steps, ...branches] = readInput(input).filter(Boolean)
  const tree = branches.reduce<Tree>(parseBranch, {})
  return findWayLength(tree, steps)
}
