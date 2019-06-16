import React, {Component} from "react";
import {Button, TextInput, View} from "react-native";

export class Input extends Component {

    state = {
        inputs: ["input-0"]
    }

    render() {
        const input = this.state.inputs.map((input, key) => {
            return(
                <View key={input} style={{flexDirection : 'row', marginBottom : 20}} >
                    <View style={{flex: 4, marginLeft : 40}}>
                        <TextInput
                            style={{height: 40, borderColor: 'gray', borderBottomWidth: 1}}
                            // onChangeText={(text) => this.setState({text})}
                            // value={this.state.text}
                            placeholder={'ex : loyer'}
                        />
                    </View>
                    <View style={{flex: 3, marginLeft : 40}}>
                        <TextInput
                            style={{height: 40, borderColor: 'gray', borderBottomWidth: 1, textAlign : 'right'}}
                            // onChangeText={(text) => this.setState({text})}
                            value={key}
                            placeholder={'600.00 €'}
                        />
                    </View>
                    <View style={{flex : 2}}>
                        {(key == (this.state.inputs.length -1)) ? (
                            <Button
                                onPress={() => this.addInput()}
                                title="&#10010;"
                                color="#28a745"
                            />
                        ):<Button
                            onPress={() => this.removeInput(key)}
                            title="&#10008;"
                            color="#cc0001"
                            accessibilityLabel="Learn more about this purple button"
                        />}

                    </View>
                </View>
            )
        })


        return(input);

    }

    addInput() {
        let newInput = `input-${this.state.inputs.length}`;
        this.setState({
            inputs : [...this.state.inputs, newInput]
        });
    }

    removeInput(key) {
        const {inputs} = this.state;
        let newInputTab = inputs.splice(0, key).concat(inputs.slice(key, inputs.length));
        this.setState({inputs: newInputTab});
    }
}