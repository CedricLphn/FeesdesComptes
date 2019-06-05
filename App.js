import React from 'react';
import { Accounts } from "./src/Components/Accounts";
import { Expenses } from "./src/Components/Expenses";
import { Projects } from './src/Components/Projects';

export default class App extends React.Component {
  render() {
    return (
      <Accounts />
    );
  }
}