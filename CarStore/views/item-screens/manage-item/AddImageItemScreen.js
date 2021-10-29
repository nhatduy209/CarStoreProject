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
import * as ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {BitMapColorPicker as ColorPicker} from 'react-native-bitmap-color-picker';
import {
  addColor,
  setStateColor,
} from '../../../redux/action/list-color/ListColorAction';
class AddImageItemsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldColor: '#f77100',
      colorDescription: '',
      isBlack: false,
      img: '',
      url: '',
    };
  }
  componentDidMount() {
    // console.log("prop",this.props.listColor)
  }
  handleGallery = () => {
    const Options = {};
    ImagePicker.launchImageLibrary(Options, response => {
      if (response.assets) {
        this.setState({url: response.assets[0].uri});
        this.setState({img: response.assets[0].fileName});
      }
    });
  };
  handleCamera = () => {
    const Options = {};
    ImagePicker.launchCamera(Options, response => {
      if (response.assets) {
        this.setState({url: response.assets[0].uri});
        this.setState({img: response.assets[0].fileName});
      }
    });
  };
  changeColor = (colorRgb, resType) =>
    resType === 'end' && this.setState({oldColor: colorRgb});
  handleAddColor = () => {
    const newColor = {
      color: this.state.isBlack ? '#000' : this.state.oldColor,
      description: this.state.colorDescription,
      img: this.state.img,
      url: this.state.url,
    };
    const listColor = this.props.listColor.colors;
    this.props.addColor({listColor: listColor, newColor: newColor});
    this.props.navigation.navigate('UpsertItemScreen', {
      action: this.props.route.params.action,
    });
  };
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
            source={
              this.state.url
                ? {uri: this.state.url}
                : require('../../../images/TestImage.png')
            }
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
          <TouchableOpacity onPress={this.handleCamera}>
            <Icon style={styles.iconPickImage} name="camera" size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleGallery}>
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
          onPress={() => this.handleAddColor()}
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
const mapStateToProps = state => {
  return {
    listColor: state.ListColorReducer,
  };
};

export default connect(mapStateToProps, {addColor, setStateColor})(
  AddImageItemsScreen,
);
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
    color: '#000',
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
