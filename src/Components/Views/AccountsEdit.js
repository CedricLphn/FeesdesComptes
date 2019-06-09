import React from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, View, Picker , TextInput, Button, FlatList } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

import GlobalStyles from '../../Helpers/Styles/GlobalStyles';
import AccountPlaceHolder from '../../Helpers/PlaceHolders/Accounts.js'

import SegmentedControlTab from "react-native-segmented-control-tab";

import {AccountForm} from "../Forms/AccountForm";

var accountType = [
    {label : 'Compte courant', value : 1},
    {label : 'Compte d\'épargne', value : 2}
]

export class AccountsEdit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0
    };
  }

  handleIndexChange = index => {
    this.setState({
      ...this.state,
      selectedIndex: index
    });
  };

  render() {

    return(
      <SafeAreaView forceInset={Platform.OS === 'android' && { vertical: 'never' }}
      style={GlobalStyles.App}>
          <View style={GlobalStyles.TopTitle}>
              <Text style={GlobalStyles.TopTextTitle}>Ajouter // Modifier un compte</Text>
          </View>
          <View style={GlobalStyles.container}>
              <AccountForm id={1} />
          </View>
      </SafeAreaView>
    );
  }
}

