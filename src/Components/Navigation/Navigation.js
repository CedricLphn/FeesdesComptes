import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import {Accounts} from '../Views/Accounts'
import {Expenses} from '../Views/Expenses'
import {Projects} from '../Views/Projects'

const TabNavigator = createBottomTabNavigator({
    Accounts: { screen: Accounts,
                navigationOptions: {
                    title: 'Comptes'
                } },
    Expenses: { screen: Expenses,
                navigationOptions: {
                    title: 'Charges'
                } },
    Projects: { screen: Projects,
                navigationOptions: {
                    title: 'Projets'
                } },
  });
  
export default createAppContainer(TabNavigator);

