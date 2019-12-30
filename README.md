## SITE ON HEROKU

https://ricettario-v1.herokuapp.com/

# Deploying

- push to git -> 'git push'
- push to herolu -> 'git push heroku master'

# Dev (local run)

'npm run dev-server'

# Testing with Jest

- run test -> 'npm test -- --watch' (run test suites in watch mode)
- react-test-renderer -> render in regular js and let us make assertions about what gets rendered
- use enzyme instead of react-test-renderer -> 'npm add enzyme enzyme-adapter-react-16'
  --> usage: 1) create 'setupTests.js' file with following content:
  import Enzyme from "enzyme";
  import Adapter from "enzyme-adapter-react-16";

      				Enzyme.configure({
      					adapter: new Adapter()
      				});

      	2) create 'jest.config.json' at root with these line:
      				{
      					"setupFiles": ["raf/polyfill", "<rootDir>/src/tests/setupTests.js"]
      				}
      	3) import { shallow } from 'enzyme' in tests files
      	4) to shallow render only relevant elements to the ui, add this line to 'jest.config.json':
      				"snapshotSerializers": ["enzyme-to-json/serializer"]

# Cross OS environments

- 'npm install --save-dev cross-env'
- use as 'cross-env KEY=value' in package.json scripts; ex NODE_ENV=test
- 'dotenv' -> loads environments variables from .env files
- need to require('dotenv') in setupTests.js
- add env properties in webpack.config using "webpack.DefinePlugin({})"

# Heroku ENV variables set

- 'heroku config:set KEY=value'

# Firebase authentication

Store user id in redux store for route autorization.

# Redirection on login and logout

Need to create a local history. Switch BrowserRouter with Router and pass 'history' as parameter. 'history' is created with 'createHistory' imported from 'history/createBrowserHistory'.
