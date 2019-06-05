import React from 'react';
import { Accounts } from "./src/Components/Accounts";
import { Expenses } from "./src/Components/Expenses";
import { Projects } from './src/Components/Projects';

import SQL from './src/Helpers/API/sql';

const sql = new SQL();

export default class App extends React.Component {

  componentDidMount() {
    sql.insert("account", {
      id : 1,
      name : "toto",
      amount: 100
    });
  }

  render() {
    return (
      <Accounts />
    );
  }
}