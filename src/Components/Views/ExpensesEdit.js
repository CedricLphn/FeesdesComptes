import React from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, View, Picker , TextInput, Button, FlatList } from 'react-native';

import GlobalStyles from '../../Helpers/Styles/GlobalStyles';
import SQL from "../../Helpers/API/sql";
import {Input} from "../ExpensesEdit/Input";

const sql = new SQL();

export class ExpensesEdit extends React.Component {

    state = {
        accounts: [],
        selectAccount: this.props.navigation.getParam("id", 1),
        isEdit : this.props.navigation.getParam("id", false)
    };

    constructor(props) {
        super(props);



        this.onExpensesUpdate.bind(this);
    }

    componentDidMount() {
        console.log("Hello");
        this.getExpensesOnAccount();

    }


    onExpensesUpdate(event) {
        this.setState({
            expenses: event
        })

        console.log("EXPENSESEDIT NEW STATE", event);
    }

    setQuery() {
        const {isEdit, selectAccount, expenses} = this.state;

        if(isEdit) {
            sql.delete("expenses", {
                "account_id": selectAccount
            })
        }

        if(expenses) {
            expenses.map((expense, index) => {
                sql.insert("expenses", {
                    name : expense.name,
                    account_id : selectAccount,
                    amount : expense.amount
                });
            });

            this.props.navigation.navigate("Expenses", { updated: true});

        }else {
            alert("Ajouter au moins une charge.")
        }


    }

    render() {
        const listAccountName = this.state.accounts.map((account, index) => {
            return(
                <Picker.Item key={index} label={account.name} value={account.id} />
            )
        });
    return (
      <SafeAreaView forceInset={Platform.OS === 'android' && { vertical: 'never' }}
      style={GlobalStyles.App}>
          <View style={GlobalStyles.container}>
            <View style={{}}>
              <View style={{marginTop: 50}}>
              <Text style={{fontWeight : 'bold', textAlign : 'center', fontSize : 20}}>Choisir un compte</Text>
              </View>
              <View>
                  <Picker

                      selectedValue={this.state.selectAccount }
                      onValueChange={(itemValue, itemIndex) => this.pickerChange(itemIndex)}>{

                      this.state.accounts.map( (v)=>{
                          return <Picker.Item key={v.id} label={v.name} value={v.id} />
                      })

                  }

                  </Picker>
              </View>
              <View style={{marginTop: 90, marginBottom: 30}}>
              <Text style={{fontWeight : 'bold', textAlign : 'center', fontSize : 20}}>Nouvelle charge</Text>
              </View>
                <Input data={this.state.isEdit} onChange={(e) => this.onExpensesUpdate(e)} />
            </View>
          </View>
          <View style={{}}>
                <Button
                  onPress={this.setQuery.bind(this)}
                  title="Confirmer les modifications"
                  color="#cc0001"
                />
              </View>
      </SafeAreaView>
    );
  }

    pickerChange(index) {
        this.state.accounts.map( (v,i)=>{

            if( index === i ) {

                this.setState({
                    selectAccount: this.state.accounts[index].id,
                })

            }
        })

    }

    getExpensesOnAccount() {
        if(this.state.isEdit) {
            sql.transaction(
                tx => {
                    tx.executeSql(`SELECT * from accounts WHERE id=${this.state.isEdit}`, [], (_, { rows }) => {
                        this.setState({
                            accounts : rows._array
                        })

                        console.log(rows._array);

                    })
                }
            );
        }else {
            sql.transaction(
                tx => {
                    tx.executeSql(`SELECT * from accounts`, [], (_, { rows }) => {
                        this.setState({
                            accounts : rows._array
                        })

                        console.log(rows._array);

                    })
                }
            );
        }

    }
}
