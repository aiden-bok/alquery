import alquery from '../src/index.js'

// undefined
test(`parseTable() occurs error`, () => {
  const call = () => alquery.parseTable()
  const error = new Error(
    '[parseTable] Not passed table name to be used in query statement!'
  )
  expect(call).toThrow(error)
})

// null
test(`parseTable(null) occurs error`, () => {
  const table = null
  const call = () => alquery.parseTable(table)
  const error = new Error(
    '[parseTable] Not passed table name to be used in query statement!'
  )
  expect(call).toThrow(error)
})

// string
test(`parseTable('') occurs error`, () => {
  const table = ''
  const call = () => alquery.parseTable(table)
  const error = new Error(
    '[parseTable] Not passed table name to be used in query statement!'
  )
  expect(call).toThrow(error)
})

test(`parseTable('member') returns ' FROM member'`, () => {
  const table = 'member'
  const call = alquery.parseTable(table)
  expect(call).toBe(' FROM member')
})

test(`parseTable('member, country') returns ' FROM member, country'`, () => {
  const table = 'member, country'
  const call = alquery.parseTable(table)
  expect(call).toBe(' FROM member, country')
})

// array
test(`parseTable([]) occurs error`, () => {
  const table = []
  const call = () => alquery.parseTable(table)
  const error = new Error(
    '[parseTable] Table name to use in the query statement is not specified!'
  )
  expect(call).toThrow(error)
})

test(`parseTable(['member']) returns ' FROM member'`, () => {
  const table = ['member']
  const call = alquery.parseTable(table)
  expect(call).toBe(' FROM member')
})

test(`parseTable(['member', 'country']) returns ' FROM member, country'`, () => {
  const table = ['member', 'country']
  const call = alquery.parseTable(table)
  expect(call).toBe(' FROM member, country')
})

// object
test(`parseTable({}) occurs error`, () => {
  const table = {}
  const call = () => alquery.parseTable(table)
  const error = new Error(
    '[parseTable] Table name to use in the query statement is not specified!'
  )
  expect(call).toThrow(error)
})

test(`parseTable({member: 'Member table'}) returns ' FROM member'`, () => {
  const table = { member: 'Member table' }
  const call = alquery.parseTable(table)
  expect(call).toBe(' FROM member')
})

test(`parseTable({member: 'Member table', country: 'Country table'}) returns ' FROM member, country'`, () => {
  const table = { member: 'Member table', country: 'Country table' }
  const call = alquery.parseTable(table)
  expect(call).toBe(' FROM member, country')
})
