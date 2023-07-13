import alquery from '../src/index.js'

// undefined
test(`parseWhere() returns ''`, () => {
  const call = alquery.parseWhere()
  expect(call).toBe('')
})

// null
test(`parseWhere(null) returns ''`, () => {
  const where = null
  const call = alquery.parseWhere(where)
  expect(call).toBe('')
})

// string
test(`parseWhere('') returns ''`, () => {
  const where = ''
  const call = alquery.parseWhere(where)
  expect(call).toBe('')
})

test(`parseWhere('age = 24') returns ' WHERE age = 24'`, () => {
  const where = 'age = 24'
  const call = alquery.parseWhere(where)
  expect(call).toBe(' WHERE age = 24')
})

test(`parseWhere('name = "Aiden"') returns ' WHERE name = "Aiden"'`, () => {
  const where = 'name = "Aiden"'
  const call = alquery.parseWhere(where)
  expect(call).toBe(' WHERE name = "Aiden"')
})

test(`parseWhere('dateReg = NOW()') returns ' WHERE dateReg = NOW()'`, () => {
  const where = 'dateReg = NOW()'
  const call = alquery.parseWhere(where)
  expect(call).toBe(' WHERE dateReg = NOW()')
})

test(`parseWhere('age = 24 AND gender = "male"') returns ' WHERE age = 24 AND gender = "male"'`, () => {
  const where = 'age = 24 AND gender = "male"'
  const call = alquery.parseWhere(where)
  expect(call).toBe(' WHERE age = 24 AND gender = "male"')
})

test(`parseWhere('age = 24 OR gender = "male"') returns ' WHERE age = 24 OR gender = "male"'`, () => {
  const where = 'age = 24 OR gender = "male"'
  const call = alquery.parseWhere(where)
  expect(call).toBe(' WHERE age = 24 OR gender = "male"')
})

// array
test(`parseWhere([]) returns ''`, () => {
  const where = []
  const call = alquery.parseWhere(where)
  expect(call).toBe('')
})

test(`parseWhere(['age = 24']) returns ' WHERE (age = 24)'`, () => {
  const where = ['age = 24']
  const call = alquery.parseWhere(where)
  expect(call).toBe(' WHERE (age = 24)')
})

test(`parseWhere(['age = 24', 'gender = "male"']) returns ' WHERE (age = 24) AND (gender = "male")'`, () => {
  const where = ['age = 24', 'gender = "male"']
  const call = alquery.parseWhere(where)
  expect(call).toBe(' WHERE (age = 24) AND (gender = "male")')
})

test(`parseWhere(['age = 24', 'dateReg = NOW()']) returns ' WHERE (age = 24) AND (dateReg = NOW())'`, () => {
  const where = ['age = 24', 'dateReg = NOW()']
  const call = alquery.parseWhere(where)
  expect(call).toBe(' WHERE (age = 24) AND (dateReg = NOW())')
})

test(`parseWhere(['age = 24', 'gender = "male"']) returns ' WHERE (age = 24) AND (gender = "male") OR (name = "Aiden")'`, () => {
  const where = ['age = 24', 'gender = "male"', 'OR', 'name = "Aiden"']
  const call = alquery.parseWhere(where)
  expect(call).toBe(
    ' WHERE (age = 24) AND (gender = "male") OR (name = "Aiden")'
  )
})

// object
test(`parseWhere({}) returns ''`, () => {
  const where = {}
  const call = alquery.parseWhere(where)
  expect(call).toBe('')
})

test(`parseWhere({ age: 24 }) returns ' WHERE (age = 24)'`, () => {
  const where = { age: 24 }
  const call = alquery.parseWhere(where)
  expect(call).toBe(' WHERE (age = 24)')
})

test(`parseWhere({ age: 24, gender: \`"male"\` }) returns ' WHERE (age = 24) AND (gender = "male")'`, () => {
  const where = { age: 24, gender: `"male"` }
  const call = alquery.parseWhere(where)
  expect(call).toBe(' WHERE (age = 24) AND (gender = "male")')
})

