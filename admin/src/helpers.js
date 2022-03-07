const { Parser } = require("json2csv")
const R = require("ramda")

/*
 * Returns Company Name if found
 * @param {Array<Object>} Array of companies
 * @param {number} Holding id number
 */
const findCompanyName = (companies, id) => {
  const company = companies.find((company) => company.id === id)
  if (company) return company?.name
  else throw "Company with given id not found"
}

/*
 * Returns User holdings array
 * @param {Array<Object>} Array of investments
 * @param  {Array<Object>} Array of companies
 */
const createHoldingData = (investments, companies) => {
  const holdingData = []

  investments.forEach((investment) => {
    investment.holdings.forEach((holding) => {
      const holdingObject = {
        ...R.pick(["userId", "firstName", "lastName", "date"], investment),
        holding: findCompanyName(companies, holding.id),
        value: investment.investmentTotal * holding.investmentPercentage,
      }
      holdingData.push(holdingObject)
    })
  })

  return holdingData
}

/*
 * Creates CSV formatted text for given data and fields
 * @param {Array<String>} Array of headers for CSV
 * @param {Array<Object>} Array of users holdings
 */
const createCsv = (fields, data) => {
  try {
    const opts = { fields }
    const parser = new Parser(opts)
    return parser.parse(data)
  } catch (error) {
    console.error(error)
  }
}

module.exports = { createHoldingData, createCsv }
