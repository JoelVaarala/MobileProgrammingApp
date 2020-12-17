import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, ActivityIndicator } from 'react-native';
import { Button, Image } from 'react-native-elements';
import { useKeepAwake } from 'expo-keep-awake';


export default function Drink({navigation, route}) {

  useKeepAwake();
  const screenWidth = Dimensions.get('window').width;

  return (
   <View style={styles.container}>
     <View style={{backgroundColor: '#C94525'}}>  
      <Text style={styles.title}>Cocktail dices</Text> 
        <Image 
            style={{alignSelf: 'center', width: screenWidth*0.8, height: screenWidth*0.5, marginTop: 10}}
            PlaceholderContent={<ActivityIndicator color="red"/>}
            source={{uri: 
                     'http://clipart-library.com/images/pcqKknoc9.png'
                    }} 
        />
        <Button 
          title="ROLL" 
          onPress={() => navigation.navigate("DrinkResult", { drinkUrl : `https://www.thecocktaildb.com/api/json/v1/1/random.php` })} 
          buttonStyle={styles.button} 
        />
      
     </View>
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
  title: {
    fontSize: 25, 
    fontWeight: 'bold', 
    alignSelf: 'center'
  },
  button: {
    backgroundColor: 'black', 
    marginTop: 20, 
    marginLeft: 50, 
    marginRight: 50
  }
});