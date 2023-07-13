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
 * Returns after converting it into columns to be used in query statement using passed argument.
 *
 * @param {String|Array|Object} [columns=null] Columns to be used in query statement.
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
 * Returns after converting to string that column names and values to be used in `INSERT` query statement.
 *
 * @param {Object|Array} values Values object that consisting of column names and values to add to table. Or array of lists of values to add to the table.
 * @throws {Error} Not passed object consisting of column and value to be used in INSERT query statement!
 * @throws {Error} Object consisting of columns and values for use in an INSERT query statement was specified incorrectly!
 * @returns {String} String converted to be insert values clause to be used in `INSERT` query statement.
 */
const parseInsertValues = (values) => {
  if (!values) {
    throw new Error(
      '[parseInsertValues] Not passed object consisting of column and value to be used in INSERT query statement!'
    )
  }

  let clause = ''

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
      values = values.map((value, v) => {
        clause += `(${value.join(', ')})`
        clause += v < values.length - 1 ? ', ' : ''
      })
    } else {
      clause = ` VALUES (${values.join(', ')})`
    }
  }

  if (!clause) {
    throw new Error(
      '[parseInsertValues] Object consisting of columns and values for use in an INSERT query statement was specified incorrectly!'
    )
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
 * Returns after converting it to be used in query statement using passed table name.
 *
 * @param {String|Array} table Table name to use in query statement.
 * @throws {Error} Not passed table name to be used in query statement!
 * @throws {Error} Table name to use in the query statement is not specified!
 * @returns {String} String converted to table name to be used in query statement.
 */
const parseTable = (table) => {
  if (!table) {
    throw new Error(
      '[parseTable] Not passed table name to be used in query statement!'
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
    '[parseTable] Table name to use in the query statement is not specified!'
  )
}

/**
 * Returns after converting to string it to be update column names and values to be used in `UPDATE` query statement.
 *
 * @param {Object|Array|String} values Values object that consisting of column names and values to be used in `UPDATE` query statement. Or array of lists of values to update to the table.
 * @throws {Error} Not passed object consisting of column and value to be used in UPDATE query statement!
 * @throws {Error} Object consisting of columns and values for use in an UPDATE query statement was specified incorrectly!
 * @returns {String} String converted to be update column names and values to be used in `UPDATE` query statement.
 */
const parseUpdateValues = (values) => {
  if (!values) {
    throw new Error(
      '[parseUpdateValues] Not passed object consisting of column and value to be used in UPDATE query statement!'
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
      '[parseUpdateValues] Object consisting of columns and values for use in an UPDATE query statement was specified incorrectly!'
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
 * Returns after created `INSERT` query statement using passed arguments.
 *
 * @param {String} table Table name to use in query statement.
 * @param {Object|Array} values Values object that consisting of column names and values to add to table. Or array of lists of values to add to the table.
 * @throws {Error} Not passed table name to be used in query statement!
 * @throws {Error} Not passed object consisting of column and value to be used in INSERT query statement!
 * @throws {Error} Object consisting of columns and values for use in an INSERT query statement was specified incorrectly!
 * @returns {String} `INSERT` query statement created using passed arguments.
 */
const queryInsert = (table, values) => {
  if (!table || table.constructor.name !== 'String') {
    throw new Error(
      '[queryInsert] Not passed table name to be used in query statement!'
    )
  }

  return `INSERT INTO
    ${table}
    ${parseInsertValues(values)}`.replace(/\s{2,}/gi, ` `)
}

/**
 * Returns after created `SELECT` query statement using passed arguments.
 *
 * @param {String|Array} table Table name to use in query statement.
 * @param {String|Array|Object} [columns=null] Columns to be used in query statement.
 * @param {String|Array|Object} [where=null] Where condition to be used in query statement.
 * @param {String|Array|Object} [order=null] Order by clause to be used in query statement.
 * @param {Number} [limit=0] Number of rows to return to be used in query statement. If `0` no limit in used.
 * @throws {Error} Not passed table name to be used in query statement!
 * @throws {Error} Table name to use in the query statement is not specified!
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
 * Returns after created `UPDATE` query statement using passed arguments.
 *
 * @param {String} table Table name to use in query statement.
 * @param {Object|Array|String} values Values object that consisting of column names and values to be used in `UPDATE` query statement. Or array of lists of values to update to the table.
 * @param {String|Array|Object} where Where condition to be used in query statement.
 * @throws {Error} Not passed table name to be used in query statement!
 * @throws {Error} Not passed update condition clause to be used in UPDATE query statement!
 * @throws {Error} Not passed object consisting of column and value to be used in UPDATE query statement!
 * @throws {Error} Object consisting of columns and values for use in an UPDATE query statement was specified incorrectly!
 * @returns {String} `UPDATE` query statement created using passed arguments.
 */
const queryUpdate = (table, values, where) => {
  if (!table || table.constructor.name !== 'String') {
    throw new Error(
      '[queryUpdate] Not passed table name to be used in query statement!'
    )
  }
  if (!where) {
    throw new Error(
      '[queryUpdate] Not passed update condition clause to be used in UPDATE query statement!'
    )
  }

  return `UPDATE
    ${table}
    ${parseUpdateValues(values)}
    ${parseWhere(where)}`.replace(/\s{2,}/gi, ` `)
}

const alquery = {
  parseColumns,
  parseInsertValues,
  parseLimit,
  parseOrder,
  parseTable,
  parseUpdateValues,
  parseWhere,
  queryInsert,
  querySelect,
  queryUpdate
}

export default alquery
