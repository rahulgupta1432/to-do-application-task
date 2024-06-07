/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {

    // Automatically clear mock calls and instances between every test
    clearMocks: true,
  
    // Indicates whether the coverage information should be collected while executing the test
    collectCoverage: true,
  
    // The directory where Jest should output its coverage files
    coverageDirectory: "coverage",
  
    // Indicates which provider should be used to instrument code for coverage
    coverageProvider: "v8",
    reporters: [
      "default",
      [
        "jest-junit",
        {
          outputDirectory: "./coverage",
          outputName: "unit_tests_coverage.xml",
        },
      ],
    ],
  
    // A list of reporter names that Jest uses when writing coverage reports
    coverageReporters: ["cobertura", "lcov", "text"],
  
    // The maximum amount of workers used to run your tests. Can be specified as % or a number. E.g. maxWorkers: 10% will use 10% of your CPU amount + 1 as the maximum worker number. maxWorkers: 2 will use a maximum of 2 workers.
    maxWorkers: "50%",
  
    // A list of paths to directories that Jest should use to search for files in
    roots: ["test"],
    testEnvironment: "node",
  
    // Options that will be passed to the testEnvironment
    // testEnvironmentOptions: {},
    testRegex: ["/test/.*\\.(test|spec)?\\.(ts|tsx|js|jsx)$"],
    transform: {
      "^.+\\.ts?$": ["babel-jest"],
    },
  }