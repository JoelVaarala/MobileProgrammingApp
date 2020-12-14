import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TextInput } from 'react-native';
import { Button, Image, Icon, Input } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

export default function AddRecipe({navigation, route}){

    const [text, setText] = React.useState();
    const [ingredient, setIngredient] = React.useState();
    const [amount, setAmount] = React.useState();

    return( 
        <ScrollView>
        <View style={{flex: 1, backgroundColor: '#C94525'}}>
            <Text style={{margin: 20, alignSelf: 'center', fontSize: 20, fontWeight: 'bold'}}>
                Your recipe 
            </Text>
           

            <Text style={{marginLeft: '3%'}}>Name of the dish</Text>
            <Input
                placeholder='type here'
                //containerStyle={{backgroundColor: 'lightgreen', paddingTop: 10}}
                inputContainerStyle={{backgroundColor: 'whitesmoke', borderColor: 'black', borderRadius: 15, borderWidth: 1, width: '75%',}}
                inputStyle={{color: 'black'}}
                onChangeText={(text) => setText(text)}
                value={text}
                />

            <Text style={{marginLeft: '3%'}}>Ingredient</Text>
            <Input
                placeholder='type here'
                //containerStyle={{backgroundColor: 'lightgreen', paddingTop: 10}}
                inputContainerStyle={{backgroundColor: 'whitesmoke', borderColor: 'black', borderRadius: 15, borderWidth: 1, width: '50%', }}
                inputStyle={{color: 'black'}}
                onChangeText={(text) => setIngredient(text)}
                value={ingredient}
                />
            <View style={{}}>
            <Text style={{marginLeft: '3%'}}>amount</Text>
                <Input
                placeholder='type here'
                //containerStyle={{backgroundColor: 'lightgreen', paddingTop: 10}}
                inputContainerStyle={{backgroundColor: 'whitesmoke', borderColor: 'black', borderRadius: 15, borderWidth: 1, width: '50%', }}
                inputStyle={{color: 'black'}}
                onChangeText={(text) => setAmount(text)}
                value={amount}
                />
                <Button 
                title="add "
                buttonStyle={{marginTop: 20, backgroundColor: 'black', width: '20%', borderRadius: 15, marginLeft: '3%' , marginTop: 0}}
                onPress={() => navigation.navigate("AddRecipe")} 
                icon={
                    <Icon
                    name="add"
                    size={15}
                    color="white"
                    />
                }  
                iconRight  
                />
            </View>
            <Text style={{marginLeft: '3%', marginTop: 10}}>instructions</Text>
            <Input
                placeholder='type here'
                //containerStyle={{backgroundColor: 'lightgreen', paddingTop: 10}}
                inputContainerStyle={{backgroundColor: 'whitesmoke', borderColor: 'black', borderRadius: 15, borderWidth: 1, width: '75%',}}
                inputStyle={{color: 'black'}}
                onChangeText={(text) => setText(text)}
                value={text}
                multiline={true}
                />

            <Text style={{marginLeft: '3%'}}>photo</Text>
            <ActivityIndicator color="black"/>
            <Text style={{marginBottom: 40}}></Text>
            
        </View>
        </ScrollView>
    )
}