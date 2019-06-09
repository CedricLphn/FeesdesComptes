import React from 'react';
import { StyleSheet, Text, View , TextInput, Button } from 'react-native';
import SegmentedControlTab from "react-native-segmented-control-tab";

import SQL from '../../Helpers/API/sql';

const sql = new SQL();

export class AccountForm extends React.Component {

    constructor(props) {
        super(props);

        var data = {
            name : null,
            amount: null,
            type : null
        }


        
        this.state = {
            data : data,
            selectedIndex : 0
        }
        
    }

    handleIndexChange = index => {
        this.setState({
          ...this.state,
          selectedIndex: index
        });
      };

    render() {
    if(this.props.id != 0) {
        sql.transaction(
            tx => {
                tx.executeSql('select * from accounts where id=?', [this.props.id], (_, { rows }) => {
                this.setState({
                    data : rows._array[0],
                    selectedIndex: rows._array[0].type
                });
        
                }
                );
            }
            
            );
    }

    var button = (this.props.id != 0) ? "Modifier ce compte" : "Ajouter un compte";
    return (
        <View style={{flexDirection: 'column', flex: 1}}>
            <View >
                <View>
                    <View  style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text>Nom du compte: </Text>
                    <TextInput
                            // onChangeText={(text) => this.setState({text})}
                            // value={this.state.text}
                            placeholder={'ex : Société générale'}
                            value={this.props.id != 0 ? this.state.data.name: ""}
                    />
                    </View>
                   
                </View>
                <View>
                    <SegmentedControlTab
                    values={["Compte Epargne", "Compte Courant"]}
                    selectedIndex={this.state.selectedIndex}
                    onTabPress={this.handleIndexChange}
                    />
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View>
                    <Text>Montant du compte</Text>
                    </View>
                    <View>
                    <TextInput
                            // onChangeText={(text) => this.setState({text})}
                            // value={this.state.text}
                            placeholder={'2500 €'}
                            keyboardType={'numeric'}
                    />
                    </View>
                </View>
                <View style={{}}>
                    <Button
                    title={button}
                    color="#00897B"
                    />
                </View>
            </View>
        </View>
    );
    }
}

const styles = StyleSheet.create({
    titles : {textTransform : 'uppercase', textAlign : 'center'},
    inputs : {margin : 20, height: 40, borderColor: 'gray', borderBottomWidth: 1, textAlign : 'center'}
  })