import React from 'react';
import { Alert, Platform, SafeAreaView, Text, View, StyleSheet, TextInput, Button } from 'react-native';


import GlobalStyles from '../../Helpers/Styles/GlobalStyles';

import SegmentedControlTab from "react-native-segmented-control-tab";

import SQL from '../../Helpers/API/sql';
import Loading from '../Loading';

const sql = new SQL();


export class AccountsEdit extends React.Component {
  
  constructor(props) {
    super(props);
    
    const { navigation } = this.props;

    var data = {
        id : navigation.getParam("id", 0),
        name : null,
        amount: "",
        type : null
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
          sql.update("accounts", {
            name: data.name,
            type: this.state.selectedIndex,
            amount: data.amount
          }, {
            id : data.id
          })
      }else {
          // Add

              sql.insert("accounts", {
                  name : data.name,
                  type : this.state.selectedIndex,
                  amount : data.amount
              });


      }

      this.props.navigation.navigate("Accounts", { updated: true});
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
                tx.executeSql('select * from accounts where id=?', [this.state.data.id], (_, { rows }) => {
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

  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
  
    return {
      title: (state.params && state.params.title ? state.params.title : 'Ajouter un compte')
    };
  };

  render() {
    console.log("account : ", this.state.data.id)
    var button = (this.state.data.id != 0) ? "Modifier ce compte" : "Ajouter un compte";
    return(
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
                    <Text>Nom du compte : </Text>
                    <TextInput
                            // value={this.state.text}
                            placeholder={'ex : Société générale'}
                            value={this.state.data.name}
                            onChangeText={this.handleAccountName}
                    />
                    </View>
                   
                </View>
                <View style={[{width: 300, alignSelf: 'center'},styles.boxes]}>
                    <SegmentedControlTab
                    values={["Compte Epargne", "Compte Courant"]}
                    selectedIndex={this.state.selectedIndex}
                    onTabPress={this.handleIndexChange}
                    />
                </View>
                <View style={[{flexDirection: 'row'},styles.boxes]}>
                    <View>
                    <Text>Montant du compte : </Text>
                    </View>
                    <View>
                    <TextInput
                            // onChangeText={(text) => this.setState({text})}
                            // value={this.state.text}
                            placeholder={'2500 €'}
                            keyboardType={'numeric'}
                            value={this.state.data.amount.toString()}
                            onChangeText={this.handleAmount}
                    />
                    </View>
                </View>
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
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  titles : {textTransform : 'uppercase', textAlign : 'center'},
  inputs : {margin : 20, height: 40, borderColor: 'gray', borderBottomWidth: 1, textAlign : 'center'},
  boxes : {height: 50, alignItems: 'center', justifyContent: 'center'}
})