import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { Button, Image, Icon } from 'react-native-elements';


// Mobiilikurssin lopputyö
export default function Favorites({navigation, route}) {

  var eee = ['item 1','item 2','item 4']

  React.useEffect(() => {
  
  }, []);

  const renderI = ({ item }) => (
   
    <View>
    <Text>
      {item}
    </Text>
    </View>
  
  ) 

// put flatlist component similar to 
  return (
   
  <FlatList ListHeaderComponent={
    <>
    <View style={{}}>
      <Text style={{marginTop: 30, marginBottom: 30}}></Text>
    <ActivityIndicator color="red"/>
    
     
     <Text> Tähän listataan favorites and probably own recipes (buttongroups?) and maybe some function to data to flatlist to which list to show... if() - return data  1 or 2  </Text>
     </View>
  
    </>}
    style={{backgroundColor: '#C94525'}}
    data={eee}
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
        name="add"
        size={20}
        color="black"
        reverse
        reverseColor="red"
        onPress={() => console.log('moi')}
        // replace log with " signOut() "
      />
      
      </View>
    }
  />
  );
}

