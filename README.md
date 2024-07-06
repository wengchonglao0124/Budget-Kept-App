
# Budget Kept

Budget Kept is a mobile application designed to help users track their spending, manage their budget, and achieve their financial goals. The app provides an intuitive interface for recording transactions, and viewing transaction history.

![IMG_5219](https://github.com/wengchonglao0124/Budget-Kept-App/assets/85862169/3ef7d489-47b8-4a75-82fd-5f5d5511f989)

## Purpose of the Application

The purpose of Budget Kept is to provide users with a simple and effective tool for managing their personal finances. The app allows users to:
- Track income and expenses
- View transaction history
- Customise the appearance of income and expense records
- Manage their budget efficiently

## How to Contribute

We welcome contributions to the development of Budget Kept! To contribute, follow these steps:
1. **Fork the repository**: Create a fork of the project repository on GitHub.
2. **Clone your fork**: Clone your forked repository to your local machine using `git clone`.
3. **Create a branch**: Create a new branch for your feature or bugfix using `git checkout -b branch-name`.
4. **Make your changes**: Implement your changes and commit them with descriptive messages.
5. **Push to your branch**: Push your changes to your forked repository using `git push origin branch-name`.
6. **Create a Pull Request**: Open a pull request to the main repository, describing your changes and the purpose of your contribution.

Please ensure your code adheres to the project's coding standards and includes relevant tests.

## Features

- Track income and expense transactions
- View transaction history
- Customise income and expense colors
- Pull down to refresh transactions
- Responsive design with intuitive user interface
- Secure user authentication

## Setup

### Setup Database

To setup the database 

Run the SQL script `budgetKeeper.sql` to setup the database on your computer

### Setup Server

To config the server

Replace `<INSERT KEY HERE>` in `.env`file with your SQL password

To execute the server 

`cd server`

`npm install`

`npm start`

### Setup Mobile App

To config the mobile app

Go to `mobileApp/configurations/serverAddressConfig.js`

Modify the server address if needed

Server address can be found in the terminal when initialising the server

To execute the mobile app

`cd mobileApp`

`npx expo start`


## Dependencies

To install the dependencies for Budget Kept, run the following command in your project directory:

`npm install`

The application relies on the following dependencies:

- \`@react-native-community/async-storage\`
- \`@react-native-community/datetimepicker\`
- \`@react-native-community/slider\`
- \`@react-navigation/native\`
- \`@react-navigation/stack\`
- \`expo\`
- \`expo-linear-gradient\`
- \`react\`
- \`react-native\`
- \`react-native-color-picker\`
- \`react-native-gesture-handler\`
- \`react-native-paper\`
- \`react-native-vector-icons\`
- \`react-native-safe-area-context\`
- \`react-native-screens\`

## Application Architecture

The architecture of Budget Kept is structured as follows:

1. **Components**: Reusable UI components such as buttons, input fields, and transaction items.
2. **Screens**: Different screens of the application such as Home, Records, Settings, About, and Color Picker.
3. **Context**: Context providers for managing global state such as authentication and theme.
4. **Services**: Functions for interacting with APIs and handling data.
5. **Styles**: Style sheets for consistent styling across the application.
6. **Navigation**: Configuration for screen navigation using React Navigation.
