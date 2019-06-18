import React from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, View, Picker , TextInput, Button, FlatList } from 'react-native';

import GlobalStyles from '../../Helpers/Styles/GlobalStyles';
import SQL from "../../Helpers/API/sql";
import {Input} from "../ExpensesEdit/Input";

const sql = new SQL();

export class ExpensesEdit extends React.Component {

    state = {
        accounts: [],
        selectAccount: 1
    };

    constructor(props) {
        super(props);

        this.onExpensesUpdate.bind(this);
    }

    componentDidMount() {
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


    onExpensesUpdate(event) {
        this.setState({
            expenses: event
        })

        console.log("EXPENSESEDIT NEW STATE", event);
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
                <Input onChange={(e) => this.onExpensesUpdate(e)} />
            </View>
          </View>
          <View style={{}}>
                <Button
                  onPress={() => console.log()}
                  title="Confirmer les modifications"
                  color="#cc0001"
                />
              </View>
        {/* Rest of the app comes ABOVE the action button component !*/}
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
}
