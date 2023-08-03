import alquery from '../src/index.js'

// parameters: undefined
test(`parseParameters() returns []`, () => {
  const call = alquery.parseParameters()
  expect(call).toStrictEqual([])
})

// parameters: array
test(`parseParameters([]) returns []`, () => {
  const parameters = []
  const call = alquery.parseParameters(parameters)
  expect(call).toStrictEqual([])
})

test(`parseParameters(['param1']) returns ['param1']`, () => {
  const parameters = ['param1']
  const call = alquery.parseParameters(parameters)
  expect(call).toStrictEqual(['param1'])
})

test(`parseParameters(['param1', 'param2']) returns ['param1', 'param2']`, () => {
  const parameters = ['param1', 'param2']
  const call = alquery.parseParameters(parameters)
  expect(call).toStrictEqual(['param1', 'param2'])
})

// parameters: object
test(`parseParameters({}) returns []`, () => {
  const parameters = {}
  const call = alquery.parseParameters(parameters)
  expect(call).toStrictEqual([])
})

test(`parseParameters({ col1: 'param1' }) returns ['param1']`, () => {
  const parameters = { col1: 'param1' }
  const call = alquery.parseParameters(parameters)
  expect(call).toStrictEqual(['param1'])
})

test(`parseParameters({ col1: 'param1', col2: 'param2' }) returns ['param1', 'param2']`, () => {
  const parameters = { col1: 'param1', col2: 'param2' }
  const call = alquery.parseParameters(parameters)
  expect(call).toStrictEqual(['param1', 'param2'])
})

// parameters: string
test(`parseParameters('') returns []`, () => {
  const parameters = ''
  const call = alquery.parseParameters(parameters)
  expect(call).toStrictEqual([])
})

test(`parseParameters('param1') returns ['param1']`, () => {
  const parameters = 'param1'
  const call = alquery.parseParameters(parameters)
  expect(call).toStrictEqual(['param1'])
})
test(`parseParameters('param1, param2') returns ['param1', 'param2']`, () => {
  const parameters = 'param1, param2'
  const call = alquery.parseParameters(parameters)
  expect(call).toStrictEqual(['param1', 'param2'])
})
