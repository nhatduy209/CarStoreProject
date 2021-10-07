import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class DrawerContent extends React.Component {
  constructor(props) {
    super(props);
  }

  // handle navigate home
  onHomePress = () => {
    this.props.navigation.navigate('HomeScreen');
  }
  onStoreInfoPress = ()=>{
    this.props.navigation.navigate('StoreInfoScreen');
  }
  onManagePress = ()=>{
    this.props.navigation.navigate('ManageItemsScreen',{isManagementScreen:true});
  }
  listDrawerItems=[
    {
      iconName:'user',
      textContent:'Profile',
      handlePress:this.onHomePress,
    },
    {
      iconName:'home',
      textContent:'Home',
      handlePress:this.onHomePress,
    },
    {
      iconName:'car',
      textContent:'Product',
      handlePress:this.onHomePress,
    },
    {
      iconName:'book',
      textContent:'Policy',
      handlePress:this.onHomePress,
    },
    {
      iconName:'phone',
      textContent:'Manage',
      handlePress:this.onManagePress,
    },
    {
      iconName:'phone',
      textContent:'Store Info',
      handlePress:this.onStoreInfoPress,
    },
    {
      iconName:'check',
      textContent:'Log out',
      handlePress:this.onHomePress,
    },
  ]
  renderDrawerItem(item,index){
    return(
      <TouchableOpacity key={index} onPress={item.handlePress}>
            <View style={styles.itemDrawer}>
              <View style={styles.iconStyle}>
              <Icon
                size={20}
                name={item.iconName}
                color={'#bae1ff'}
              >
              </Icon>
              </View>
              <Text style={styles.itemText}>
                {item.textContent}
              </Text>
            </View>
          </TouchableOpacity>
    )
  }
  render() {
    return (
      <View style={{height:'100%',borderTopRightRadius:20,borderBottomRightRadius:20,backgroundColor:'rgb(32,45,70)'}}>
        
        <View style={{height:'15%',alignSelf:'center',justifyContent:'center',marginTop:'10%'}}>
        <Image source={require('../../images/avatar.jpg')} style={{resizeMode: "center",width:100,height:100}}></Image>
        </View>
        <View style={{alignItems: 'center',justifyContent: 'center',marginBottom:'10%'}}>
              <Text style={{ fontSize: 25,fontWeight:'bold',color:'#fff' }}>
                username
              </Text>
              <Text style={{ color: '#fff' }}>
                email
              </Text>
            </View>
        {/* list item in drawer  */}
        <View>
          {/* each item  */}
          {
            this.listDrawerItems.map((item,index)=> this.renderDrawerItem(item,index))
          }
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    height: 200,
    borderBottomColor: '#bbbbbb',
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    color: '#bae1ff',
    borderRadius:10,
    borderWidth:0.5,
    borderColor:'#bae1ff',
    width:40,height:40,
    justifyContent:'center',
    alignItems:'center',backgroundColor:'#444'
  },
  itemDrawer: {
    paddingHorizontal: 40,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  itemText: {
    alignSelf: 'center',
    margin: 10,
    fontSize: 16,
    color:'#bae1ff',
    fontWeight:'bold',
    textAlign:'left',
    width:'50%'
  },
  choosenScreen: {
    backgroundColor: '#fff',
    marginRight: 50,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
  },
});
