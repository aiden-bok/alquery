import alquery from '../src/index.js'

// undefined
test('parseUpdateValues() occurs error', () => {
  const call = () => alquery.parseUpdateValues()
  const error = new Error(
    '[parseUpdateValues] Not passed object consisting of column and value to be used in UPDATE query statement!'
  )
  expect(call).toThrow(error)
})

// null
test('parseUpdateValues(null) occurs error', () => {
  const value = null
  const call = () => alquery.parseUpdateValues(value)
  const error = new Error(
    '[parseUpdateValues] Not passed object consisting of column and value to be used in UPDATE query statement!'
  )
  expect(call).toThrow(error)
})

// string
test("parseUpdateValues('') occurs error", () => {
  const value = ''
  const call = () => alquery.parseUpdateValues(value)
  const error = new Error(
    '[parseUpdateValues] Not passed object consisting of column and value to be used in UPDATE query statement!'
  )
  expect(call).toThrow(error)
})

test("parseUpdateValues('age = 24') returns ' SET age = 24'", () => {
  const value = 'age = 24'
  const call = alquery.parseUpdateValues(value)
  expect(call).toBe(' SET age = 24')
})

test("parseUpdateValues(\"name = 'Aiden'\") returns ' SET name = \"'Aiden'\"", () => {
  const value = "name = 'Aiden'"
  const call = alquery.parseUpdateValues(value)
  expect(call).toBe(' SET name = "\'Aiden\'"')
})

test('parseUpdateValues(`name = "Aiden"`) returns \' SET name = "Aiden"', () => {
  const value = `name = "Aiden"`
  const call = alquery.parseUpdateValues(value)
  expect(call).toBe(' SET name = "Aiden"')
})

test('parseUpdateValues(\'name = "Aiden"\') returns \' SET name = "Aiden"\'', () => {
  const value = 'name = "Aiden"'
  const call = alquery.parseUpdateValues(value)
  expect(call).toBe(' SET name = "Aiden"')
})

test("parseUpdateValues('dateReg = NOW()') returns ' SET dateReg = NOW()", () => {
  const value = 'dateReg = \\NOW()'
  const call = alquery.parseUpdateValues(value)
  expect(call).toBe(' SET dateReg = NOW()')
})

test("parseUpdateValues('age = 24, name = \"Aiden\"') returns ' SET age = 24'", () => {
  const value = 'age = 24, name = "Aiden"'
  const call = alquery.parseUpdateValues(value)
  expect(call).toBe(' SET age = 24, name = "Aiden"')
})

test('parseUpdateValues(\'age, name = "Aiden"\') returns \' SET name = "Aiden"\'', () => {
  const value = 'age, name = "Aiden"'
  const call = alquery.parseUpdateValues(value)
  expect(call).toBe(' SET name = "Aiden"')
})

test("parseUpdateValues('age = 24, name') returns ' SET age = 24'", () => {
  const value = 'age = 24, name'
  const call = alquery.parseUpdateValues(value)
  expect(call).toBe(' SET age = 24')
})

test("parseUpdateValues('age, name') occurs error", () => {
  const value = 'age, name'
  const call = () => alquery.parseUpdateValues(value)
  const error = new Error(
    '[parseUpdateValues] Object consisting of columns and values for use in an UPDATE query statement was specified incorrectly!'
  )
  expect(call).toThrow(error)
})

// array
test('parseUpdateValues([]) occurs error', () => {
  const value = []
  const call = () => alquery.parseUpdateValues(value)
  const error = new Error(
    '[parseUpdateValues] Object consisting of columns and values for use in an UPDATE query statement was specified incorrectly!'
  )
  expect(call).toThrow(error)
})

test("parseUpdateValues(['age = 24']) returns ' SET age = 24'", () => {
  const value = ['age = 24']
  const call = alquery.parseUpdateValues(value)
  expect(call).toBe(' SET age = 24')
})

test("parseUpdateValues(['dateReg = \\NOW()']) returns ' SET dateReg = NOW()'", () => {
  const value = ['dateReg = \\NOW()']
  const call = alquery.parseUpdateValues(value)
  expect(call).toBe(' SET dateReg = NOW()')
})

test('parseUpdateValues([\'age = 24\', \'name = "Aiden"]) returns \' SET age = 24, name = "Aiden"', () => {
  const value = ['age = 24', 'name = "Aiden"']
  const call = alquery.parseUpdateValues(value)
  expect(call).toBe(' SET age = 24, name = "Aiden"')
})

test("parseUpdateValues(['age = 24', 'name']) returns ' SET age = 24'", () => {
  const value = ['age = 24', 'name']
  const call = alquery.parseUpdateValues(value)
  expect(call).toBe(' SET age = 24')
})

test("parseUpdateValues(['age', 'name']) occurs error", () => {
  const value = ['age', 'name']
  const call = () => alquery.parseUpdateValues(value)
  const error = new Error(
    '[parseUpdateValues] Object consisting of columns and values for use in an UPDATE query statement was specified incorrectly!'
  )
  expect(call).toThrow(error)
})

// object
test('parseUpdateValues({}) occurs error', () => {
  const value = {}
  const call = () => alquery.parseUpdateValues(value)
  const error = new Error(
    '[parseUpdateValues] Object consisting of columns and values for use in an UPDATE query statement was specified incorrectly!'
  )
  expect(call).toThrow(error)
})

test("parseUpdateValues({ age: 24 }) returns ' SET age = 24'", () => {
  const value = { age: 24 }
  const call = alquery.parseUpdateValues(value)
  expect(call).toBe(' SET age = 24')
})

test("parseUpdateValues({ age: 24, name: 'Aiden' }) returns ' SET age = 24, name = \"Aiden\"'", () => {
  const value = { age: 24, name: 'Aiden' }
  const call = alquery.parseUpdateValues(value)
  expect(call).toBe(' SET age = 24, name = "Aiden"')
})

test('parseUpdateValues({ age: 24, name: \'"Aiden"\' }) returns \' SET age = 24, name = "Aiden"', () => {
  const value = { age: 24, name: '"Aiden"' }
  const call = alquery.parseUpdateValues(value)
  expect(call).toBe(' SET age = 24, name = "Aiden"')
})

test('parseUpdateValues({ age: 24, name: `"Aiden"` }) returns \' SET age = 24, name = "Aiden"', () => {
  const value = { age: 24, name: `"Aiden"` }
  const call = alquery.parseUpdateValues(value)
  expect(call).toBe(' SET age = 24, name = "Aiden"')
})

test("parseUpdateValues({ age: 24, dateReg: '\\NOW()' }) returns ' SET age = 24, dateReg = NOW()", () => {
  const value = { age: 24, dateReg: '\\NOW()' }
  const call = alquery.parseUpdateValues(value)
  expect(call).toBe(' SET age = 24, dateReg = NOW()')
})
