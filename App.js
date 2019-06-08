import React from 'react';
import Navigation from './src/Components/Navigation/Navigation'
import {ExpensesEdit} from './src/Components/Views/ExpensesEdit'
import {AccountsEdit} from './src/Components/Views/AccountsEdit'
import {ProjectsEdit} from './src/Components/Views/ProjectsEdit'


import SQL from './src/Helpers/API/sql';

const sql = new SQL();

export default class App extends React.Component {

  componentDidMount() {
    sql.delete("account", {
      id: 1,
      name: 'toto'
    });
  }

  render() {
    return (
      <ProjectsEdit />
    )
  }
}