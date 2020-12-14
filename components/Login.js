import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button } from 'react-native';
import * as firebase from 'firebase';
import { AuthContext } from '../AuthContext';


export default function Login({navigation, route} , props) {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);
  const [user, setUser] = React.useState("");
  const { signIn } = React.useContext(AuthContext);

const handleLogin = () => {
  firebase
  .auth()
  .signInWithEmailAndPassword(email, password)
  .catch(error => setError(error.message))
}


  return (
    <View style={styles.container}>
      <Text>Login page</Text>

      <View>
        {error && <Text>{error}</Text>}
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

      <TouchableOpacity style={{marginHorizontal: 30, paddingHorizontal: 10, backgroundColor: 'skyblue', borderRadius: 4, height: 50, alignItems: 'center', justifyContent: 'center', marginTop: 10}} 
                        onPress={() => signIn(email, password)}>
        <Text>Sign in</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{alignSelf: 'center', marginTop: 20}}>
        <Text style={{color: 'grey', fontSize: 13}}>
          New to the app? <Text style={{ color: 'pink'}} onPress={() => navigation.navigate("Register")}>Sign up</Text> {/*here navigation to register page */}
        </Text>
      </TouchableOpacity>

      <Button title="back" onPress={() => console.log(props.isLoggedIn)}/>
    
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