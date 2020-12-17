import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Alert } from 'react-native';
import { Button, Image, Icon, Input } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { showMessage } from "react-native-flash-message";
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { store } from "../redux/index";

export default function AddRecipe({ navigation, route }) {

    const [ingredient, setIngredient] = React.useState("");
    const [amount, setAmount] = React.useState("");
    const [ingredients, setIngredients] = React.useState([]);
    const [amounts, setAmounts] = React.useState([]);

    const [recipe, setRecipe] = React.useState({
        name: "",
        instructions: "",
    })
    var id = store.getState().UserDataReducer[0].id;
    const [pic, setPic] = React.useState();

    // choose existing photo from device
    const choosePhoto = async () => {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status === 'granted') {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                setPic(result.uri);
            }
        }
        else {
            Alert.alert('no permission');
        }
    }




    // Open camera and take photo + permissions
    const takePhoto = async () => {
        const { status, permissions } = await Permissions.askAsync(Permissions.CAMERA);
        if (status == 'granted') {
            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: false,
                base64: true
            })
            if (!result.cancelled) {
                sendFirebase(result.uri, recipe.name)
                    .then(() => {
                        Alert.alert("Success")
                    })
                    .catch((error) => {
                        Alert.alert(error)
                    })
            }

        } else {
            throw new Error('No Permission')
        }
    }

    // Send picture to firebase storage 
    const sendFirebase = async (uri, imageName) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        // file location will be folder with user id and img name == recipe name
        var ref = firebase.storage().ref().child(id + "/" + imageName)

        return ref.put(blob);
    }

    // updates recipe state
    const inputChanged = (inputName, inputValue) => {
        setRecipe({ ...recipe, [inputName]: inputValue });
    }

    // adds "line" of ingredient + amount
    const addLine = () => {
        if (ingredient != "" && amount != "") {
            setIngredients([...ingredients, ingredient])
            setAmounts([...amounts, amount])
            setIngredient("");
            setAmount("");
        } else {
            showInvalid();
        }
    }

    // makes obj of inputs and posts to firebase
    const sendToFirebase = () => {
        let id = firebase.auth().currentUser.uid
        let data = {
            title: recipe.name,
            instructions: recipe.instructions,
            ingredients: ingredients,
            amounts: amounts
        }

        firebase.firestore().collection('users').doc(id).collection('MyRecipes').doc(recipe.name).set(data)
        setAmounts([])
        setIngredients([])
        setRecipe({ name: "", instructions: "" })
        showSuccess();
    }


    const showSuccess = () => {
        showMessage({
            message: "Recipe Added",
            description: "awesome",
            type: "default",
            duration: 1850,
            backgroundColor: "green",
            color: "white",
        });
    };

    const showInvalid = () => {
        showMessage({
            message: "Oops",
            description: " Ingredient / amount missing...",
            type: "default",
            duration: 1850,
            backgroundColor: "orange",
            color: "black",
        });
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>
                    Your recipe
            </Text>


                <Text style={styles.title2}>Name of the dish</Text>
                <Input
                    placeholder='type here'
                    inputContainerStyle={styles.input}
                    inputStyle={{ color: 'black' }}
                    onChangeText={(text) => inputChanged("name", text)}
                    value={recipe.name}
                />

                <Text style={styles.title2}>Ingredient</Text>
                <Input
                    placeholder='type here'
                    inputContainerStyle={styles.input}
                    inputStyle={{ color: 'black' }}
                    onChangeText={(text) => setIngredient(text)}
                    value={ingredient}
                />
                <View>
                    <Text style={styles.title2}>amount</Text>
                    <Input
                        placeholder='type here'
                        inputContainerStyle={styles.input}
                        inputStyle={{ color: 'black' }}
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
                    inputStyle={{ color: 'black' }}
                    onChangeText={(text) => inputChanged("instructions", text)}
                    value={recipe.instructions}
                    multiline={true}
                />

                <Text style={styles.title2}>add photo</Text>

                <Button title="take photo" onPress={takePhoto} buttonStyle={styles.button} />
                <Button title="choose pic" onPress={choosePhoto} />
                <Button title="save" onPress={sendToFirebase} buttonStyle={styles.button} />

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
        marginLeft: '3%',
        marginTop: 0
    }
});