test(`parseWhere({ age: 24, dateReg: 'NOW()' }) returns ' WHERE (age = 24) AND (dateReg = NOW())'`, () => {
  const where = { age: 24, dateReg: 'NOW()' }
  const call = alquery.parseWhere(where)
  expect(call).toBe(' WHERE (age = 24) AND (dateReg = NOW())')
})

test(`parseWhere({ age: '24', gender: \`"male"\`, OR: true, name: \`"Aiden"\` }) returns ' WHERE (age = 24) AND (gender = "male") OR (name = "Aiden")'`, () => {
  const where = { age: '24', gender: `"male"`, OR: true, name: `"Aiden"` }
  const call = alquery.parseWhere(where)
  expect(call).toBe(
    ' WHERE (age = 24) AND (gender = "male") OR (name = "Aiden")'
  )
})

test(`parseWhere({ age: 24, gender: \`"male"\`, _:'name = "Aiden"' }) returns ' WHERE (age = 24) AND (gender = "male") AND (name = "Aiden")'`, () => {
  const where = { age: 24, gender: `"male"`, _: 'name = "Aiden"' }
  const call = alquery.parseWhere(where)
  expect(call).toBe(
    ' WHERE (age = 24) AND (gender = "male") AND (name = "Aiden")'
  )
})

test(`parseWhere({ age: 24, gender: \`"male"\`, OR: true, _: \`name = "Aiden"\` }) returns ' WHERE (age = 24) AND (gender = "male") OR (name = "Aiden")'`, () => {
  const where = { age: 24, gender: `"male"`, OR: true, _: `name = "Aiden"` }
  const call = alquery.parseWhere(where)
  expect(call).toBe(
    ' WHERE (age = 24) AND (gender = "male") OR (name = "Aiden")'
  )
})

test(`parseWhere({ age: '<= 24', gender: \`"male"\` }) returns ' WHERE (age >= 24) AND (gender = "male")'`, () => {
  const where = { age: '>= 24', gender: `"male"` }
  const call = alquery.parseWhere(where)
  expect(call).toBe(' WHERE (age >= 24) AND (gender = "male")')
})

test(`parseWhere({ memo: \`AGAINST("Important")\` }) returns ' WHERE (MATCH(memo) AGAINST("Important"))'`, () => {
  const where = { memo: `AGAINST("Important")` }
  const call = alquery.parseWhere(where)
  expect(call).toBe(' WHERE (MATCH(memo) AGAINST("Important"))')
})

test(`parseWhere({ birth: \`BETWEEN "1975-01-01" AND "1975-12-31"\` }) returns ' WHERE (birth BETWEEN "1975-01-01" AND "1975-12-31")'`, () => {
  const where = { birth: `BETWEEN "1975-01-01" AND "1975-12-31"` }
  const call = alquery.parseWhere(where)
  expect(call).toBe(' WHERE (birth BETWEEN "1975-01-01" AND "1975-12-31")')
})

test(`parseWhere({ born: \`IN ("seoul", "busan")\` }) returns ' WHERE (born IN ("seoul", "busan"))'`, () => {
  const where = { born: `IN ("seoul", "busan")` }
  const call = alquery.parseWhere(where)
  expect(call).toBe(' WHERE (born IN ("seoul", "busan"))')
})

test(`parseWhere({ week: \`LIKE "%es___"\` }) returns ' WHERE (week LIKE "%es___")'`, () => {
  const where = { week: `LIKE "%es___"` }
  const call = alquery.parseWhere(where)
  expect(call).toBe(' WHERE (week LIKE "%es___")')
})

test(`parseWhere({ memo: \`MATCH AGAINST("Important High")\` }) returns ' WHERE (MATCH(memo) AGAINST("Important High"))'`, () => {
  const where = { memo: `MATCH AGAINST("Important High")` }
  const call = alquery.parseWhere(where)
  expect(call).toBe(' WHERE (MATCH(memo) AGAINST("Important High"))')
})
