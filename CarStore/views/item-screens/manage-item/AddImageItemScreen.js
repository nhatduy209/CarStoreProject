import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
  Image,
  ScrollView,
  ToastAndroid,
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
      numberInStore: 0,
      isBlack: false,
      img: '',
      url: '',
      action: '',
    };
  }
  componentDidMount() {
    console.log('prop', this.props.route.params?.data);
    if (this.props.route.params?.data !== 'add') {
      const data = this.props.route.params?.data;
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({
        oldColor:
          data?.color === '#000' || data?.color === 'black'
            ? '#f77100'
            : data?.color,
        numberInStore: data?.numberInStore,
        isBlack: data?.color === '#000' || data?.color === 'black',
        url: data.url,
        action: 'edit',
      });
    }
  }
  handleChangeQuantity = type => {
    if (type) {
      this.setState({numberInStore: this.state.numberInStore + 1});
    } else {
      this.state.numberInStore === 0
        ? console.log(0)
        : this.setState({numberInStore: this.state.numberInStore - 1});
    }
  };
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
  checkExistColor = color => {
    return this.props.listColor.colors.find(el => {
      return el.color === color;
    });
  };
  handleAddColor = () => {
    const newColor = {
      color: this.state.isBlack ? '#000' : this.state.oldColor,
      numberInStore: this.state.numberInStore,
      img: this.state.img,
      url: this.state.url,
    };
    if (this.state.url === '') {
      ToastAndroid.show('Please choosing a image', ToastAndroid.LONG);
      return;
    }
    let listColor = this.props.listColor.colors;
    if (this.checkExistColor(newColor.color)) {
      listColor.forEach((el, index) => {
        if (el.color === newColor.color) {
          listColor[index] = newColor;
        }
      });
    } else {
      listColor.push(newColor);
    }
    this.props.addColor({listColor: listColor});
    this.props.navigation.navigate('UpsertItemScreen', {
      action: this.props.route.params?.action,
    });
  };
  showToast = () => {
    if (this.props.route.params?.action === 'Edit') {
      ToastAndroid.show('Should not change color and image', ToastAndroid.LONG);
    }
  };
  render() {
    return (
      <View>
        <HeaderComponent navigation={this.props.navigation} />
        <ScrollView>
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
          <Pressable onPress={() => this.showToast()}>
            <View
              pointerEvents={
                this.props.route.params?.action === 'Edit' ? 'none' : 'auto'
              }
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
          </Pressable>
          <Pressable onPress={() => this.showToast()}>
            <View
              pointerEvents={
                this.props.route.params?.action === 'Edit' ? 'none' : 'auto'
              }
              style={[styles.colorPickerContainer, styles.shadowBox]}>
              <ColorPicker
                oldColor={this.state.oldColor}
                onColorChange={this.changeColor}
                style={styles.colorPicker}
              />
            </View>
          </Pressable>
          <View style={styles.inputGroup}>
            <Text style={[styles.name, {width: '40%', color: '#222'}]}>
              Quantity:
            </Text>
            <View style={styles.count}>
              <TouchableOpacity
                onPress={() => this.handleChangeQuantity(false)}>
                <Icon name="minus" />
              </TouchableOpacity>
              <Text style={{marginHorizontal: 16}}>
                {this.state.numberInStore}
              </Text>
              <TouchableOpacity onPress={() => this.handleChangeQuantity(true)}>
                <Icon name="plus" />
              </TouchableOpacity>
            </View>
          </View>
          <Pressable onPress={() => this.showToast()}>
            <View
              style={styles.inputGroup}
              pointerEvents={
                this.props.route.params?.action === 'Edit' ? 'none' : 'auto'
              }>
              <Text style={[styles.name, {width: '50%', color: '#222'}]}>
                Color Review:
              </Text>
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
          </Pressable>
          <TouchableOpacity
            onPress={() => this.handleAddColor()}
            style={[
              styles.btnAdd,
              styles.shadowBox,
              {backgroundColor: '#363b74'},
            ]}>
            <Text style={styles.btnText}>
              {this.props.route.params?.action}
            </Text>
          </TouchableOpacity>
        </ScrollView>
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
  inputGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '10%',
    height: 70,
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  name: {
    fontSize: 20,
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
    marginHorizontal: 4,
    borderRadius: 50,
  },
  btnText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  btnAdd: {
    width: '45%',
    justifyContent: 'center',
    padding: 10,
    height: 60,
    borderRadius: 30,
    marginVertical: 20,
    alignSelf: 'center',
  },
  count: {
    backgroundColor: '#ccc',
    borderRadius: 20,
    padding: 10,
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
