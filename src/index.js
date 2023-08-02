/**
 * Returns a string with double quotation marks added if the string does not contain double quotation marks.
 *
 * @param {Any} value Value to add to the table.
 * @returns Double quotes added if string.
 */
const addQuotes = (value) => {
  if (value.constructor.name === 'String') {
    if (value.toString().indexOf('\\')) {
      if (value.substring(0, 1) !== '"') {
        value = `"${value}`
      }
      if (value.substring(value.length - 1) !== '"') {
        value = `${value}"`
      }
    } else {
      value = value.replace('\\', '')
    }
  }

  return value
}

/**
 * Returns the generated query statement to execute the `MariaDB` procedure or function using the passed arguments.
 *
 * @param {String} target Procedure name or function name to execute.
 * @param {Array|Object|String} [parameters=null] Parameters to pass when executing `MariaDB` procedure or function.
 * @throws {Error} Not passed call target to be used in query statement.
 * @throws {Error} Call target to use in the query statement is not specified.
 * @throws {Error} Parameters for use in the Call query statement was incorrectly specified.
 * @returns {String} Generated `CALL` query statement.
 */
const parseCall = (target, parameters = null) => {
  if (!target) {
    throw new Error(
      '[parseCall] Not passed call target to be used in query statement.'
    )
  } else if (target.constructor.name !== 'String') {
    throw new Error(
      '[parseCall] Call target to use in the query statement is not specified.'
    )
  }

  let params = ''
  if (!parameters) {
    params = '()'
  } else if (parameters.constructor.name === 'Array') {
    params = '('
    parameters.forEach((param, idx) => {
      params += '?'
      params += idx < parameters.length - 1 ? ', ' : ''
    })
    params += ')'
  } else if (parameters.constructor.name === 'Object') {
    const keys = Object.keys(parameters)
    if (keys.length) {
      params = '('
      keys.forEach((key, idx) => {
        params += '?'
        params += idx < keys.length - 1 ? ', ' : ''
      })
      params += ')'
    }
  } else if (parameters.constructor.name === 'String') {
    const values = String.trim(parameters.split(','))
    params = '('
    values.forEach((value, idx) => {
      params += '?'
      params += idx < values.length - 1 ? ', ' : ''
    })
    params += ')'
  }

  if (!params || !params.startsWith('(') || !params.endsWith(')')) {
    throw new Error(
      '[parseCall] Parameters for use in the Call query statement was incorrectly specified.'
    )
  }

  return target + params
}

/**
 * Returns after converting it into columns to be used in query statement using passed argument.
 *
 * @param {Array|String|Object} [columns=null] Columns to be used in query statement.
 * @returns {String} String converted to columns to be used in query statement.
 */
const parseColumns = (columns = null) => {
  if (columns?.constructor.name === 'String' && columns.length) {
    return ` ${columns}`
  } else if (columns?.constructor.name === 'Array' && columns.length) {
    return ` ${columns.join(', ')}`
  } else if (columns?.constructor.name === 'Object') {
    const keys = Object.keys(columns)
    return keys.length ? ` ${keys.join(', ')}` : ' *'
  } else {
    return ' *'
  }
}

/**
 * Returns after converting it into group by clause to be used in query statement using passed argument.
 *
 * @param {String|Array|Object} [group=null] Group by clause to be used in query statement.
 * @param {String} [having=null] Having condition to be used in group by clause of query statement.
 * @returns {String} String converted to group by clause to be used in query statement.
 */
const parseGroup = (group = null, having = null) => {
  let clause = ''

  if (group?.constructor.name === 'String' && group.length) {
    clause = ` GROUP BY ${group}`
  } else if (group?.constructor.name === 'Array' && group.length) {
    clause = ` GROUP BY ${group.join(', ')}`
  } else if (group?.constructor.name === 'Object') {
    const keys = Object.keys(group)
    if (keys.length) {
      clause = ` GROUP BY ${keys.join(', ')}`
    }
  }

  if (clause && having?.constructor.name === 'String' && having.length) {
    clause += ` HAVING ${having}`
  }

  return clause
}

