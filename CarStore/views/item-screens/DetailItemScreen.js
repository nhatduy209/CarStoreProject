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
  }
  componentDidMount() {
    // console.log("props",this.props.navigation)
  }
  render() {
    return (
      <View style={{height: '100%'}}>
        <HeaderComponent navigation={this.props.navigation} />
        <ScrollView style={{height: '100%', backgroundColor: '#ed98cd'}}>
          <View style={styles.itemImageContainer}>
            <Image
              style={[styles.imageItem, {width: '100%', height: '100%'}]}
              source={require('../../images/TestImage.png')}
            />
          </View>
          <View style={[styles.itemInfo, styles.shadowBox, {padding: 16}]}>
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.name, {width: '70%'}]}>Name</Text>
              <Text style={[styles.price, {width: '30%'}]}>$Price</Text>
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
          <View style={[{padding: 16}]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={[styles.name, {width: '30%', color: '#ddd'}]}>
                Quantity:
              </Text>
              <View
                style={[
                  styles.count,
                  {
                    flexDirection: 'row',
                    alignItems: 'center',
                  },
                ]}>
                <TouchableOpacity>
                  <Icon name="minus" />
                </TouchableOpacity>
                <Text style={{marginHorizontal: 16}}>1</Text>
                <TouchableOpacity>
                  <Icon name="plus" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={[styles.Description, styles.shadowBox, {padding: 16}]}>
            <View style={{alignItems: 'center'}}>
              <View style={[styles.Description_row]}>
                <Text style={styles.titleDescrition}>Year</Text>
                <Text style={styles.valueDescrition}>2021</Text>
              </View>
              <View style={[styles.Description_row]}>
                <Text style={styles.titleDescrition}>Year</Text>
                <Text style={styles.valueDescrition}>2021</Text>
              </View>
              <View style={[styles.Description_row]}>
                <Text style={styles.titleDescrition}>Year</Text>
                <Text style={styles.valueDescrition}>2021</Text>
              </View>
              <View style={[styles.Description_row]}>
                <Text style={styles.titleDescrition}>Year</Text>
                <Text style={styles.valueDescrition}>2021</Text>
              </View>
              <View style={[styles.Description_row]}>
                <Text style={styles.titleDescrition}>Year</Text>
                <Text style={styles.valueDescrition}>2021</Text>
              </View>
            </View>
          </View>
        </ScrollView>
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
  name: {
    fontSize: 20,
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
    marginTop: -40,
    justifyContent: 'space-around',
    backgroundColor: '#ed98cd',
    height: 400,
  },
  itemInfo: {
    padding: 8,
    backgroundColor: '#eee',
    borderRadius: 10,
    marginTop: -20,
    zIndex: 10,
    margin: 16,
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
    backgroundColor: '#eee',
    borderRadius: 50,
    zIndex: 10,
    margin: 16,
    marginHorizontal: 32,
  },
  count: {backgroundColor: '#ccc', borderRadius: 20, padding: 10},
  Description: {
    margin: 16,
    padding: 8,
    borderWidth: 0.7,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  Description_row: {
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleDescrition: {width: '25%', fontSize: 18, color: '#ddd'},
  valueDescrition: {width: '75%', fontSize: 18, fontWeight: 'bold'},
});
