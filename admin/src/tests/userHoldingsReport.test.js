const { createHoldingData } = require("../helpers")

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
