import alquery from '../src/index.js'

// table: undefined
test(`querySelectJoinGroup() occurs error`, () => {
  const call = () => alquery.querySelectJoinGroup()
  const error = new Error(
    '[parseTable] Not passed table name to be used in query statement!'
  )
  expect(call).toThrow(error)
})

// table: string
test(`querySelectJoinGroup('') occurs error`, () => {
  const table = ''
  const call = () => alquery.querySelectJoinGroup(table)
  const error = new Error(
    '[parseTable] Not passed table name to be used in query statement!'
  )
  expect(call).toThrow(error)
})

test(`querySelectJoinGroup('member') returns 'SELECT * FROM member'`, () => {
  const table = 'member'
  const call = alquery.querySelectJoinGroup(table)
  expect(call).toBe('SELECT * FROM member')
})

test(`querySelectJoinGroup('member, country') returns 'SELECT * FROM member, country'`, () => {
  const table = 'member, country'
  const call = alquery.querySelectJoinGroup(table)
  expect(call).toBe('SELECT * FROM member, country')
})

// table: array
test(`querySelectJoinGroup([]) occurs error`, () => {
  const table = []
  const call = () => alquery.querySelectJoinGroup(table)
  const error = new Error(
    '[parseTable] Table name to use in the query statement is not specified!'
  )
  expect(call).toThrow(error)
})

test(`querySelectJoinGroup(['member']) returns 'SELECT * FROM member'`, () => {
  const table = ['member']
  const call = alquery.querySelectJoinGroup(table)
  expect(call).toBe('SELECT * FROM member')
})

test(`querySelectJoinGroup(['member', 'country']) returns 'SELECT * FROM member, country'`, () => {
  const table = ['member', 'country']
  const call = alquery.querySelectJoinGroup(table)
  expect(call).toBe('SELECT * FROM member, country')
})

// table: object
test(`querySelectJoinGroup({}) occurs error`, () => {
  const table = {}
  const call = () => alquery.querySelectJoinGroup(table)
  const error = new Error(
    '[parseTable] Table name to use in the query statement is not specified!'
  )
  expect(call).toThrow(error)
})

test(`querySelectJoinGroup({ member: 'Member Table' }) returns 'SELECT * FROM member'`, () => {
  const table = { member: 'Member Table' }
  const call = alquery.querySelectJoinGroup(table)
  expect(call).toBe('SELECT * FROM member')
})

test(`querySelectJoinGroup({ member: 'Member Table', country: 'Country Table' }) returns 'SELECT * FROM member, country'`, () => {
  const table = { member: 'Member Table', country: 'Country Table' }
  const call = alquery.querySelectJoinGroup(table)
  expect(call).toBe('SELECT * FROM member, country')
})

// table: string, type: string
test(`querySelectJoinGroup('', '') occurs error`, () => {
  const table = ''
  const type = ''
  const call = () => alquery.querySelectJoinGroup(table, type)
  const error = new Error(
    '[parseTable] Not passed table name to be used in query statement!'
  )
  expect(call).toThrow(error)
})

test(`querySelectJoinGroup('member', '') returns 'SELECT * FROM member'`, () => {
  const table = 'member'
  const type = ''
  const call = alquery.querySelectJoinGroup(table, type)
  expect(call).toBe('SELECT * FROM member')
})

test(`querySelectJoinGroup('member', 'INNER') returns 'SELECT * FROM member'`, () => {
  const table = 'member'
  const type = 'INNER'
  const call = alquery.querySelectJoinGroup(table, type)
  expect(call).toBe('SELECT * FROM member')
})

// table: string, type: string, join: string
test(`querySelectJoinGroup('', '', '') occurs error`, () => {
  const table = ''
  const type = ''
  const join = ''
  const call = () => alquery.querySelectJoinGroup(table, type, join)
  const error = new Error(
    '[parseTable] Not passed table name to be used in query statement!'
  )
  expect(call).toThrow(error)
})

test(`querySelectJoinGroup('member', 'INNER', '') returns 'SELECT * FROM member'`, () => {
  const table = 'member'
  const type = 'INNER'
  const join = ''
  const call = alquery.querySelectJoinGroup(table, type, join)
  expect(call).toBe('SELECT * FROM member')
})

