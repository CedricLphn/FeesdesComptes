import React from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

import GlobalStyles from '../Helpers/GlobalStyles';

export class Accounts extends React.Component {
  render() {
    return (
      <SafeAreaView forceInset={Platform.OS === 'android' && { vertical: 'never' }}
      style={GlobalStyles.App}>
          <View style={GlobalStyles.TopTitle}>
              <Text  style={GlobalStyles.TopTextTitle}>Mes comptes</Text>
          </View>
          <View style={GlobalStyles.container}>
              <View style={styles.BoxAccount}> 
                  <View> 
                      <Text style={styles.AccountTitle}>Nom du compte</Text>
                  </View>
                  <View>
                      <Text>Compte épargne</Text>
                  </View>
                  <View style={styles.AccountAmount}>
                      <Text style={styles.AccountAmount}>100 €</Text>
                  </View>
              </View>
          </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  BoxAccount : {
    backgroundColor : "#E5E5E5",
    flexDirection : "column",
    width: 354,
    height: 120,
    margin: 20,
    padding: 5,
    paddingBottom: 0,
    paddingLeft: 0,
  },
  AccountTitle: {
    fontSize: 18
  },
  AccountAmount: {
    fontSize: 30,
    position: 'absolute',
    bottom:0,
    textAlign: "right",
    alignSelf: 'flex-end',
    paddingRight: 5
  }
})