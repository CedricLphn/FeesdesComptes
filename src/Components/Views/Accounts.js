import React from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, View, FlatList } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import AccountsEdit from '../Views/AccountsEdit';

import GlobalStyles from '../../Helpers/Styles/GlobalStyles';
import AccountPlaceHolder from '../../Helpers/PlaceHolders/Accounts.js'

import SQL from '../../Helpers/API/sql';

const sql = new SQL();


export class Accounts extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data : []
    }
  }
  componentDidMount() {
    console.log(sql.createTable("accounts", "id integer not null primary key, name varchar not null, type integer default 0, amount integer default 0"));
    sql.transaction(
      tx => {
        tx.executeSql('select * from accounts', [], (_, { rows }) => {
          console.log(rows._array);
          this.setState({ 
            data : rows._array
          })

        }
        );
      }
    );
  }

  render() {
    return (
      <SafeAreaView forceInset={Platform.OS === 'android' && { vertical: 'never' }}
      style={GlobalStyles.App}>
          <View style={GlobalStyles.container}>
            <FlatList data={this.state.data}
            renderItem={({item}) => <View style={styles.BoxAccount} > 
            <View> 
                <Text style={styles.AccountTitle} onPress={() => {
              this.props.navigation.navigate("Settings", {
                id : item.id
              })
            }}>{item.name}</Text>
            </View>
            <View>
                <Text>{item.type}</Text>
            </View>
            <View style={styles.AccountAmount}>
                <Text style={styles.AccountAmount}>{item.amount} €</Text>
            </View>
        </View>
              } />

        <ActionButton buttonColor="rgba(231,76,60,1)" onPress={() => this.props.navigation.navigate("Settings")} > </ActionButton>
          </View>
        {/* Rest of the app comes ABOVE the action button component !*/}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  BoxAccount : {
    backgroundColor : "#E5E5E5",
    flexDirection : "column",
    height: 120,
    margin: 20,
    padding: 10,
    paddingBottom: 0,
    paddingLeft: 0,
  },
  AccountTitle: {
    fontSize: 18
  },
  AccountAmount: {
    fontSize: 30,
    position: 'absolute',
    bottom:3,
    textAlign: "right",
    alignSelf: 'flex-end',
    paddingRight: 10
  }
})