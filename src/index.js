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
 * @param {String|Array} [order=null] Order by clause to be used in query statement.
 * @returns {String} String converted to order by clause to be used in query statement.
 */
const parseOrder = (order = null) => {
  if (order) {
    if (order.constructor.name === 'String' && order.length) {
      return ` ORDER BY ${order}`
    } else if (order.constructor.name === 'Array' && order.length) {
      return ` ORDER BY ${order.join(', ')}`
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
 * Returns after created `SELECT` query statement using passed arguments.
 *
 * @param {String|Array} table Table name to use in query statement.
 * @param {String|Array|Object} [columns=null] Columns to be used in query statement.
 * @param {String|Array|Object} [where=null] Where condition to be used in query statement.
 * @param {String|Array} [order=null] Order by clause to be used in query statement.
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

const alquery = {
  parseColumns,
  parseLimit,
  parseOrder,
  parseTable,
  parseWhere,
  querySelect
}

export default alquery
