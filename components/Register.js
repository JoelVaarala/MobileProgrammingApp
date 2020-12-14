import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';

export default function Register({navigation, route} , props) {

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);


const handleSignUp = () => {
  firebase
  .auth()
  .createUserWithEmailAndPassword(email, password)
  .then(userCredentials => {
      return userCredentials.user.updateProfile({
          displayName: name
      })
  })
  .catch(error => setError(error.message))
}


  return (
    <View style={styles.container}>
      <Text>Sign up page</Text>

      <View>
        {error && <Text>{error}</Text>}
      </View>

      <View>
        <Text>Name</Text>
        <TextInput 
              style={{borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, height: 40, fontSize: 15, color: 'pink'}} 
              autoCapitalize="none"
              onChangeText={text => setName(text)}
              value={name}
              >
        </TextInput>
      </View>

      <View>
        <Text>Email</Text>
        <TextInput 
              style={{borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, height: 40, fontSize: 15, color: 'pink'}} 
              autoCapitalize="none"
              onChangeText={text => setEmail(text)}
              value={email}
              >
        </TextInput>
      </View>

      <View style={{marginTop: 20}}>
        <Text>Password</Text>
        <TextInput 
            style={{borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, height: 40, fontSize: 15, color: 'pink'}} 
            autoCapitalize="none" 
            secureTextEntry
            onChangeText={text => setPassword(text)}
            value={password}
            >
        </TextInput>
      </View>

      <TouchableOpacity style={{marginHorizontal: 30, backgroundColor: 'blue', borderRadius: 4, height: 50, alignItems: 'center', justifyContent: 'center'}} onPress={handleSignUp}>
        <Text>Sign up</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{alignSelf: 'center', marginTop: 20}}>
        <Text style={{color: 'grey', fontSize: 13}}>
          New to the app? <Text style={{ color: 'pink'}} onPress={() => navigation.pop()}>Sign in</Text>
        </Text>
      </TouchableOpacity>
    
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});