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

// string
test("parseInsertValues('') occurs error", () => {
  const values = ''
  const call = () => alquery.parseInsertValues(values)
  const error = new Error(
    '[parseInsertValues] Not passed object consisting of column and value to be used in INSERT query statement!'
  )
  expect(call).toThrow(error)
})

test("parseInsertValues('24') returns ' VALUES (24)'", () => {
  const values = '24'
  const call = alquery.parseInsertValues(values)
  expect(call).toBe(' VALUES (24)')
})

test('parseInsertValues(\'24, "Aiden"\') returns \' VALUES (24, "Aiden")\'', () => {
  const values = '24, "Aiden"'
  const call = alquery.parseInsertValues(values)
  expect(call).toBe(' VALUES (24, "Aiden")')
})

test("parseInsertValues('24, NOW()') returns ' VALUES (24, NOW())'", () => {
  const values = '24, NOW()'
  const call = alquery.parseInsertValues(values)
  expect(call).toBe(' VALUES (24, NOW())')
})

test("parseInsertValues('age = 24') returns ' (age) VALUES (24)'", () => {
  const values = 'age = 24'
  const call = alquery.parseInsertValues(values)
  expect(call).toBe(' (age) VALUES (24)')
})

test('parseInsertValues(\'name = "Aiden"\') returns \' (name) VALUES ("Aiden")\'', () => {
  const values = 'name = "Aiden"'
  const call = alquery.parseInsertValues(values)
  expect(call).toBe(' (name) VALUES ("Aiden")')
})

test('parseInsertValues(\'age = 24, name = "Aiden"\') returns \' (age, name) VALUES (24, "Aiden")\'', () => {
  const values = 'age = 24, name = "Aiden"'
  const call = alquery.parseInsertValues(values)
  expect(call).toBe(' (age, name) VALUES (24, "Aiden")')
})

test("parseInsertValues('age = 24, dateReg = \\NOW()') returns ' (age, dateReg) VALUES (24, NOW())", () => {
  const values = 'age = 24, dateReg = \\NOW()'
  const call = alquery.parseInsertValues(values)
  expect(call).toBe(' (age, dateReg) VALUES (24, NOW())')
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

test("parseInsertValues(['NOW()']) returns ' VALUES (NOW())'", () => {
  const values = ['\\NOW()']
  const call = alquery.parseInsertValues(values)
  expect(call).toBe(' VALUES (NOW())')
})

test("parseInsertValues([24, 'Aiden']) returns ' VALUES (24, \"Aiden\")'", () => {
  const values = [24, 'Aiden']
  const call = alquery.parseInsertValues(values)
  expect(call).toBe(' VALUES (24, "Aiden")')
})

test("parseInsertValues([24, 'NOW()']) returns ' VALUES (24, NOW())'", () => {
  const values = [24, '\\NOW()']
  const call = alquery.parseInsertValues(values)
  expect(call).toBe(' VALUES (24, NOW())')
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

test("parseInsertValues({ dateReg: '\\NOW()' }) returns ' (dateReg) VALUES (NOW())'", () => {
  const values = { dateReg: '\\NOW()' }
  const call = alquery.parseInsertValues(values)
  expect(call).toBe(' (dateReg) VALUES (NOW())')
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

test("parseInsertValues({ age: 24, dateReg: 'NOW()' }) returns ' (age, dateReg) VALUES (24, NOW())'", () => {
  const values = { age: 24, dateReg: '\\NOW()' }
  const call = alquery.parseInsertValues(values)
  expect(call).toBe(' (age, dateReg) VALUES (24, NOW())')
})
