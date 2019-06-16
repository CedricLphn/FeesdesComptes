import React from 'react';
import {Platform, SafeAreaView, StyleSheet, Text, View, Picker, TextInput, Button, FlatList, Alert} from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome'
import DatePicker from 'react-native-datepicker'

import GlobalStyles from '../../Helpers/Styles/GlobalStyles';
import AccountPlaceHolder from '../../Helpers/PlaceHolders/Accounts.js'
import Loading from "../Loading";
import SegmentedControlTab from "react-native-segmented-control-tab";
import moment from "moment";
import SQL from '../../Helpers/API/sql';

const sql = new SQL();


const myIcon = <Icon name="money" size={30} color="#900" />;

export class ProjectsEdit extends React.Component {
    constructor(props){
        super(props)

        const { navigation } = this.props;

        var data = {
            id : navigation.getParam("id", 0),
            name : null,
            amount: null,
            type : null,
            date : null,
            amount_per_month: null,
            r_date: null,
            r_amount : null
        }


        this.state = {
            data : data,
            selectedIndex : 0,
            loading: (data.id > 0) ? true: false,
        }
    }


    Transaction() {
        var data = this.state.data;
        if(data.name != null && data.amount != null) {
            if(data.id != 0) {
                // Update
                sql.update("projects", {
                    name: data.name,
                    type: this.state.selectedIndex,
                    amount: data.amount,
                    date : data.date,
                    amount_per_month : data.amount_per_month,
                    r_date : data.r_date,
                    r_amount: data.r_amount
                }, {
                    id : data.id
                })
            }else {
                // Add

                sql.insert("projects", {
                    name : data.name,
                    type : this.state.selectedIndex,
                    amount : data.amount,
                    date : data.date,
                    amount_per_month : data.amount_per_month,
                    r_date : data.r_date,
                    r_amount: data.r_amount,
                });


            }

            this.props.navigation.navigate("Projects", { updated: true});
        }
    }

    calculateDateWithAmountPerMonth (text) {
        if(this.state.data.amount != null)
        {
            const amountPerMonth = text
            const times = Math.round(this.state.data.amount/amountPerMonth)
            const endDate = moment().add(times, 'M').format('YYYY-MM-DD')
            this.setState({data: {
                    ...this.state.data,
                    r_date : endDate
                }})
        }
    }

    calculateAmountWithDate = (text) => {
        const dateChoosen = moment(text)
        if(this.state.data.amount != null) {
            const actualDate = moment(this.state.data.date)
            const diff = dateChoosen.diff(actualDate)
            const diffDuration = moment.duration(diff)
            const tmp = diffDuration.months()
            const calcul =  this.state.data.amount/tmp
            this.setState({data: {
                    ...this.state.data,
                    amount_per_month : calcul
                }})
        }
    }

    handleIndexChange = index => {
        this.setState({
            ...this.state,
            selectedIndex: index
        });
    };

    componentDidMount() {
        if(this.state.data.id != 0) {
            sql.transaction(
                tx => {
                    tx.executeSql('select * from projects where id=?', [this.state.data.id], (_, { rows }) => {
                            this.setState({
                                data : rows._array[0],
                                selectedIndex: rows._array[0].type,
                                loading: false
                            });

                        }
                    );
                }

            );
        }
    }


    handleAccountName = (text) => {this.setState({data: {
            ...this.state.data,
            name : text
        }})};

    handleAmount = (text) => {this.setState({data: {
            ...this.state.data,
            amount : text
        }})};

    handleRAmount = (text) => {this.setState({data: {
            ...this.state.data,
            amount_per_month : text
        }})
        this.calculateDateWithAmountPerMonth(text)
    };

    handleRDate = (text) => {this.setState({data: {
            ...this.state.data,
            date : text
        }})
    };

    static navigationOptions = ({ navigation }) => {
        const { state } = navigation;

        return {
            title: (state.params && state.params.title ? state.params.title : 'Ajouter un projet')
        };
    };

