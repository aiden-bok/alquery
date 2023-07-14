import alquery from '../src/index.js'

// group: undefined
test(`parseGroup() returns ''`, () => {
  const call = alquery.parseGroup()
  expect(call).toBe('')
})

// group: null
test(`parseGroup(null) returns ''`, () => {
  const group = null
  const call = alquery.parseGroup(group)
  expect(call).toBe('')
})

// group: string
test(`parseGroup('') returns ''`, () => {
  const group = ''
  const call = alquery.parseGroup(group)
  expect(call).toBe('')
})

test(`parseGroup('age') returns ' GROUP BY age'`, () => {
  const group = 'age'
  const call = alquery.parseGroup(group)
  expect(call).toBe(' GROUP BY age')
})

test(`parseGroup('age, regDate') returns ' GROUP BY age, regDate'`, () => {
  const group = 'age, regDate'
  const call = alquery.parseGroup(group)
  expect(call).toBe(' GROUP BY age, regDate')
})

// group: array
test(`parseGroup([]) returns ''`, () => {
  const group = []
  const call = alquery.parseGroup(group)
  expect(call).toBe('')
})

test(`parseGroup(['age']) returns ' GROUP BY age'`, () => {
  const group = ['age']
  const call = alquery.parseGroup(group)
  expect(call).toBe(' GROUP BY age')
})

test(`parseGroup(['age', 'regDate']) returns ' GROUP BY age, regDate'`, () => {
  const group = ['age', 'regDate']
  const call = alquery.parseGroup(group)
  expect(call).toBe(' GROUP BY age, regDate')
})

// group: object
test(`parseGroup({}) returns ''`, () => {
  const group = {}
  const call = alquery.parseGroup(group)
  expect(call).toBe('')
})

test(`parseGroup({ age: 'Member Age' }) returns ' GROUP BY age'`, () => {
  const group = { age: 'Member Age' }
  const call = alquery.parseGroup(group)
  expect(call).toBe(' GROUP BY age')
})

test(`parseGroup({ age: 'Member Age', regDate: 'Registration Date' }) returns ' GROUP BY age, regDate'`, () => {
  const group = { age: 'Member Age', regDate: 'Registration Date' }
  const call = alquery.parseGroup(group)
  expect(call).toBe(' GROUP BY age, regDate')
})

// group: string, having: null
test(`parseGroup('age', null) returns ' GROUP BY age'`, () => {
  const group = 'age'
  const having = null
  const call = alquery.parseGroup(group, having)
  expect(call).toBe(' GROUP BY age')
})

// group: string, having: string
test(`parseGroup('age', '') returns ' GROUP BY age'`, () => {
  const group = 'age'
  const having = ''
  const call = alquery.parseGroup(group, having)
  expect(call).toBe(' GROUP BY age')
})

test(`parseGroup('', 'SUM(amount) > 10000') returns ''`, () => {
  const group = ''
  const having = 'SUM(amount) > 10000'
  const call = alquery.parseGroup(group, having)
  expect(call).toBe('')
})

test(`parseGroup('date', 'SUM(amount) > 10000') returns ' GROUP BY date HAVING SUM(amount) > 10000'`, () => {
  const group = 'date'
  const having = 'SUM(amount) > 10000'
  const call = alquery.parseGroup(group, having)
  expect(call).toBe(' GROUP BY date HAVING SUM(amount) > 10000')
})

// group: array, having: string
test(`parseGroup(['age'], '') returns ' GROUP BY age'`, () => {
  const group = ['age']
  const having = ''
  const call = alquery.parseGroup(group, having)
  expect(call).toBe(' GROUP BY age')
})

test(`parseGroup([], 'SUM(amount) > 10000') returns ''`, () => {
  const group = []
  const having = 'SUM(amount) > 10000'
  const call = alquery.parseGroup(group, having)
  expect(call).toBe('')
})

test(`parseGroup(['date'], 'SUM(amount) > 10000') returns ' GROUP BY date HAVING SUM(amount) > 10000'`, () => {
  const group = ['date']
  const having = 'SUM(amount) > 10000'
  const call = alquery.parseGroup(group, having)
  expect(call).toBe(' GROUP BY date HAVING SUM(amount) > 10000')
})

// group: object, having: string
test(`parseGroup({ age: 'Member Age' }, '') returns ' GROUP BY age'`, () => {
  const group = { age: 'Member Age' }
  const having = ''
  const call = alquery.parseGroup(group, having)
  expect(call).toBe(' GROUP BY age')
})

test(`parseGroup({}, 'SUM(amount) > 10000') returns ''`, () => {
  const group = {}
  const having = 'SUM(amount) > 10000'
  const call = alquery.parseGroup(group, having)
  expect(call).toBe('')
})

test(`parseGroup({ date: 'Trading Day' }, 'SUM(amount) > 10000') returns ' GROUP BY date HAVING SUM(amount) > 10000'`, () => {
  const group = { date: 'Trading Day' }
  const having = 'SUM(amount) > 10000'
  const call = alquery.parseGroup(group, having)
  expect(call).toBe(' GROUP BY date HAVING SUM(amount) > 10000')
})
