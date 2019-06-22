import React from 'react';
import {Platform, SafeAreaView, StyleSheet, Text, View, FlatList, TouchableOpacity, Image} from 'react-native';
import ActionButton from 'react-native-action-button';
import GlobalStyles from '../../Helpers/Styles/GlobalStyles';
import SQL from '../../Helpers/API/sql';
import Loading from '../Loading';
import IconV from 'react-native-vector-icons/FontAwesome'
import { Container, Header, Content, Card, CardItem, Body } from 'native-base';

const sql = new SQL();
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
                    }}>
                        <Card style={{borderRadius: '5px', padding : 10}}>
                            <CardItem header>
                                <Text style={{fontSize: 30, width: '70%', textAlign: 'left', padding : 10, textTransform: 'uppercase', fontWeight: 'bold'}}>{item.name}</Text>
                                <Text style={{fontSize: 28, width: '30%', textAlign: 'right'}}>{item.amount_per_month}  {moneyIcon}</Text>
                            </CardItem>
                            <CardItem style={{}}>
                                <Text style={{fontSize: 40, width: '100%', textAlign: 'center' , color:"#9b1f1f"}}>{item.amount} {euroIcon}</Text>

                            </CardItem>
                            <CardItem footer>
                                <View style={{flex: 1, justifyContent: 'center', flexDirection: 'row', marginBottom: 20, marginTop: 20}}>
                                    <Text style={{fontSize: 20, color : '#00897B'}}>{item.date}   {dateIcon}</Text>
                                </View>
                            </CardItem>
                        </Card>
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
      flexDirection : "column",
      height: 270,
      marginLeft: 4,
      marginRight: 4,

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