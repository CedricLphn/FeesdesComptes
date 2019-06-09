import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import {Accounts} from '../Views/Accounts'
import {Expenses} from '../Views/Expenses'
import {Projects} from '../Views/Projects'
import {AccountsEdit} from '../Views/AccountsEdit'

const HomeStack = createStackNavigator(
    {
      //Defination of Navigaton from home screen
      Accounts: { screen: Accounts },
      Settings: { screen: AccountsEdit }
    },
    {
      //For React Navigation 2.+ change defaultNavigationOptions->navigationOptions
      defaultNavigationOptions: {
        //Header customization of the perticular Screen
        headerStyle: {
          backgroundColor: '#00897B',
        },
        headerTintColor: '#FFFFFF',
        title: 'Home',
        //Header title
      },
    }
  );

const TabNavigator = createBottomTabNavigator({
    Accounts: { screen: HomeStack,
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