/**
 * Returns after converting to string that column names and values to be used in `INSERT` query statement.
 *
 * @param {Object|String|Array} values Values object that consisting of column names and values to add to table. Or array of lists of values to add to the table.
 * @throws {Error} Not passed object consisting of column and value to be used in INSERT query statement.
 * @throws {Error} Object consisting of columns and values for use in an INSERT query statement was specified incorrectly.
 * @returns {String} String converted to be insert values clause to be used in `INSERT` query statement.
 */
const parseInsertValues = (values) => {
  if (!values) {
    throw new Error(
      '[parseInsertValues] Not passed object consisting of column and value to be used in INSERT query statement.'
    )
  }

  let clause = ''
  let insertValues = {}
  const valuesToObject = (values) => {
    if (values.toString().indexOf('=') > 0) {
      const div = values.toString().split('=')
      const key = div[0].replace(/^\s|\s$/gi, '')
      const val = div[1].replace(/^\s|\s$/gi, '')
      insertValues[key] = isNaN(val) ? val : Number(val)
    }
  }

  if (values.constructor.name === 'Object') {
    const cols = Object.keys(values)

    if (cols.length) {
      let vals = Object.values(values)
      vals = vals.map((value) => addQuotes(value))

      clause += ` (${cols.join(', ')}) VALUES (${vals.join(', ')})`
    }
  } else if (values.constructor.name === 'Array' && values.length) {
    values = values.map((value) => {
      if (value.constructor.name === 'Array' && value.length) {
        return value.map((val) => addQuotes(val))
      } else {
        return addQuotes(value)
      }
    })

    if (values[0].constructor.name === 'Array') {
      clause = ' VALUES '
      values.forEach((value, v) => {
        clause += `(${value.join(', ')})`
        clause += v < values.length - 1 ? ', ' : ''
      })
    } else {
      clause = ` VALUES (${values.join(', ')})`
    }
  } else if (values?.constructor.name === 'String' && values.length) {
    if (values.toString().indexOf('=') > 0) {
      if (values.indexOf(',') > 0) {
        values.split(',').forEach((separated) => {
          valuesToObject(separated)
        })
      } else {
        valuesToObject(values)
      }
      return parseInsertValues(JSON.parse(JSON.stringify(insertValues)))
    } else {
      clause = ` VALUES (${values})`
    }
  }

  if (!clause) {
    throw new Error(
      '[parseInsertValues] Object consisting of columns and values for use in an INSERT query statement was specified incorrectly.'
    )
  }

  return clause
}

/**
 * Returns after converting it into table join clause to be used in query statement using passed argument.
 *
 * @param {String} [type=null] Join type to be used in table join query statement.
 * @param {String|Array} [table=null] Table name of joined target table to use in join query statement.
 * @param {String} [on=null] Constraint for to use table join.
 * @returns String converted to table join clause to be used in query statement.
 */
const parseJoin = (type = null, table = null, on = null) => {
  let clause = ''

  if (!(type?.constructor.name === 'String' || type === null)) return clause
  type = String(type || '').toUpperCase()

  const join = type.length ? ` ${type} JOIN` : ' JOIN'

  if (table && table.constructor.name === 'String') {
    clause = `${join} ${table}`
  } else if (table?.constructor.name === 'Array' && table.length) {
    clause = `${join} ${table.join(', ')}`
  } else {
    return clause
  }

  if (!clause.length || on?.constructor.name !== 'String' || !on.length)
    return clause
  if (type === 'CROSS') return clause

  if (on?.constructor.name === 'String' && on.length) {
    clause += ` ON ${on}`
  }

  return clause
}

/**
 * Returns after converting it into limit clause to be used in query statement using passed argument.
 *
 * @param {Number} [limit=0] Number of rows to return to be used in query statement. If `0` no limit in used.
 * @returns {String} String converted to limit clause to be used in query statement.
 */
