import alquery from '../src/index.js'

// table: undefined
test('querySelect() occurs error', () => {
  const call = () => alquery.querySelect()
  const error = new Error(
    '[parseTable] Not passed table name to be used in query statement!'
  )
  expect(call).toThrow(error)
})

// table: null
test('querySelect(null) occurs error', () => {
  const table = null
  const call = () => alquery.querySelect(table)
  const error = new Error(
    '[parseTable] Not passed table name to be used in query statement!'
  )
  expect(call).toThrow(error)
})

// table: empty string
test("querySelect('') occurs error", () => {
  const table = ''
  const call = () => alquery.querySelect(table)
  const error = new Error(
    '[parseTable] Not passed table name to be used in query statement!'
  )
  expect(call).toThrow(error)
})

// table: string
test("querySelect('member') returns 'SELECT * FROM member'", () => {
  const table = 'member'
  const call = alquery.querySelect(table)
  expect(call).toBe('SELECT * FROM member')
})

// table: array
test('querySelect([]) occurs error', () => {
  const table = []
  const call = () => alquery.querySelect(table)
  const error = new Error(
    '[parseTable] Table name to use in the query statement is not specified!'
  )
  expect(call).toThrow(error)
})

test("querySelect(['member']) returns 'SELECT * FROM member'", () => {
  const table = ['member']
  const call = alquery.querySelect(table)
  expect(call).toBe('SELECT * FROM member')
})

// table: object
test('querySelect({}) occurs error', () => {
  const table = {}
  const call = () => alquery.querySelect(table)
  const error = new Error(
    '[parseTable] Table name to use in the query statement is not specified!'
  )
  expect(call).toThrow(error)
})

test("querySelect({member: 'Member table'}) returns 'SELECT * FROM member'", () => {
  const table = { member: 'Member table' }
  const call = alquery.querySelect(table)
  expect(call).toBe('SELECT * FROM member')
})

test("querySelect({member: 'Member table', country: 'Country table'}) returns 'SELECT * FROM member, country'", () => {
  const table = { member: 'Member table', country: 'Country table' }
  const call = alquery.querySelect(table)
  expect(call).toBe('SELECT * FROM member, country')
})

// table: string, columns: undefined
test("querySelect('member')(columns undefined) returns 'SELECT * FROM member'", () => {
  const table = 'member'
  const call = alquery.querySelect(table)
  expect(call).toBe('SELECT * FROM member')
})

// table: string, columns: null
test("querySelect('member', null) returns 'SELECT * FROM member'", () => {
  const table = 'member'
  const columns = null
  const call = alquery.querySelect(table, columns)
  expect(call).toBe('SELECT * FROM member')
})

// table: string, columns: empty string
test("querySelect('member', '') returns 'SELECT * FROM member'", () => {
  const table = 'member'
  const columns = ''
  const call = alquery.querySelect(table, columns)
  expect(call).toBe('SELECT * FROM member')
})

// table: string, columns: string
test("querySelect('member', '*') returns 'SELECT * FROM member'", () => {
  const table = 'member'
  const columns = '*'
  const call = alquery.querySelect(table, columns)
  expect(call).toBe('SELECT * FROM member')
})

test("querySelect('member', 'age') returns 'SELECT age FROM member'", () => {
  const table = 'member'
  const columns = 'age'
  const call = alquery.querySelect(table, columns)
  expect(call).toBe('SELECT age FROM member')
})

test("querySelect('member', 'age, name') returns 'SELECT age, name FROM member'", () => {
  const table = 'member'
  const columns = 'age, name'
  const call = alquery.querySelect(table, columns)
  expect(call).toBe('SELECT age, name FROM member')
})

// table: string, columns: array
test("querySelect('member', []) returns 'SELECT * FROM member'", () => {
  const table = 'member'
  const columns = []
  const call = alquery.querySelect(table, columns)
  expect(call).toBe('SELECT * FROM member')
})

test("querySelect('member', ['age']) returns 'SELECT age FROM member'", () => {
  const table = 'member'
  const columns = ['age']
  const call = alquery.querySelect(table, columns)
  expect(call).toBe('SELECT age FROM member')
})

test("querySelect('member', ['age', 'name']) returns 'SELECT age, name FROM member'", () => {
  const table = 'member'
  const columns = ['age', 'name']
  const call = alquery.querySelect(table, columns)
  expect(call).toBe('SELECT age, name FROM member')
})

// table: string, columns: object
test("querySelect('member', {}) returns 'SELECT * FROM member'", () => {
  const table = 'member'
  const columns = {}
  const call = alquery.querySelect(table, columns)
  expect(call).toBe('SELECT * FROM member')
})

test("querySelect('member', { age: 24 }) returns 'SELECT age FROM member'", () => {
  const table = 'member'
  const columns = { age: 24 }
  const call = alquery.querySelect(table, columns)
  expect(call).toBe('SELECT age FROM member')
})

test("querySelect('member', { age: 24, name: 'Aiden'}) returns 'SELECT age, name FROM member'", () => {
  const table = 'member'
  const columns = { age: 24, name: 'Aiden' }
  const call = alquery.querySelect(table, columns)
  expect(call).toBe('SELECT age, name FROM member')
})

// table: string, columns: array, where: null
test("querySelect('member', ['age', 'name'], null) returns 'SELECT age, name FROM member'", () => {
  const table = 'member'
  const columns = ['age', 'name']
  const where = null
  const call = alquery.querySelect(table, columns, where)
  expect(call).toBe('SELECT age, name FROM member')
})

// table: string, columns: array, where: empty string
test("querySelect('member', ['age', 'name'], '') returns 'SELECT age, name FROM member'", () => {
  const table = 'member'
  const columns = ['age', 'name']
  const where = ''
  const call = alquery.querySelect(table, columns, where)
  expect(call).toBe('SELECT age, name FROM member')
})

// table: string, columns: array, where: string
test("querySelect('member', ['age', 'name'], '') returns 'SELECT age, name FROM member WHERE age = 24'", () => {
  const table = 'member'
  const columns = ['age', 'name']
  const where = 'age = 24'
  const call = alquery.querySelect(table, columns, where)
  expect(call).toBe('SELECT age, name FROM member WHERE age = 24')
})

// table: string, columns: array, where: array
test(`querySelect('member', ['age', 'name'], ['age = 24', 'gender = "male"']) returns 'SELECT age, name FROM member WHERE (age = 24) AND (gender = "male")'`, () => {
  const table = 'member'
  const columns = ['age', 'name']
  const where = ['age = 24', 'gender = "male"']
  const call = alquery.querySelect(table, columns, where)
  expect(call).toBe(
    'SELECT age, name FROM member WHERE (age = 24) AND (gender = "male")'
  )
})

// table: string, columns: array, where: object
test(`querySelect('member', ['age', 'name'], { age: 24, gender: '"male"' }) returns 'SELECT age, name FROM member WHERE WHERE (age = 24) AND (gender = "male")'`, () => {
  const table = 'member'
  const columns = ['age', 'name']
  const where = { age: 24, gender: `"male"` }
  const call = alquery.querySelect(table, columns, where)
  expect(call).toBe(
    'SELECT age, name FROM member WHERE (age = 24) AND (gender = "male")'
  )
})