test(`querySelectJoinGroup('member', 'INNER', 'country') returns 'SELECT * FROM member INNER JOIN country'`, () => {
  const table = 'member'
  const type = 'INNER'
  const join = 'country'
  const call = alquery.querySelectJoinGroup(table, type, join)
  expect(call).toBe('SELECT * FROM member INNER JOIN country')
})

// table: string, type: string, join: array
test(`querySelectJoinGroup('', '', []) occurs error`, () => {
  const table = ''
  const type = ''
  const join = []
  const call = () => alquery.querySelectJoinGroup(table, type, join)
  const error = new Error(
    '[parseTable] Not passed table name to be used in query statement!'
  )
  expect(call).toThrow(error)
})

test(`querySelectJoinGroup('member', 'INNER', []) returns 'SELECT * FROM member'`, () => {
  const table = 'member'
  const type = 'INNER'
  const join = []
  const call = alquery.querySelectJoinGroup(table, type, join)
  expect(call).toBe('SELECT * FROM member')
})

test(`querySelectJoinGroup('member', 'INNER', ['country']) returns 'SELECT * FROM member INNER JOIN country'`, () => {
  const table = 'member'
  const type = 'INNER'
  const join = ['country']
  const call = alquery.querySelectJoinGroup(table, type, join)
  expect(call).toBe('SELECT * FROM member INNER JOIN country')
})

test(`querySelectJoinGroup('member', 'INNER', ['country', 'market']) returns 'SELECT * FROM member INNER JOIN country, market'`, () => {
  const table = 'member'
  const type = 'INNER'
  const join = ['country', 'market']
  const call = alquery.querySelectJoinGroup(table, type, join)
  expect(call).toBe('SELECT * FROM member INNER JOIN country, market')
})

// table: string, type: string, join: string, on: string
test(`querySelectJoinGroup('member', 'INNER', 'country', '') returns 'SELECT * FROM member INNER JOIN country'`, () => {
  const table = 'member'
  const type = 'INNER'
  const join = 'country'
  const on = ''
  const call = alquery.querySelectJoinGroup(table, type, join, on)
  expect(call).toBe('SELECT * FROM member INNER JOIN country')
})

test(`querySelectJoinGroup('member', 'INNER', 'country', 'member.countryIdx = country.idx') returns 'SELECT * FROM member INNER JOIN country ON member.countryIdx = country.idx'`, () => {
  const table = 'member'
  const type = 'INNER'
  const join = 'country'
  const on = 'member.countryIdx = country.idx'
  const call = alquery.querySelectJoinGroup(table, type, join, on)
  expect(call).toBe(
    'SELECT * FROM member INNER JOIN country ON member.countryIdx = country.idx'
  )
})

// table: string, type: string, join: string, on: string, columns: string
test(`querySelectJoinGroup('member AS M', 'INNER', 'country AS C', 'M.countryIdx = C.idx', 'M.name, C.code') returns 'SELECT M.name, C.code FROM member AS M INNER JOIN country AS C ON M.countryIdx = C.idx'`, () => {
  const table = 'member AS M'
  const type = 'INNER'
  const join = 'country AS C'
  const on = 'M.countryIdx = C.idx'
  const columns = 'M.name, C.code'
  const call = alquery.querySelectJoinGroup(table, type, join, on, columns)
  expect(call).toBe(
    'SELECT M.name, C.code FROM member AS M INNER JOIN country AS C ON M.countryIdx = C.idx'
  )
})

// table: string, type: string, join: string, on: string, columns: array
test(`querySelectJoinGroup('member AS M', 'INNER', 'country AS C', 'M.countryIdx = C.idx', ['M.name', 'C.code']) returns 'SELECT M.name, C.code FROM member AS M INNER JOIN country AS C ON M.countryIdx = C.idx'`, () => {
  const table = 'member AS M'
  const type = 'INNER'
  const join = 'country AS C'
  const on = 'M.countryIdx = C.idx'
  const columns = ['M.name', 'C.code']
  const call = alquery.querySelectJoinGroup(table, type, join, on, columns)
  expect(call).toBe(
    'SELECT M.name, C.code FROM member AS M INNER JOIN country AS C ON M.countryIdx = C.idx'
  )
})

