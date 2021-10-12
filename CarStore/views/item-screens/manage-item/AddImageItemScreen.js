import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import HeaderComponent from '../../headerComponent';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {BitMapColorPicker as ColorPicker} from 'react-native-bitmap-color-picker';
export default class AddImageItemsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldColor: '#f77100',
      colorDescription: '',
      isBlack: false,
    };
  }
  componentDidMount() {
    // console.log("prop",this.props.car)
  }
  changeColor = (colorRgb, resType) =>
    resType === 'end' && this.setState({oldColor: colorRgb});
  render() {
    return (
      <View>
        <HeaderComponent navigation={this.props.navigation} />
        <View
          style={{
            borderRadius: 20,
            borderColor: '#363b74',
            borderWidth: 1,
            alignSelf: 'center',
            marginTop: 80,
          }}>
          <Image
            source={require('../../../images/TestImage.png')}
            style={{
              height: 220,
              width: 220,
              resizeMode: 'center',
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: '35%',
            marginVertical: 12,
          }}>
          <TouchableOpacity>
            <Icon style={styles.iconPickImage} name="camera" size={30} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon style={styles.iconPickImage} name="image" size={30} />
          </TouchableOpacity>
        </View>
        <View style={[styles.colorPickerContainer, styles.shadowBox]}>
          <ColorPicker
            oldColor={this.state.oldColor}
            onColorChange={this.changeColor}
            style={styles.colorPicker}
          />
        </View>
        <Text
          style={{
            marginVertical: 12,
            fontSize: 20,
            fontWeight: '600',
            paddingHorizontal: '10%',
          }}>
          Color Description
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: '10%',
          }}>
          <TextInput
            style={styles.colorDescription}
            placeholderTextColor="#ccc"
            onChange={value => this.setState({colorDescription: value})}
            placeholder="Type your description"
          />
          <TouchableOpacity
            onPress={() => this.setState({isBlack: true})}
            style={[
              styles.colorReview,
              {
                backgroundColor: '#000',
                borderWidth: this.state.isBlack ? 3 : 0,
                borderColor: '#bbb',
              },
            ]}
          />
          <TouchableOpacity
            onPress={() => this.setState({isBlack: false})}
            style={[
              styles.colorReview,
              {
                backgroundColor: this.state.oldColor,
                borderWidth: this.state.isBlack ? 0 : 3,
              },
            ]}
          />
        </View>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('UpsertItemScreen', {
              ...this.state,
              isAdded: true,
            })
          }
          style={[
            styles.btnBuy,
            styles.shadowBox,
            {backgroundColor: '#363b74'},
          ]}>
          <Text style={styles.btnText}>Add</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  colorPicker: {
    height: 200,
    width: 200,
  },
  iconPickImage: {
    padding: 12,
    backgroundColor: '#ccc',
    borderRadius: 20,
  },
  colorPickerContainer: {
    padding: 16,
    backgroundColor: '#fff',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  shadowBox: {
    shadowColor: '#bbb',
    shadowOffset: {width: -2, peak: 4},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 6,
  },
  colorReview: {
    height: 50,
    width: 50,
    marginTop: 12,
    borderRadius: 50,
    padding: 8,
  },
  colorDescription: {
    borderColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 12,
    width: '60%',
  },
  btnText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  btnBuy: {
    width: '45%',
    justifyContent: 'center',
    padding: 10,
    height: 60,
    borderRadius: 30,
    marginTop: 20,
    alignSelf: 'center',
  },
});
