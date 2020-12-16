import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Button, Image, Icon, ButtonGroup } from 'react-native-elements';
import { AuthContext } from '../AuthContext';
import * as firebase from 'firebase';
import 'firebase/firestore';


export default function Favorites({navigation, route}) {

  var eee = [{ref: "123", title: "123"},{ref: "123", title: "123"},{ref: "123", title: "123"}]
  var aaa = [{ref: "12300", title: "000"},{ref: "1230", title: "1203"},{ref: "10023", title: "12300"}]
  var ooo = [{ref: "1", title: "1"},{ref: "1", title: "1"},{ref: "1", title: "1"}]

  const [drinks, setDrinks] = React.useState([]);
  const [ownRecipes, setOwnRecipes] = React.useState([]);
  const [likedRecipes, setLikedRecipes] = React.useState([]); 

  const [activeButton, setActiveButton] = React.useState();
  const [list, setList] = React.useState([]);
  
  const { signOut } = React.useContext(AuthContext);

  React.useEffect(() => {
    var drink = [];
    var ownRecipe = [];
    var likedRecipe = [];
    let id = firebase.auth().currentUser.uid;
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
  }, []);

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

  const navi = (item) => {
    if(activeButton == 0){
      console.log('0 valittuna', item)
      navigation.navigate("MyRecipe")
    }else if(activeButton == 1){
      navigation.navigate("Recipe", { dish : item })
    }else if(activeButton == 2){
      navigation.navigate("DrinkResult",  { drinkUrl :  `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${item}`})
    }
  }

  const buttons = ['MyRecipes', 'MyFavorited', 'MyDrinks'];

  const renderI = ({ item }) => (
   
    <TouchableOpacity 
      style={{backgroundColor: 'whitesmoke', width: '80%', alignSelf: 'center', padding: 8, borderRadius: 5, marginBottom: 2}}
      //onPress={() => console.log(item.ref)}
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
    <View style={{}}>
      <Text style={{marginTop: 10, marginBottom: 30}}></Text>
      <ButtonGroup
      buttonStyle={{backgroundColor: 'black', borderColor: 'black', color: 'black', borderWidth: 3}}
      selectedButtonStyle={{backgroundColor: 'black'}}
      selectedTextStyle={{color: 'whitesmoke', fontWeight: 'bold', fontSize: 15}}
      buttonContainerStyle={{borderColor: 'black', }}
      onPress={updateIndex}
      selectedIndex={activeButton}
      buttons={buttons}
      containerStyle={{height: 30, borderColor: 'black'}}
      />
    
     <Text>   Results :  </Text>
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
              buttonStyle={{marginTop: 20, backgroundColor: 'black', width: '70%', borderRadius: 15, borderWidth: 2, borderColor: 'black' }}
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
      </View>
    }
  />
  );
}