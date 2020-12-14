import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Button, Icon, Avatar, Image } from 'react-native-elements';


export default function Drink({navigation, route}) {

  const screenWidth = Dimensions.get('window').width;

  // Here maybe is possible use expo component to shake the phone which triggers navi + fetch

  return (
   <View style={styles.container}>
     <View style={{backgroundColor: '#C94525'}}>  
      <Text style={{fontSize: 25, fontWeight: 'bold', alignSelf: 'center'}}>Cocktail dices</Text> 
        <Image 
            style={{alignSelf: 'center', width: screenWidth*0.8, height: screenWidth*0.5, marginTop: 10}}
            PlaceholderContent={<ActivityIndicator color="red"/>}
            source={{uri: 
                     'http://clipart-library.com/images/pcqKknoc9.png'
                    }} 
        />
        {/* <Icon color={'black'} size={28} name="casino" onPress={() => navigation.navigate("DrinkResult")}/> */}
        <Button title="ROLL" onPress={() => navigation.navigate("DrinkResult")} buttonStyle={{backgroundColor: 'black', marginTop: 20, marginLeft: 50, marginRight: 50}} />
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
});