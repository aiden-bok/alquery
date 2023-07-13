import alquery from '../src/index.js'

// table: undefined
test(`queryUpdate() occurs error`, () => {
  const call = () => alquery.queryUpdate()
  const error = new Error(
    '[queryUpdate] Not passed table name to be used in query statement!'
  )
  expect(call).toThrow(error)
})

// table: null
test(`queryUpdate(null) occurs error`, () => {
  const table = null
  const call = () => alquery.queryUpdate(table)
  const error = new Error(
    '[queryUpdate] Not passed table name to be used in query statement!'
  )
  expect(call).toThrow(error)
})

// table: string
test(`queryUpdate('') occurs error`, () => {
  const table = ''
  const call = () => alquery.queryUpdate(table)
  const error = new Error(
    '[queryUpdate] Not passed table name to be used in query statement!'
  )
  expect(call).toThrow(error)
})

// table: string, values: undefined
test(`queryUpdate('member') occurs error`, () => {
  const table = 'member'
  const call = () => alquery.queryUpdate(table)
  const error = new Error(
    '[queryUpdate] Not passed update condition clause to be used in UPDATE query statement!'
  )
  expect(call).toThrow(error)
})

// table: string, values: null
test(`queryUpdate('member', null) occurs error`, () => {
  const table = 'member'
  const values = null
  const call = () => alquery.queryUpdate(table, values)
  const error = new Error(
    '[queryUpdate] Not passed update condition clause to be used in UPDATE query statement!'
  )
  expect(call).toThrow(error)
})

// table: string, values: string
test(`queryUpdate('member', '') occurs error`, () => {
  const table = 'member'
  const values = ''
  const call = () => alquery.queryUpdate(table, values)
  const error = new Error(
    '[queryUpdate] Not passed update condition clause to be used in UPDATE query statement!'
  )
  expect(call).toThrow(error)
})

test(`queryUpdate('member', 'age = 24') occurs error`, () => {
  const table = 'member'
  const values = 'age = 24'
  const call = () => alquery.queryUpdate(table, values)
  const error = new Error(
    '[queryUpdate] Not passed update condition clause to be used in UPDATE query statement!'
  )
  expect(call).toThrow(error)
})

// table: string, values: array
test(`queryUpdate('member', []) occurs error`, () => {
  const table = 'member'
  const values = []
  const call = () => alquery.queryUpdate(table, values)
  const error = new Error(
    '[queryUpdate] Not passed update condition clause to be used in UPDATE query statement!'
  )
  expect(call).toThrow(error)
})

test(`queryUpdate('member', ['age = 24']) occurs error`, () => {
  const table = 'member'
  const values = ['age = 24']
  const call = () => alquery.queryUpdate(table, values)
  const error = new Error(
    '[queryUpdate] Not passed update condition clause to be used in UPDATE query statement!'
  )
  expect(call).toThrow(error)
})

// table: string, values: object
test(`queryUpdate('member', {}) occurs error`, () => {
  const table = 'member'
  const values = {}
  const call = () => alquery.queryUpdate(table, values)
  const error = new Error(
    '[queryUpdate] Not passed update condition clause to be used in UPDATE query statement!'
  )
  expect(call).toThrow(error)
})

test(`queryUpdate('member', { age: 24 }) occurs error`, () => {
  const table = 'member'
  const values = { age: 24 }
  const call = () => alquery.queryUpdate(table, values)
  const error = new Error(
    '[queryUpdate] Not passed update condition clause to be used in UPDATE query statement!'
  )
  expect(call).toThrow(error)
})

// table: string, values: string, where: null
test(`queryUpdate('member', 'age = 24', null) occurs error`, () => {
  const table = 'member'
  const values = 'age = 24'
  const where = null
  const call = () => alquery.queryUpdate(table, values, where)
  const error = new Error(
    '[queryUpdate] Not passed update condition clause to be used in UPDATE query statement!'
  )
  expect(call).toThrow(error)
})

// table: string, values: array, where: null
test(`queryUpdate('member', ['age = 24'], null) occurs error`, () => {
  const table = 'member'
  const values = ['age = 24']
  const where = null
  const call = () => alquery.queryUpdate(table, values, where)
  const error = new Error(
    '[queryUpdate] Not passed update condition clause to be used in UPDATE query statement!'
  )
  expect(call).toThrow(error)
})

// table: string, values: object, where: null
test(`queryUpdate('member', { age: 24 }, null) occurs error`, () => {
  const table = 'member'
  const values = { age: 24 }
  const where = null
  const call = () => alquery.queryUpdate(table, values, where)
  const error = new Error(
    '[queryUpdate] Not passed update condition clause to be used in UPDATE query statement!'
  )
  expect(call).toThrow(error)
})

// table: string, values: string, where: string
test(`queryUpdate('member', 'age = 24', '') occurs error`, () => {
  const table = 'member'
  const values = 'age = 24'
  const where = ''
  const call = () => alquery.queryUpdate(table, values, where)
  const error = new Error(
    '[queryUpdate] Not passed update condition clause to be used in UPDATE query statement!'
  )
  expect(call).toThrow(error)
})

test(`queryUpdate('member', 'age = 24', 'name = "Aiden"') returns 'UPDATE member SET age = 24 WHERE name = "Aiden"'`, () => {
  const table = 'member'
  const values = 'age = 24'
  const where = 'name = "Aiden"'
  const call = alquery.queryUpdate(table, values, where)
  expect(call).toBe('UPDATE member SET age = 24 WHERE name = "Aiden"')
})

// table: string, values: array, where: string
test(`queryUpdate('member', ['age = 24'], '') occurs error`, () => {
  const table = 'member'
  const values = ['age = 24']
  const where = ''
  const call = () => alquery.queryUpdate(table, values, where)
  const error = new Error(
    '[queryUpdate] Not passed update condition clause to be used in UPDATE query statement!'
  )
  expect(call).toThrow(error)
})

test(`queryUpdate('member', ['age = 24'], 'name = "Aiden"') returns 'UPDATE member SET age = 24 WHERE name = "Aiden"'`, () => {
  const table = 'member'
  const values = ['age = 24']
  const where = 'name = "Aiden"'
  const call = alquery.queryUpdate(table, values, where)
  expect(call).toBe('UPDATE member SET age = 24 WHERE name = "Aiden"')
})

// table: string, values: object, where: string
test(`queryUpdate('member', { age: 24 }, '') occurs error`, () => {
  const table = 'member'
  const values = { age: 24 }
  const where = ''
  const call = () => alquery.queryUpdate(table, values, where)
  const error = new Error(
    '[queryUpdate] Not passed update condition clause to be used in UPDATE query statement!'
  )
  expect(call).toThrow(error)
})

test(`queryUpdate('member', { age: 24 }, 'name = "Aiden"') returns 'UPDATE member SET age = 24 WHERE name = "Aiden"'`, () => {
  const table = 'member'
  const values = { age: 24 }
  const where = 'name = "Aiden"'
  const call = alquery.queryUpdate(table, values, where)
  expect(call).toBe('UPDATE member SET age = 24 WHERE name = "Aiden"')
})
