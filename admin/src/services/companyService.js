const config = require("config")
const axios = require("axios").default

/*
  * Returns all companies from financial-companies microservice 
*/
const getCompanies = async () => {
  const response = await axios.get(
    `${config.financialCompaniesServiceUrl}/companies`
  )
  return response
}

module.exports = {
  getCompanies
}
