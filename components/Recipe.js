import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, Text, View, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import {Image, Button, Tooltip, ListItem, Icon} from 'react-native-elements';
import ReadMore from 'react-native-read-more-text';
import * as firebase from 'firebase';
import 'firebase/firestore';



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

  React.useEffect(() => {
    console.log('route statement for di dish ',route.params.dish)
    fetchRecipe();
    setDataFetched(true)
  }, []);

  // React.useEffect(() => {
  //   combineArrays();
  // }, [recipe]);

  let aineet = []
  let määrät = []
  let final = []

  const fetchRecipe = () => {
    let a = [1,2,3]
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

  const log = () => {
    //console.log(recipe);
  console.log('logi func')
    //console.log(recipeObj)
    console.log(recipe)
    console.log(" look this", recipe.ingredients)
    
    
  }

  const combineArrays = (data) => {
  let multiD = [];
  final = [];
  määrät = [];
  aineet = [];
console.log(data)
    let i = 1;
     for (const amount in data){
       if(amount == `strMeasure${i}`){
        if(data[amount] != "" && data[amount] != null && data[amount] != " "){
         //console.log(recipe[amount])
         määrät.push(data[amount])
         multiD.push([data[amount]])
         i++;
        }
       }
     }
     let b = 1;
     for (const product in data){
       if(product == `strIngredient${b}`){
         if(data[product] != "" && data[product] != null && data[product] != " "){
           //console.log(recipe[product])
           aineet.push(data[product])
           multiD[b-1].push(data[product])
           b++;
         } 
       }
     }
    // console.log("here_____________", multiD)
    // console.log(aineet)
    // console.log(määrät)
     final = määrät.reduce(function(final, field, index) {
       final[aineet[index]] = field;
       return final;
     }, {})
     // console.log(final)
     //console.log("moi" , Object.keys(final))
     //console.log("moi", Object.values(final))
     //return final
     // return multiD
     //var viimoinen = multiD.filter(e => e.length);
     //console.log("AAAAAAAAAAAA" , viimoinen)
     console.log(multiD)
     return multiD
  }

 /* const combineArrays2 = () => {
    let aineet = []
    let määrät = []
    let final = [1,2,3,4,5]
    console.log("this is obj ", recipeObj)
let i = 1;
 for (const item in recipeObj){
   if(item == `strMeasure${i}`){
    if(recipeObj[item] != "" && recipeObj[item] != null){
     määrät.push(recipeObj[item])
     
    }
   }
   if(item == `strIngredient${i}`){
      if(recipeObj[item] != "" && recipeObj[item] != null){
        aineet.push(recipeObj[item])
      
      }
   }
   i++;
 }
 console.log(aineet[0])
 console.log(määrät)
 final = määrät.reduce(function(final, field, index) {
   final[aineet[index]] = field;
   return final;
 }, {})
 console.log('final : ',final)
 return final
} */

  const renderTruncatedFooter = (handlePress) => {
    return (
      <Text  onPress={handlePress} style={{color: 'blue'}}>
        Read more
      </Text>
    );
  }

  const renderRevealedFooter = (handlePress) => {
    return (
      <Text onPress={handlePress} style={{color: 'blue'}}>
        Show less
      </Text>
    );
  }

  const handleTextReady = () => {
    // ...
  }
 

  // return (
   
  //   <View style={styles.container}>
  
  //     <Avatar source={{uri: recipe.avatarUrl}} style={{width: '50%', height: '30%'}}/>
  //     <Text>{recipe.title}</Text>
  //    {/* <Title/>
  //     {
  //       dataFetched ? <Title/> : <Text>loading ...</Text>
  //     } */}
  //      <Button title="log" onPress={log} /> 
      
  //      {/* <View style={{width: '70%'}}>
  //        <ScrollView>
  //     <ReadMore
  //      numberOfLines={2}
  //      renderTruncatedFooter={renderTruncatedFooter}
  //      renderRevealedFooter={renderRevealedFooter}
  //     >
  //     <Text style={{marginBottom: 20}}>{recipe.instructions}</Text>
  //     </ReadMore>
  //     </ScrollView>
  //     </View>  */}
  //      <ScrollView>
  //     <Tooltip popover={<ScrollView><Text style={{backgroundColor: 'red', width: '200%'}}>{recipe.instructions}</Text></ScrollView>}>
  //     <Text numberOfLines={20} style={{width: screenWidth*0.9, backgroundColor: 'skyblue'}}>{recipe.instructions}</Text>
  //     </Tooltip>
  //     </ScrollView> 
    
  //     {/* <StatusBar style="auto" /> */}
  //   </View>
  
  // );

  const renderI = ({ item }) => (
   
    <View>
    <View style={{flex: 5, flexDirection: 'row',  backgroundColor: 'whitesmoke' , width: '80%', alignSelf: 'center'}}>
      <Text style={{flex: 2,  textAlign: 'right' , fontWeight: 'bold'}}>{item[0]}</Text> 
      <Text>  |   </Text>
      <Text style={{flex: 3, fontWeight: 'bold'}}>{item[1]}</Text> 
     </View>
    <View 
    style={{
        height: 1,
        width: "80%",
        backgroundColor: 'black',
        marginLeft: "10%"
    }}/>
    </View>

  )

  const handleFavorite = () => {
    let id =  firebase.auth().currentUser.uid
    let title = recipe.title
    if(like == "favorite-border"){
      console.log(recipe.title)
      setLike("favorite")
      // save to firebase
      
      let data = { ref: `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe.title}` }

     firebase.firestore().collection('users').doc(id).collection('MyFavorited').doc(title).set(data)
    }
    else if(like == "favorite"){
      console.log("dislike")
      setLike("favorite-border")
      // delete from firebase
      // firebase.firestore().collection('users').doc(id).collection('MyDrinks').where("ref")
    }
  }

  // return (
  //   <ScrollView style={{width: screenWidth*0.9, marginLeft: screenWidth*0.05, marginTop: 20, backgroundColor: 'orange'}}>
  //      <Avatar source={{uri: recipe.avatarUrl}} style={{width: screenWidth*0.5, height: screenWidth*0.5, marginLeft: screenWidth*0.2}}/>
  //      <View style={{marginLeft: screenWidth*0.2, width: screenWidth*0.5, backgroundColor: 'lightgreen'}}>
  //      <Text numberOfLines={2}>{recipe.title}</Text>
  //      </View>
  //      <Text> </Text>
  //      <View style={{alignSelf: 'center', alignItems: 'center', backgroundColor: 'pink'}}>

  //      <Text>Ingrid : </Text>
  //      <Button title="logi" onPress={log} />
  //      {/* replace this with list of parts and amounts */}
  //      {/* {recipe.ingredients.map(function(item, i){
  //        return <Text key={i} >{item[1]} : {item[0]}</Text>
  //      })}  */}
  //      <View style={{backgroundColor: 'yellow'}}>
  //        <FlatList
  //       style={{flex: 1}}
  //       keyExtractor={(item, index) => index.toString()}
  //       data={recipe.ingredients}
  //       numColumns={1}
  //       renderItem={renderI}
  //     />  
      
  //     </View>
       
  //      <Text style={{marginTop: 20, backgroundColor: 'grey'}}>Recipe : </Text>
  //      <Text> </Text>
  //      </View>
  //      <Text numberOfLines={100} style={{ backgroundColor: 'skyblue', padding: 10}}>{recipe.instructions}</Text>
  //      <Text> </Text>
      
   
  //   </ScrollView>
  // )

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
      <View style={{alignItems: 'center', backgroundColor: 'whitesmoke', marginBottom: 10, alignSelf: 'center', marginTop: 20, paddingLeft: 10, paddingRight: 10, 
                    shadowColor: 'black', shadowOffset: {width: 2, height: 8}, shadowOpacity: 0.9, shadowRadius: 10.32, elevation: 16}}>
       <Image source={{uri: recipe.avatarUrl}} PlaceholderContent={<ActivityIndicator color="red"/>} style={{ width: screenWidth*0.5, height: screenWidth*0.5, marginTop: 20, borderColor: 'grey', borderWidth: 0}}/>
       <Text numberOfLines={2} style={{ marginBottom: 15, marginTop: 3, fontSize: 20, alignSelf: 'center'}}>{recipe.title}</Text>
       </View>
       
      </>}
      style={{backgroundColor: '#C94525'}}
      data={recipe.ingredients}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderI}
      ListFooterComponent={
        <View>
        <Text style={{backgroundColor: '#C94525', alignSelf: 'center', fontSize: 30, marginTop: 15}}>Recipe</Text>
        <Text numberOfLines={100} style={{ backgroundColor: '#C94525', padding: 20}}>{recipe.instructions}</Text>
        </View>
      }
    />
  )
}

