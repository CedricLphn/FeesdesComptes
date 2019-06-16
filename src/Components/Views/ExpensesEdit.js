import React from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, View, Picker , TextInput, Button, FlatList } from 'react-native';

import GlobalStyles from '../../Helpers/Styles/GlobalStyles';
import AccountPlaceHolder from '../../Helpers/PlaceHolders/Accounts.js'
import SQL from "../../Helpers/API/sql";
import {Input} from "../ExpensesEdit/Input";

const sql = new SQL();

export class ExpensesEdit extends React.Component {

    state = {
        accounts: []
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
                    selectedValue={this.state.language}
                  style={{height: 50, width: '100%', top : -40}}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({language: itemValue}) }
                  >
                    {listAccountName}
                </Picker>
              </View>
              <View style={{marginTop: 90, marginBottom: 30}}>
              <Text style={{fontWeight : 'bold', textAlign : 'center', fontSize : 20}}>Nouvelle charge</Text>
              </View>
                <Input />

      {/*        <View style={{marginTop: 30}}>
              <Text style={{fontWeight : 'bold', textAlign : 'center', fontSize : 20}}>Modifier des charges</Text>
              </View>
              <View style={{justifyContent : 'center', marginTop : 40}}>
              <FlatList data={AccountPlaceHolder}
                  renderItem={({item}) =>
                    <View style={{flexDirection : 'row'}} >
                      <View style={{flex: 4, marginLeft : 40}}>
                        <TextInput
                          style={{height: 40, borderColor: 'gray', borderBottomWidth: 1}}
                          // onChangeText={(text) => this.setState({text})}
                          // value={this.state.text}
                          placeholder={'ex : loyer'}
                        />
                      </View>
                      <View style={{flex: 3, marginLeft : 40}}>
                        <TextInput
                          style={{height: 40, borderColor: 'gray', borderBottomWidth: 1, textAlign : 'right'}}
                          // onChangeText={(text) => this.setState({text})}
                          // value={this.state.text}
                          
                        />
                      </View>
                      <View style={{flex : 2}}>
                        <Button
                          onPress={console.log()}
                          title="&#10008;"
                          color="#cc0001"
                          accessibilityLabel="Learn more about this purple button"
                        />
                      </View>
                    </View>
              } />
              </View>*/}
           

            </View>
          </View>
          <View style={{}}>
                <Button
                  onPress={() => console.log()}
                  title="Confirmer les modifications"
                  color="#cc0001"
                  accessibilityLabel="Learn more about this purple button"
                />
              </View>
        {/* Rest of the app comes ABOVE the action button component !*/}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({

})