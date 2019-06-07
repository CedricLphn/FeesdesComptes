import React from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, View, Picker , TextInput, Button, FlatList } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

import GlobalStyles from '../../Helpers/Styles/GlobalStyles';
import AccountPlaceHolder from '../../Helpers/PlaceHolders/Accounts.js'

var accountType = [
    {label : 'courant', value : 1},
    {label : 'épargne', value : 2}
]

export class AccountsEdit extends React.Component {

  render() {
      
    return (
      <SafeAreaView forceInset={Platform.OS === 'android' && { vertical: 'never' }}
      style={GlobalStyles.App}>
          <View style={GlobalStyles.TopTitle}>
              <Text  style={GlobalStyles.TopTextTitle}>Mes comptes</Text>
          </View>
          <View style={GlobalStyles.container}>
              <View>
                  <Text>Nom du compte</Text>
                  <TextInput
                          style={{height: 40, borderColor: 'gray', borderBottomWidth: 1}}
                          // onChangeText={(text) => this.setState({text})}
                          // value={this.state.text}
                          placeholder={'ex : Société Générale'}
                        />

              </View>
              <View>
                  <Text>Type de compte</Text>
                  <RadioForm
                    radio_props={accountType}
                    formHorizontal={false}
                    animation={true}
                    initial={1}
                    onPress={(value) => {}}
                />

              </View>
              <View>
                  <Text>Montant</Text>
                  <TextInput
                          style={{height: 40, borderColor: 'gray', borderBottomWidth: 1}}
                          // onChangeText={(text) => this.setState({text})}
                          // value={this.state.text}
                          placeholder={'ex : 1500.00'}
                        />

              </View>
 
         

       
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