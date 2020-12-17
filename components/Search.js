import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { Button, ButtonGroup, Input, Icon, SearchBar, Avatar } from 'react-native-elements';


export default function Search({navigation, route}) {

  const [view, setView] = React.useState(true);
  const [activeButton, setActiveButton] = React.useState(0);
  const [text, setText] = React.useState('');
  const [res, setRes] = React.useState();

  // updates which button is selected from buttongroup
  const updateIndex = (selectedIndex) => {
    setActiveButton(selectedIndex)
  }

  // Buttongroup buttons
  const buttons = ['Dish', 'Ingredient'];

  // Dimensions to help with order of the page layout
  const screenWidth = Dimensions.get('window').width;
  const numColumns = 2;
  const tileSize1 = (screenWidth / numColumns)*0.8;
  const tileSize2 = (screenWidth / numColumns)*0.5;


  React.useEffect(() => {
    if(view == true) 
    console.log('view switched')
  }, [view])
 

  const fetchByIngredient = () => {
    let input = text
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`)
    .then((response) => response.json())
    .then((json) => {
      setRes(json.meals)
    })
    .catch((error) => console.log(error))
  }

  // Checks if trigger search for list or navigate to show desired meal recipe
  const navi = () => {
    var input = text;
    if(activeButton == 0){
      navigation.navigate("Recipe", { dish : input })
    }
    else if(activeButton == 1){
      fetchByIngredient();
      setView(false)
    }
    setText("")
  }

  const renderI = ({ item }) => (
    <View style={styles.RenderItemView}>
    <TouchableOpacity onPress={() => navigation.navigate("Recipe", { dish : item.strMeal })}>
    <Avatar source={{uri: item.strMealThumb}} style={{ height: tileSize2, width: tileSize1, paddingRight: 0 }} />
    </TouchableOpacity>
    <Text style={{fontWeight: 'bold', width: tileSize1, paddingLeft: screenWidth*0.02}} numberOfLines={2}>{item.strMeal}</Text>
    </View>
  )


  return (
    <View style={styles.container}>
      {
        view ? 
      <View>
      <Text style={styles.searchHeader}>Search by : </Text>

      <ButtonGroup
      buttonStyle={styles.BGbutton}
      selectedButtonStyle={{backgroundColor: 'black'}}
      selectedTextStyle={styles.BGselectedText}
      buttonContainerStyle={{borderColor: 'black', }}
      onPress={updateIndex}
      selectedIndex={activeButton}
      buttons={buttons}
      containerStyle={styles.BGcontainer}
      />

      <Input
        placeholder='type here'
        //containerStyle={{backgroundColor: 'lightgreen', paddingTop: 10}}
        inputContainerStyle={styles.input}
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
      <Button title="Search" onPress={navi} buttonStyle={styles.buttonStyle} />
      
      </View>
      :
      <View>
        <View style={{marginTop: 20, marginBottom: 20}}>
        <Button title="New search" onPress={() => setView(true)} buttonStyle={{backgroundColor: 'black'}}/>
        </View>
        <FlatList
        style={styles.flatlist}
        keyExtractor={(item, index) => index.toString()}
        data={res}
        numColumns={2}
        renderItem={renderI}
      />
      </View>
      }

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
  RenderItemView: {
    alignItems: 'center', 
    backgroundColor: 'white', 
    borderWidth: 0.5, 
    borderColor: 'white', 
    marginLeft: '6%', 
    marginTop: '2%', 
    borderRadius:15, 
    overflow: 'hidden',  
    shadowColor: 'black', 
    shadowOffset: {width: 0, height: 5}, shadowOpacity: 0.34, shadowRadius: 6.2, elevation: 10
  },
  searchHeader: {
    fontSize: 30, 
    fontWeight: 'bold', 
    color: 'black', 
    fontStyle: 'italic'
  },
  buttonStyle: {
    backgroundColor: 'black', 
    borderWidth: 2, 
    borderColor: 'black', 
    width: '35%', 
    alignSelf: 'center'
  },
  input: {
    backgroundColor: 'whitesmoke', 
    borderColor: 'black', 
    borderRadius: 15, 
    borderWidth: 1, 
    width: '75%', 
    alignSelf: 'center'
  },
  BGselectedText: {
    color: 'whitesmoke', 
    fontWeight: 'bold', 
    fontSize: 15
  },
  BGbutton: {
    backgroundColor: 'black', 
    borderColor: 'black', 
    color: 'black', 
    borderWidth: 3
  },
  BGcontainer: {
    height: 30, 
    borderColor: 'black'
  },
  flatlist: {
    flex: 1, 
    backgroundColor: '#C94525'
  }
  
});