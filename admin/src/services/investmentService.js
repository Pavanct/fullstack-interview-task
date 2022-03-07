const config = require("config")
const axios = require("axios").default

/*
  * Returns all investments from investments microservice 
*/
const getInvestments = async () => {
  const response = await axios.get(
    `${config.investmentsServiceUrl}/investments`
  )
  return response
}

module.exports = {
  getInvestments
}
