## Running Tag-Based Test Scenarios

To run tests based on specific tags, use the `--grep` option with the Playwright Test Runner.

### Command to Run Tests with a Specific Tag
```bash
npx playwright test --grep tagname


### Command to Run all Tests ###

npx playwright test --grep regression (Run All test)

### Command to Run specific Tests (tc1/tc2/tc3/tc4/tc5) ###

npx playwright test --grep tc5 (Run tc5)

### Command to check the execution report ###

 npx playwright show-report
