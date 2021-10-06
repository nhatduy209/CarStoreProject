import React from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';

class CardItem extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // console.log("props",this.props.navigation)
  }
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('DetailItemScreen')}
        style={[styles.cardItem, styles.shadowBox]}>
        <View style={styles.itemInfo}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 18, color: '#aaa', width: '90%'}}>
              Ferrari
            </Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 18,
                width: '70%',
                fontWeight: 'bold',
              }}>
              sf90-stradale
            </Text>
            <Text
              style={{
                fontSize: 18,
                width: '30%',
                fontWeight: 'bold',
              }}>
              $168,125
            </Text>
          </View>
        </View>
        <View style={styles.itemImageContainer}>
          <Image
            style={[styles.imageItem, {width: 300, height: '100%'}]}
            source={require('../../images/TestImage.png')}
          />
        </View>
      </TouchableOpacity>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.UserReducer.user,
  };
};

export default connect(mapStateToProps, {})(CardItem);

const styles = StyleSheet.create({
  cardItem: {
    backgroundColor: '#eee',
    borderRadius: 10,
    marginHorizontal: '5%',
    width: '90%',
    height: 250,
    margin: 10,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  shadowBox: {
    shadowColor: '#bbb',
    shadowOffset: {width: -2, peak: 4},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 6,
  },
  imageItem: {
    resizeMode: 'center',
    alignSelf: 'center',
  },
  itemImageContainer: {
    marginTop: -80,
    borderRadius: 200,
    justifyContent: 'space-around',
  },
  itemInfo: {
    padding: 16,
    borderRadius: 10,
    marginTop: -20,
    zIndex: 10,
  },
});