// table: string, type: string, join: string, on: string, columns: object
test(`querySelectJoinGroup('member AS M', 'INNER', 'country AS C', 'M.countryIdx = C.idx', { 'M.name': 'Member name', 'C.code': 'Country Code' }) returns 'SELECT M.name, C.code FROM member AS M INNER JOIN country AS C ON M.countryIdx = C.idx'`, () => {
  const table = 'member AS M'
  const type = 'INNER'
  const join = 'country AS C'
  const on = 'M.countryIdx = C.idx'
  const columns = { 'M.name': 'Member name', 'C.code': 'Country Code' }
  const call = alquery.querySelectJoinGroup(table, type, join, on, columns)
  expect(call).toBe(
    'SELECT M.name, C.code FROM member AS M INNER JOIN country AS C ON M.countryIdx = C.idx'
  )
})

// table: string, type: string, join: string, on: string, columns: array, where: string
test(`querySelectJoinGroup('member AS M', 'INNER', 'country AS C', 'M.countryIdx = C.idx', ['M.name', 'C.code'], 'M.age = 24') returns 'SELECT M.name, C.code FROM member AS M INNER JOIN country AS C ON M.countryIdx = C.idx WHERE M.age = 24'`, () => {
  const table = 'member AS M'
  const type = 'INNER'
  const join = 'country AS C'
  const on = 'M.countryIdx = C.idx'
  const columns = ['M.name', 'C.code']
  const where = 'M.age = 24'
  const call = alquery.querySelectJoinGroup(
    table,
    type,
    join,
    on,
    columns,
    where
  )
  expect(call).toBe(
    'SELECT M.name, C.code FROM member AS M INNER JOIN country AS C ON M.countryIdx = C.idx WHERE M.age = 24'
  )
})

// table: string, type: string, join: string, on: string, columns: array, where: array
test(`querySelectJoinGroup('member AS M', 'INNER', 'country AS C', 'M.countryIdx = C.idx', ['M.name', 'C.code'], ['M.age = 24', 'C.code = "KO"']) returns 'SELECT M.name, C.code FROM member AS M INNER JOIN country AS C ON M.countryIdx = C.idx WHERE (M.age = 24) AND (C.code = "KO")'`, () => {
  const table = 'member AS M'
  const type = 'INNER'
  const join = 'country AS C'
  const on = 'M.countryIdx = C.idx'
  const columns = ['M.name', 'C.code']
  const where = ['M.age = 24', 'C.code = "KO"']
  const call = alquery.querySelectJoinGroup(
    table,
    type,
    join,
    on,
    columns,
    where
  )
  expect(call).toBe(
    'SELECT M.name, C.code FROM member AS M INNER JOIN country AS C ON M.countryIdx = C.idx WHERE (M.age = 24) AND (C.code = "KO")'
  )
})

// table: string, type: string, join: string, on: string, columns: array, where: object
test(`querySelectJoinGroup('member AS M', 'INNER', 'country AS C', 'M.countryIdx = C.idx', ['M.name', 'C.code'], { 'M.age': 24, 'C.code': '"KO"' }) returns 'SELECT M.name, C.code FROM member AS M INNER JOIN country AS C ON M.countryIdx = C.idx WHERE (M.age = 24) AND (C.code = "KO")'`, () => {
  const table = 'member AS M'
  const type = 'INNER'
  const join = 'country AS C'
  const on = 'M.countryIdx = C.idx'
  const columns = ['M.name', 'C.code']
  const where = { 'M.age': 24, 'C.code': '"KO"' }
  const call = alquery.querySelectJoinGroup(
    table,
    type,
    join,
    on,
    columns,
    where
  )
  expect(call).toBe(
    'SELECT M.name, C.code FROM member AS M INNER JOIN country AS C ON M.countryIdx = C.idx WHERE (M.age = 24) AND (C.code = "KO")'
  )
})

