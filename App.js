import "react-native-gesture-handler";
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { LogBox, Alert } from 'react-native';
import { Provider } from "react-redux";
import { store } from "./redux/index";
import FlashMessage from "react-native-flash-message";
import Categories from './components/Categories';
import Recipe from './components/Recipe';
import Search from './components/Search';
import Drink from './components/Drink';
import Favorites from './components/Favorites';
import Results from './components/Results';
import DrinkResult from './components/DrinkResult';
import AddRecipe from './components/AddRecipe';
import Login from './components/Login';
import Register from './components/Register';
import Loading from './components/Loading';
import MyRecipe from './components/MyRecipe';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import { Icon } from 'react-native-elements';
import * as firebase from 'firebase';
import { AuthContext } from "./AuthContext";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator()
const ListStack = createStackNavigator();
const ListStack2 = createStackNavigator();


 var firebaseConfig = {
   apiKey: "AIzaSyBxYoRvOs7ayJoxXcjkhyp8XLmU4bSL8iM",
   authDomain: "foodndrink-e6980.firebaseapp.com",
   projectId: "foodndrink-e6980",
   storageBucket: "foodndrink-e6980.appspot.com",
   messagingSenderId: "310823273869",
   appId: "1:310823273869:web:6388e2412d764f997929c4"
 };

 if (firebase.apps.length === 0) {
   firebase.initializeApp(firebaseConfig);
 }

 LogBox.ignoreLogs(['']);

export default function App(props) {

   // If loading is true, loadingscreen will be displayed. If loggedIn is true, apps content will be displayed, else login page will be displayed
   const [navigationChange, setNavigationChange] = React.useState({ loading: true, loggedIn: false });
   // key for AsyncStorage
   const emailKey = 'email';
   const passwordKey = 'password';
 
   // calls function to check async storage
   React.useEffect(() => {
     loginOnStartup();
   }, []);
 
   // Authcontext holds logic for signIn and out
   const authContext = React.useMemo(
     () => ({
       // attempts to sign in with login info and saves them to AsyncStorage if sign in was successful
       signIn: async (email, password) => {
         setNavigationChange({ loading: true, loggedIn: false });
         let loginResponse = await login(email, password);
         if (loginResponse === 'Wrong email or password') {
           Alert.alert('Wrong email or password');
           setNavigationChange({ loading: false, loggedIn: false });
         } else if (loginResponse === 'Success') {
           AsyncStorage.setItem(emailKey, email);
           AsyncStorage.setItem(passwordKey, password);
           setNavigationChange({ loading: false, loggedIn: true });
         }
       },
       // signs out current user and removes login info from AsyncStorage
       signOut: async () => {
         firebase.auth().signOut();
         await AsyncStorage.removeItem(emailKey);
         await AsyncStorage.removeItem(passwordKey);
         setNavigationChange({ loading: false, loggedIn: false });
       }
     }),
     []
   );
 
   // checks async storage for previous login, if no -> login
   const loginOnStartup = async () => {
     let email = await AsyncStorage.getItem(emailKey);
     let password = await AsyncStorage.getItem(passwordKey);
     console.log("EMAIL " , email, " # " , password)
     if (email != null && password != null) {
       authContext.signIn(email, password);
     } else {
       setNavigationChange({ loading: false, loggedIn: false });
     }
   };
 
   const login = async (email, password) => {
     let error;
     let userprom = await firebase
       .auth()
       .signInWithEmailAndPassword(email, password)
       .catch(function (err) {
         error = err.code;
         console.log(error);
       });
       if (error === 'auth/user-not-found' || error === 'auth/wrong-password' || error === 'auth/invalid-email') {
        return 'Wrong email or password';
    }
    //console.log("user promise : " , userprom);
    return 'Success';
   }; 


  // Create stacks
  const categoryStack = () => {
    return (
      <ListStack.Navigator>
        <ListStack.Screen name="Categories" component={Categories} /> 
        <ListStack.Screen name="Results" component={Results} />
        <ListStack.Screen name="Recipe" component={Recipe} />
      </ListStack.Navigator>
    );
  };

  const drinkStack = () => {
    return ( 
      <ListStack.Navigator>
        <ListStack.Screen  name="Cocktail Dices" component={Drink} />
        <ListStack.Screen  name="DrinkResult" component={DrinkResult} />
      </ListStack.Navigator>
    )
  }

  const searchStack = () => {
    return (
      <ListStack.Navigator>
        <ListStack.Screen name="Search" component={Search} />
        <ListStack.Screen name="Recipe" component={Recipe} />
      </ListStack.Navigator>
    )
  }

  const favoriteStack = () => {
    return (
      <ListStack.Navigator>
        <ListStack.Screen name="Favorites" component={Favorites} />
        <ListStack.Screen name="AddRecipe" component={AddRecipe} />
        <ListStack.Screen name="Recipe" component={Recipe} />
        <ListStack.Screen  name="DrinkResult" component={DrinkResult} />
        <ListStack.Screen  name="MyRecipe" component={MyRecipe} />
      </ListStack.Navigator>
    )
  }

  const AppStack = () => {
  return (
      <Provider store={store}>
      <AuthContext.Provider value={authContext}>
      <NavigationContainer>
      {navigationChange.loggedIn ? (
      <Tab.Navigator 
       //swipeEnabled={false}
       screenOptions={({ route }) => ({
         tabBarIcon: ({ focused, color, size }) => {
           let iconName;
           let iconColor;

           // this should be switch structure
           if (route.name === 'Categories') {
             iconName = "restaurant"
             iconColor = navIconColor(focused);
          } 
           else if (route.name === 'Favorites') {
            iconName =  "grade"
            iconColor = navIconColor(focused);
          } 
           else if (route.name === 'Search') {
            iconName =  "search"
            iconColor = navIconColor(focused);
          }  else if (route.name === 'Drink') {
            iconName =  "local-bar"
            iconColor = navIconColor(focused);
          } 

           // You can return any component that you like here!
           return <Icon color={iconColor} size={28} name={iconName} />;
         },
       })}
       tabBarOptions={{
         activeTintColor: navBarTintColor,
         //inactiveTintColor: navbarTintColor2,
         showIcon: true,
         showLabel: false,
       }}
      >
        <Tab.Screen name="Categories" component={categoryStack } />
        <Tab.Screen name="Favorites" component={favoriteStack} />
        <Tab.Screen name="Search" component={searchStack} />
        <Tab.Screen name="Drink" component={drinkStack} />
      </Tab.Navigator>
      ): (

        <ListStack2.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <>
          <ListStack2.Screen name="Login" component={Login}/>
          <ListStack2.Screen name="Register" component={Register}/>
          </>
        </ListStack2.Navigator>

      )}
         <StatusBar style="light"/>   
      </NavigationContainer>
      <FlashMessage position="top" />
    </AuthContext.Provider>
    </Provider>
    );
  }
      return<>{navigationChange.loading ? <Loading /> : <AppStack /> }</>   
}

global.myTheme = {
  dark: true,
  colors: {
    primary: "orange", // NavIconin alapuolella oleva viiva
    background: "#F2F2F2", //log in sivulla näkyvä taustaväri
    card: "black", //NavIconien ympärillä oleva tausta
    text: "orange", //Screenien otsikon väri
    notification: "rgb(255, 69, 58)", // punainen väri
  },
};

global.navIconColor = (focused) => (focused ? "#D73208": "gray"); //NavBar iconien aktiivi ja passiivi värit
global.navBarTintColor = "orange";
global.navbarTintColor2 = "black"
