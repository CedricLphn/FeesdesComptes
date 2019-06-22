import React from 'react';
import { Image, Platform, SafeAreaView, StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import AccountsEdit from '../Views/AccountsEdit';
import { Container, Header, Content, Card, CardItem, Body } from 'native-base';

import GlobalStyles from '../../Helpers/Styles/GlobalStyles';
import AccountPlaceHolder from '../../Helpers/PlaceHolders/Accounts.js'
import IconV from 'react-native-vector-icons/FontAwesome'
const euroIcon = <IconV name="euro" size={20} color="#ff9800" />;

import SQL from '../../Helpers/API/sql';
import Loading from '../Loading';

const sql = new SQL();


export class Accounts extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data : [],
      loading : true
    }
  }
  componentDidMount() {
    this.refresh();
  }

  componentWillReceiveProps() {
    this.setState({
      ...this.state,
      loading: true
    })
    this.refresh();
  }

  refresh() {


    console.log(sql.createTable("accounts", "id integer not null primary key, name varchar not null, type integer default 0, amount integer default 0"));
    sql.transaction(
      tx => {
        tx.executeSql('select * from accounts', [], (_, { rows }) => {
          console.log("trransaction : ", rows._array);

          this.setState({ 
            data : rows._array,
            length : rows.length,
            loading : false,
          })

        }
        );
      }
    );
  }

  switchColor(type) {
    var color = '';
    if(type == '0'){
      return(
          <Body style={{flex: 1, justifyContent: 'center', flexDirection: 'row', borderWidth: 1, borderRadius: 5, backgroundColor: '#2196f3', borderColor: 'white'}}>
            <Text style={{padding: 15, color: 'white'}}>
              {"Compte épargne"}
            </Text>
          </Body>
          )

    }
    else
    {
      return (
          <Body style={{flex: 1, justifyContent: 'center', flexDirection: 'row', borderWidth: 1, borderRadius: 5, backgroundColor: '#4caf50', borderColor: 'white'}}>
            <Text style={{padding: 15, color: 'white'}}>
              {"Compte courant"}
            </Text>
          </Body>
          )

    }
  }

  render() {

    return (
      <SafeAreaView forceInset={Platform.OS === 'android' && { vertical: 'never' }}
      style={GlobalStyles.App}>
          <View style={GlobalStyles.container}>
            <Loading loading={this.state.loading} />
            {(this.state.length > 0) && (this.state.loading == false) ? ( 
            <FlatList data={this.state.data}
              keyExtractor = {(item) => item.id.toString()}
              renderItem={({item}) => <TouchableOpacity style={styles.BoxAccount}  onPress={() => {
              this.props.navigation.navigate("Settings", {
                id : item.id,
                title: "Modifier un compte"
              })
            }}>
                <Card style={{borderRadius: '5px', padding : 10}}>
                  <CardItem header>
                    <Text style={{fontSize: 24}}>{item.name}</Text>
                  </CardItem>
                  <CardItem style={{width: '50%', alignSelf: 'center'}}>
                    {this.switchColor(item.type)}
                  </CardItem>
                  <CardItem footer>
                    <View style={{flex: 1, justifyContent: 'flex-end', flexDirection: 'row'}}>
                      <Text style={{fontSize: 20, color : '#ff9800'}}>{item.amount} {euroIcon}</Text>
                    </View>
                  </CardItem>
                </Card>

        </TouchableOpacity>
              } />
            ) : (
              <View style={styles.centering}>
                <Image source={require('../../../assets/empty.png')} />
                <Text>Il n'y a aucun compte, pourquoi pas en ajouter un ?</Text>
              </View>
    )}

        <ActionButton buttonColor="rgba(231,76,60,1)" onPress={() => this.props.navigation.navigate("Settings")} />
          </View>
        {/* Rest of the app comes ABOVE the action button component !*/}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  BoxAccount : {
    flexDirection : "column",
    height: 200,
    marginLeft: 4,
    marginRight: 4,

  },
  centering: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})