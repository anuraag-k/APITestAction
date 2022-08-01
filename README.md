## HCL OneTest API
This action enables you to run HCL OneTest API tests.

## Pre requisites

1. Create a github repository
2. Create a folder named ".github/workflows" in the root of the repository
3. Create a .yml file with any name, inside the ".github/workflows" folder and you need to code as detailed below in that yml file

## Example usage

```yaml
name: HCL OneTest API

on:
    workflow_dispatch:
        inputs:
            configType:
                description: 'Configuration Type'
                required: true
            productPath:
                description: 'Product Path'
                required: true
            projectDir:
                description: 'Project Directory'
                required: true
            projectName:
                description: 'Project Name'
                required: true
            environment:
                description: 'Environment'
                required: true
            tests:
                description: 'Test(s) to run'
                required: true
            junitDir:
                description: 'JunitDir'
                required: false

jobs:

    WebUI-Action:
        runs-on: self-hosted
        name: HCL OneTest API
        steps:
         - name: HCL OneTest API
           uses: SonaHJ/APIAction@main
           with:
            configType: '${{ github.event.inputs.configType }}'
            productPath: '${{ github.event.inputs.productPath }}'
            projectDir: '${{ github.event.inputs.projectDir }}'
            projectName: '${{ github.event.inputs.projectName }}'
            environment: '${{ github.event.inputs.environment }}'
            tests: '${{ github.event.inputs.tests }}'
            junitDir: '${{ github.event.inputs.junitDir }}'

```
4. Push the new yml file into the main branch
5. The you will have to configure agent:
    1. Go to settings (Repo).
    2. Select action -> runner.
    3. Click Create self-hosted runner, follow the download and configure instructions.

6. Go to the Actions section in the repository and select the workflow.
7. Click the Run workflow dropdown and the list of input boxes get displayed.

## Inputs

### `configType`

**Required** Type of the test to execute

### `productPath`

**Required** The fully qualified path to the HCL OneTest API application. This path must exist on the agent.

### `projectDir`

**Required** Fully qualified path to the HCL OneTest API project directory.

### `projectName`

**Required** The name of the API test project.

### `environment`

**Required** The API Test environment to use for this execution.

### `tests`

**Required** Semicolon separated list of tests/suites to run.

### `junitDir`
**Optional** Specify the folder to export the JUnit reports to.
