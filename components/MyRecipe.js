import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, FlatList, StyleSheet} from 'react-native';
import { Icon } from 'react-native-elements';
import * as firebase from 'firebase';
import 'firebase/firestore';

export default function MyRecipe({navigation, route}){

    const [title, setTitle] = React.useState("");
    const [instructions, setInstructions] = React.useState("");
    const [aineet, setAineet] = React.useState([]);

    React.useEffect(() => {
        retvieveRecipe();
    }, [])

    // getting the specific recipe from firebase, 
    const retvieveRecipe = async () => {
        let multiD = [];
        let id = firebase.auth().currentUser.uid;
        let rec = await firebase.firestore().collection('users').doc(id).collection('MyRecipes').doc(route.params.recipeItem).get()
        setTitle(rec.data().title)
        setInstructions(rec.data().instructions)
        let ingredsArr = rec.data().ingredients
        let amountArr = rec.data().amounts
        ingredsArr.forEach(element => {
            multiD.push([element])
        });
        let i = 1;
        amountArr.forEach(element => {
            multiD[i-1].push([element])
            i++;
        });
        setAineet(multiD)
    }


    const renderI = ({ item }) => (
   
        <View>
        <View style={styles.renderI}>
          <Text style={styles.ingredient}>{item[1]}</Text> 
          <Text>  |   </Text>
          <Text style={styles.amount}>{item[0]}</Text> 
         </View>
        <View style={styles.separator}/>
        </View>
      
      ) 

    return(
        <FlatList ListHeaderComponent={
            <>
            <View style={{alignItems: 'flex-end'}}>
             <Icon
              name={'favorite'}
              size={15}
              color="white"
              reverse
              reverseColor="red"
              //onPress={handleFavorite}
            />
            </View>
            <View style={styles.card}>
             {/* <Image 
                    source={{uri: recipe.avatarUrl}} 
                    PlaceholderContent={<ActivityIndicator color="red"/>} 
                    style={{ width: screenWidth*0.5, height: screenWidth*0.5, marginTop: 20, borderColor: 'grey', borderWidth: 0}}
                /> 
            */}
             <Text numberOfLines={2} style={styles.header}>{title}</Text>
             </View>
            </>}
            style={{backgroundColor: '#C94525'}}
            data={aineet}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderI}
            ListFooterComponent={
              <View style={{marginTop: 20}}>
              <Text style={styles.title}>Recipe</Text>
              <Text numberOfLines={100} style={styles.recipe}>{instructions}</Text>
              </View>
            }
          />
    )
}

const styles = StyleSheet.create({
    recipe: {
        backgroundColor: '#C94525',  
        width: '80%', 
        alignSelf: 'center'
    },
    title: {
        alignSelf: 'center', 
        fontSize: 20
    },
    card: {
        alignItems: 'center', 
        backgroundColor: 'whitesmoke', 
        marginBottom: 10, 
        alignSelf: 'center',
        marginTop: 0, 
        paddingLeft: 10, 
        paddingRight: 10, 
        shadowColor: 'black', 
        shadowOffset: {width: 2, height: 8}, 
        shadowOpacity: 0.9, 
        shadowRadius: 10.32, 
        elevation: 16
    },
    header: {
        fontSize: 20, 
        marginBottom: 15,
        marginTop: 3, 
        fontWeight: 'bold'
    },
    renderI: {
        flex: 5, 
        flexDirection: 'row',  
        backgroundColor: 'whitesmoke' , 
        width: '80%', 
        alignSelf: 'center'
    },
    ingredient: {
        flex: 2,  
        textAlign: 'right' , 
        fontWeight: 'bold'
    },
    amount: {
        flex: 3, 
        fontWeight: 'bold'
    },
    separator: {
        height: 1,
        width: "80%",
        backgroundColor: 'black',
        marginLeft: "10%"
    }
});