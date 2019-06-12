import React from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, View, FlatList } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

import GlobalStyles from '../../Helpers/Styles/GlobalStyles';
import ExpensesAccountNamePlaceHolder from '../../Helpers/PlaceHolders/Expenses'
import ExpensesAccount1PlaceHolder from '../../Helpers/PlaceHolders/Expenses.Account1'

import SQL from '../../Helpers/API/sql'

const sql = new SQL();

export class Expenses extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data : []
    }
  }


  componentDidMount() {
    // sql.transaction(
    //   tx => {
    //     tx.executeSql(`DROP TABLE expenses`, [], (_, { rows }) => {
    //       console.log(rows);

    //     })
    //   }
    // );

    // sql.insert("expenses", {
    //   account_id : 1,
    //   name : "olomdrl",  
    //   amount: 300
    // })
    
    sql.createTable("expenses", `
    "id"	INTEGER NOT NULL PRIMARY KEY,
    "account_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "amount"	INTEGER DEFAULT 0,
    FOREIGN KEY("account_id") REFERENCES "accounts"("id") ON DELETE CASCADE` 
    )

    sql.transaction(
      tx => {
        tx.executeSql(`SELECT * FROM accounts
        LEFT JOIN expenses
        ON accounts.id = expenses.account_id`, [], (_, { rows }) => {
          this.setState({
            data: rows
          })

        })
      }
    );
  }

  render() {
    return (
      <SafeAreaView forceInset={Platform.OS === 'android' && { vertical: 'never' }}
      style={GlobalStyles.App}>
          <View style={GlobalStyles.container}>
            <FlatList data={this.state.data}
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