const parseLimit = (limit = 0) => {
  return !isNaN(limit) && limit > 0 ? ` LIMIT ${limit}` : ''
}

/**
 * Returns after converting it into order by clause to be used in query statement using passed argument.
 *
 * @param {String|Array|Object} [order=null] Order by clause to be used in query statement.
 * @returns {String} String converted to order by clause to be used in query statement.
 */
const parseOrder = (order = null) => {
  if (order) {
    if (order.constructor.name === 'String' && order.length) {
      return ` ORDER BY ${order}`
    } else if (order.constructor.name === 'Array' && order.length) {
      return ` ORDER BY ${order.join(', ')}`
    } else if (order.constructor.name === 'Object') {
      const keys = Object.keys(order)
      if (keys.length) {
        let clause = ' ORDER BY '
        keys.forEach((key, k) => {
          clause += `${key} ${order[key]}`
          clause += k < keys.length - 1 ? ', ' : ''
        })

        return clause.replace(/\s$/, '')
      }
    }
  }

  return ''
}

/**
 * Returns the generated parameters to execute the `MariaDB` procedure or function using the passed arguments.
 *
 * @param {Array|Object|String} [parameters=null] Parameters to pass when executing `MariaDB` procedure or function.
 * @returns {Array} Parameters to be passed to the `CALL` query statement.
 */
const parseParameters = (parameters = null) => {
  if (!parameters) return []

  let params = []
  if (parameters.constructor.name === 'Array') {
    return params
  } else if (parameters.constructor.name === 'Object') {
    const keys = Object.keys(parameters)
    if (keys.length) {
      keys.forEach((key) => {
        if (hasOwnProperty.call(parameters, key)) {
          params.push(parameters.key)
        }
      })
    }
  } else if (parameters.constructor.name === 'String') {
    const values = String.trim(parameters.split(','))
    values.forEach((value) => {
      params.push(value)
    })
  }

  return params
}

/**
 * Returns after converting it to be used in query statement using passed table name.
 *
 * @param {String|Array|Object} table Table name to use in query statement.
 * @throws {Error} Not passed table name to be used in query statement.
 * @throws {Error} Table name to use in the query statement is not specified.
 * @returns {String} String converted to table name to be used in query statement.
 */
const parseTable = (table) => {
  if (!table) {
    throw new Error(
      '[parseTable] Not passed table name to be used in query statement.'
    )
  }

  if (table && table.constructor.name === 'String') {
    return ` FROM ${table}`
  } else if (table.constructor.name === 'Array' && table.length) {
    return ` FROM ${table.join(', ')}`
  } else if (table?.constructor.name === 'Object') {
    const keys = Object.keys(table)
    if (keys.length) {
      return ` FROM ${keys.join(', ')}`
    }
  }

  throw new Error(
    '[parseTable] Table name to use in the query statement is not specified.'
  )
}

/**
 * Returns after converting to string it to be update column names and values to be used in `UPDATE` query statement.
 *
 * @param {Object|Array|String} values Values object that consisting of column names and values to be used in `UPDATE` query statement. Or array of lists of values to update to the table.
 * @throws {Error} Not passed object consisting of column and value to be used in UPDATE query statement.
 * @throws {Error} Object consisting of columns and values for use in an UPDATE query statement was specified incorrectly.
 * @returns {String} String converted to be update column names and values to be used in `UPDATE` query statement.
 */
