import React, {Component} from "react";
import {Button, TextInput, View} from "react-native";

export class Input extends Component {

    state = {
        expenses: [{
            name: "",
            amount: ""
        }]
    };

    static defaultProps = {

    };

    render() {
        const input = this.state.expenses.map((input, key) => {
            return(
                <View key={key} style={{flexDirection : 'row', marginBottom : 20}} >
                    <View style={{flex: 4, marginLeft : 40}}>
                        <TextInput
                            style={{height: 40, borderColor: 'gray', borderBottomWidth: 1}}
                            // onChangeText={(text) => this.setState({text})}
                            value={this.state.expenses[key].name}
                            placeholder={'Mon loyer'}
                            onChange={(e) => this.handleChange(e, key, "name")}
                        />
                    </View>
                    <View style={{flex: 3, marginLeft : 40}}>
                        <TextInput
                            style={{height: 40, borderColor: 'gray', borderBottomWidth: 1, textAlign : 'right'}}
                            // onChangeText={(text) => this.setState({text})}
                            //value={key.toString()}
                            placeholder={'600.00 €'}
                            value={this.state.expenses[key].amount}
                            onChange={(e) => this.handleChange(e, key, "amount")}
                        />
                    </View>
                    <View style={{flex : 2}}>
                        {(key == (this.state.expenses.length -1)) ? (
                            <Button
                                onPress={() => this.addInput()}
                                title="&#10010;"
                                color="#28a745"
                            />
                        ):<Button
                            onPress={() => this.handleRemove(key)}
                            title="&#10008;"
                            color="#cc0001"
                        />}

                    </View>
                </View>
            )
        })


        return(input);

    }

    addInput() {
        this.setState({
            expenses:
                [...this.state.expenses,
                {
                    name :"",
                    amount: ""
                }]

        })
        console.log("jenvoie ca ", this.state.expenses);

        this.props.onChange(this.state.expenses);

    }

   handleRemove(key) {
        this.state.expenses.splice(key,1);
        this.setState({
            expenses: this.state.expenses
        })


       this.props.onChange(this.state.expenses);
    }

    handleChange(e, key, type) {
        let change = e.nativeEvent.text;
        let expense = this.state.expenses;
        if(type === "name") {
            expense[key].name = change;
        }else {
            expense[key].amount = change;
        }
        this.setState({expense})


    }
}