import alquery from '../src/index.js'

// table: undefined
test(`querySelectGroup() occurs error`, () => {
  const call = () => alquery.querySelectGroup()
  const error = new Error(
    '[parseTable] Not passed table name to be used in query statement.'
  )
  expect(call).toThrow(error)
})

// table: null
test(`querySelectGroup(null) occurs error`, () => {
  const table = null
  const call = () => alquery.querySelectGroup(table)
  const error = new Error(
    '[parseTable] Not passed table name to be used in query statement.'
  )
  expect(call).toThrow(error)
})

// table: string
test(`querySelectGroup('') occurs error`, () => {
  const table = ''
  const call = () => alquery.querySelectGroup(table)
  const error = new Error(
    '[parseTable] Not passed table name to be used in query statement.'
  )
  expect(call).toThrow(error)
})

test(`querySelectGroup('member') returns 'SELECT * FROM member'`, () => {
  const table = 'member'
  const call = alquery.querySelectGroup(table)
  expect(call).toBe('SELECT * FROM member')
})

// table: array
test(`querySelectGroup([]) occurs error`, () => {
  const table = []
  const call = () => alquery.querySelectGroup(table)
  const error = new Error(
    '[parseTable] Table name to use in the query statement is not specified.'
  )
  expect(call).toThrow(error)
})

test(`querySelectGroup(['member']) returns 'SELECT * FROM member'`, () => {
  const table = ['member']
  const call = alquery.querySelectGroup(table)
  expect(call).toBe('SELECT * FROM member')
})

// table: object
test(`querySelectGroup({}) occurs error`, () => {
  const table = {}
  const call = () => alquery.querySelectGroup(table)
  const error = new Error(
    '[parseTable] Table name to use in the query statement is not specified.'
  )
  expect(call).toThrow(error)
})

test(`querySelectGroup({ member: 'Member table' }) returns 'SELECT * FROM member'`, () => {
  const table = { member: 'Member table' }
  const call = alquery.querySelectGroup(table)
  expect(call).toBe('SELECT * FROM member')
})

// table: string, columns: null
test(`querySelectGroup('member', null) returns 'SELECT * FROM member'`, () => {
  const table = 'member'
  const columns = null
  const call = alquery.querySelectGroup(table, columns)
  expect(call).toBe('SELECT * FROM member')
})

// table: string, columns: string
test(`querySelectGroup('member', '') returns 'SELECT * FROM member'`, () => {
  const table = 'member'
  const columns = ''
  const call = alquery.querySelectGroup(table, columns)
  expect(call).toBe('SELECT * FROM member')
})

test(`querySelectGroup('member', 'age') returns 'SELECT age FROM member'`, () => {
  const table = 'member'
  const columns = 'age'
  const call = alquery.querySelectGroup(table, columns)
  expect(call).toBe('SELECT age FROM member')
})

test(`querySelectGroup('member', 'age, name') returns 'SELECT age, name FROM member'`, () => {
  const table = 'member'
  const columns = 'age, name'
  const call = alquery.querySelectGroup(table, columns)
  expect(call).toBe('SELECT age, name FROM member')
})

// table: string, columns: array
test(`querySelectGroup('member', []) returns 'SELECT * FROM member'`, () => {
  const table = 'member'
  const columns = []
  const call = alquery.querySelectGroup(table, columns)
  expect(call).toBe('SELECT * FROM member')
})

test(`querySelectGroup('member', ['age']) returns 'SELECT age FROM member'`, () => {
  const table = 'member'
  const columns = ['age']
  const call = alquery.querySelectGroup(table, columns)
  expect(call).toBe('SELECT age FROM member')
})

test(`querySelectGroup('member', ['age', 'name']) returns 'SELECT age, name FROM member'`, () => {
  const table = 'member'
  const columns = ['age', 'name']
  const call = alquery.querySelectGroup(table, columns)
  expect(call).toBe('SELECT age, name FROM member')
})

// table: string, columns: object
test(`querySelectGroup('member', {}) returns 'SELECT * FROM member'`, () => {
  const table = 'member'
  const columns = {}
  const call = alquery.querySelectGroup(table, columns)
  expect(call).toBe('SELECT * FROM member')
})

test(`querySelectGroup('member', { age: 'Member Age' }) returns 'SELECT age FROM member'`, () => {
  const table = 'member'
  const columns = { age: 'Member Age' }
  const call = alquery.querySelectGroup(table, columns)
  expect(call).toBe('SELECT age FROM member')
})

test(`querySelectGroup('member', { age: 'Member Age', name: 'Member Name' }) returns 'SELECT age, name FROM member'`, () => {
  const table = 'member'
  const columns = {
    age: 'Member Age',
    name: 'Member Name'
  }
  const call = alquery.querySelectGroup(table, columns)
  expect(call).toBe('SELECT age, name FROM member')
})

// table: string, columns: array, where: null
test(`querySelectGroup('member', [], null) returns 'SELECT * FROM member'`, () => {
  const table = 'member'
  const columns = []
  const where = null
  const call = alquery.querySelectGroup(table, columns, where)
  expect(call).toBe('SELECT * FROM member')
})

