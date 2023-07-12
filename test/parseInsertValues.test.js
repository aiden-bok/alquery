import alquery from '../src/index.js'

// undefined
test('parseInsertValues() occurs error', () => {
  const call = () => alquery.parseInsertValues()
  const error = new Error(
    '[parseInsertValues] Not passed object consisting of column and value to be used in INSERT query statement!'
  )
  expect(call).toThrow(error)
})

// null
test('parseInsertValues(null) occurs error', () => {
  const values = null
  const call = () => alquery.parseInsertValues(values)
  const error = new Error(
    '[parseInsertValues] Not passed object consisting of column and value to be used in INSERT query statement!'
  )
  expect(call).toThrow(error)
})

// empty string
test("parseInsertValues('') occurs error", () => {
  const values = ''
  const call = () => alquery.parseInsertValues(values)
  const error = new Error(
    '[parseInsertValues] Not passed object consisting of column and value to be used in INSERT query statement!'
  )
  expect(call).toThrow(error)
})

// string
test("parseInsertValues('age = 24') occurs error", () => {
  const values = 'age = 24'
  const call = () => alquery.parseInsertValues(values)
  const error = new Error(
    '[parseInsertValues] Object consisting of columns and values for use in an INSERT query statement was specified incorrectly!'
  )
  expect(call).toThrow(error)
})

// array
test('parseInsertValues([]) occurs error', () => {
  const values = []
  const call = () => alquery.parseInsertValues(values)
  const error = new Error(
    '[parseInsertValues] Object consisting of columns and values for use in an INSERT query statement was specified incorrectly!'
  )
  expect(call).toThrow(error)
})

test("parseInsertValues([24]) returns ' VALUES (24)'", () => {
  const values = [24]
  const call = alquery.parseInsertValues(values)
  expect(call).toBe(' VALUES (24)')
})

test("parseInsertValues(['Aiden']) returns ' VALUES (\"Aiden\")'", () => {
  const values = ['Aiden']
  const call = alquery.parseInsertValues(values)
  expect(call).toBe(' VALUES ("Aiden")')
})

test('parseInsertValues([`Aiden`]) returns \' VALUES ("Aiden")\'', () => {
  const values = [`Aiden`]
  const call = alquery.parseInsertValues(values)
  expect(call).toBe(' VALUES ("Aiden")')
})

test('parseInsertValues([`"Aiden"`]) returns \' VALUES ("Aiden")\'', () => {
  const values = [`"Aiden"`]
  const call = alquery.parseInsertValues(values)
  expect(call).toBe(' VALUES ("Aiden")')
})

test('parseInsertValues([\'"Aiden"\']) returns \' VALUES ("Aiden")\'', () => {
  const values = ['"Aiden"']
  const call = alquery.parseInsertValues(values)
  expect(call).toBe(' VALUES ("Aiden")')
})

test("parseInsertValues([24, 'Aiden']) returns ' VALUES (24, \"Aiden\")'", () => {
  const values = [24, 'Aiden']
  const call = alquery.parseInsertValues(values)
  expect(call).toBe(' VALUES (24, "Aiden")')
})

test("parseInsertValues([[24, 'Aiden'], [22, 'Ailee']]) returns ' VALUES (24, \"Aiden\"), (22, \"Ailee\")'", () => {
  const values = [
    [24, 'Aiden'],
    [22, 'Ailee']
  ]
  const call = alquery.parseInsertValues(values)
  expect(call).toBe(' VALUES (24, "Aiden"), (22, "Ailee")')
})

// object
test('parseInsertValues({}) occurs error', () => {
  const values = {}
  const call = () => alquery.parseInsertValues(values)
  const error = new Error(
    '[parseInsertValues] Object consisting of columns and values for use in an INSERT query statement was specified incorrectly!'
  )
  expect(call).toThrow(error)
})

test("parseInsertValues({ age: 24 }) returns ' (age) VALUES (24)'", () => {
  const values = { age: 24 }
  const call = alquery.parseInsertValues(values)
  expect(call).toBe(' (age) VALUES (24)')
})

test("parseInsertValues({ age: 24, name: 'Aiden' }) returns ' (age, name) VALUES (24, \"Aiden\")'", () => {
  const values = { age: 24, name: 'Aiden' }
  const call = alquery.parseInsertValues(values)
  expect(call).toBe(' (age, name) VALUES (24, "Aiden")')
})

test('parseInsertValues({ age: 24, name: `Aiden` }) returns \' (age, name) VALUES (24, "Aiden")\'', () => {
  const values = { age: 24, name: `Aiden` }
  const call = alquery.parseInsertValues(values)
  expect(call).toBe(' (age, name) VALUES (24, "Aiden")')
})

test('parseInsertValues({ age: 24, name: `"Aiden"` }) returns \' (age, name) VALUES (24, "Aiden")\'', () => {
  const values = { age: 24, name: `"Aiden"` }
  const call = alquery.parseInsertValues(values)
  expect(call).toBe(' (age, name) VALUES (24, "Aiden")')
})

test('parseInsertValues({ age: 24, name: \'"Aiden"\' }) returns \' (age, name) VALUES (24, "Aiden")\'', () => {
  const values = { age: 24, name: '"Aiden"' }
  const call = alquery.parseInsertValues(values)
  expect(call).toBe(' (age, name) VALUES (24, "Aiden")')
})
