import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

export default function Loading() {

    return(
        
        <View style={styles.container}>
            <View style={styles.Indicator}>
            <ActivityIndicator size="large" color="black"/>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#C94525',
      paddingBottom: 10,
      alignItems: 'center',
      flexDirection: 'row' 
    },
    Indicator: {
        marginLeft: '45%'
    }
  });