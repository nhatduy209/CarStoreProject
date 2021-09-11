import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import DrawerContent from './DrawerContent';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CircleTransition from 'react-native-circle-reveal-view';
import HomeScreenStack from './drawer-stack/HomeScreenStack';

const Drawer = createDrawerNavigator();

export default class RootDrawer extends React.Component {
  renderHeaderRight = () => {
    return (
      <View style={{marginRight: 10}}>
        <Icon
        name = "cog"
        size = {23}
        color = "#666666">
        </Icon>
        <CircleTransition
          ref={ref => (this.transitedView = ref)}
          backgroundColor={'black'}
          duration={500}
          revealPositionArray={{bottom: true, left: true}} // must use less than two combination e.g bottom and left or top right or right
        >
          <View style={{flexDirection: 'row', width: '100%'}}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'red',
              }}>
              <Text> halo </Text>
            </View>
          </View>
        </CircleTransition>
      </View>
    );
  };

  renderView = () => {
    return (
      <CircleTransition
        ref={ref => (this.transitedView = ref)}
        backgroundColor={'red'}
        duration={500}
        style={{position: 'absolute'}}
        revealPositionArray={{bottom: true, left: true}} // must use less than two combination e.g bottom and left or top right or right
      >
        <View style={{width: 100, height: 100, backgroundColor: 'red'}}>hello</View>
      </CircleTransition>
    );
  };

  render() {
    return (
      <Drawer.Navigator 
      drawerContent={(props)=><DrawerContent {...props}></DrawerContent>}>
        <Drawer.Screen
        name="HomeStack" component={HomeScreenStack}
        />
        {/* <Drawer.Screen
          options={{
            headerTitle: '',
            headerRight: props => {
              return <this.renderHeaderRight />;
            },
          }}
          name="HomeScreen"
          component={HomeScreen}
        /> */}
      </Drawer.Navigator>
    );
  }
}
