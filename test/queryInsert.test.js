import alquery from '../src/index.js'

// table: undefined
test(`queryInsert() occurs error`, () => {
  const call = () => alquery.queryInsert()
  const error = new Error(
    '[queryInsert] Not passed table name to be used in query statement!'
  )
  expect(call).toThrow(error)
})

// table: null
test(`queryInsert(null) occurs error`, () => {
  const table = null
  const call = () => alquery.queryInsert(table)
  const error = new Error(
    '[queryInsert] Not passed table name to be used in query statement!'
  )
  expect(call).toThrow(error)
})

// table: string
test(`queryInsert('') occurs error`, () => {
  const table = ''
  const call = () => alquery.queryInsert(table)
  const error = new Error(
    '[queryInsert] Not passed table name to be used in query statement!'
  )
  expect(call).toThrow(error)
})

// table: string, values: undefined
test(`queryInsert('member') occurs error`, () => {
  const table = 'member'
  const call = () => alquery.queryInsert(table)
  const error = new Error(
    '[parseInsertValues] Not passed object consisting of column and value to be used in INSERT query statement!'
  )
  expect(call).toThrow(error)
})

// table: string, values: null
test(`queryInsert('member', null) occurs error`, () => {
  const table = 'member'
  const values = null
  const call = () => alquery.queryInsert(table, values)
  const error = new Error(
    '[parseInsertValues] Not passed object consisting of column and value to be used in INSERT query statement!'
  )
  expect(call).toThrow(error)
})

// table: string, values: string
test(`queryInsert('member', '') occurs error`, () => {
  const table = 'member'
  const values = ''
  const call = () => alquery.queryInsert(table, values)
  const error = new Error(
    '[parseInsertValues] Not passed object consisting of column and value to be used in INSERT query statement!'
  )
  expect(call).toThrow(error)
})

test(`queryInsert('member', '"Aiden"') returns 'INSERT INTO member VALUES ("Aiden")'`, () => {
  const table = 'member'
  const values = '"Aiden"'
  const call = alquery.queryInsert(table, values)
  expect(call).toBe('INSERT INTO member VALUES ("Aiden")')
})

test(`queryInsert('member', '24, "Aiden"') returns 'INSERT INTO member VALUES (24, "Aiden")'`, () => {
  const table = 'member'
  const values = '24, "Aiden"'
  const call = alquery.queryInsert(table, values)
  expect(call).toBe('INSERT INTO member VALUES (24, "Aiden")')
})

test(`queryInsert('member', '24, NOW()') returns 'INSERT INTO member VALUES (24, NOW())'`, () => {
  const table = 'member'
  const values = '24, NOW()'
  const call = alquery.queryInsert(table, values)
  expect(call).toBe('INSERT INTO member VALUES (24, NOW())')
})

// table: string, values: array
test(`queryInsert('member', []) occurs error`, () => {
  const table = 'member'
  const values = []
  const call = () => alquery.queryInsert(table, values)
  const error = new Error(
    '[parseInsertValues] Object consisting of columns and values for use in an INSERT query statement was specified incorrectly!'
  )
  expect(call).toThrow(error)
})

test(`queryInsert('member', [24]) returns 'INSERT INTO member VALUES (24)'`, () => {
  const table = 'member'
  const values = [24]
  const call = alquery.queryInsert(table, values)
  expect(call).toBe('INSERT INTO member VALUES (24)')
})

test(`queryInsert('member', [24, 'Aiden']) returns 'INSERT INTO member VALUES (24, "Aiden")'`, () => {
  const table = 'member'
  const values = [24, 'Aiden']
  const call = alquery.queryInsert(table, values)
  expect(call).toBe('INSERT INTO member VALUES (24, "Aiden")')
})

test(`queryInsert('member', [24, '\\NOW()']) returns 'INSERT INTO member VALUES (24, NOW())'`, () => {
  const table = 'member'
  const values = [24, '\\NOW()']
  const call = alquery.queryInsert(table, values)
  expect(call).toBe('INSERT INTO member VALUES (24, NOW())')
})

test(`queryInsert('member', [[24, 'Aiden'], [22, 'Ailee']]) returns 'INSERT INTO member VALUES (24, "Aiden"), (22, "Ailee")'`, () => {
  const table = 'member'
  const values = [
    [24, 'Aiden'],
    [22, 'Ailee']
  ]
  const call = alquery.queryInsert(table, values)
  expect(call).toBe('INSERT INTO member VALUES (24, "Aiden"), (22, "Ailee")')
})

// table: string, values: object
test(`queryInsert('member', {}) occurs error`, () => {
  const table = 'member'
  const values = {}
  const call = () => alquery.queryInsert(table, values)
  const error = new Error(
    '[parseInsertValues] Object consisting of columns and values for use in an INSERT query statement was specified incorrectly!'
  )
  expect(call).toThrow(error)
})

test(`queryInsert('member', { age: 24 }) returns 'INSERT INTO member (age) VALUES (24)'`, () => {
  const table = 'member'
  const values = { age: 24 }
  const call = alquery.queryInsert(table, values)
  expect(call).toBe('INSERT INTO member (age) VALUES (24)')
})

test(`queryInsert('member', { age: 24, name: 'Aiden' }) returns 'INSERT INTO member (age, name) VALUES (24, "Aiden")'`, () => {
  const table = 'member'
  const values = { age: 24, name: 'Aiden' }
  const call = alquery.queryInsert(table, values)
  expect(call).toBe('INSERT INTO member (age, name) VALUES (24, "Aiden")')
})

test(`queryInsert('member', { age: 24, dateReg: '\\NOW()' }) returns 'INSERT INTO member (age, dateReg) VALUES (24, NOW())'`, () => {
  const table = 'member'
  const values = { age: 24, dateReg: '\\NOW()' }
  const call = alquery.queryInsert(table, values)
  expect(call).toBe('INSERT INTO member (age, dateReg) VALUES (24, NOW())')
})
