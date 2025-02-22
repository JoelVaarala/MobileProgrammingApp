import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button } from 'react-native';
import * as firebase from 'firebase';
import { AuthContext } from '../AuthContext';


export default function Login({navigation, route}) {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);
  const { signIn } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Login </Text>

      <View>
        {error && <Text>{error}</Text>}
      </View>

      <View>
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

      <TouchableOpacity style={styles.signIn} 
                        onPress={() => signIn(email, password)}>
        <Text>Sign in</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{alignSelf: 'center', marginTop: 20}}>
        <Text style={{color: 'grey', fontSize: 13}}>
          New to the app? <Text style={{ color: 'orange'}} onPress={() => navigation.navigate("Register")}>Sign up</Text> 
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
  signIn: {
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