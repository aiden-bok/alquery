import alquery from '../src/index.js'

// undefined
test("parseColumns() returns ' *'", () => {
  const call = alquery.parseColumns()
  expect(call).toBe(' *')
})

// null
test("parseColumns(null) returns ' *'", () => {
  const columns = null
  const call = alquery.parseColumns(columns)
  expect(call).toBe(' *')
})

// empty string
test("parseColumns('') returns ' *'", () => {
  const columns = ''
  const call = alquery.parseColumns(columns)
  expect(call).toBe(' *')
})

// string
test("parseColumns('*') returns ' *'", () => {
  const columns = '*'
  const call = alquery.parseColumns(columns)
  expect(call).toBe(' *')
})

test("parseColumns('age') returns ' age'", () => {
  const columns = 'age'
  const call = alquery.parseColumns(columns)
  expect(call).toBe(' age')
})

test("parseColumns('age, name') returns ' age, name'", () => {
  const columns = 'age, name'
  const call = alquery.parseColumns(columns)
  expect(call).toBe(' age, name')
})

// array
test("parseColumns([]) returns ' *'", () => {
  const columns = []
  const call = alquery.parseColumns(columns)
  expect(call).toBe(' *')
})

test("parseColumns(['age']) returns ' age'", () => {
  const columns = ['age']
  const call = alquery.parseColumns(columns)
  expect(call).toBe(' age')
})

test("parseColumns(['age', 'name']) returns ' age, name'", () => {
  const columns = ['age', 'name']
  const call = alquery.parseColumns(columns)
  expect(call).toBe(' age, name')
})

// object
test("parseColumns({}) returns ' *'", () => {
  const columns = {}
  const call = alquery.parseColumns(columns)
  expect(call).toBe(' *')
})

test("parseColumns({age: 24}) returns ' age'", () => {
  const columns = { age: 24 }
  const call = alquery.parseColumns(columns)
  expect(call).toBe(' age')
})

test("parseColumns({age: 24, name: 'Aiden'}) returns ' age, name'", () => {
  const columns = {
    age: 24,
    name: 'Aiden'
  }
  const call = alquery.parseColumns(columns)
  expect(call).toBe(' age, name')
})
