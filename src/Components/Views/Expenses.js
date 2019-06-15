import React from 'react';
import {Platform, SafeAreaView, StyleSheet, Text, View, FlatList, Image} from 'react-native';
import ActionButton from 'react-native-action-button';

import GlobalStyles from '../../Helpers/Styles/GlobalStyles';

import SQL from '../../Helpers/API/sql'
import {ExpensesAccount} from "../Expenses/ExpensesAccount";
import Loading from "../Loading";

const sql = new SQL();

export class Expenses extends React.Component {

  state = {
    loading : true,
    accountId: []
  };

  componentDidMount() {
    // sql.transaction(
    //   tx => {
    //     tx.executeSql(`DROP TABLE expenses`, [], (_, { rows }) => {
    //       console.log(rows);

    //     })
    //   }
    // );

    sql.createTable("expenses", `
    "id"	INTEGER NOT NULL PRIMARY KEY,
    "account_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "amount"	INTEGER DEFAULT 0,
    FOREIGN KEY("account_id") REFERENCES "accounts"("id") ON DELETE CASCADE`
    )


    sql.transaction(
      tx => {
        tx.executeSql(`SELECT id FROM accounts
        `, [], (_, { rows }) => {
          let accounts = [];

          let row = rows._array;

          for(let [key, account] of Object.entries(row)) {
            console.log("id", account)
            accounts.push(account.id);
          }

          this.setState({
            loading: false,
            accountId: accounts}
            );
        })
      });


  }


  render() {
    const list = this.state.accountId.map((accountId, key) => {
      return <ExpensesAccount key={key} accountId={accountId} />
    });
    const { accountId } = this.state;

    if(this.state.loading == true) {
      return(
          <Loading />
      )
    }else {
      return (
          <SafeAreaView forceInset={Platform.OS === 'android' && { vertical: 'never' }}
                        style={GlobalStyles.App}>
            <View style={GlobalStyles.container}>
              {(accountId.length > 0) ? (
                  <View>
                    {list}
                  </View>
              ) : (
                  <View style={styles.centering}>
                    <Image source={require('../../../assets/empty.png')} />
                    <Text>Veuillez ajouter un compte</Text>
                  </View>
              )}

              <ActionButton buttonColor="rgba(231,76,60,1)" onPress={() => this.props.navigation.navigate('Settings')} />
            </View>
          </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  centering: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})
