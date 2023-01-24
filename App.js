import { useState,useEffect } from 'react';
import {Button, View,Text,StyleSheet,FlatList,ScrollView, TouchableOpacity
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

function HomeScreen() {
  const [fruits, setFruits] = useState(null);

  useEffect(() => {
    fetch("http://10.88.10.147:8080/fruits")
    .then(Response => Response.json())
    .then((reponseJson) => {
      console.log('getting data from fetch',reponseJson);
      setFruits(reponseJson);
    })
    .catch(error => console.log(error));
  }, [])


  const printElement = ({item}) => {
    return(
      <ScrollView style={styles.container}>
          <Text style={{fontFamily: 'Verdana',
                        fontWeight: 'bold',
                        fontSize: 20}}>   FRUTA ID: <Text style={{color:'purple'}}>{item.id}</Text></Text>
          <Text style={{fontFamily: 'Verdana',
                        fontWeight: 'bold',
                        fontSize: 15}}>     Nombre Fruta: <Text style={{color:'purple'}}>{item.name}</Text></Text>
          <Text style={{fontFamily: 'Verdana',
                        fontWeight: 'bold',
                        fontSize: 15}}>     Precio: <Text style={{color:'orange'}}>{item.price} €</Text></Text>
      </ScrollView>
    )
  }

return(
      <FlatList data={fruits} renderItem = {printElement}/>
  )
}

function NuevaFrutaScreen() {
  return(
    <View style={{ flex: 1, justifyContent:'center', alignItems: "center" }}>
      <Button style={{paddingTop:20, borderRadius:20}}
      onPress = {() => NuevaFruta()}
      title="       ACTUALIZAR NUEVA FRUTA       "
     />

    </View>
  )
}


function NuevaFruta() {
  let data = {
    method: 'POST',
    body: JSON.stringify({
      //AQUI ESCRIBO EL NOMBRE DE LA NUEVA FRUTA
      name: "NARANJA",
      price: 180
    }),
    headers: {
      'Accept':       'application/json',
      'Content-Type': 'application/json',
    }
  }
  return fetch('http://10.88.10.147:8080/fruits', data)
          .then(response => response.json()) 
          .catch(error => console.log(error));
  } 

function App(){
  
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Mercado') {
              iconName = focused
                ? 'ios-circledowno'
                : 'ios-circledown';
            } else if (route.name === 'NuevaFrutaScreen') {
              iconName = focused ? 'ios-circledowno' : 'ios-circledown';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue', tabBarInactiveTintColor: 'black'
        })}
      >
        
        <Tab.Screen name="MIS FRUTAS:)" component={HomeScreen} />
        <Tab.Screen name="LISTA DE FRUTAS" component={NuevaFrutaScreen}/>

      </Tab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container:{
    margin: 8,
    backgroundColor: 'grey',
    borderRadius:20,
  }
})

export default App;
