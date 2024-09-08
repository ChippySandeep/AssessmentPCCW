## Installation

1. Clone the repo 


2.. Navigate to folder and install npm packages using:
	
	npm install

3. For first time installation run below command to download required browsers

	npx install playwright --save-dev

4. allure commandline : Install allure command line for generating Allure Reports using
    npm install -g allure-commandline --save-dev


## Execute Testcases


1. change required parameters in playwright.config.ts  

2. For executing  test cases
    npm run test

3. For Allure Report generation execute :
	npm run allureReport 
