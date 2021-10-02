import React from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';

class CardItem extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // console.log("props",this.props)
  }
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('DetailItemScreen',{data:this.props.data})}
        style={[styles.cardItem, styles.shadowBox]}>
        <View style={styles.itemInfo}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 18, color: '#aaa', width: '90%'}}>
              {this.props.data.category}
            </Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 18, width: '70%', fontWeight: 'bold'}}>
              {this.props.data.name}
            </Text>
            <Text style={{fontSize: 18, width: '30%', fontWeight: 'bold'}}>
              ${this.props.data.prices}
            </Text>
          </View>
        </View>
        <View style={styles.itemImageContainer}>
          <Image
            style={[styles.imageItem, {width: '100%', height: 300}]}
            source={{uri:this.props.data.img}}
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
    backgroundColor: '#fff',
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