const parseUpdateValues = (values) => {
  if (!values) {
    throw new Error(
      '[parseUpdateValues] Not passed object consisting of column and value to be used in UPDATE query statement.'
    )
  }

  let clause = ''
  let updateValues = {}
  const valuesToObject = (values) => {
    if (values.toString().indexOf('=') > 0) {
      const div = values.toString().split('=')
      const key = div[0].replace(/^\s|\s$/gi, '')
      const val = div[1].replace(/^\s|\s$/gi, '')
      updateValues[key] = isNaN(val) ? val : Number(val)
    }
  }

  if (values?.constructor.name === 'Object') {
    const keys = Object.keys(values)
    if (keys.length) {
      clause = ' SET '
      keys.forEach((key, idx) => {
        clause += `${key} = ${addQuotes(values[key])}`
        clause += idx < keys.length - 1 ? `, ` : ``
      })
    }
  } else if (values?.constructor.name === 'Array' && values.length) {
    values = values.map((value) => valuesToObject(value))
    return parseUpdateValues(JSON.parse(JSON.stringify(updateValues)))
  } else if (values?.constructor.name === 'String' && values.length) {
    if (values.indexOf(',') > 0) {
      values.split(',').forEach((separated) => {
        valuesToObject(separated)
      })
    } else {
      valuesToObject(values)
    }
    return parseUpdateValues(JSON.parse(JSON.stringify(updateValues)))
  }

  if (!clause) {
    throw new Error(
      '[parseUpdateValues] Object consisting of columns and values for use in an UPDATE query statement was specified incorrectly.'
    )
  }

  return clause
}

/**
 * Returns after converting it into where clause to be used in query statement using passed argument.
 *
 * @param {String|Array|Object} [where=null] Where condition to be used in query statement.
 * @returns {String} String converted to where clause to be used in query statement.
 */
const parseWhere = (where = null) => {
  let clause = ''

  if (where) {
    clause = ' WHERE'

    if (where.constructor.name === 'String' && where.length) {
      clause += ` ${where}`
    } else if (where.constructor.name === 'Array' && where.length) {
      where.forEach((condition, i) => {
        if (condition.toString().toUpperCase() === 'OR') {
          clause = clause.replace(/AND$/gi, 'OR')
          return
        }

        clause += ` (${condition})`
        clause += i < where.length - 1 ? ' AND' : ''
      })
    } else if (where.constructor.name === 'Object') {
      const columns = Object.keys(where)

      if (columns.length) {
        columns.forEach((column, i) => {
          if (column.toString().toUpperCase().indexOf('OR') === 0) {
            clause = clause.replace(/AND$/gi, 'OR')
            return
          }

          const condition = where[column].toString() || ''

          if (column.toString().indexOf('_') === 0) {
            clause += ` (${condition})`
          } else {
            if (condition.search(/!=|<|>|<>|<=|>=|IS/gi) > -1) {
              clause += ` (${column} ${condition})`
            } else if (condition.search(/^AGAINST/gi) > -1) {
              clause += ` (MATCH(${column}) ${condition})`
            } else if (condition.search(/^BETWEEN|^NOT BETWEEN/gi) > -1) {
              clause += ` (${column} ${condition})`
            } else if (condition.search(/^IN|^NOT IN/gi) > -1) {
              clause += ` (${column} ${condition})`
            } else if (condition.search(/^LIKE|^NOT LIKE/gi) > -1) {
              clause += ` (${column} ${condition})`
            } else if (condition.search(/^MATCH/gi) > -1) {
              clause += ` (MATCH(${column}) ${condition.replace(
                /MATCH /gi,
                ''
              )})`
            } else {
              clause += ` (${column} = ${condition})`
            }
          }

          clause += i < columns.length - 1 ? ' AND' : ''
        })
      }
    }
  }

  return clause === ' WHERE' ? '' : clause
}

/**
 * @typedef {Object} CallQuery
 * @property {String} query `CALL` query statement to execute.
 * @property {Array} param Parameters to be passed to the `CALL` query statement.
 */
/**
 * Returns object consisting of the query statement and parameters created to execute the `MariaDB` procedure or function using the passed arguments.
 *
 * @param {String} target Procedure name or function name to execute.
 * @param {Array|Object|String} [parameters=null] Parameters to pass when executing `MariaDB` procedure or function.
 * @returns {CallQuery} `CALL` query statement for executing `MariaDB` procedure or function.
 */
const queryCall = (target, parameters = null) => {
  const query = `CALL ${parseCall(target, parameters)}`
  const param = parseParameters(parameters)
  return { query, param }
}

