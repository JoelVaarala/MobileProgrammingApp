import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import {Image, Icon} from 'react-native-elements';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { store } from "../redux/index";


export default function Recipe({navigation, route}) {

  const screenWidth = Dimensions.get('window').width;

  const [recipe, setRecipe] = React.useState({
    title: "loading title...",
    ingredients: [],
    avatarUrl: "loading avatar...",
    instructions: ""
  });
  const [recipeObj, setRecipeObj] = React.useState();
  const [dataFetched, setDataFetched] = React.useState(false);
  const [like, setLike] = React.useState("favorite-border");

  let id = store.getState().UserDataReducer[0].id;

  React.useEffect(() => {
    fetchRecipe();
    setDataFetched(true)
  }, []);

  const fetchRecipe = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${route.params.dish}`)
    .then((response) => response.json())
    .then((json) => {
      //combineArrays(json.meals[0]),
      setRecipe({
        title: json.meals[0].strMeal,
        ingredients: combineArrays(json.meals[0]),
        avatarUrl: json.meals[0].strMealThumb,
        instructions: json.meals[0].strInstructions
      }),
      setRecipeObj(json.meals[0])
      })
    .catch((error) => console.log(error))

  }

  const combineArrays = (data) => {
  let multiD = [];
    let i = 1;
     for (const amount in data){
       if(amount == `strMeasure${i}`){
        if(data[amount] != "" && data[amount] != null && data[amount] != " "){
         multiD.push([data[amount]])
         i++;
        }
       }
     }
     let b = 1;
     for (const product in data){
       if(product == `strIngredient${b}`){
         if(data[product] != "" && data[product] != null && data[product] != " "){
           multiD[b-1].push(data[product])
           b++;
         } 
       }
     }
     return multiD
  }

 

  const renderI = ({ item }) => (
   
    <View>
    <View style={styles.renderView1}>
      <Text style={styles.amount}>{item[0]}</Text> 
      <Text>  |   </Text>
      <Text style={styles.ingredient}>{item[1]}</Text> 
     </View>
    <View 
    style={styles.separator}/>
    </View>

  )

  const handleFavorite = () => {
    let title = recipe.title
    if(like == "favorite-border"){
      setLike("favorite")
      // save to firebase
      // this data obj will be saved to fb
      let data = { ref: `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe.title}`, title: recipe.title }

     firebase.firestore().collection('users').doc(id).collection('MyFavorited').doc(title).set(data)
    }
    else if(like == "favorite"){
      setLike("favorite-border")
      // delete from firebase here
    }
  }

  

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
          style={{ width: screenWidth*0.5, height: screenWidth*0.5, marginTop: 20, borderColor: 'grey', borderWidth: 0}}
        />
       <Text numberOfLines={2} style={styles.title}>{recipe.title}</Text>
       </View>
       
      </>}
      style={{backgroundColor: '#C94525'}}
      data={recipe.ingredients}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderI}
      ListFooterComponent={
        <View style={{marginBottom: 20}}>
        <Text style={styles.recipe}>Recipe</Text>
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
  },
  recipe: {
    backgroundColor: '#C94525', 
    alignSelf: 'center', 
    fontSize: 30, 
    marginTop: 15
  }
});