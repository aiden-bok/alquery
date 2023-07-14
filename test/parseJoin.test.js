import alquery from '../src/index.js'

// type: undefined
test(`parseJoin() returns ''`, () => {
  const call = alquery.parseJoin()
  expect(call).toBe('')
})

// type: null
test(`parseJoin(null) returns ''`, () => {
  const type = null
  const call = alquery.parseJoin(type)
  expect(call).toBe('')
})

// type: null, table: string
test(`parseJoin(null, '') returns ''`, () => {
  const type = null
  const table = ''
  const call = alquery.parseJoin(type, table)
  expect(call).toBe('')
})

test(`parseJoin(null, 'country') returns ' JOIN country'`, () => {
  const type = null
  const table = 'country'
  const call = alquery.parseJoin(type, table)
  expect(call).toBe(' JOIN country')
})

test(`parseJoin(null, 'country, market') returns ' JOIN country, market'`, () => {
  const type = null
  const table = 'country, market'
  const call = alquery.parseJoin(type, table)
  expect(call).toBe(' JOIN country, market')
})

// type: null, table: array
test(`parseJoin(null, []) returns ''`, () => {
  const type = null
  const table = []
  const call = alquery.parseJoin(type, table)
  expect(call).toBe('')
})

test(`parseJoin(null, ['country']) returns ' JOIN country'`, () => {
  const type = null
  const table = ['country']
  const call = alquery.parseJoin(type, table)
  expect(call).toBe(' JOIN country')
})

test(`parseJoin(null, ['country', 'market']) returns ' JOIN country, market'`, () => {
  const type = null
  const table = ['country', 'market']
  const call = alquery.parseJoin(type, table)
  expect(call).toBe(' JOIN country, market')
})

// type: null, table: object
test(`parseJoin(null, {}) returns ''`, () => {
  const type = null
  const table = {}
  const call = alquery.parseJoin(type, table)
  expect(call).toBe('')
})

// type: string
test(`parseJoin('') returns ''`, () => {
  const type = ''
  const call = alquery.parseJoin(type)
  expect(call).toBe('')
})

test(`parseJoin('INNER') returns ''`, () => {
  const type = 'INNER'
  const call = alquery.parseJoin(type)
  expect(call).toBe('')
})

test(`parseJoin('CROSS') returns ''`, () => {
  const type = 'CROSS'
  const call = alquery.parseJoin(type)
  expect(call).toBe('')
})

// type: string, table: null
test(`parseJoin('INNER', null) returns ''`, () => {
  const type = 'INNER'
  const table = null
  const call = alquery.parseJoin(type, table)
  expect(call).toBe('')
})

// type: string, table: string
test(`parseJoin('', '') returns ''`, () => {
  const type = ''
  const table = ''
  const call = alquery.parseJoin(type, table)
  expect(call).toBe('')
})

test(`parseJoin('', 'country') returns ' JOIN country'`, () => {
  const type = ''
  const table = 'country'
  const call = alquery.parseJoin(type, table)
  expect(call).toBe(' JOIN country')
})

test(`parseJoin('', 'country, market') returns ' JOIN country, market'`, () => {
  const type = ''
  const table = 'country, market'
  const call = alquery.parseJoin(type, table)
  expect(call).toBe(' JOIN country, market')
})

test(`parseJoin('INNER', '') returns ''`, () => {
  const type = 'INNER'
  const table = ''
  const call = alquery.parseJoin(type, table)
  expect(call).toBe('')
})

test(`parseJoin('INNER', 'country') returns ' INNER JOIN country'`, () => {
  const type = 'INNER'
  const table = 'country'
  const call = alquery.parseJoin(type, table)
  expect(call).toBe(' INNER JOIN country')
})

// type: string, table: array
test(`parseJoin('', []) returns ''`, () => {
  const type = ''
  const table = []
  const call = alquery.parseJoin(type, table)
  expect(call).toBe('')
})

test(`parseJoin('', ['country']) returns ' JOIN country'`, () => {
  const type = ''
  const table = ['country']
  const call = alquery.parseJoin(type, table)
  expect(call).toBe(' JOIN country')
})

test(`parseJoin('', ['country', 'market']) returns ' JOIN country, market'`, () => {
  const type = ''
  const table = ['country', 'market']
  const call = alquery.parseJoin(type, table)
  expect(call).toBe(' JOIN country, market')
})

test(`parseJoin('INNER', []) returns ''`, () => {
  const type = 'INNER'
  const table = []
  const call = alquery.parseJoin(type, table)
  expect(call).toBe('')
})

test(`parseJoin('INNER', ['country']) returns ' INNER JOIN country'`, () => {
  const type = 'INNER'
  const table = ['country']
  const call = alquery.parseJoin(type, table)
  expect(call).toBe(' INNER JOIN country')
})

// type: string, table: object
test(`parseJoin('', {}) returns ''`, () => {
  const type = ''
  const table = {}
  const call = alquery.parseJoin(type, table)
  expect(call).toBe('')
})

test(`parseJoin('', { country: 'Country Table' }) returns ''`, () => {
  const type = ''
  const table = { country: 'Country Table' }
  const call = alquery.parseJoin(type, table)
  expect(call).toBe('')
})

// type: string, table: string, on: null
test(`parseJoin('', '', null) returns ''`, () => {
  const type = ''
  const table = ''
  const on = null
  const call = alquery.parseJoin(type, table, on)
  expect(call).toBe('')
})

