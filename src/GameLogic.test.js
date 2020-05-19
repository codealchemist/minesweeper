import game from 'GameLogic'

describe('GameLogic', () => {
  const rows = 5
  const cols = 5
  const totalMines = 5

  it('should set board', () => {
    game.setBoard(rows, cols)
    expect(game.rows).toEqual(rows)
    expect(game.cols).toEqual(cols)
  })

  describe('hasUp', () => {
    it('should return false', () => {
      expect(game.hasUp(0)).toBe(false)
      expect(game.hasUp(1)).toBe(false)
      expect(game.hasUp(2)).toBe(false)
      expect(game.hasUp(3)).toBe(false)
      expect(game.hasUp(4)).toBe(false)
    })

    it('should return true', () => {
      expect(game.hasUp(5)).toBe(true)
      expect(game.hasUp(12)).toBe(true)
      expect(game.hasUp(24)).toBe(true)
    })
  })

  describe('hasDown', () => {
    it('should return false', () => {
      expect(game.hasDown(20)).toBe(false)
      expect(game.hasDown(21)).toBe(false)
      expect(game.hasDown(22)).toBe(false)
      expect(game.hasDown(23)).toBe(false)
      expect(game.hasDown(24)).toBe(false)
    })

    it('should return true', () => {
      expect(game.hasDown(0)).toBe(true)
      expect(game.hasDown(10)).toBe(true)
      expect(game.hasDown(18)).toBe(true)
    })
  })

  describe('hasLeft', () => {
    it('should return false', () => {
      expect(game.hasLeft(0)).toBe(false)
      expect(game.hasLeft(5)).toBe(false)
      expect(game.hasLeft(10)).toBe(false)
      expect(game.hasLeft(15)).toBe(false)
      expect(game.hasLeft(20)).toBe(false)
    })

    it('should return true', () => {
      expect(game.hasLeft(1)).toBe(true)
      expect(game.hasLeft(13)).toBe(true)
      expect(game.hasLeft(24)).toBe(true)
    })
  })

  describe('hasRight', () => {
    it('should return false', () => {
      expect(game.hasRight(4)).toBe(false)
      expect(game.hasRight(9)).toBe(false)
      expect(game.hasRight(14)).toBe(false)
      expect(game.hasRight(19)).toBe(false)
      expect(game.hasRight(24)).toBe(false)
    })

    it('should return true', () => {
      expect(game.hasRight(0)).toBe(true)
      expect(game.hasRight(12)).toBe(true)
      expect(game.hasRight(23)).toBe(true)
    })
  })
})
