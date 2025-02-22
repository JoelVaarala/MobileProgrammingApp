import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Button, Icon, ButtonGroup } from 'react-native-elements';
import { AuthContext } from '../AuthContext';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { store } from "../redux/index";

export default function Favorites({navigation, route}) {

  const [drinks, setDrinks] = React.useState([]);
  const [ownRecipes, setOwnRecipes] = React.useState([]);
  const [likedRecipes, setLikedRecipes] = React.useState([]); 
  const [activeButton, setActiveButton] = React.useState();
  const [list, setList] = React.useState([]);
  
  let id = store.getState().UserDataReducer[0].id;

  const { signOut } = React.useContext(AuthContext);

  React.useEffect(() => {
   getContents();
  }, []);

  // fetch saved recipes from firebase
  const getContents = () => {
    var drink = [];
    var ownRecipe = [];
    var likedRecipe = [];

    firebase.firestore()
    .collection('users')
    .doc(id).collection('MyDrinks')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        drink.push(documentSnapshot.data())
      });
    });

    setDrinks(drink)

    firebase.firestore()
    .collection('users')
    .doc(id).collection('MyFavorited')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        likedRecipe.push(documentSnapshot.data())
      });
    });

    setLikedRecipes(likedRecipe)

    firebase.firestore()
    .collection('users')
    .doc(id).collection('MyRecipes')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        ownRecipe.push(documentSnapshot.data())
      });
    });

    setOwnRecipes(ownRecipe)
  }

  // updates buttongroup index
  const updateIndex = (selectedIndex) => {
    setActiveButton(selectedIndex)
    if(selectedIndex == 0){
      setList(ownRecipes)
   }else if(selectedIndex == 1){
      setList(likedRecipes)
   }else if(selectedIndex == 2){
      setList(drinks)
   }
  }

  // selects where to navigate depending whhat category is selected
  const navi = (item) => {
    if(activeButton == 0){
      navigation.navigate("MyRecipe", {recipeItem: item})
    }else if(activeButton == 1){
      navigation.navigate("Recipe", { dish : item })
    }else if(activeButton == 2){
      navigation.navigate("DrinkResult",  { drinkUrl :  `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${item}`})
    }
  }

  const buttons = ['MyRecipes', 'MyFavorited', 'MyDrinks'];

  const renderI = ({ item }) => (
   
    <TouchableOpacity 
      style={styles.items}
      onPress={() => navi(item.title)}
    >
      <View style={{flexDirection: 'row'}}>
      <Text style={{fontSize: 16}}>
        {item.title}
      </Text>
      <Icon
          name="add"
          size={20}
          color="red"
        />
        </View>
    </TouchableOpacity>
  
  ) 


  return (
   
  <FlatList ListHeaderComponent={
    <>
    <View>
    <Text style={{fontWeight: 'bold', marginBottom: 10, marginTop: 40}}>   Choose which category , Results appear below. </Text>
      <ButtonGroup
      buttonStyle={styles.buttonGroup}
      selectedButtonStyle={{backgroundColor: 'black'}}
      selectedTextStyle={styles.textStyle}
      buttonContainerStyle={{borderColor: 'black', }}
      onPress={updateIndex}
      selectedIndex={activeButton}
      buttons={buttons}
      containerStyle={{height: 30, borderColor: 'black'}}
      />
    
     </View>
  
    </>}
    style={{backgroundColor: '#C94525'}}
    data={list}
    keyExtractor={(item, index) => index.toString()}
    renderItem={renderI}
    ListFooterComponent={
      <View style={{marginTop: 20, alignItems: 'center'}}>
     
        <Button 
              title="ADD RECIPE "
              buttonStyle={styles.buttonStyle}
              onPress={() => navigation.navigate("AddRecipe")} 
              icon={
                <Icon
                  name="add"
                  size={20}
                  color="white"
                />
              }  
              iconRight  
          />

      <Icon
        name="visibility-off"
        size={20}
        color="black"
        reverse
        reverseColor="red"
        onPress={() => signOut()}
      />

      <Icon
        name="update"
        size={20}
        color="black"
        reverse
        reverseColor="white"
        onPress={() => getContents()}
      />

      </View>
    }
  />
  );
}

const styles = StyleSheet.create({
  items: {
    backgroundColor: 'whitesmoke', 
    width: '80%', 
    alignSelf: 'center', 
    padding: 8, 
    borderRadius: 5, 
    marginBottom: 2
  },
  buttonGroup: {
    backgroundColor: 'black', 
    borderColor: 'black', 
    color: 'black', 
    borderWidth: 3
  },
  textStyle: {
    color: 'whitesmoke', 
    fontWeight: 'bold', 
    fontSize: 15
  },
  buttonStyle: {
    marginTop: 20, 
    backgroundColor: 'black', 
    width: '50%', 
    borderRadius: 15, 
    borderWidth: 2, 
    borderColor: 'black',
    
  }
});