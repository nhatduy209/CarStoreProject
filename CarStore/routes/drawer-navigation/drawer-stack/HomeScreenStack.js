import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react'
import HomeScreen from '../../../views/home-screen/HomeScreen'
import { Image, View, TouchableOpacity, StyleSheet,Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import TabBar from '../../TabBar';
const Stack = createStackNavigator();

const NavigationDrawerStructureLeft = props => {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.openDrawer();
  };
  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={toggleDrawer}>
        {/*Donute Button Image */}
        <Image
          source={require('../../../images/drawer.png')}
          style={{ width: 25, height: 25, marginLeft: 5 }}
        />
      </TouchableOpacity>
    </View>
  );
};



export default class HomeScreenStack extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sortUpOption: false
    }

  }
  render() {
    return (
      <View>
        <Stack.Navigator >
      <Stack.Screen
        name="Home"
        component={HomeScreen}   
        options={{
            headerShown: false,
            title:'',
          headerLeft: ()=>
            <NavigationDrawerStructureLeft
              navigationProps={this.props.navigation}
            />
        }}
      />
      </Stack.Navigator>
      <TabBar prop={this.props.navigation}/>
      </View>
    );
  }

}


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  noCart:{
    position:'absolute',
    alignSelf:'flex-end',
    color:'red',
    fontWeight:'bold'
  }
})