import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Button, Image, Icon, Input } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import 'firebase/firestore';

export default function AddRecipe({navigation, route}){

    const [ingredient, setIngredient] = React.useState("");
    const [amount, setAmount] = React.useState("");
    const [ingredients, setIngredients] = React.useState([]);
    const [amounts, setAmounts] = React.useState([]);

    const [recipe, setRecipe] = React.useState({
        name: "",
        instructions: "",
    })

    // updates recipe state
    const inputChanged = (inputName, inputValue) => {
        setRecipe({ ...recipe, [inputName]: inputValue });
      }

    // adds "line" of ingredient + amount
    const addLine = () => {
        setIngredients([...ingredients, ingredient])
        setAmounts([...amounts, amount])
        setIngredient("");
        setAmount("");
    }

    // makes obj of inputs and posts to firebase
    const sendToFirebase = () => {
       let id =  firebase.auth().currentUser.uid
        let data = {
            title: recipe.name,
            instructions: recipe.instructions,
            ingredients: ingredients,
            amounts: amounts
        }

     firebase.firestore().collection('users').doc(id).collection('MyRecipes').doc(recipe.name).set(data)
       setAmounts([])
       setIngredients([])
       setRecipe({name: "", instructions: ""})
    }

    return( 
        <ScrollView>
        <View style={styles.container}>
            <Text style={styles.title}>
                Your recipe 
            </Text>
           

            <Text style={styles.title2}>Name of the dish</Text>
            <Input
                placeholder='type here'
                inputContainerStyle={styles.input}
                inputStyle={{color: 'black'}}
                onChangeText={(text) => inputChanged("name", text)}
                value={recipe.name}
                />

            <Text style={styles.title2}>Ingredient</Text>
            <Input
                placeholder='type here'
                inputContainerStyle={styles.input}
                inputStyle={{color: 'black'}}
                onChangeText={(text) => setIngredient(text)}
                value={ingredient}
                />
            <View>
            <Text style={styles.title2}>amount</Text>
                <Input
                placeholder='type here'
                inputContainerStyle={styles.input}
                inputStyle={{color: 'black'}}
                onChangeText={(text) => setAmount(text)}
                value={amount}
                />
                <Button 
                title="add "
                buttonStyle={styles.add}
                onPress={addLine} 
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
            <Text style={styles.title2}>instructions</Text>
            <Input
                placeholder='type here'
                inputContainerStyle={styles.input}
                inputStyle={{color: 'black'}}
                onChangeText={(text) => inputChanged("instructions", text)}
                value={recipe.instructions}
                multiline={true}
                />

            <Text style={styles.title2}>photo</Text>
            <ActivityIndicator color="black"/>
            <Text style={{marginBottom: 40}}></Text>
           
            <Button title="save" onPress={sendToFirebase} buttonStyle={styles.button}/>
            
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#C94525'
    },
    title: {
        margin: 20,
        alignSelf: 'center', 
        fontSize: 20, 
        fontWeight: 'bold'
    },
    title2: {
        marginLeft: '3%', 
        fontWeight: 'bold'
    },
    input: {
        backgroundColor: 'whitesmoke', 
        borderColor: 'black',
        borderRadius: 15, 
        borderWidth: 1, 
        width: '75%'
    },
    button: {
        backgroundColor: 'black', 
        marginBottom: 20, 
        width: '50%', 
        alignSelf: 'center'
    },
    add: {
        marginTop: 20, 
        backgroundColor: 'black', 
        width: '20%', 
        borderRadius: 15, 
        marginLeft: '3%' , 
        marginTop: 0
    }
  });