/**
 * Returns after created `INSERT` query statement using passed arguments.
 *
 * @param {String} table Table name to use in query statement.
 * @param {Object|String|Array} values Values object that consisting of column names and values to add to table. Or array of lists of values to add to the table.
 * @throws {Error} Not passed table name to be used in query statement.
 * @throws {Error} Not passed object consisting of column and value to be used in INSERT query statement.
 * @throws {Error} Object consisting of columns and values for use in an INSERT query statement was specified incorrectly.
 * @returns {String} `INSERT` query statement created using passed arguments.
 */
const queryInsert = (table, values) => {
  if (!table || table.constructor.name !== 'String') {
    throw new Error(
      '[queryInsert] Not passed table name to be used in query statement.'
    )
  }

  return `INSERT INTO
    ${table}
    ${parseInsertValues(values)}`.replace(/\s{2,}/gi, ` `)
}

/**
 * Returns after created `SELECT` query statement using passed arguments.
 *
 * @param {String|Array|Object} table Table name to use in query statement.
 * @param {Array|String|Object} [columns=null] Columns to be used in query statement.
 * @param {String|Array|Object} [where=null] Where condition to be used in query statement.
 * @param {String|Array|Object} [order=null] Order by clause to be used in query statement.
 * @param {Number} [limit=0] Number of rows to return to be used in query statement. If `0` no limit in used.
 * @throws {Error} Not passed table name to be used in query statement.
 * @throws {Error} Table name to use in the query statement is not specified.
 * @returns {String} `SELECT` query statement created using passed arguments.
 */
const querySelect = (
  table,
  columns = null,
  where = null,
  order = null,
  limit = 0
) => {
  return `SELECT
    ${parseColumns(columns)}
    ${parseTable(table)}
    ${parseWhere(where)}
    ${parseOrder(order)}
    ${parseLimit(limit)}`
    .replace(/\s{2,}/gi, ` `)
    .replace(/\s{1,}$/gi, ``)
}

/**
 * Returns after created `SELECT` query statement using passed arguments.
 *
 * @param {String|Array|Object} table Table name to use in query statement.
 * @param {Array|String|Object} [columns=null] Columns to be used in query statement.
 * @param {String|Array|Object} [where=null] Where condition to be used in query statement.
 * @param {String|Array|Object} [group=null] Group by clause to be used in query statement.
 * @param {String} [having=null] Having condition to be used in group by clause of query statement.
 * @param {String|Array|Object} [order=null] Order by clause to be used in query statement.
 * @param {Number} [limit=0] Number of rows to return to be used in query statement. If `0` no limit in used.
 * @throws {Error} Not passed table name to be used in query statement.
 * @throws {Error} Table name to use in the query statement is not specified.
 * @returns {String} `SELECT` query statement created using passed arguments.
 */
const querySelectGroup = (
  table,
  columns = null,
  where = null,
  group = null,
  having = null,
  order = null,
  limit = 0
) => {
  return `SELECT
    ${parseColumns(columns)}
    ${parseTable(table)}
    ${parseWhere(where)}
    ${parseGroup(group, having)}
    ${parseOrder(order)}
    ${parseLimit(limit)}`
    .replace(/\s{2,}/gi, ` `)
    .replace(/\s{1,}$/gi, ``)
}

/**
 * Returns after created `SELECT` query statement for table join using passed arguments.
 *
 * @param {String|Array|Object} table Table name to use in query statement.
 * @param {String} [type=null] Join type to be used in table join query statement.
 * @param {String|Array} [join=null] Table name of joined target table to use in join query statement.
 * @param {String} [on=null] Constraint for to use table join.
 * @param {Array|String|Object} [columns=null] Columns to be used in query statement.
 * @param {String|Array|Object} [where=null] Where condition to be used in query statement.
 * @param {String|Array|Object} [order=null] Order by clause to be used in query statement.
 * @param {Number} [limit=0] Number of rows to return to be used in query statement. If `0` no limit in used.
 * @throws {Error} Not passed table name to be used in query statement.
 * @returns {String} `SELECT` query statement for table join created using passed arguments.
 */
