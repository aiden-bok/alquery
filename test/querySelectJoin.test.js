import alquery from '../src/index.js'

// table: undefined
test(`querySelectJoin() occurs error`, () => {
  const call = () => alquery.querySelectJoin()
  const error = new Error(
    '[parseTable] Not passed table name to be used in query statement!'
  )
  expect(call).toThrow(error)
})

// table: string
test(`querySelectJoin('') occurs error`, () => {
  const table = ''
  const call = () => alquery.querySelectJoin(table)
  const error = new Error(
    '[parseTable] Not passed table name to be used in query statement!'
  )
  expect(call).toThrow(error)
})

test(`querySelectJoin('member') returns 'SELECT * FROM member'`, () => {
  const table = 'member'
  const call = alquery.querySelectJoin(table)
  expect(call).toBe('SELECT * FROM member')
})

test(`querySelectJoin('member, country') returns 'SELECT * FROM member, country'`, () => {
  const table = 'member, country'
  const call = alquery.querySelectJoin(table)
  expect(call).toBe('SELECT * FROM member, country')
})

// table: array
test(`querySelectJoin([]) occurs error`, () => {
  const table = []
  const call = () => alquery.querySelectJoin(table)
  const error = new Error(
    '[parseTable] Table name to use in the query statement is not specified!'
  )
  expect(call).toThrow(error)
})

test(`querySelectJoin(['member']) returns 'SELECT * FROM member'`, () => {
  const table = ['member']
  const call = alquery.querySelectJoin(table)
  expect(call).toBe('SELECT * FROM member')
})

test(`querySelectJoin(['member', 'country']) returns 'SELECT * FROM member, country'`, () => {
  const table = ['member', 'country']
  const call = alquery.querySelectJoin(table)
  expect(call).toBe('SELECT * FROM member, country')
})

// table: object
test(`querySelectJoin({}) occurs error`, () => {
  const table = {}
  const call = () => alquery.querySelectJoin(table)
  const error = new Error(
    '[parseTable] Table name to use in the query statement is not specified!'
  )
  expect(call).toThrow(error)
})

test(`querySelectJoin({ member: 'Member Table' }) returns 'SELECT * FROM member'`, () => {
  const table = { member: 'Member Table' }
  const call = alquery.querySelectJoin(table)
  expect(call).toBe('SELECT * FROM member')
})

test(`querySelectJoin({ member: 'Member Table', country: 'Country Table' }) returns 'SELECT * FROM member, country'`, () => {
  const table = { member: 'Member Table', country: 'Country Table' }
  const call = alquery.querySelectJoin(table)
  expect(call).toBe('SELECT * FROM member, country')
})

// table: string, type: string
test(`querySelectJoin('', '') occurs error`, () => {
  const table = ''
  const type = ''
  const call = () => alquery.querySelectJoin(table, type)
  const error = new Error(
    '[parseTable] Not passed table name to be used in query statement!'
  )
  expect(call).toThrow(error)
})

test(`querySelectJoin('member', '') returns 'SELECT * FROM member'`, () => {
  const table = 'member'
  const type = ''
  const call = alquery.querySelectJoin(table, type)
  expect(call).toBe('SELECT * FROM member')
})

test(`querySelectJoin('member', 'INNER') returns 'SELECT * FROM member'`, () => {
  const table = 'member'
  const type = 'INNER'
  const call = alquery.querySelectJoin(table, type)
  expect(call).toBe('SELECT * FROM member')
})

// table: string, type: string, join: string
test(`querySelectJoin('', '', '') occurs error`, () => {
  const table = ''
  const type = ''
  const join = ''
  const call = () => alquery.querySelectJoin(table, type, join)
  const error = new Error(
    '[parseTable] Not passed table name to be used in query statement!'
  )
  expect(call).toThrow(error)
})

test(`querySelectJoin('member', 'INNER', '') returns 'SELECT * FROM member'`, () => {
  const table = 'member'
  const type = 'INNER'
  const join = ''
  const call = alquery.querySelectJoin(table, type, join)
  expect(call).toBe('SELECT * FROM member')
})

test(`querySelectJoin('member', 'INNER', 'country') returns 'SELECT * FROM member INNER JOIN country'`, () => {
  const table = 'member'
  const type = 'INNER'
  const join = 'country'
  const call = alquery.querySelectJoin(table, type, join)
  expect(call).toBe('SELECT * FROM member INNER JOIN country')
})

// table: string, type: string, join: array
test(`querySelectJoin('', '', []) occurs error`, () => {
  const table = ''
  const type = ''
  const join = []
  const call = () => alquery.querySelectJoin(table, type, join)
  const error = new Error(
    '[parseTable] Not passed table name to be used in query statement!'
  )
  expect(call).toThrow(error)
})