  render() {
      console.log(this.state)
      var button = (this.state.data.id != 0) ? "Modifier ce projet" : "Ajouter un projet";
    return (
      <SafeAreaView forceInset={Platform.OS === 'android' && { vertical: 'never' }}
      style={GlobalStyles.App}>
          <View style={GlobalStyles.container}>
              <View style={{flexDirection: 'column', flex: 1}}>
                  {(this.state.loading) ? (
                      <Loading loading={this.state.loading} />
                  ) : (
                      <View >
                          <View style={styles.boxes}>
                              <View  style={{flexDirection: 'row', alignItems: 'center'}}>
                                  <Text>Nom du projet : </Text>
                                  <TextInput
                                      // value={this.state.text}
                                      placeholder={'ex : Mac Pro modulaire'}
                                      value={this.state.data.name}
                                      onChangeText={this.handleAccountName}
                                  />
                              </View>

                          </View>
                          <View style={[{flexDirection: 'row'},styles.boxes]}>
                              <View>
                                  <Text>Montant : </Text>
                              </View>
                              <View>
                                  <TextInput
                                      // onChangeText={(text) => this.setState({text})}
                                      // value={this.state.text}
                                      placeholder={'6000 €'}
                                      keyboardType={'numeric'}
                                      value={this.state.data.amount}
                                      onChangeText={this.handleAmount}
                                  />
                              </View>
                          </View>
                          <View style={[{width: 300, alignSelf: 'center'},styles.boxes]}>
                              <SegmentedControlTab
                                  values={["Mensualité", "Date"]}
                                  selectedIndex={this.state.selectedIndex}
                                  onTabPress={this.handleIndexChange}
                              />
                          </View>
                          {(this.state.selectedIndex == 0) ? (
                              <View style={[{flexDirection: 'row'},styles.boxes]}>
                                  <View style={{marginRight: 20}}>
                                      {myIcon}
                                  </View>
                                  <View>
                                      <TextInput
                                          // onChangeText={(text) => this.setState({text})}
                                          // value={this.state.text}
                                          placeholder={(this.state.data.amount_per_month != null) ? this.state.data.amount_per_month : 'choisir un montant' }
                                          keyboardType={'numeric'}
                                          value={this.state.data.amount_per_month}
                                          onChangeText={this.handleRAmount}
                                      />
                                  </View>

                              </View>
                          ) : (
                              <View style={[{flexDirection: 'row'},styles.boxes]}>
                                  <View>
                                      <DatePicker
                                          locale={'fr'}
                                          style={{width: 200, height: 30}}
                                          date={this.state.data.date}
                                          mode="date"
                                          placeholder={(this.state.data.date != null) ? this.state.data.date : 'choisir une date' }
                                          format="YYYY-MM-DD"
                                          minDate={moment().format('YYYY-MM-DD')}
                                          maxDate={moment().add(30, 'years').format('YYYY-MM-DD')}
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
                                          onDateChange={this.handleRDate}
                                      />
                                  </View>
                              </View>
                          )}

                          <View style={{marginTop: 20}}>
                              <Button
                                  title={button}
                                  color="#00897B"
                                  onPress={() => this.Transaction()}
                              />
                              {(this.state.data.id != 0) ? (
                                  <View>
                                      <Button
                                          title="Supprimer ce compte"
                                          color="red"
                                          onPress={() => {
                                              Alert.alert(
                                                  'Confirmation',
                                                  'Voulez-vous vraiment supprimer ce compte ?',
                                                  [
                                                      {
                                                          text: 'Non',
                                                          style: 'cancel',
                                                      },
                                                      {text: 'Oui', onPress: () => {
                                                              sql.delete("accounts", {
                                                                  id: this.state.data.id
                                                              });
                                                              this.props.navigation.navigate("Accounts", { updated: true});
                                                          }},
                                                  ],
                                                  {cancelable: false},
                                              );
                                          }}
                                      />
                                  </View>
                              ): (
                                  false
                              )}
                          </View>
                      </View>
                  )}
              </View>
          </View>
        {/* Rest of the app comes ABOVE the action button component !*/}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    titles : {textTransform : 'uppercase', textAlign : 'center'},
    inputs : {margin : 20, height: 40, borderColor: 'gray', borderBottomWidth: 1, textAlign : 'center'},
    boxes : {height: 50, alignItems: 'center', justifyContent: 'center'}
})