import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { Avatar, Button, ListItem, Image } from 'react-native-elements';


// Mobiilikurssin lopputyö
export default function Categories({navigation, route}) {

  const [categories, setCategories] = React.useState([]);

  const screenWidth = Dimensions.get('window').width;
  const numColumns = 2;
  const tileSize1 = (screenWidth / numColumns)*0.8;
  const tileSize2 = (screenWidth / numColumns)*0.5;
 

  React.useEffect(() => {
    fetchCategories();
  }, []);


  const fetchCategories = () => {

    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then((response) => response.json())
    .then((json) => setCategories(json.categories))
    .catch((error) => console.log(error))

  }

  const renderITem = ({ item }) => (
    <ListItem bottomDivider>
      {/* <Avatar source={{uri: item.strCategoryThumb}}/> */}
      <ListItem.Content>
      <ListItem.Title>{item.strCategory}</ListItem.Title>
      <ListItem.Subtitle>moi</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron/>
    </ListItem>
  )
//height: tileSize, width: tileSize
  const renderI = ({ item }) => (
    <View style={{alignItems: 'center', backgroundColor: 'white', borderWidth: 0.5, borderColor: 'white', marginLeft: '6%', marginTop: '2%', borderRadius:15, overflow: 'hidden',  
    shadowColor: 'black', shadowOffset: {width: 0, height: 5}, shadowOpacity: 0.34, shadowRadius: 6.2, elevation: 10
    }}>
     <TouchableOpacity onPress={() => navigation.navigate("Results", { word : item.strCategory })}>
    <Avatar source={{uri: item.strCategoryThumb}} style={{ height: tileSize2, width: tileSize1, paddingRight: 0 }} />
    </TouchableOpacity>
    <Text style={{fontWeight: 'bold'}} >{item.strCategory}</Text>
   
    </View>
  )



  return (
    <View style={styles.container}>
      <Text style={{alignSelf: 'center', margin: 20, color: 'white', fontSize: 20, fontWeight: 'bold', backgroundColor: 'black', padding: 10, borderRadius: 15}}>Categories</Text>
      {/* <Button title="go res" onPress={hoi} /> */}
      <FlatList
        style={styles.container}
        keyExtractor={(item, index) => index.toString()}
        data={categories}
        numColumns={2}
        //columnWrapperStyle={styles.row}
        //renderItem={renderITem}
        renderItem={renderI}
      />
   
      {/* <Button title="log" onPress={() => console.log(categories)}/> */}
       <StatusBar hidden={true} /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C94525',
    paddingBottom: 10
    //backgroundColor: 'whitesmoke'
    //maxWidth: '50%'
  },
  row: {
    flex: 1,
    justifyContent: "space-around"
  }
});