/* eslint-disable @typescript-eslint/no-unused-vars */
import { Map } from './partOne'
interface Node {
  point: number[]
  value: string
  children: Node[]
}


const UP = [0, -1]
const DOWN = [0, 1]
const LEFT = [-1, 0]
const RIGHT = [1, 0]
const TOP_LEFT = [-1, -1]
const TOP_RIGHT = [1, -1]
const DOWN_LEFT = [-1, 1]
const DOWN_RIGHT = [1, 1]

const possibleMove = [UP, DOWN, LEFT, RIGHT, TOP_LEFT, TOP_RIGHT, DOWN_LEFT, DOWN_RIGHT]

function createNode(point: number[], map: Map): Node {
  const [x, y] = point
  return {
    point,
    value: map[y][x],
    children: [],
  }
}

function createTree(node: Node, map: Map, visited: Node[]) {
  const height = map.length
  const width = map[0].length
  const [x, y] = node.point
  node.children = possibleMove
    .map(([cx, cy]) => [cx + x, cy + y])
    .filter(([cx, cy]) => {
      if(cx < 0 || cx >= width || cy < 0 || cy >= height) {
        return false
      }
      return visited.findIndex(vis => vis.point[0] === cx && vis.point[1] === cy) === -1
    })
    .map((point) => {
      const newNode = createNode(point, map)
      visited.push(newNode)
      return newNode
    })
  node.children.forEach((node) => createTree(node, map, visited))
  return node
}
// Bresenham's line algorithm
function plotLineLow(x0: number, y0: number, x1: number, y1: number, result: number[][]) {
  const dx = x1 - x0
  let dy = y1 - y0
  let yi = 1
  if(dy < 0) {
    yi = -1
    dy = -dy
  }
  let D = (2 * dy) - dx
  let y = y0

  for(let x = x0; x <= x1; x++) {
    result.push([x, y])
    if(D > 0) {
      y = y + yi
      D = D + (2 * (dy - dx))
    } else {
      D = D + 2 * dy
    }
  }
}

function plotLineHigh(x0: number, y0: number, x1: number, y1: number, result: number[][]) {
  let dx = x1 - x0
  const dy = y1 - y0
  let xi = 1
  if(dx < 0) {
    xi = -1
    dx = -dx
  }
  let D = (2 * dx) - dy
  let x = x0

  for(let y = y0; y <= y1; y++) {
    result.push([x, y])
    if(D > 0) {
      x = x + xi
      D = D + (2 * (dx - dy))
    } else {
      D = D + 2 * dx
    }
  }
}
function buildLine(from: Coords, to: Coords): number[][] {
  const { x: x0, y: y0 } = from
  const { x: x1, y: y1 } = to
  const result: number[][] = []
  if(Math.abs(y1 - y0) < Math.abs(x1 - x0)) {
    if(x0 > x1) {
      plotLineLow(x1, y1, x0, y0, result)
    } else {
      plotLineLow(x0, y0, x1, y1, result)
    }
  } else {
    if(y0 > y1) {
      plotLineHigh(x1, y1, x0, y0, result)
    } else {
      plotLineHigh(x0, y0, x1, y1, result)
    }
  }
  return result
}

function findStarsCoords(galaxyMap: Map): StarsCoords[] {
  return galaxyMap.reduce<StarsCoords[]>((res, line, lineIndex) => {
    return [
      ...res,
      ...line.reduce<StarsCoords[]>((coords, el, index, array) => {
        if(array.every((c) => c === '*')) {
          return [
            ...coords,
            { line: lineIndex },
          ]
        }
        if(el === '*') {
          return [
            ...coords,
            { column: index },
          ]
        }
        return coords

      }, []),
    ]
  }, [])
}
