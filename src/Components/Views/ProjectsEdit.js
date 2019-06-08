import React from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, View, Picker , TextInput, Button, FlatList } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-datepicker'

import GlobalStyles from '../../Helpers/Styles/GlobalStyles';
import AccountPlaceHolder from '../../Helpers/PlaceHolders/Accounts.js'

var accountType = [
    {label : 'avec un montant', value : 1},
    {label : 'avec une date', value : 2}
]

export class ProjectsEdit extends React.Component {
    constructor(props){
        super(props)
        this.state = {date:"2016-05-15"}
      }
  render() {
      
    return (
      <SafeAreaView forceInset={Platform.OS === 'android' && { vertical: 'never' }}
      style={GlobalStyles.App}>
          <View style={GlobalStyles.TopTitle}>
              <Text  style={GlobalStyles.TopTextTitle}>édition de projets</Text>
          </View>
          <View style={GlobalStyles.container}>
              <View>
                 <Text style={{fontWeight : 'bold', textAlign : 'center', fontSize : 20, marginTop : 50, marginBottom : 50}}>Ajouter un projet</Text>
              </View>

              <View style={{flexDirection : 'row', marginBottom : 20}} >
                      <View style={{flex: 4, marginLeft : 40}}>
                        <TextInput
                          style={{height: 40, borderColor: 'gray', borderBottomWidth: 1}}
                          // onChangeText={(text) => this.setState({text})}
                          // value={this.state.text}
                          placeholder={'ex : Moto BMW S1000R'}
                        />
                      </View>
                      <View style={{flex: 3, marginLeft : 40, marginRight: 40}}>
                        <TextInput
                          style={{height: 40, borderColor: 'gray', borderBottomWidth: 1, textAlign : 'right'}}
                          // onChangeText={(text) => this.setState({text})}
                          // value={this.state.text}
                          placeholder={'600.00 €'}
                        />
                      </View>
           
                    </View>
                    <View style={{flexDirection : 'row', marginBottom : 20}} >
                    <DatePicker
                        style={{width: 200}}
                        date={this.state.date}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        minDate="2016-05-01"
                        maxDate="2016-06-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                        // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => {this.setState({date: date})}}
                    />
                    </View>
              <View style={{alignItems : 'center'}}>
                {/* <View style={{backgroundColor : '#00897B', borderRadius : 10 , width : '30%', padding : 10}}>
                    <Button
                        onPress={console.log()}
                        title="Valider"
                        color="white"
                    />
                </View> */}
              </View>
              <View>
                 <Text style={{fontWeight : 'bold', textAlign : 'center', fontSize : 20, marginTop : 30, marginBottom : 30}}>Modifier un compte</Text>
              </View>
              <View style={{marginBottom: 30}}>
                <Picker
                  // selectedValue={this.state.language}
                  style={{height: 50, width: '100%', top : -65}}
                  // onValueChange={(itemValue, itemIndex) =>
                  //   this.setState({language: itemValue})}
                  >
                </Picker>
              </View>
              <View style={{justifyContent : 'center', marginTop : 40}}>
              <View style={{alignItems : 'center', marginBottom : 20}}>
                  <View style={{}}>
                    <RadioForm
                        radio_props={accountType}
                        formHorizontal={false}
                        animation={true}
                        initial={0}
                        onPress={(value) => {}}
                    />
                  </View>
              </View>
              <FlatList data={AccountPlaceHolder}
                  renderItem={({item}) =>
                    
                    <View style={{flexDirection : 'row'}} >
                      <View style={{flex: 4, marginLeft : 40}}>
                        <TextInput
                          style={{height: 40, borderColor: 'gray', borderBottomWidth: 1}}
                          // onChangeText={(text) => this.setState({text})}
                          // value={this.state.text}
                          placeholder={'ex : Société générale'}

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
              </View>
          
              
          </View>
          <View style={{}}>
                <Button
                  onPress={console.log()}
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
  titles : {textTransform : 'uppercase', textAlign : 'center'},
  inputs : {margin : 20, height: 40, borderColor: 'gray', borderBottomWidth: 1, textAlign : 'center'}
})