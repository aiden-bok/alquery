import alquery from '../src/index.js'

// undefined
test("parseOrder() returns ''", () => {
  const call = alquery.parseOrder()
  expect(call).toBe('')
})

// null
test("parseOrder(null) returns ''", () => {
  const order = null
  const call = alquery.parseOrder(order)
  expect(call).toBe('')
})

// empty string
test("parseOrder('') returns ''", () => {
  const order = ''
  const call = alquery.parseOrder(order)
  expect(call).toBe('')
})

// string
test("parseOrder('age') returns ' ORDER BY age'", () => {
  const order = 'age'
  const call = alquery.parseOrder(order)
  expect(call).toBe(' ORDER BY age')
})

test("parseOrder('age DESC') returns ' ORDER BY age DESC'", () => {
  const order = 'age DESC'
  const call = alquery.parseOrder(order)
  expect(call).toBe(' ORDER BY age DESC')
})

test("parseOrder('age DESC, name') returns ' ORDER BY age DESC, name'", () => {
  const order = 'age DESC, name'
  const call = alquery.parseOrder(order)
  expect(call).toBe(' ORDER BY age DESC, name')
})

// array
test("parseOrder([]) returns ''", () => {
  const order = []
  const call = alquery.parseOrder(order)
  expect(call).toBe('')
})

test("parseOrder(['age']) returns ' ORDER BY age'", () => {
  const order = ['age']
  const call = alquery.parseOrder(order)
  expect(call).toBe(' ORDER BY age')
})

test("parseOrder(['age DESC']) returns ' ORDER BY age DESC'", () => {
  const order = ['age DESC']
  const call = alquery.parseOrder(order)
  expect(call).toBe(' ORDER BY age DESC')
})

test("parseOrder(['age DESC', 'name']) returns ' ORDER BY age DESC, name'", () => {
  const order = ['age DESC', 'name']
  const call = alquery.parseOrder(order)
  expect(call).toBe(' ORDER BY age DESC, name')
})

// object
test("parseOrder({}) returns ''", () => {
  const order = {}
  const call = alquery.parseOrder(order)
  expect(call).toBe('')
})
