import React from 'react';
import {Platform, SafeAreaView, StyleSheet, Text, View, FlatList, TouchableOpacity, Image} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

import GlobalStyles from '../../Helpers/Styles/GlobalStyles';
import ProjectsPlaceHolder from '../../Helpers/PlaceHolders/Projects.js'

import SQL from '../../Helpers/API/sql';
import Loading from '../Loading';

const sql = new SQL();

import IconV from 'react-native-vector-icons/FontAwesome'

const euroIcon = <IconV name="euro" size={40} color="#9b1f1f" />;
const dateIcon = <IconV name="calendar" size={30} color="#00897B" />;
const moneyIcon = <IconV name="money" size={30} color="#ad7d30" />;

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
                    renderItem={({item}) => <TouchableOpacity style={styles.Box}  onPress={() => {
                        this.props.navigation.navigate("Settings", {
                            id : item.id,
                            title: "Modifier un projet"
                        })
                        console.log(item)
                    }}>
                        <View style={[styles.miniBoxes, {marginBottom: 70}]}>
                            <Text style={{fontSize: 25, textTransform: 'uppercase', fontWeight: 'bold', width: 180, height: 80, fontStyle: 'italic'}}>{item.name}</Text>
                            <Text style={{height: 40, fontSize: 40, color: '#706b64'}}>{item.amount} {euroIcon}</Text>


                        </View>
                        <View style={[styles.miniBoxes, {}]}>
                            <Text style={{height: 50, fontSize: 30, color: '#706b64'}}>{moneyIcon}  {item.amount_per_month}</Text>
                            <Text style={{height: 50, fontSize: 20, color: '#706b64'}}>{item.date}   {dateIcon}</Text>
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
  Box : {
  backgroundColor : "#E5E5E5",
  flexDirection : "column",
  height: 180,
      marginTop: 1,
      marginBottom: 1,
  padding: 20
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
  boxAccountName : {marginBottom : 30, borderColor : "white", borderWidth : 1},
    miniBoxes : { flex: 1, flexDirection: 'row', justifyContent : 'space-between' }
})