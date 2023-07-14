import alquery from '../src/index.js'

// undefined
test(`parseColumns() returns ' *'`, () => {
  const call = alquery.parseColumns()
  expect(call).toBe(' *')
})

// null
test(`parseColumns(null) returns ' *'`, () => {
  const columns = null
  const call = alquery.parseColumns(columns)
  expect(call).toBe(' *')
})

// string
test(`parseColumns('') returns ' *'`, () => {
  const columns = ''
  const call = alquery.parseColumns(columns)
  expect(call).toBe(' *')
})

test(`parseColumns('*') returns ' *'`, () => {
  const columns = '*'
  const call = alquery.parseColumns(columns)
  expect(call).toBe(' *')
})

test(`parseColumns('age') returns ' age'`, () => {
  const columns = 'age'
  const call = alquery.parseColumns(columns)
  expect(call).toBe(' age')
})

test(`parseColumns('age, name') returns ' age, name'`, () => {
  const columns = 'age, name'
  const call = alquery.parseColumns(columns)
  expect(call).toBe(' age, name')
})

// array
test(`parseColumns([]) returns ' *'`, () => {
  const columns = []
  const call = alquery.parseColumns(columns)
  expect(call).toBe(' *')
})

test(`parseColumns(['age']) returns ' age'`, () => {
  const columns = ['age']
  const call = alquery.parseColumns(columns)
  expect(call).toBe(' age')
})

test(`parseColumns(['age', 'name']) returns ' age, name'`, () => {
  const columns = ['age', 'name']
  const call = alquery.parseColumns(columns)
  expect(call).toBe(' age, name')
})

// object
test(`parseColumns({}) returns ' *'`, () => {
  const columns = {}
  const call = alquery.parseColumns(columns)
  expect(call).toBe(' *')
})

test(`parseColumns({ age: 'Member Age' }) returns ' age'`, () => {
  const columns = { age: 'Member Age' }
  const call = alquery.parseColumns(columns)
  expect(call).toBe(' age')
})

test(`parseColumns({ age: 'Member Age', name: 'Member Name' }) returns ' age, name'`, () => {
  const columns = {
    age: 'Member Age',
    name: 'Member Name'
  }
  const call = alquery.parseColumns(columns)
  expect(call).toBe(' age, name')
})
