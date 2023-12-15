import { argv } from 'process'
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

function initDay() {
  const daysNumbers = argv.slice(2).map((input) => Number(input)).filter(Boolean)

  Promise.all(daysNumbers.map(addCodeFiles)).catch((e) => {
    throw new Error(e)
  })
}

async function addCodeFiles(dayNumber: number) {
  if(dayNumber < 26) {
    const folderPath = path.resolve(__dirname, `../src/day${dayNumber}/`)
    const testsPath = path.resolve(__dirname, `../src/tests/day${dayNumber}/`)
    const mockupsPath = path.resolve(__dirname, `../src/tests/day${dayNumber}/mockups/`)
    const {
      day,
      partOne,
      partTwo,
      test,
    } = await readScratches(dayNumber)
    try {
      await mkdir(folderPath, { recursive: true })
      await writeFile(`${folderPath}/index.ts`, day).catch((e) => console.error(e))
      await writeFile(`${folderPath}/partOne.ts`, partOne).catch((e) => console.error(e))
      await writeFile(`${folderPath}/partTwo.ts`, partTwo).catch((e) => console.error(e))
      await writeFile(`${folderPath}/day${dayNumber}Input.txt`, '').catch((e) => console.error(e))

      await mkdir(testsPath, { recursive: true })
      await writeFile(`${testsPath}/day${dayNumber}.test.ts`, test).catch((e) => console.error(e))
      await mkdir(mockupsPath, { recursive: true })
      await writeFile(`${mockupsPath}/input.txt`, '').catch((e) => console.error(e))
    } catch (e) {
      throw new Error(e as string)
    }
  } else {
    console.error(`dayNumber must be in range of 1 to 25, you input ${dayNumber}`)
  }
}

async function readScratches(dayNumber: number) {
  const filesNames = await readdir(path.resolve(__dirname, './scratches'))
  const [
    day,
    partOne,
    partTwo,
    test,
  ] = await Promise.all(filesNames.map(async (fileName) => {
    try {
      const fileData = await readFile(path.resolve(__dirname, './scratches/', fileName), 'utf-8')
      return fileData.replace(new RegExp(/{dayNumber}/, 'g'), dayNumber.toString())
    } catch (e) {
      throw new Error(e as string)
    }
  }))
  return {
    day: day || '',
    partOne: partOne || '',
    partTwo: partTwo || '',
    test: test || '',
  }
}

try {
  initDay()
} catch (e) {
  console.error(e)
}
