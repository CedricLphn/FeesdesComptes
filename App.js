import React from 'react';
import Navigation from './src/Components/Navigation/Navigation'
import {ExpensesEdit} from './src/Components/Views/ExpensesEdit'
import {AccountsEdit} from './src/Components/Views/AccountsEdit'
import {ProjectsEdit} from './src/Components/Views/ProjectsEdit'



export default class App extends React.Component {

  componentDidMount() {

  }

  render() {
    return (
      <ProjectsEdit />
    )
  }
}