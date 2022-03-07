const { createHoldingData, createCsv } = require("../helpers")
const { parse } = require("fast-csv")

describe("generate user holdings object", () => {
  it("should generate users holdings object", () => {
    const investments = [
      {
        userId: "1",
        firstName: "Billy",
        lastName: "Bob",
        investmentTotal: 1400,
        date: "2020-01-01",
        holdings: [{ id: "2", investmentPercentage: 1 }],
      },
      {
        userId: "2",
        firstName: "Sheila",
        lastName: "Aussie",
        investmentTotal: 20000,
        date: "2020-01-01",
        holdings: [
          { id: "1", investmentPercentage: 0.5 },
          { id: "2", investmentPercentage: 0.5 },
        ],
      },
    ]

    const companies = [
      {
        id: "1",
        name: "The Big Investment Company",
      },
      {
        id: "2",
        name: "The Small Investment Company",
      },
    ]
    const data = createHoldingData(investments, companies)

    expect(data).toMatchObject([
      {
        userId: "1",
        firstName: "Billy",
        lastName: "Bob",
        date: "2020-01-01",
        holding: "The Small Investment Company",
        value: 1400,
      },
      {
        userId: "2",
        firstName: "Sheila",
        lastName: "Aussie",
        date: "2020-01-01",
        holding: "The Big Investment Company",
        value: 10000,
      },
      {
        userId: "2",
        firstName: "Sheila",
        lastName: "Aussie",
        date: "2020-01-01",
        holding: "The Small Investment Company",
        value: 10000,
      },
    ])
  })
})

describe("generate csv for holding report", () => {
  it("should generate csv report", () => {
    const holdingData = [
      {
        userId: "1",
        firstName: "Billy",
        lastName: "Bob",
        date: "2020-01-01",
        holding: "The Small Investment Company",
        value: 1400,
      },
      {
        userId: "2",
        firstName: "Sheila",
        lastName: "Aussie",
        date: "2020-01-01",
        holding: "The Big Investment Company",
        value: 10000,
      },
      {
        userId: "2",
        firstName: "Sheila",
        lastName: "Aussie",
        date: "2020-01-01",
        holding: "The Small Investment Company",
        value: 10000,
      },
    ]

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

    /* Expected object array after parsing csv */
    const expectedCsv = [
      {
        User: "1",
        "First Name": "Billy",
        "Last Name": "Bob",
        Date: "2020-01-01",
        Holding: "The Small Investment Company",
        Value: "1400",
      },
      {
        User: "2",
        "First Name": "Sheila",
        "Last Name": "Aussie",
        Date: "2020-01-01",
        Holding: "The Big Investment Company",
        Value: "10000",
      },
      {
        User: "2",
        "First Name": "Sheila",
        "Last Name": "Aussie",
        Date: "2020-01-01",
        Holding: "The Small Investment Company",
        Value: "10000",
      },
    ]

    const result = createCsv(fields, holdingData)

    let parsedCsv = []

    parse(result, { headers: true })
      .on("error", (error) => console.error(error))
      .on("data", (row) => {
        parsedCsv.push(row)
      })
      .on("end", () => {
        expect(parsedCsv).toEqual(expectedCsv)
      })
  })
})
