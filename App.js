import React  from 'react';
import { useState,useEffect } from 'react';
import {Button,Image,NativeModules, TextInput, View,Text,StyleSheet,FlatList,ScrollView, Alert, TouchableOpacity
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
      <ScrollView style={styles.container} >
          <Text style={{fontFamily: 'Verdana',
                        fontWeight: 'bold',
                        fontSize: 20}}>   FRUTA ID: <Text style={{color:'purple'}}>{item.id}</Text></Text>
          <Text style={{fontFamily: 'Verdana', 
                        fontWeight: 'bold',
                        fontSize: 15}}>     Nombre Fruta: <Text style={{color:'purple'}}>{item.name}</Text></Text>
          <Text style={{fontFamily: 'Verdana',
                        fontWeight: 'bold',
                        fontSize: 15}}>     Precio: <Text style={{color:'orange'}}>{item.price} €</Text></Text>
          <Image style={{ marginBottom:10,marginTop:10,marginLeft:10, width:70,height:70}} source ={{uri : item.name =='pera'?'https://www.efectofruta.com/images/thumbs/Pera-Limonera-0007378.jpeg': item.name =='naranja'?"https://cdn.pixabay.com/photo/2019/10/13/20/35/orange-4547207_1280.png": item.name=='piña'?'https://www.frutality.es/wp-content/uploads/pi%C3%B1a.png': item.name=='melocoton'?'https://fhfontellas.com/wp-content/uploads/melocoton-3-fhf.jpg':item.name=='manzana'?'https://www.frutality.es/wp-content/uploads/manzana-fuji%C3%A7.png':item.name=='uva'?'https://www.gastronomiavasca.net/uploads/image/file/3436/uva_morada.jpg': 'https://m.media-amazon.com/images/I/91VA2UcIzAL._AC_SL1500_.jpg'}}/>
      </ScrollView>
    )
  }

return(
      <FlatList data={fruits} renderItem = {printElement}/>
  )
}



function NuevaFrutaScreen() {

  const [Text, onChangeText] = React.useState('');
  const [TextPrecio, onChangeTextPrecio] = React.useState('');
  
  
  return(
    <View style={{ flex: 1, justifyContent:'center', alignItems: "center" }}>

      <TextInput style={{
        height:40,width:300,margin:12,padding:10,borderWidth:3,
                          borderColor:'gray'}}
                onChangeText={onChangeText}
                value={Text}
                placeholder={"Nombre Fruta"}
      
      />

      <TextInput style={{
        height:40,width:300,margin:12,padding:10,borderWidth:3,
                          borderColor:'gray'}}
                onChangeText={onChangeTextPrecio}
                value={TextPrecio}
                placeholder={"Precio"}
      
      />
      




      <Button style={{paddingTop:20, borderRadius:20}}
      onPress = {() => NuevaFruta(Text,TextPrecio)}
      
      title="       ACTUALIZAR NUEVA FRUTA       "
      
     />
   


    </View>
    
  )

}


function NuevaFruta(Text,TextPrecio) {

  let data = {
    method: 'POST',
    body: JSON.stringify({
      //AQUI ESCRIBO EL NOMBRE DE LA NUEVA FRUTA
      name: Text,
      price: TextPrecio
    }),
    headers: {
      'Accept':       'application/json',
      'Content-Type': 'application/json',
    }
  }
  return (fetch('http://10.88.10.147:8080/fruits', data)
          .then(response => response.json()) 
          .catch(error => console.log(error)),
          NativeModules.DevSettings.reload()
      );
          
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
                ? 'add-outline'
                : 'add-sharp';
            } else if (route.name === 'NuevaFrutaScreen') {
              iconName = focused ? 'add-outline' : 'add-sharp';
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
