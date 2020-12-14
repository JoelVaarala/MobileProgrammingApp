import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { Button, ButtonGroup, Input, Icon, SearchBar, Avatar } from 'react-native-elements';


export default function Search({navigation, route}) {

  const [view, setView] = React.useState(true);
  const [activeButton, setActiveButton] = React.useState(0);
  const [text, setText] = React.useState('');
  const [fetchResult, setFetchResult] = React.useState();
  const [res, setRes] = React.useState();

  // updates which button is selected from buttongroup
  const updateIndex = (selectedIndex) => {
    setActiveButton(selectedIndex)
  }

  // Buttongroup buttons
  const buttons = ['Dish', 'Ingredient']

  // Dimensions to help with order of the page layout
  const screenWidth = Dimensions.get('window').width;
  const numColumns = 2;
  const tileSize1 = (screenWidth / numColumns)*0.8;
  const tileSize2 = (screenWidth / numColumns)*0.5;


  React.useEffect(() => {
    if(view == true) 
    console.log('view switched')
  }, [view])
 

  // fetch by main ingredient https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast 
  // list of ingredients
  const fetchByIngredient = () => {
    let c = 'Carrot'
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${c}`) // change this name to user input
    .then((response) => response.json())
    .then((json) => {
      setRes(json.meals)
      console.log(' _____-------_____',json.meals)
    })
    .catch((error) => console.log(error))

  }

  const navi = () => {
    var i = text;
    if(activeButton == 0){
      navigation.navigate("Recipe", { dish : i })
    }
    else if(activeButton == 1){
      fetchByIngredient();
      setView(false)
    }
    setText("")
  }

// navigation.navigate("Recipe", { dish : item.strMeal })
  const renderI = ({ item }) => (
    <View style={{alignItems: 'center', backgroundColor: 'white', borderWidth: 0.5, borderColor: 'white', marginLeft: '6%', marginTop: '2%', borderRadius:15, overflow: 'hidden',  
    shadowColor: 'black', shadowOffset: {width: 0, height: 5}, shadowOpacity: 0.34, shadowRadius: 6.2, elevation: 10, 
    }}>
    <TouchableOpacity onPress={() => navigation.navigate("Recipe", { dish : item.strMeal })}>
    <Avatar source={{uri: item.strMealThumb}} style={{ height: tileSize2, width: tileSize1, paddingRight: 0 }} />
    </TouchableOpacity>
    <Text style={{fontWeight: 'bold', width: tileSize1, paddingLeft: screenWidth*0.02}} numberOfLines={2}>{item.strMeal}</Text>
    </View>
  )


  return (
    <View style={styles.container}>
      {
        view ?  // if true 1 : false 2
      <View>
      <Text style={{fontSize: 30, fontWeight: 'bold', color: 'black', fontStyle: 'italic'}}>Search by : </Text>

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
    
    

      <Input
        placeholder='type here'
        //containerStyle={{backgroundColor: 'lightgreen', paddingTop: 10}}
        inputContainerStyle={{backgroundColor: 'whitesmoke', borderColor: 'black', borderRadius: 15, borderWidth: 1, width: '75%', alignSelf: 'center'}}
        inputStyle={{color: 'black'}}
        onChangeText={(text) => setText(text)}
        value={text}
        leftIcon={
          <Icon
            name='search'
            size={24}
            color='black'
          />
          }
      />
      <Button title="Search" onPress={navi} buttonStyle={{backgroundColor: 'black', borderWidth: 2, borderColor: 'black', width: '35%', alignSelf: 'center' }} />
      
      </View>
      :

      <View>
        <Button title="new search" onPress={() => setView(true)}/>
        <FlatList
        style={{ flex: 1, backgroundColor: '#C94525',}}
        keyExtractor={(item, index) => index.toString()}
        data={res}
        numColumns={2}
        //columnWrapperStyle={styles.row}
        //renderItem={renderITem}
        renderItem={renderI}
      />
      </View>
     
        }
    
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C94525',
    alignItems: 'center',
    justifyContent: 'center',
  },
});