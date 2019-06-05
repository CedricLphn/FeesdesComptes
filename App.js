import React from 'react';
import Navigation from './src/Components/Navigation/Navigation'


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
      <Navigation />
    )
  }
}