// table: string, columns: array, where: string
test(`querySelectGroup('member', [], '') returns 'SELECT * FROM member'`, () => {
  const table = 'member'
  const columns = []
  const where = ''
  const call = alquery.querySelectGroup(table, columns, where)
  expect(call).toBe('SELECT * FROM member')
})

test(`querySelectGroup('member', ['age', 'name'], '') returns 'SELECT age, name FROM member WHERE age > 20'`, () => {
  const table = 'member'
  const columns = ['age', 'name']
  const where = 'age > 20'
  const call = alquery.querySelectGroup(table, columns, where)
  expect(call).toBe('SELECT age, name FROM member WHERE age > 20')
})

// table: string, columns: array, where: array
test(`querySelectGroup('member', ['age', 'name'], []) returns 'SELECT age, name FROM member'`, () => {
  const table = 'member'
  const columns = ['age', 'name']
  const where = []
  const call = alquery.querySelectGroup(table, columns, where)
  expect(call).toBe('SELECT age, name FROM member')
})

test(`querySelectGroup('member', ['age', 'name'], ['age > 20', 'gender = "male"']) returns 'SELECT age, name FROM member WHERE (age = 24) AND (gender = "male")'`, () => {
  const table = 'member'
  const columns = ['age', 'name']
  const where = ['age > 20', 'gender = "male"']
  const call = alquery.querySelectGroup(table, columns, where)
  expect(call).toBe(
    'SELECT age, name FROM member WHERE (age > 20) AND (gender = "male")'
  )
})

// table: string, columns: array, where: object
test(`querySelectGroup('member', ['age', 'name'], { age: 24, gender: \`"male"\` }) returns 'SELECT age, name FROM member WHERE (age = 24) AND (gender = "male")'`, () => {
  const table = 'member'
  const columns = ['age', 'name']
  const where = { age: 24, gender: `"male"` }
  const call = alquery.querySelectGroup(table, columns, where)
  expect(call).toBe(
    'SELECT age, name FROM member WHERE (age = 24) AND (gender = "male")'
  )
})

test(`querySelectGroup('member', ['age', 'name'], { age: 24, dateReg: 'NOW()' }) returns 'SELECT age, name FROM member WHERE (age > 20) AND (dateReg = NOW())'`, () => {
  const table = 'member'
  const columns = ['age', 'name']
  const where = { age: '> 20', dateReg: 'NOW()' }
  const call = alquery.querySelectGroup(table, columns, where)
  expect(call).toBe(
    'SELECT age, name FROM member WHERE (age > 20) AND (dateReg = NOW())'
  )
})

// table: string, columns: array, where: object, group: null
test(`querySelectGroup('member', ['age', 'name'], { age: 24, gender: \`"male"\` }, null) returns 'SELECT age, name FROM member WHERE (age = 24) AND (gender = "male")'`, () => {
  const table = 'member'
  const columns = ['age', 'name']
  const where = { age: 24, gender: `"male"` }
  const group = null
  const call = alquery.querySelectGroup(table, columns, where, group)
  expect(call).toBe(
    'SELECT age, name FROM member WHERE (age = 24) AND (gender = "male")'
  )
})

// table: string, columns: array, where: object, group: string
test(`querySelectGroup('member', ['age', 'name'], { age: 24, gender: \`"male"\` }, '') returns 'SELECT age, name FROM member WHERE (age = 24) AND (gender = "male")'`, () => {
  const table = 'member'
  const columns = ['age', 'name']
  const where = { age: 24, gender: `"male"` }
  const group = ''
  const call = alquery.querySelectGroup(table, columns, where, group)
  expect(call).toBe(
    'SELECT age, name FROM member WHERE (age = 24) AND (gender = "male")'
  )
})

test(`querySelectGroup('member', ['age', 'name'], { age: 24 }, 'gender') returns 'SELECT age, name FROM member WHERE (age = 24) GROUP BY gender'`, () => {
  const table = 'member'
  const columns = ['age', 'name']
  const where = { age: 24 }
  const group = 'gender'
  const call = alquery.querySelectGroup(table, columns, where, group)
  expect(call).toBe(
    'SELECT age, name FROM member WHERE (age = 24) GROUP BY gender'
  )
})

// table: string, columns: array, where: object, group: array
test(`querySelectGroup('member', ['age', 'name'], { age: 24, gender: \`"male"\` }, []) returns 'SELECT age, name FROM member WHERE (age = 24) AND (gender = "male")'`, () => {
  const table = 'member'
  const columns = ['age', 'name']
  const where = { age: 24, gender: `"male"` }
  const group = []
  const call = alquery.querySelectGroup(table, columns, where, group)
  expect(call).toBe(
    'SELECT age, name FROM member WHERE (age = 24) AND (gender = "male")'
  )
})

test(`querySelectGroup('member', ['age', 'name'], { age: 24 }, ['gender']) returns 'SELECT age, name FROM member WHERE (age = 24) GROUP BY gender'`, () => {
  const table = 'member'
  const columns = ['age', 'name']
  const where = { age: 24 }
  const group = ['gender']
  const call = alquery.querySelectGroup(table, columns, where, group)
  expect(call).toBe(
    'SELECT age, name FROM member WHERE (age = 24) GROUP BY gender'
  )
})