test(`parseJoin('INNER', '', null) returns ''`, () => {
  const type = 'INNER'
  const table = ''
  const on = null
  const call = alquery.parseJoin(type, table, on)
  expect(call).toBe('')
})

test(`parseJoin('', 'country', null) returns ' JOIN country'`, () => {
  const type = ''
  const table = 'country'
  const on = null
  const call = alquery.parseJoin(type, table, on)
  expect(call).toBe(' JOIN country')
})

test(`parseJoin('INNER', 'country', null) returns ' INNER JOIN country'`, () => {
  const type = 'INNER'
  const table = 'country'
  const on = null
  const call = alquery.parseJoin(type, table, on)
  expect(call).toBe(' INNER JOIN country')
})

// type: string, table: array, on: null
test(`parseJoin('', [], null) returns ''`, () => {
  const type = ''
  const table = []
  const on = null
  const call = alquery.parseJoin(type, table, on)
  expect(call).toBe('')
})

test(`parseJoin('INNER', [], null) returns ''`, () => {
  const type = 'INNER'
  const table = []
  const on = null
  const call = alquery.parseJoin(type, table, on)
  expect(call).toBe('')
})

test(`parseJoin('', ['country'], null) returns ' JOIN country'`, () => {
  const type = ''
  const table = ['country']
  const on = null
  const call = alquery.parseJoin(type, table, on)
  expect(call).toBe(' JOIN country')
})

test(`parseJoin('INNER', ['country'], null) returns ' INNER JOIN country'`, () => {
  const type = 'INNER'
  const table = ['country']
  const on = null
  const call = alquery.parseJoin(type, table, on)
  expect(call).toBe(' INNER JOIN country')
})

// type: string, table: string, on: string
test(`parseJoin('', '', '') returns ''`, () => {
  const type = ''
  const table = ''
  const on = ''
  const call = alquery.parseJoin(type, table, on)
  expect(call).toBe('')
})

test(`parseJoin('INNER', '', '') returns ''`, () => {
  const type = 'INNER'
  const table = ''
  const on = ''
  const call = alquery.parseJoin(type, table, on)
  expect(call).toBe('')
})

test(`parseJoin('', 'country', '') returns ' JOIN country'`, () => {
  const type = ''
  const table = 'country'
  const on = ''
  const call = alquery.parseJoin(type, table, on)
  expect(call).toBe(' JOIN country')
})

test(`parseJoin('INNER', 'country', '') returns ' INNER JOIN country'`, () => {
  const type = 'INNER'
  const table = 'country'
  const on = ''
  const call = alquery.parseJoin(type, table, on)
  expect(call).toBe(' INNER JOIN country')
})

test(`parseJoin('', 'country', 'member.countryIdx = country.idx') returns ' JOIN country ON member.countryIdx = country.idx'`, () => {
  const type = ''
  const table = 'country'
  const on = 'member.countryIdx = country.idx'
  const call = alquery.parseJoin(type, table, on)
  expect(call).toBe(' JOIN country ON member.countryIdx = country.idx')
})

test(`parseJoin('INNER', 'country', 'member.countryIdx = country.idx') returns ' INNER JOIN country ON member.countryIdx = country.idx'`, () => {
  const type = 'INNER'
  const table = 'country'
  const on = 'member.countryIdx = country.idx'
  const call = alquery.parseJoin(type, table, on)
  expect(call).toBe(' INNER JOIN country ON member.countryIdx = country.idx')
})

// type: string, table: array, on: string
test(`parseJoin('', [], '') returns ''`, () => {
  const type = ''
  const table = []
  const on = ''
  const call = alquery.parseJoin(type, table, on)
  expect(call).toBe('')
})

test(`parseJoin('INNER', [], '') returns ''`, () => {
  const type = 'INNER'
  const table = []
  const on = ''
  const call = alquery.parseJoin(type, table, on)
  expect(call).toBe('')
})

test(`parseJoin('', ['country'], '') returns ' JOIN country'`, () => {
  const type = ''
  const table = ['country']
  const on = ''
  const call = alquery.parseJoin(type, table, on)
  expect(call).toBe(' JOIN country')
})

test(`parseJoin('INNER', ['country'], '') returns ' INNER JOIN country'`, () => {
  const type = 'INNER'
  const table = ['country']
  const on = ''
  const call = alquery.parseJoin(type, table, on)
  expect(call).toBe(' INNER JOIN country')
})

test(`parseJoin('', ['country'], 'member.countryIdx = country.idx') returns ' JOIN country ON member.countryIdx = country.idx'`, () => {
  const type = ''
  const table = ['country']
  const on = 'member.countryIdx = country.idx'
  const call = alquery.parseJoin(type, table, on)
  expect(call).toBe(' JOIN country ON member.countryIdx = country.idx')
})

test(`parseJoin('INNER', ['country'], 'member.countryIdx = country.idx') returns ' INNER JOIN country ON member.countryIdx = country.idx'`, () => {
  const type = 'INNER'
  const table = ['country']
  const on = 'member.countryIdx = country.idx'
  const call = alquery.parseJoin(type, table, on)
  expect(call).toBe(' INNER JOIN country ON member.countryIdx = country.idx')
})

test(`parseJoin('CROSS', ['country'], 'member.countryIdx = country.idx') returns ' CROSS JOIN country'`, () => {
  const type = 'CROSS'
  const table = ['country']
  const on = 'member.countryIdx = country.idx'
  const call = alquery.parseJoin(type, table, on)
  expect(call).toBe(' CROSS JOIN country')
})
