import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import HeaderComponent from '../headerComponent';

import {connect} from 'react-redux';

class DetailItemScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemInfo: {},
    };
  }
  componentDidMount() {
    // console.log("props",this.props.navigation)
    this.setState({itemInfo: this.props.route.params.data});
  }
  render() {
    return (
      <View style={{height: '100%'}}>
        <HeaderComponent navigation={this.props.navigation} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{height: '100%', backgroundColor: '#eee'}}>
          <View style={styles.itemImageContainer}>
            <Image
              style={[styles.imageItem, {width: '100%', height: '100%'}]}
              source={{uri: this.state.itemInfo.img}}
            />
          </View>
          <View style={styles.infoContainer}>
            <View style={[styles.itemInfo, styles.shadowBox, {padding: 16,marginTop: -30,}]}>
              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.name, {width: '70%'}]}>
                  {this.state.itemInfo.name}
                </Text>
                <Text style={[styles.price, {width: '30%'}]}>
                  ${this.state.itemInfo.prices}
                </Text>
              </View>
              <View style={{marginVertical: 16, paddingHorizontal: 16}}>
                <Text>Star rating</Text>
              </View>
            </View>
            <View style={[styles.contact, styles.shadowBox, {padding: 16}]}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <Image
                  style={[
                    styles.imageItem,
                    {width: 60, height: 60, borderRadius: 120},
                  ]}
                  source={require('../../images/categories-car/toyota.png')}
                />
                <View style={styles.chat}>
                  <Icon name="heart" size={24} />
                  <Text>Chat with seller</Text>
                </View>
              </View>
            </View>
            <View style={[{padding: 16,paddingLeft:30}]}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={[styles.name, {width: '30%', color: '#222'}]}>
                  Quantity:
                </Text>
                <View
                  style={[
                    styles.count,
                    {flexDirection: 'row', alignItems: 'center',justifyContent:'space-between'},
                  ]}>
                  <TouchableOpacity>
                    <Icon name="minus"></Icon>
                  </TouchableOpacity>
                  <Text style={{marginHorizontal: 16}}>1</Text>
                  <TouchableOpacity>
                    <Icon name="plus"></Icon>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={[styles.Description, {padding: 16}]}>
              <View style={{alignItems: 'center'}}>
                <View style={[styles.Description_row]}>
                  <Text style={styles.titleDescrition}>Width</Text>
                  <Text style={styles.valueDescrition}>
                    {this.state.itemInfo.width}
                  </Text>
                </View>
                <View style={[styles.Description_row]}>
                  <Text style={styles.titleDescrition}>Length</Text>
                  <Text style={styles.valueDescrition}>
                    {this.state.itemInfo.length}
                  </Text>
                </View>
                <View style={[styles.Description_row]}>
                  <Text style={styles.titleDescrition}>Height</Text>
                  <Text style={styles.valueDescrition}>
                    {this.state.itemInfo.height}
                  </Text>
                </View>
                <View style={[styles.Description_row]}>
                  <Text style={styles.titleDescrition}>Make</Text>
                  <Text style={styles.valueDescrition}>
                    {this.state.itemInfo.category}
                  </Text>
                </View>
                <View style={[styles.Description_row]}>
                  <Text style={styles.titleDescrition}>Description</Text>
                  <Text style={styles.valueDescrition}>
                    {this.state.itemInfo.description}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.btnContainer}>
          <View style={[styles.btnBuy,styles.shadowBox,{backgroundColor:'#9695c1'}]}>
            <Text style={styles.btn__text}>Buy</Text>
          </View>
          <View style={[styles.btnBuy,styles.shadowBox,{backgroundColor:'#fff'}]}>
            <Text style={styles.btn__text}>Add to cart</Text>
          </View>
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.UserReducer.user,
  };
};

export default connect(mapStateToProps, {})(DetailItemScreen);

const styles = StyleSheet.create({
  imageItem: {
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  infoContainer: {
    backgroundColor: '#eee',
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  name: {
    fontSize: 20,
  },
  btnContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal:30,
    paddingBottom:10
  },
  btn__text:{
    textAlign:'center',
    fontSize:18,
    fontWeight:'bold'
  },
  btnBuy: {
    width:'45%',
    justifyContent:'center',
    padding:10,
    height:60,
    borderRadius:30
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  shadowBox: {
    shadowColor: '#bbb',
    shadowOffset: {width: -2, peak: 4},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 6,
  },
  itemImageContainer: {
    marginHorizontal: -40,
    justifyContent: 'space-around',
    // backgroundColor: '#9695c1',
    backgroundColor:'#fff',
    height: 400,
  },
  itemInfo: {
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    zIndex: 10,
    marginHorizontal: 20,
  },
  chat: {
    position: 'absolute',
    right: 0,
    borderColor: '#000',
    borderWidth: 0.5,
    borderRadius: 30,
    width: 160,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
  },
  contact: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 50,
    zIndex: 10,
    margin: 16,
    marginHorizontal: 32,
  },
  count: {backgroundColor: '#ccc', borderRadius: 20, padding: 10,width:'40%'},
  Description: {
    margin: 16,
    padding: 8,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom:80
  },
  Description_row: {
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleDescrition: {width: '35%', fontSize: 14, color: '#ccc'},
  valueDescrition: {width: '65%', fontSize: 14, fontWeight: 'bold'},
});
