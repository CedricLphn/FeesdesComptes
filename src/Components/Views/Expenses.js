import React from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, View, FlatList } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

import GlobalStyles from '../../Helpers/Styles/GlobalStyles';
import ExpensesAccountNamePlaceHolder from '../../Helpers/PlaceHolders/Expenses'
import ExpensesAccount1PlaceHolder from '../../Helpers/PlaceHolders/Expenses.Account1'

export class Expenses extends React.Component {
  render() {
    return (
      <SafeAreaView forceInset={Platform.OS === 'android' && { vertical: 'never' }}
      style={GlobalStyles.App}>
          <View style={GlobalStyles.container}>
            <FlatList data={ExpensesAccountNamePlaceHolder}
            renderItem={({item}) => 
            <View style={styles.boxAccountExpenses}> 
              <View>
                <View style={styles.boxAccountName}>
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

        <ActionButton buttonColor="rgba(231,76,60,1)" onPress={() => this.props.navigation.navigate('Settings')} />
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
    textAlign : "center",
    marginLeft : 60,
    marginRight : 60,
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
  },
  boxAccountName : {marginBottom : 30, borderColor : "white", borderWidth : 1}
})