## HCL OneTest API
This action enables you to run HCL OneTest API tests.

## Pre requisites

1. Create a github repository
2. Create a folder named ".github/workflows" in the root of the repository
3. Create a .yml file with any name, inside the ".github/workflows" folder and you need to code as detailed below in that yml file

## Example usage

```yaml
name: HCL OneTest API

on: workflow_dispatch

jobs:
    API-Action:
        runs-on: self-hosted
        name: HCL OneTest API
        steps:
         - name: HCL OneTest API
           uses: anuraag-k/APITestAction@main
           with:
            productPath: 
            projectDir: 
            projectName: 
            environment: 
            tests: 
            parameterFile: 
            junitDir: 
            
```
4. Push the new yml file into the main branch
5. The you will have to configure agent:
    1. Go to settings (Repo).
    2. Select action -> runner.
    3. Click Create self-hosted runner, follow the download and configure instructions.

6. Go to the Actions section in the repository and select the workflow.
7. Click the Run workflow dropdown and the list of input boxes get displayed.

## Inputs

### `productPath`

**Required** The fully qualified path to the HCL OneTest API application. This path must exist on the runner machine.

### `projectDir`

**Required** Fully qualified path to the HCL OneTest API project directory. This value will be ignored if parameterFile field is used.

### `projectName`

**Required** The name of the API test project. This value will be ignored if parameterFile field is used.

### `environment`

**Required** The API Test environment to use for this execution. This value will be ignored if parameterFile field is used.

### `tests`

**Required** Semicolon separated list of tests/suites to run. This value will be ignored if parameterFile field is used.

### `parameterFile`

**Optional** The full path to a parameter file that contains project, environment, and run arguments for one or more tests.

### `junitDir`

**Optional** Specify the folder to export the JUnit reports to.
