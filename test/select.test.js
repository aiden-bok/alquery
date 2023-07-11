import alquery from '../src/index.js'

// table: undefined
test('select() occurs error', () => {
  const call = () => alquery.select()
  const error = new Error(
    '[parseTable] Not passed table name to be used in query statement!'
  )
  expect(call).toThrow(error)
})

// table: null
test('select(null) occurs error', () => {
  const table = null
  const call = () => alquery.select(table)
  const error = new Error(
    '[parseTable] Not passed table name to be used in query statement!'
  )
  expect(call).toThrow(error)
})

// table: empty string
test("select('') occurs error", () => {
  const table = ''
  const call = () => alquery.select(table)
  const error = new Error(
    '[parseTable] Not passed table name to be used in query statement!'
  )
  expect(call).toThrow(error)
})

// table: string
test("select('member') returns 'SELECT * FROM member'", () => {
  const table = 'member'
  const call = alquery.select(table)
  expect(call).toBe('SELECT * FROM member')
})

test("select('member, country') returns 'SELECT * FROM member, country'", () => {
  const table = 'member, country'
  const call = alquery.select(table)
  expect(call).toBe('SELECT * FROM member, country')
})

// table: array
test('select([]) occurs error', () => {
  const table = []
  const call = () => alquery.select(table)
  const error = new Error(
    '[parseTable] Table name to use in the query statement is not specified!'
  )
  expect(call).toThrow(error)
})

test("select(['member']) returns 'SELECT * FROM member'", () => {
  const table = ['member']
  const call = alquery.select(table)
  expect(call).toBe('SELECT * FROM member')
})

test("select(['member', 'country']) returns 'SELECT * FROM member, country'", () => {
  const table = ['member', 'country']
  const call = alquery.select(table)
  expect(call).toBe('SELECT * FROM member, country')
})

// table: object
test('select({}) occurs error', () => {
  const table = {}
  const call = () => alquery.select(table)
  const error = new Error(
    '[parseTable] Table name to use in the query statement is not specified!'
  )
  expect(call).toThrow(error)
})

test("select({member: 'Member table'}) returns 'SELECT * FROM member'", () => {
  const table = { member: 'Member table' }
  const call = alquery.select(table)
  expect(call).toBe('SELECT * FROM member')
})

test("select({member: 'Member table', country: 'Country table'}) returns 'SELECT * FROM member, country'", () => {
  const table = { member: 'Member table', country: 'Country table' }
  const call = alquery.select(table)
  expect(call).toBe('SELECT * FROM member, country')
})

// table: string, columns: undefined
test("select('member')(columns undefined) returns 'SELECT * FROM member'", () => {
  const table = 'member'
  const call = alquery.select(table)
  expect(call).toBe('SELECT * FROM member')
})

// table: string, columns: null
test("select('member', null) returns 'SELECT * FROM member'", () => {
  const table = 'member'
  const columns = null
  const call = alquery.select(table, columns)
  expect(call).toBe('SELECT * FROM member')
})

// table: string, columns: empty string
test("select('member', '') returns 'SELECT * FROM member'", () => {
  const table = 'member'
  const columns = ''
  const call = alquery.select(table, columns)
  expect(call).toBe('SELECT * FROM member')
})

// table: string, columns: string
test("select('member', '*') returns 'SELECT * FROM member'", () => {
  const table = 'member'
  const columns = '*'
  const call = alquery.select(table, columns)
  expect(call).toBe('SELECT * FROM member')
})

test("select('member', 'age') returns 'SELECT age FROM member'", () => {
  const table = 'member'
  const columns = 'age'
  const call = alquery.select(table, columns)
  expect(call).toBe('SELECT age FROM member')
})

test("select('member', 'age, name') returns 'SELECT age, name FROM member'", () => {
  const table = 'member'
  const columns = 'age, name'
  const call = alquery.select(table, columns)
  expect(call).toBe('SELECT age, name FROM member')
})

// table: string, columns: array
test("select('member', []) returns 'SELECT * FROM member'", () => {
  const table = 'member'
  const columns = []
  const call = alquery.select(table, columns)
  expect(call).toBe('SELECT * FROM member')
})

test("select('member', ['age']) returns 'SELECT age FROM member'", () => {
  const table = 'member'
  const columns = ['age']
  const call = alquery.select(table, columns)
  expect(call).toBe('SELECT age FROM member')
})

test("select('member', ['age', 'name']) returns 'SELECT age, name FROM member'", () => {
  const table = 'member'
  const columns = ['age', 'name']
  const call = alquery.select(table, columns)
  expect(call).toBe('SELECT age, name FROM member')
})

// table: string, columns: object
test("select('member', {}) returns 'SELECT * FROM member'", () => {
  const table = 'member'
  const columns = {}
  const call = alquery.select(table, columns)
  expect(call).toBe('SELECT * FROM member')
})

test("select('member', { age: 24 }) returns 'SELECT age FROM member'", () => {
  const table = 'member'
  const columns = { age: 24 }
  const call = alquery.select(table, columns)
  expect(call).toBe('SELECT age FROM member')
})

test("select('member', { age: 24, name: 'Aiden'}) returns 'SELECT age, name FROM member'", () => {
  const table = 'member'
  const columns = { age: 24, name: 'Aiden' }
  const call = alquery.select(table, columns)
  expect(call).toBe('SELECT age, name FROM member')
})
