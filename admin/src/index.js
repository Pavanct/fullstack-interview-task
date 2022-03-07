const express = require("express")
const bodyParser = require("body-parser")
const config = require("config")
const axios = require("axios").default
const { getCompanies } = require("./services/companyService")
const { getInvestments } = require("./services/investmentService")
const { createHoldingData, createCsv } = require("./helpers")

const app = express()

app.use(bodyParser.json({ limit: "10mb" }))

app.get("/investments/:id", (req, res) => {
  const { id } = req.params
  axios
    .get(`${config.investmentsServiceUrl}/investments/${id}`)
    .then((investments) => res.send(investments.data))
    .catch((error) => {
      console.error(error)
      res.sendStatus(500)
    })
})

app.post("/generateUserHoldingsReport", async (_, res) => {
  try {
    const [investmentsResponse, companiesResponse] = await Promise.all([
      getInvestments(),
      getCompanies(),
    ])

    const fields = [
      {
        label: "User",
        value: "userId",
      },
      {
        label: "First Name",
        value: "firstName",
      },
      {
        label: "Last Name",
        value: "lastName",
      },
      {
        label: "Date",
        value: "date",
      },
      {
        label: "Holding",
        value: "holding",
      },
      {
        label: "Value",
        value: "value",
      },
    ]

    const investments = investmentsResponse.data
    const companies = companiesResponse.data

    const csvHoldingData = createCsv(
      fields,
      createHoldingData(investments, companies)
    )

    await axios.post(`${config.investmentsServiceUrl}/investments/export`, {
      headers: {
        "Content-Type": "text/csv",
      },
      body: csvHoldingData,
    })
    res.send("report generated and sent!")
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

app.listen(config.port, (err) => {
  if (err) {
    console.error("Error occurred starting the server", err)
    process.exit(1)
  }
  console.log(`Server running on port ${config.port}`)
})
