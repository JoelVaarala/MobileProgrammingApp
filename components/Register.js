import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import {AuthContext} from '../AuthContext';

export default function Register({navigation, route} , props) {

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);
  const { signIn } = React.useContext(AuthContext);
  var db = firebase.firestore()

  const handleSignUp = () => {
    firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(userCredentials => {
        return db.collection('users').doc(userCredentials.user.uid).set({
          displayName: name
        })
    })
    .then(() => signIn(email, password))
    .catch(error => setError(error.message))
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}> Register </Text>

      <View>
        {error && <Text>{error}</Text>}
      </View>

      <View>
        <Text>Name</Text>
        <TextInput 
              style={styles.input} 
              autoCapitalize="none"
              onChangeText={text => setName(text)}
              value={name}
              >
        </TextInput>
      </View>

      <View style={{marginTop: 20}}>
        <Text>Email</Text>
        <TextInput 
              style={styles.input} 
              autoCapitalize="none"
              onChangeText={text => setEmail(text)}
              value={email}
              >
        </TextInput>
      </View>

      <View style={{marginTop: 20}}>
        <Text>Password</Text>
        <TextInput 
            style={styles.input} 
            autoCapitalize="none" 
            secureTextEntry
            onChangeText={text => setPassword(text)}
            value={password}
            >
        </TextInput>
      </View>

      <TouchableOpacity style={styles.signUp} onPress={handleSignUp}>
        <Text>Sign up</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{alignSelf: 'center', marginTop: 20}}>
        <Text style={{color: 'grey', fontSize: 13}}>
          Already have user? <Text style={{ color: 'orange'}} onPress={() => navigation.pop()}>Sign in</Text>
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
  signUp: {
    marginHorizontal: 30, 
    paddingHorizontal: 10, 
    backgroundColor: 'orange', 
    borderRadius: 4, 
    height: 50, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginTop: 10
  },
  input: {
    borderBottomColor: 'black', 
    borderBottomWidth: StyleSheet.hairlineWidth, 
    height: 40, 
    fontSize: 15, 
    color: 'orange', 
    width: 150
  },
  title: {
    marginBottom: 40, 
    fontWeight: 'bold', 
    fontSize: 20
  }
});