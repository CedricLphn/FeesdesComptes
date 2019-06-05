import React from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, View, FlatList } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

import GlobalStyles from '../../Helpers/Styles/GlobalStyles';
import ProjectsPlaceHolder from '../../Helpers/PlaceHolders/Projects.js'


export class Projects extends React.Component {
  render() {
    return (
      <SafeAreaView forceInset={Platform.OS === 'android' && { vertical: 'never' }}
      style={GlobalStyles.App}>
          <View style={GlobalStyles.TopTitle}>
              <Text h1 style={GlobalStyles.TopTextTitle}>Mes projets</Text>
          </View>
          <View style={GlobalStyles.container}>
            <FlatList data={ProjectsPlaceHolder}
            renderItem={({item}) => 
            <View style={styles.boxAccountExpenses}> 
              <View>
                <View style={styles.boxAccountName}>
                  <Text style={styles.accountName}>{item.name}</Text>
                </View>

                    <View style={{flexDirection : "row", justifyContent : "space-around"}}>
                        <View>
                            <View style={{flex : 1}}>
                                <Text h2 style={styles.expenseName}>Montant par mois : </Text>
                            </View >
                            <View>
                                <Text style={styles.expenseAmount}>{item.amount_per_month }</Text>
                            </View>
                        </View>
                        <View>
                            <View style={{flex : 1}}>
                                <Text h2 style={styles.expenseName}>Date estimée : </Text>
                            </View>
                            <View>
                                <Text style={styles.expenseAmount}>{item.estimated_date}</Text>
                            </View>
                        </View>
                    </View>
              </View>
            </View>
            } />

        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => console.log("notes tapped!")}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => {}}>
            <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => {}}>
            <Icon name="md-done-all" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
          </View>
        {/* Rest of the app comes ABOVE the action button component !*/}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
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