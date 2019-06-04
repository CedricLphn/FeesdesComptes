import React from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, View, FlatList } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

import GlobalStyles from '../Helpers/Styles/GlobalStyles';
import AccountPlaceHolder from '../Helpers/PlaceHolders/Accounts.js'
import ExpensesAccountNamePlaceHolder from '../Helpers/PlaceHolders/Expenses'
import ExpensesAccount1PlaceHolder from '../Helpers/PlaceHolders/Expenses.Account1'

export class Expenses extends React.Component {
  render() {
    return (
      <SafeAreaView forceInset={Platform.OS === 'android' && { vertical: 'never' }}
      style={GlobalStyles.App}>
          <View style={GlobalStyles.TopTitle}>
              <Text  style={GlobalStyles.TopTextTitle}>Mes charges</Text>
          </View>
          <View style={GlobalStyles.container}>
            <FlatList data={ExpensesAccountNamePlaceHolder}
            renderItem={({item}) => 
            <View style={styles.boxAccountExpenses}> 
              <View>
                <View style={{marginBottom : 30}}>
                  <Text style={styles.accountName}>{item.accountName}</Text>
                </View>
                <FlatList data={ExpensesAccount1PlaceHolder}
                renderItem={({item}) =>
                <View style={{flexDirection : "row"}}>
                  <View style={styles.boxExpense}>
                    <Text style={styles.expenseName}>{item.name}</Text>
                  </View>
                  <View style={styles.boxExpense}>
                    <Text style={styles.expenseAmount}>{item.amount} €</Text>
                  </View>
                </View>
                }/>  
              </View>
            </View>
            } />

        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => console.log("notes tapped!")}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => {}}>
            <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => {}}>
            <Icon name="md-done-all" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
          </View>
        {/* Rest of the app comes ABOVE the action button component !*/}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  boxAccountExpenses : {
    backgroundColor : "#E5E5E5",
    flexDirection : "column",
    justifyContent: "center",
    marginTop: 5,
    paddingBottom: 40,
    paddingTop : 30
  },
  accountName : {
    fontSize : 28,
    fontWeight : "bold",
    textAlign : "center"
  },
  boxExpense : {
    flex : 1, marginLeft : 60, marginRight : 60
  },
  expenseName : {
    textTransform : "uppercase",
  },
  expenseAmount : {
    fontStyle : "italic",
    textAlign : "right"
  }

})