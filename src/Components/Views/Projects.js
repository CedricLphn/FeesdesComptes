import React from 'react';
import {Platform, SafeAreaView, StyleSheet, Text, View, FlatList, TouchableOpacity, Image} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

import GlobalStyles from '../../Helpers/Styles/GlobalStyles';
import ProjectsPlaceHolder from '../../Helpers/PlaceHolders/Projects.js'

import SQL from '../../Helpers/API/sql';
import Loading from '../Loading';

const sql = new SQL();

export class Projects extends React.Component {
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


    // name : data.name,
    // type : this.state.selectedIndex,
    // amount : data.amount,
    // date : data.date,
    // amount_per_month : data.amount_per_month,
    // r_date : data.r_date,
    // r_amount: data.r_amount,

    refresh() {

        // IF CHANGEMENT ON TABLE FIELDS UNCOMMENT ONE TIME BELOW
        // sql.transaction(
        //     tx => {
        //         tx.executeSql('DROP TABLE projects', [], (_, {rows}) => {
        //             console.log(rows);
        //
        //         })
        //     }
        // )

        // TABLE FIELDS BELOW
        sql.createTable("projects", "id integer not null primary key, name varchar not null, type integer default 0, amount integer default 0, date varchar, amount_per_month integer, r_date varchar, r_amount integer")


        sql.transaction(
            tx => {
                tx.executeSql('select * from projects', [], (_, { rows }) => {
                        console.log(rows._array);
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
                            title: "Modifier un projet"
                        })
                        console.log(item)
                    }}>
                        <View>
                            <Text>{item.name}</Text>
                            <Text>{item.amount}</Text>
                        </View>
                        <View>
                            <Text>{item.amount_per_month}</Text>
                            {/*{(item.type == 0) ? }*/}
                            <Text></Text>
                        </View>
                        <View>
                            <Text>{(item.type == 0) ? "Mensualité": "Date"}</Text>
                        </View>
                        <View style={styles.AccountAmount}>
                            <Text style={styles.AccountAmount}>{item.amount} €</Text>
                        </View>
                        <View style={styles.AccountAmount}>
                            <Text style={styles.AccountAmount}>{item.r_date} €</Text>
                        </View>
                        <View style={styles.AccountAmount}>
                            <Text style={styles.AccountAmount}>{item.r_amount} €</Text>
                        </View>
                    </TouchableOpacity>
                    } />
      ) : (
          <View style={styles.centering}>
              <Image source={require('../../../assets/empty.png')} />
              <Text>Il n'y a aucun projet, pourquoi pas en ajouter un ?</Text>
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
  backgroundColor : "#E5E5E5",
  flexDirection : "column",
  height: 300,
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
  // textAlign: "right",
  // alignSelf: 'flex-end',
  paddingRight: 10
  },
  centering: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center"
  },
  boxAccountExpenses : {
    backgroundColor : "#E5E5E5",
    flexDirection : "column",
    justifyContent: "center",
    marginTop: 5,
    paddingBottom: 40,
    paddingTop : 30
  },
  accountName : {
    fontSize : 28,
    fontWeight : "bold",
    textAlign : "center",
    marginLeft : 60,
    marginRight : 60,
  },
  boxExpense : {
    flex : 1, marginLeft : 60, marginRight : 60
  },
  boxAccountName : {marginBottom : 30, borderColor : "white", borderWidth : 1}
})