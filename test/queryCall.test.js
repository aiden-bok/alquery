import alquery from '../src/index.js'

// target: undefined
test(`queryCall() occurs error`, () => {
  const call = () => alquery.queryCall()
  const error = new Error(
    '[parseCall] Not passed call target to be used in query statement.'
  )
  expect(call).toThrow(error)
})

// target: string
test(`queryCall('') occurs error`, () => {
  const call = () => alquery.queryCall('')
  const error = new Error(
    '[parseCall] Not passed call target to be used in query statement.'
  )
  expect(call).toThrow(error)
})

test(`queryCall('my_procedure') returns { param: [], query: 'CALL my_procedure()' }`, () => {
  const target = 'my_procedure'
  const call = alquery.queryCall(target)
  expect(call).toStrictEqual({ param: [], query: 'CALL my_procedure()' })
})

// target: string, parameters: null
test(`queryCall('my_procedure', null) returns { param: [], query: 'CALL my_procedure()' }`, () => {
  const target = 'my_procedure'
  const parameters = null
  const call = alquery.queryCall(target, parameters)
  expect(call).toStrictEqual({ param: [], query: 'CALL my_procedure()' })
})

// target: string, parameters: array
test(`queryCall('my_procedure', []) returns { param: [], query: 'CALL my_procedure()' }`, () => {
  const target = 'my_procedure'
  const parameters = []
  const call = alquery.queryCall(target, parameters)
  expect(call).toStrictEqual({ param: [], query: 'CALL my_procedure()' })
})

test(`queryCall('my_procedure', ['param1']) returns { param: ['param1'], query: 'CALL my_procedure(?)' }`, () => {
  const target = 'my_procedure'
  const parameters = ['param1']
  const call = alquery.queryCall(target, parameters)
  expect(call).toStrictEqual({
    param: ['param1'],
    query: 'CALL my_procedure(?)'
  })
})

test(`queryCall('my_procedure', ['param1', 'param2']) returns { param: ['param1', 'param2'], query: 'CALL my_procedure(?, ?)' }`, () => {
  const target = 'my_procedure'
  const parameters = ['param1', 'param2']
  const call = alquery.queryCall(target, parameters)
  expect(call).toStrictEqual({
    param: ['param1', 'param2'],
    query: 'CALL my_procedure(?, ?)'
  })
})

// target: string, parameters: object
test(`queryCall('my_procedure', {}) returns { param: [], query: 'CALL my_procedure()' }`, () => {
  const target = 'my_procedure'
  const parameters = {}
  const call = alquery.queryCall(target, parameters)
  expect(call).toStrictEqual({ param: [], query: 'CALL my_procedure()' })
})

test(`queryCall('my_procedure', { col1: 'param1' }) returns { param: ['param1'], query: 'CALL my_procedure(?)' }`, () => {
  const target = 'my_procedure'
  const parameters = { col1: 'param1' }
  const call = alquery.queryCall(target, parameters)
  expect(call).toStrictEqual({
    param: ['param1'],
    query: 'CALL my_procedure(?)'
  })
})

test(`queryCall('my_procedure', { col1: 'param1', col2: 'param2' }) returns { param: ['param1', 'param2'], query: 'CALL my_procedure(?, ?)' }`, () => {
  const target = 'my_procedure'
  const parameters = { col1: 'param1', col2: 'param2' }
  const call = alquery.queryCall(target, parameters)
  expect(call).toStrictEqual({
    param: ['param1', 'param2'],
    query: 'CALL my_procedure(?, ?)'
  })
})

// target: string, parameters: string
test(`queryCall('my_procedure', '') returns { param: [], query: 'CALL my_procedure()' }`, () => {
  const target = 'my_procedure'
  const parameters = ''
  const call = alquery.queryCall(target, parameters)
  expect(call).toStrictEqual({ param: [], query: 'CALL my_procedure()' })
})

test(`queryCall('my_procedure', 'param1') returns { param: ['param1'], query: 'CALL my_procedure(?)' }`, () => {
  const target = 'my_procedure'
  const parameters = 'param1'
  const call = alquery.queryCall(target, parameters)
  expect(call).toStrictEqual({
    param: ['param1'],
    query: 'CALL my_procedure(?)'
  })
})

test(`queryCall('my_procedure', 'param1, param2') returns { param: ['param1', 'param2'], query: 'CALL my_procedure(?, ?)' }`, () => {
  const target = 'my_procedure'
  const parameters = 'param1, param2'
  const call = alquery.queryCall(target, parameters)
  expect(call).toStrictEqual({
    param: ['param1', 'param2'],
    query: 'CALL my_procedure(?, ?)'
  })
})
