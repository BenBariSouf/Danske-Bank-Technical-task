# Technical task: Danske Bank

> A CRUD web app for visualizing car number plates with their owner's name.

## Tech/Framework Used

- [Create React App CLI](https://github.com/facebook/create-react-app)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [MaterialUI](https://mui.com/)
- [Sweetalert2](https://sweetalert2.github.io/)
- [React-modal](https://github.com/reactjs/react-modal)

## Installation and setup

This project requires [node](http://nodejs.org) and [npm](https://npmjs.com) installed globally.

Clone the repository to a directory of your choosing:

```sh
$ git clone https://github.com/BenBariSouf/Danske-Bank-Technical-task.git
```

Navigate into Danske-Bank-Technical-task directory and install the necessary packages for both the server and the client directories

```sh
$ npm install
```

```sh
$ cd client && npm install
```

The next step is preferable but not strictly necessary.
Create an `.env` file in both the root of the project and the client directory based on the provided `.env.example` files.

- In the root folder:

```sh
PORT = XXXX
```

- In the client folder:

```sh
REACT_APP_PORT = XXXX
```

To start up the app locally: From the root of the project, run the command:

```sh
$ npm start
```

To run the unit tests, navigate to the client directory and run the command:

```sh
$ npm run test
```

### Notes

- The app performs CRUD operations and stores the data in a local file called 'data.json'. This file is initially provided without any data in it. However, you can take a quick look beforehand at how the data will be structured after the CRUD by opening 'sample-data.json'.

- The app implements car number plate validation based on my home country Morocco (as described in the task requirements). You can read more on the subject [here.](https://en.wikipedia.org/wiki/Vehicle_registration_plates_of_Morocco)

- When running unit tests on the app, the testing framework Jest will throw a 'Failed to initialize watch plugin "node_modules/jest-watch-typeahead/filename.js"' error if you are using a version of node that is prior to the current release(currently 16.17.0). In order to circumvent this error, either make sure you have the latest version of node installed, or install the package: jest-watch-typeahead@0.6.5 as a dependency in the react app like so:

```sh
$ npm i -D --exact jest-watch-typeahead@0.6.5
```

You can read more about this error [here](https://github.com/facebook/create-react-app/issues/11043)
