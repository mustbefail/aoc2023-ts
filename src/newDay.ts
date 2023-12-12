// write script to create new day

import { argv } from 'process'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

function initDay() {
  const daysNumbers = argv.slice(2).map((input) => Number(input)).filter(Boolean)

  Promise.all(daysNumbers.map(addCodeFiles)).catch((e) => {throw new Error(e)})
}

function addCodeFiles(dayNumber: number) {
  if(dayNumber < 26) {
    const folderPath = path.resolve(__dirname, `./day${dayNumber}/`)
    const testsPath = path.resolve(__dirname, `./tests/day${dayNumber}/`)
    const mockupsPath = path.resolve(__dirname, `./tests/day${dayNumber}/mockups/`)
    mkdir(folderPath, { recursive: true }).then(() => {
      writeFile(`${folderPath}/index.ts`, '').catch((e) => console.error(e))
      writeFile(`${folderPath}/partOne.ts`, '').catch((e) => console.error(e))
      writeFile(`${folderPath}/partTwo.ts`, '').catch((e) => console.error(e))
      writeFile(`${folderPath}/dayInput${dayNumber}.txt`, '').catch((e) => console.error(e))
    }).catch((e) => console.error(e))
    mkdir(testsPath, { recursive: true }).then(() => {
      writeFile(`${testsPath}/day${dayNumber}.test.ts`, '').catch((e) => console.error(e))
    }).catch((e) => console.error(e))
    mkdir(mockupsPath, { recursive: true }).then(() => {
      writeFile(`${mockupsPath}/input.txt`, '',).catch((e) => console.error(e))
    }).catch((e) => console.error(e))
  } else {
    console.error(`dayNumber must be in range of 1 to 25, you input ${dayNumber}`)
  }
}

try {
  initDay()
} catch (e) {
  console.error(e)
}