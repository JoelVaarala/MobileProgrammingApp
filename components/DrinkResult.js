import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, Text, View, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import {Avatar, Button, Tooltip, ListItem, Image, Icon} from 'react-native-elements';
import ReadMore from 'react-native-read-more-text';
import * as firebase from 'firebase';
import 'firebase/firestore';


export default function DrinkResult({navigation, route}) {

  const screenWidth = Dimensions.get('window').width;

  const [recipe, setRecipe] = React.useState({
    title: "loading..",
    ingredients: [],
    avatarUrl: "loading..",
    instructions: "loading.."
  });
  const [recipeObj, setRecipeObj] = React.useState();
  const [like, setLike] = React.useState("favorite-border");

  React.useEffect(() => {
    fetchRecipe();
  }, []);


  const fetchRecipe = () => {
    fetch(route.params.drinkUrl)
    .then((response) => response.json())
    .then((json) => {
        console.log(json.drinks[0].strDrink),
      setRecipe({
        title: json.drinks[0].strDrink,
        ingredients: combineArrays(json.drinks[0]),
        avatarUrl: json.drinks[0].strDrinkThumb,
        instructions: json.drinks[0].strInstructions
      }),
      setRecipeObj(json.drinks[0])
      })
    .catch((error) => console.log(error))
    
  }

   const combineArrays = (data) => {
   let multiD = [];

   let b = 1;
   for (const product in data){
     if(product == `strIngredient${b}`){
       if(data[product] != "" && data[product] != null && data[product] != " "){
        multiD.push([data[product]])
         b++;
       } 
     }
   }
 
    let i = 1;
     for (const amount in data){
       if(amount == `strMeasure${i}`){
        if(data[amount] != "" && data[amount] != null && data[amount] != " "){
         multiD[i-1].push([data[amount]])
         i++;
        }
       }
     }
    
     return multiD
  } 

  /* const combineArrays = (data) => {
    let multiD = [];
 
    let b = 1;
    for (const aine in data){
        console.log(b)
      if(aine == `strIngredient${b}`){
          console.log('löytyi')
        if(data[aine] != "" && data[aine] != null && data[aine] != " "){
         multiD.push([data[aine]])
         console.log('pushed above')
          var x = `strMeasure${b}`;
          console.log(multiD)
          console.log(multiD[b-1])
          if(x in data){
             multiD[b-1].push(data[x])
          }
        } 
      }
      b++;
    }
      return multiD
   } */

  // Liking recipe saves it to firebase
  const handleFavorite = () => {
    // getting the id of current user
    let id =  firebase.auth().currentUser.uid
    let title = recipe.title
    if(like == "favorite-border"){
      console.log(recipe.title)
      setLike("favorite")
     // this data obj will be saved in firebase
      let data = { ref: `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${recipe.title}`, title: recipe.title }

     firebase.firestore().collection('users').doc(id).collection('MyDrinks').doc(title).set(data)
    }
    else if(like == "favorite"){
      console.log("dislike")
      setLike("favorite-border")
      // delete from firebase can go here
    }
  }

  const renderI = ({ item }) => (
   
    <View>
    <View style={styles.renderView1}>
      <Text style={styles.amount}>{item[1]}</Text> 
      <Text>  |   </Text>
      <Text style={styles.ingredient}>{item[0]}</Text> 
     </View>
    <View style={styles.separator}/>
    </View>
  
  ) 

  return(
    <FlatList ListHeaderComponent={
      <>
      <View style={{alignItems: 'flex-end'}}>
       <Icon
        name={like}
        size={15}
        color="white"
        reverse
        reverseColor="red"
        onPress={handleFavorite}
      />
      </View>
      <View style={styles.card}>
       <Image 
          source={{uri: recipe.avatarUrl}} 
          PlaceholderContent={<ActivityIndicator color="red"/>} 
          style={{ width: screenWidth*0.5, height: screenWidth*0.5, marginTop: 20, borderColor: 'grey', borderWidth: 0}}/>
       <Text numberOfLines={2} style={styles.title}>{recipe.title}</Text>
       </View>
      </>}
      style={{backgroundColor: '#C94525'}}
      data={recipe.ingredients}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderI}
      ListFooterComponent={
        <View style={{marginTop: 20}}>
        <Text style={{ alignSelf: 'center', fontSize: 20}}>Recipe</Text>
        <Text numberOfLines={100} style={styles.instruction}>{recipe.instructions}</Text>
        </View>
      }
    />
  )
}

const styles = StyleSheet.create({
  renderView1: {
    flex: 5, 
    flexDirection: 'row',  
    backgroundColor: 'whitesmoke' , 
    width: '80%', 
    alignSelf: 'center'
  },
  separator: {
    height: 1,
    width: "80%",
    backgroundColor: 'black',
    marginLeft: "10%"
  },
  amount: {
    flex: 2,  
    textAlign: 'right' , 
    fontWeight: 'bold'
  },
  ingredient: {
    flex: 3, 
    fontWeight: 'bold'
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
  title: {
    fontSize: 20, 
    marginBottom: 15, 
    marginTop: 3, 
    fontWeight: 'bold'
  },
  instruction: {
    backgroundColor: '#C94525',  
    width: '80%', 
    alignSelf: 'center'
  }
});