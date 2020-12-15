import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { Avatar, Button, ListItem, Image } from 'react-native-elements';


export default function Results({navigation, route}) {

  const [results, setResults] = React.useState([]);

  const screenWidth = Dimensions.get('window').width;
  const numColumns = 2;
  const tileSize1 = (screenWidth / numColumns)*0.8;
  const tileSize2 = (screenWidth / numColumns)*0.5;
  //const tileSize1 = screenWidth*0.4;
  //const tileSize2 = screenWidth*0.4;
 

  React.useEffect(() => {
    fetchCategories();
    
  }, []);


  const fetchCategories = () => {
     
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${route.params.word}`) // korvaa seafood routen categorialla    route.params.word
    .then((response) => response.json())
    .then((json) => setResults(json.meals))
    .catch((error) => console.log(error))

  }

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
      <Text style={{alignSelf: 'center', margin: 20, color: 'white', fontSize: 20, fontWeight: 'bold', backgroundColor: 'black', padding: 10, borderRadius: 15}}>{route.params.word + ' recipes'}</Text>
      <FlatList
        style={styles.container}
        keyExtractor={(item, index) => index.toString()}
        data={results}
        numColumns={2}
        //columnWrapperStyle={styles.row}
        //renderItem={renderITem}
        renderItem={renderI}
      />
   
       <StatusBar hidden={true} /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C94525',
    //backgroundColor: 'whitesmoke'
    //maxWidth: '50%'
  },
  row: {
    flex: 1,
    justifyContent: "space-around"
  }
});