// table: string, type: string, join: string, on: string, columns: array, where: object, group: null
test(`querySelectJoinGroup('member AS M', 'INNER', 'country AS C', 'M.countryIdx = C.idx', ['M.name', 'C.code'], { 'M.age': 24, 'C.code': '"KO"' }, null) returns 'SELECT M.name, C.code FROM member AS M INNER JOIN country AS C ON M.countryIdx = C.idx WHERE (M.age = 24) AND (C.code = "KO")'`, () => {
  const table = 'member AS M'
  const type = 'INNER'
  const join = 'country AS C'
  const on = 'M.countryIdx = C.idx'
  const columns = ['M.name', 'C.code']
  const where = { 'M.age': 24, 'C.code': '"KO"' }
  const group = null
  const call = alquery.querySelectJoinGroup(
    table,
    type,
    join,
    on,
    columns,
    where,
    group
  )
  expect(call).toBe(
    'SELECT M.name, C.code FROM member AS M INNER JOIN country AS C ON M.countryIdx = C.idx WHERE (M.age = 24) AND (C.code = "KO")'
  )
})

// table: string, type: string, join: string, on: string, columns: array, where: object, group: string
test(`querySelectJoinGroup('member AS M', 'INNER', 'country AS C', 'M.countryIdx = C.idx', ['M.name', 'C.code'], { 'M.age': 24, 'C.code': '"KO"' }, '') returns 'SELECT M.name, C.code FROM member AS M INNER JOIN country AS C ON M.countryIdx = C.idx WHERE (M.age = 24) AND (C.code = "KO")'`, () => {
  const table = 'member AS M'
  const type = 'INNER'
  const join = 'country AS C'
  const on = 'M.countryIdx = C.idx'
  const columns = ['M.name', 'C.code']
  const where = { 'M.age': 24, 'C.code': '"KO"' }
  const group = ''
  const call = alquery.querySelectJoinGroup(
    table,
    type,
    join,
    on,
    columns,
    where,
    group
  )
  expect(call).toBe(
    'SELECT M.name, C.code FROM member AS M INNER JOIN country AS C ON M.countryIdx = C.idx WHERE (M.age = 24) AND (C.code = "KO")'
  )
})

test(`querySelectJoinGroup('member AS M', 'INNER', 'country AS C', 'M.countryIdx = C.idx', ['M.name', 'M.age', 'C.code'], { 'C.code': '"KO"' }, 'M.age') returns 'SELECT M.name, M.age, C.code FROM member AS M INNER JOIN country AS C ON M.countryIdx = C.idx WHERE (C.code = "KO") GROUP BY M.age'`, () => {
  const table = 'member AS M'
  const type = 'INNER'
  const join = 'country AS C'
  const on = 'M.countryIdx = C.idx'
  const columns = ['M.name', 'M.age', 'C.code']
  const where = { 'C.code': '"KO"' }
  const group = 'M.age'
  const call = alquery.querySelectJoinGroup(
    table,
    type,
    join,
    on,
    columns,
    where,
    group
  )
  expect(call).toBe(
    'SELECT M.name, M.age, C.code FROM member AS M INNER JOIN country AS C ON M.countryIdx = C.idx WHERE (C.code = "KO") GROUP BY M.age'
  )
})

// table: string, type: string, join: string, on: string, columns: array, where: object, group: string, having: string
test(`querySelectJoinGroup('member AS M', 'INNER', 'country AS C', 'M.countryIdx = C.idx', ['M.name', 'M.age', 'C.code'], { 'C.code': '"KO"' }, 'M.age', 'SUM(M.amount) > 10000') returns 'SELECT M.name, M.age, C.code FROM member AS M INNER JOIN country AS C ON M.countryIdx = C.idx WHERE (C.code = "KO") GROUP BY M.age HAVING SUM(M.amount) > 10000'`, () => {
  const table = 'member AS M'
  const type = 'INNER'
  const join = 'country AS C'
  const on = 'M.countryIdx = C.idx'
  const columns = ['M.name', 'M.age', 'C.code']
  const where = { 'C.code': '"KO"' }
  const group = 'M.age'
  const having = 'SUM(M.amount) > 10000'
  const call = alquery.querySelectJoinGroup(
    table,
    type,
    join,
    on,
    columns,
    where,
    group,
    having
  )
  expect(call).toBe(
    'SELECT M.name, M.age, C.code FROM member AS M INNER JOIN country AS C ON M.countryIdx = C.idx WHERE (C.code = "KO") GROUP BY M.age HAVING SUM(M.amount) > 10000'
  )
})
