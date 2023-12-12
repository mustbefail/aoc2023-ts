import path from 'node:path'
import trebuchet from '../../day1'

describe('day1', () => {
  test('should return 142', () => {
    const filePath = path.resolve(__dirname, 'mockups/code.txt')
    expect(trebuchet(filePath)).toBe(142)
  })

  test('should return 29', () => {
    const filePath = path.resolve(__dirname, 'mockups/code_custom_check.txt')
    expect(trebuchet(filePath)).toBe(29)
  })

  test('should return 281', () => {
    const filePath = path.resolve(__dirname, 'mockups/code_part_2.txt')
    expect(trebuchet(filePath)).toBe(281)
  })
})
