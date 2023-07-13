import alquery from '../src/index.js'

// undefined
test(`parseLimit() returns ''`, () => {
  const call = alquery.parseLimit()
  expect(call).toBe('')
})

// null
test(`parseLimit(null) returns ''`, () => {
  const limit = null
  const call = alquery.parseLimit(limit)
  expect(call).toBe('')
})

// string
test(`parseLimit('') returns ''`, () => {
  const limit = ''
  const call = alquery.parseLimit(limit)
  expect(call).toBe('')
})

test(`parseLimit('age') returns ''`, () => {
  const limit = 'age'
  const call = alquery.parseLimit(limit)
  expect(call).toBe('')
})

test(`parseLimit('5') returns ' LIMIT 5'`, () => {
  const limit = '5'
  const call = alquery.parseLimit(limit)
  expect(call).toBe(' LIMIT 5')
})

test(`parseLimit('-5') returns ''`, () => {
  const limit = '-5'
  const call = alquery.parseLimit(limit)
  expect(call).toBe('')
})

// number
test(`parseLimit(0) returns ''`, () => {
  const limit = 0
  const call = alquery.parseLimit(limit)
  expect(call).toBe('')
})

test(`parseLimit(5) returns ' LIMIT 5'`, () => {
  const limit = 5
  const call = alquery.parseLimit(limit)
  expect(call).toBe(' LIMIT 5')
})

test(`parseLimit(-5) returns ''`, () => {
  const limit = -5
  const call = alquery.parseLimit(limit)
  expect(call).toBe('')
})
