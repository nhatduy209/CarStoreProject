/* eslint-disable react/no-did-mount-set-state */
import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  LayoutAnimation,
  Platform,
} from 'react-native';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
class CardItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
    };
  }
  componentDidMount() {
    // console.log("props",this.props)
    this.setState({isShow: false});
  }
  listOptionIcons = [
    {iconName: 'info', backgroundColor: '#7289da'},
    {iconName: 'pencil', backgroundColor: '#99cc33'},
    {iconName: 'trash', backgroundColor: '#ee4035'},
  ];
  handleDetailItem = () => {
    this.props.isShownOption && this.props.isManagementScreen
      ? this.setState({isShow: !this.state.isShow})
      : this.props.navigation.navigate('DetailItemScreen', {
          data: this.props.data,
        });
  };
  handleUpdertItem = () => {};
  showOptionItem = (item, index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    return (
      <TouchableOpacity key={index} onPress={() => this.handleUpdertItem()}>
        <Icon
          style={[styles.iconStyle, {backgroundColor: item.backgroundColor}]}
          name={item.iconName}
        />
      </TouchableOpacity>
    );
  };
  handleShowOption = () => {
    return this.state.isShow ? (
      <View style={styles.options}>
        {this.listOptionIcons.map((item, index) =>
          this.showOptionItem(item, index),
        )}
      </View>
    ) : (
      <View />
    );
  };
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.handleDetailItem()}
        style={[styles.cardItem, styles.shadowBox]}>
        {this.handleShowOption()}
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
            source={{uri: this.props.data.img}}
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
  options: {
    position: 'absolute',
    right: 10,
    top: 10,
    height: '100%',
    width: '20%',
    zIndex: 100,
    backgroundColor: '#eee',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderRadius: 50,
  },
  iconStyle: {
    fontSize: 20,
    color: '#fff',
    borderRadius: 50,
    padding: 15,
    width: 52,
    textAlign: 'center',
    alignSelf: 'center',
  },
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