// table: string, columns: array, where: object, group: object
test(`querySelectGroup('member', ['age', 'name'], { age: 24, gender: \`"male"\` }, {}) returns 'SELECT age, name FROM member WHERE (age = 24) AND (gender = "male")'`, () => {
  const table = 'member'
  const columns = ['age', 'name']
  const where = { age: 24, gender: `"male"` }
  const group = {}
  const call = alquery.querySelectGroup(table, columns, where, group)
  expect(call).toBe(
    'SELECT age, name FROM member WHERE (age = 24) AND (gender = "male")'
  )
})

test(`querySelectGroup('member', ['age', 'name'], { age: 24 }, { gender: 'Member Gender' }) returns 'SELECT age, name FROM member WHERE (age = 24) GROUP BY gender'`, () => {
  const table = 'member'
  const columns = ['age', 'name']
  const where = { age: 24 }
  const group = { gender: 'Member Gender' }
  const call = alquery.querySelectGroup(table, columns, where, group)
  expect(call).toBe(
    'SELECT age, name FROM member WHERE (age = 24) GROUP BY gender'
  )
})

// table: string, columns: array, where: object, group: string, having: null
test(`querySelectGroup('member', ['age', 'name'], { age: 24 }, 'gender', null) returns 'SELECT age, name FROM member WHERE (age = 24) GROUP BY gender'`, () => {
  const table = 'member'
  const columns = ['age', 'name']
  const where = { age: 24 }
  const group = 'gender'
  const having = null
  const call = alquery.querySelectGroup(table, columns, where, group, having)
  expect(call).toBe(
    'SELECT age, name FROM member WHERE (age = 24) GROUP BY gender'
  )
})

// table: string, columns: array, where: object, group: string, having: string
test(`querySelectGroup('member', ['age', 'name'], { age: 24 }, 'gender', '') returns 'SELECT age, name FROM member WHERE (age = 24) GROUP BY gender'`, () => {
  const table = 'member'
  const columns = ['age', 'name']
  const where = { age: 24 }
  const group = 'gender'
  const having = ''
  const call = alquery.querySelectGroup(table, columns, where, group, having)
  expect(call).toBe(
    'SELECT age, name FROM member WHERE (age = 24) GROUP BY gender'
  )
})

test(`querySelectGroup('account', ['date', 'SUM(amount)'], { complete: true }, 'date', 'SUM(amount) > 10000') returns 'SELECT date, SUM(amount) FROM account WHERE (complete = true) GROUP BY date HAVING SUM(amount) > 10000'`, () => {
  const table = 'account'
  const columns = ['date', 'SUM(amount)']
  const where = { complete: true }
  const group = 'date'
  const having = 'SUM(amount) > 10000'
  const call = alquery.querySelectGroup(table, columns, where, group, having)
  expect(call).toBe(
    'SELECT date, SUM(amount) FROM account WHERE (complete = true) GROUP BY date HAVING SUM(amount) > 10000'
  )
})

// table: string, columns: array, where: object, group: string, having: string, order: string
test(`querySelectGroup('account', ['date', 'SUM(amount)'], { complete: true }, 'date', 'SUM(amount) > 10000', 'date DESC') returns 'SELECT date, SUM(amount) FROM account WHERE (complete = true) GROUP BY date HAVING SUM(amount) > 10000 ORDER BY date DESC'`, () => {
  const table = 'account'
  const columns = ['date', 'SUM(amount)']
  const where = { complete: true }
  const group = 'date'
  const having = 'SUM(amount) > 10000'
  const order = 'date DESC'
  const call = alquery.querySelectGroup(
    table,
    columns,
    where,
    group,
    having,
    order
  )
  expect(call).toBe(
    'SELECT date, SUM(amount) FROM account WHERE (complete = true) GROUP BY date HAVING SUM(amount) > 10000 ORDER BY date DESC'
  )
})

// table: string, columns: array, where: object, group: string, having: string, order: string, limit: number
test(`querySelectGroup('account', ['date', 'SUM(amount)'], { complete: true }, 'date', 'SUM(amount) > 10000', 'date DESC', 5) returns 'SELECT date, SUM(amount) FROM account WHERE (complete = true) GROUP BY date HAVING SUM(amount) > 10000 ORDER BY date DESC LIMIT 5'`, () => {
  const table = 'account'
  const columns = ['date', 'SUM(amount)']
  const where = { complete: true }
  const group = 'date'
  const having = 'SUM(amount) > 10000'
  const order = 'date DESC'
  const limit = 5
  const call = alquery.querySelectGroup(
    table,
    columns,
    where,
    group,
    having,
    order,
    limit
  )
  expect(call).toBe(
    'SELECT date, SUM(amount) FROM account WHERE (complete = true) GROUP BY date HAVING SUM(amount) > 10000 ORDER BY date DESC LIMIT 5'
  )
})
