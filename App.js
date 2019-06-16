import React from 'react';

import {Expenses} from './src/Components/Views/Expenses'
import {ExpensesEdit} from "./src/Components/Views/ExpensesEdit";



export default class App extends React.Component {

  render() {
    return (
      <ExpensesEdit />
    )
  }
}