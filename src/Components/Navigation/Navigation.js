import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import {Accounts} from '../Accounts'
import {Expenses} from '../Expenses'
import {Projects} from '../Projects'

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

