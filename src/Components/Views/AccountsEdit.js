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
             <Text style={{fontWeight : 'bold', textAlign : 'center', fontSize : 20, marginTop : 30}}>Ajouter un compte</Text>
              </View>
              <View>
                  <Text style={styles.titles}>Nom du compte</Text>
                  <TextInput
                          style={styles.inputs}
                          // onChangeText={(text) => this.setState({text})}
                          // value={this.state.text}
                          placeholder={'ex : Société Générale'}
                        />

              </View>
              <View style={{alignItems : 'center'}}>
                  <Text style={styles.titles}>Type de compte</Text>
                  <View style={{width : '25%'}}>
                    <RadioForm
                        radio_props={accountType}
                        formHorizontal={false}
                        animation={true}
                        initial={1}
                        onPress={(value) => {}}
                    />
                  </View>
              </View>
              <View>
                  <Text style={styles.titles}>Montant</Text>
                  <TextInput
                          style={styles.inputs}
                          // onChangeText={(text) => this.setState({text})}
                          // value={this.state.text}
                          placeholder={'ex : 1500.00'}
                        />

              </View>
              <View style={{alignItems : 'center'}}>
                <View style={{backgroundColor : '#00897B', borderRadius : 10 , width : '30%', padding : 10}}>
                    <Button
                        onPress={console.log()}
                        title="Valider"
                        color="white"
                    />
                </View>
              </View>
          </View>
        {/* Rest of the app comes ABOVE the action button component !*/}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  titles : {textTransform : 'uppercase', textAlign : 'center'},
  inputs : {margin : 20, height: 40, borderColor: 'gray', borderBottomWidth: 1, textAlign : 'center'}
})