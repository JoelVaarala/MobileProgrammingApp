import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as firebase from 'firebase';
import { useLinkProps } from '@react-navigation/native';

export default function Loading({navigation, route}, props) {


    React.useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
           props.naviagtion.navigate(user ? "App" : "Auth") 
        })
    }, [])


    return(
        <View style={styles.container}>
            <Text>
                Loading
            </Text>
            <ActivityIndicator size="large" color="pink"/>
        </View>
    )
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