test(`querySelectJoin('member', 'INNER', []) returns 'SELECT * FROM member'`, () => {
  const table = 'member'
  const type = 'INNER'
  const join = []
  const call = alquery.querySelectJoin(table, type, join)
  expect(call).toBe('SELECT * FROM member')
})

test(`querySelectJoin('member', 'INNER', ['country']) returns 'SELECT * FROM member INNER JOIN country'`, () => {
  const table = 'member'
  const type = 'INNER'
  const join = ['country']
  const call = alquery.querySelectJoin(table, type, join)
  expect(call).toBe('SELECT * FROM member INNER JOIN country')
})

test(`querySelectJoin('member', 'INNER', ['country', 'market']) returns 'SELECT * FROM member INNER JOIN country, market'`, () => {
  const table = 'member'
  const type = 'INNER'
  const join = ['country', 'market']
  const call = alquery.querySelectJoin(table, type, join)
  expect(call).toBe('SELECT * FROM member INNER JOIN country, market')
})

// table: string, type: string, join: string, on: string
test(`querySelectJoin('member', 'INNER', 'country', '') returns 'SELECT * FROM member INNER JOIN country'`, () => {
  const table = 'member'
  const type = 'INNER'
  const join = 'country'
  const on = ''
  const call = alquery.querySelectJoin(table, type, join, on)
  expect(call).toBe('SELECT * FROM member INNER JOIN country')
})

test(`querySelectJoin('member', 'INNER', 'country', 'member.countryIdx = country.idx') returns 'SELECT * FROM member INNER JOIN country ON member.countryIdx = country.idx'`, () => {
  const table = 'member'
  const type = 'INNER'
  const join = 'country'
  const on = 'member.countryIdx = country.idx'
  const call = alquery.querySelectJoin(table, type, join, on)
  expect(call).toBe(
    'SELECT * FROM member INNER JOIN country ON member.countryIdx = country.idx'
  )
})

// table: string, type: string, join: string, on: string, columns: string
test(`querySelectJoin('member AS M', 'INNER', 'country AS C', 'M.countryIdx = C.idx', 'M.name, C.code') returns 'SELECT M.name, C.code FROM member AS M INNER JOIN country AS C ON M.countryIdx = C.idx'`, () => {
  const table = 'member AS M'
  const type = 'INNER'
  const join = 'country AS C'
  const on = 'M.countryIdx = C.idx'
  const columns = 'M.name, C.code'
  const call = alquery.querySelectJoin(table, type, join, on, columns)
  expect(call).toBe(
    'SELECT M.name, C.code FROM member AS M INNER JOIN country AS C ON M.countryIdx = C.idx'
  )
})

// table: string, type: string, join: string, on: string, columns: array
test(`querySelectJoin('member AS M', 'INNER', 'country AS C', 'M.countryIdx = C.idx', ['M.name', 'C.code']) returns 'SELECT M.name, C.code FROM member AS M INNER JOIN country AS C ON M.countryIdx = C.idx'`, () => {
  const table = 'member AS M'
  const type = 'INNER'
  const join = 'country AS C'
  const on = 'M.countryIdx = C.idx'
  const columns = ['M.name', 'C.code']
  const call = alquery.querySelectJoin(table, type, join, on, columns)
  expect(call).toBe(
    'SELECT M.name, C.code FROM member AS M INNER JOIN country AS C ON M.countryIdx = C.idx'
  )
})

// table: string, type: string, join: string, on: string, columns: object
test(`querySelectJoin('member AS M', 'INNER', 'country AS C', 'M.countryIdx = C.idx', { 'M.name': 'Member name', 'C.code': 'Country Code' }) returns 'SELECT M.name, C.code FROM member AS M INNER JOIN country AS C ON M.countryIdx = C.idx'`, () => {
  const table = 'member AS M'
  const type = 'INNER'
  const join = 'country AS C'
  const on = 'M.countryIdx = C.idx'
  const columns = { 'M.name': 'Member name', 'C.code': 'Country Code' }
  const call = alquery.querySelectJoin(table, type, join, on, columns)
  expect(call).toBe(
    'SELECT M.name, C.code FROM member AS M INNER JOIN country AS C ON M.countryIdx = C.idx'
  )
})

// table: string, type: string, join: string, on: string, columns: array, where: string
test(`querySelectJoin('member AS M', 'INNER', 'country AS C', 'M.countryIdx = C.idx', ['M.name', 'C.code'], 'M.age = 24') returns 'SELECT M.name, C.code FROM member AS M INNER JOIN country AS C ON M.countryIdx = C.idx WHERE M.age = 24'`, () => {
  const table = 'member AS M'
  const type = 'INNER'
  const join = 'country AS C'
  const on = 'M.countryIdx = C.idx'
  const columns = ['M.name', 'C.code']
  const where = 'M.age = 24'
  const call = alquery.querySelectJoin(table, type, join, on, columns, where)
  expect(call).toBe(
    'SELECT M.name, C.code FROM member AS M INNER JOIN country AS C ON M.countryIdx = C.idx WHERE M.age = 24'
  )
})

