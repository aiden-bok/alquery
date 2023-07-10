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

const parseLimit = () => {
  return ``
}

const parseOrder = () => {
  return ``
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
  }

  throw new Error(
    '[parseTable] Table name to use in the query statement is not specified!'
  )
}

const parseWhere = () => {
  return ``
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
const select = (
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
  select
}

export default alquery
