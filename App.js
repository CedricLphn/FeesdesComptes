import React from 'react';

import {Expenses} from './src/Components/Views/Expenses'
import {ExpensesEdit} from "./src/Components/Views/ExpensesEdit";
import Navigation from "./src/Components/Navigation/Navigation";



export default class App extends React.Component {

  render() {
    return (
      <Navigation />
    )
  }
}