// table: string, type: string, join: string, on: string, columns: array, where: array
test(`querySelectJoin('member AS M', 'INNER', 'country AS C', 'M.countryIdx = C.idx', ['M.name', 'C.code'], ['M.age = 24', 'C.code = "KO"']) returns 'SELECT M.name, C.code FROM member AS M INNER JOIN country AS C ON M.countryIdx = C.idx WHERE (M.age = 24) AND (C.code = "KO")'`, () => {
  const table = 'member AS M'
  const type = 'INNER'
  const join = 'country AS C'
  const on = 'M.countryIdx = C.idx'
  const columns = ['M.name', 'C.code']
  const where = ['M.age = 24', 'C.code = "KO"']
  const call = alquery.querySelectJoin(table, type, join, on, columns, where)
  expect(call).toBe(
    'SELECT M.name, C.code FROM member AS M INNER JOIN country AS C ON M.countryIdx = C.idx WHERE (M.age = 24) AND (C.code = "KO")'
  )
})

// table: string, type: string, join: string, on: string, columns: array, where: object
test(`querySelectJoin('member AS M', 'INNER', 'country AS C', 'M.countryIdx = C.idx', ['M.name', 'C.code'], { 'M.age': 24, 'C.code': '"KO"' }) returns 'SELECT M.name, C.code FROM member AS M INNER JOIN country AS C ON M.countryIdx = C.idx WHERE (M.age = 24) AND (C.code = "KO")'`, () => {
  const table = 'member AS M'
  const type = 'INNER'
  const join = 'country AS C'
  const on = 'M.countryIdx = C.idx'
  const columns = ['M.name', 'C.code']
  const where = { 'M.age': 24, 'C.code': '"KO"' }
  const call = alquery.querySelectJoin(table, type, join, on, columns, where)
  expect(call).toBe(
    'SELECT M.name, C.code FROM member AS M INNER JOIN country AS C ON M.countryIdx = C.idx WHERE (M.age = 24) AND (C.code = "KO")'
  )
})

// table: string, type: string, join: string, on: string, columns: array, where: object, order: string
test(`querySelectJoin('member AS M', 'INNER', 'country AS C', 'M.countryIdx = C.idx', ['M.name', 'C.code'], { 'M.age': 24, 'C.code': '"KO"' }, 'M.dateReg DESC') returns 'SELECT M.name, C.code FROM member AS M INNER JOIN country AS C ON M.countryIdx = C.idx WHERE (M.age = 24) AND (C.code = "KO") ORDER BY M.dateReg DESC'`, () => {
  const table = 'member AS M'
  const type = 'INNER'
  const join = 'country AS C'
  const on = 'M.countryIdx = C.idx'
  const columns = ['M.name', 'C.code']
  const where = { 'M.age': 24, 'C.code': '"KO"' }
  const order = 'M.dateReg DESC'
  const call = alquery.querySelectJoin(
    table,
    type,
    join,
    on,
    columns,
    where,
    order
  )
  expect(call).toBe(
    'SELECT M.name, C.code FROM member AS M INNER JOIN country AS C ON M.countryIdx = C.idx WHERE (M.age = 24) AND (C.code = "KO") ORDER BY M.dateReg DESC'
  )
})

// table: string, type: string, join: string, on: string, columns: array, where: object, order: string, limit: number
test(`querySelectJoin('member AS M', 'INNER', 'country AS C', 'M.countryIdx = C.idx', ['M.name', 'C.code'], { 'M.age': 24, 'C.code': '"KO"' }, 'M.dateReg DESC', 5) returns 'SELECT M.name, C.code FROM member AS M INNER JOIN country AS C ON M.countryIdx = C.idx WHERE (M.age = 24) AND (C.code = "KO") ORDER BY M.dateReg DESC LIMIT 5'`, () => {
  const table = 'member AS M'
  const type = 'INNER'
  const join = 'country AS C'
  const on = 'M.countryIdx = C.idx'
  const columns = ['M.name', 'C.code']
  const where = { 'M.age': 24, 'C.code': '"KO"' }
  const order = 'M.dateReg DESC'
  const limit = 5
  const call = alquery.querySelectJoin(
    table,
    type,
    join,
    on,
    columns,
    where,
    order,
    limit
  )
  expect(call).toBe(
    'SELECT M.name, C.code FROM member AS M INNER JOIN country AS C ON M.countryIdx = C.idx WHERE (M.age = 24) AND (C.code = "KO") ORDER BY M.dateReg DESC LIMIT 5'
  )
})