const querySelectJoin = (
  table,
  type = null,
  join = null,
  on = null,
  columns = null,
  where = null,
  order = null,
  limit = 0
) => {
  return `SELECT
    ${parseColumns(columns)}
    ${parseTable(table)}
    ${parseJoin(type, join, on)}
    ${parseWhere(where)}
    ${parseOrder(order)}
    ${parseLimit(limit)}`
    .replace(/\s{2,}/gi, ` `)
    .replace(/\s{1,}$/gi, ``)
}

/**
 * Returns after created `SELECT` query statement for table join using passed arguments.
 *
 * @param {String|Array|Object} table Table name to use in query statement.
 * @param {String} [type=null] Join type to be used in table join query statement.
 * @param {String|Array} [join=null] Table name of joined target table to use in join query statement.
 * @param {String} [on=null] Constraint for to use table join.
 * @param {Array|String|Object} [columns=null] Columns to be used in query statement.
 * @param {String|Array|Object} [where=null] Where condition to be used in query statement.
 * @param {String|Array|Object} [group=null] Group by clause to be used in query statement.
 * @param {String} [having=null] Having condition to be used in group by clause of query statement.
 * @param {String|Array|Object} [order=null] Order by clause to be used in query statement.
 * @param {Number} [limit=0] Number of rows to return to be used in query statement. If `0` no limit in used.
 * @throws {Error} Not passed table name to be used in query statement.
 * @throws {Error} Table name to use in the query statement is not specified.
 * @returns {String} `SELECT` query statement for table join created using passed arguments.
 */
const querySelectJoinGroup = (
  table,
  type = null,
  join = null,
  on = null,
  columns = null,
  where = null,
  group = null,
  having = null,
  order = null,
  limit = 0
) => {
  return `SELECT
    ${parseColumns(columns)}
    ${parseTable(table)}
    ${parseJoin(type, join, on)}
    ${parseWhere(where)}
    ${parseGroup(group, having)}
    ${parseOrder(order)}
    ${parseLimit(limit)}`
    .replace(/\s{2,}/gi, ` `)
    .replace(/\s{1,}$/gi, ``)
}

/**
 * Returns after created `UPDATE` query statement using passed arguments.
 *
 * @param {String} table Table name to use in query statement.
 * @param {Object|Array|String} values Values object that consisting of column names and values to be used in `UPDATE` query statement. Or array of lists of values to update to the table.
 * @param {String|Array|Object} where Where condition to be used in query statement.
 * @throws {Error} Not passed table name to be used in query statement.
 * @throws {Error} Not passed update condition clause to be used in UPDATE query statement.
 * @throws {Error} Not passed object consisting of column and value to be used in UPDATE query statement.
 * @throws {Error} Object consisting of columns and values for use in an UPDATE query statement was specified incorrectly.
 * @returns {String} `UPDATE` query statement created using passed arguments.
 */
const queryUpdate = (table, values, where) => {
  if (!table || table.constructor.name !== 'String') {
    throw new Error(
      '[queryUpdate] Not passed table name to be used in query statement.'
    )
  }
  if (!where) {
    throw new Error(
      '[queryUpdate] Not passed update condition clause to be used in UPDATE query statement.'
    )
  }

  return `UPDATE
    ${table}
    ${parseUpdateValues(values)}
    ${parseWhere(where)}`.replace(/\s{2,}/gi, ` `)
}

const alquery = {
  parseCall,
  parseColumns,
  parseGroup,
  parseInsertValues,
  parseJoin,
  parseLimit,
  parseOrder,
  parseParameters,
  parseTable,
  parseUpdateValues,
  parseWhere,
  queryCall,
  queryInsert,
  querySelect,
  querySelectGroup,
  querySelectJoin,
  querySelectJoinGroup,
  queryUpdate
}

export default alquery
