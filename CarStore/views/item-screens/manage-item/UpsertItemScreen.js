/* eslint-disable react/no-did-mount-set-state */
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import HeaderComponent from '../../headerComponent';
import {FlatList} from 'react-native-gesture-handler';
import ColorPickerComponent from '../ColorPickerComponent';
export default class UpsertItemScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      category: '',
      prices: 0,
      listColor: [],
      height: 0,
      length: 0,
      width: 0,
      description: '',
      img: '',
      screenTitle: '',
    };
  }
  list = [
    {
      title: 'Name',
      isColor: false,
    },
    {
      title: 'Category',
      isColor: false,
    },
    {
      title: 'Price',
      isColor: false,
    },
    {
      title: 'color',
      isColor: true,
    },
    {
      title: 'Height',
      isColor: false,
    },
    {
      title: 'Length',
      isColor: false,
    },
    {
      title: 'Width',
      isColor: false,
    },
    {
      title: 'Description',
      isColor: false,
    },
  ];
  componentDidMount() {
    console.log(this.props.route);
    switch (this.props.route.params.action) {
      case 'add':
        this.setState({screenTitle: 'Add Item'});
        break;
      case 'edit':
        this.setState({screenTitle: 'Edit Item'});
        break;
      default:
        this.setState({screenTitle: 'View Item'});
        break;
    }
  }
  componentDidUpdate() {
    if (this.props.route.params.isAdded) {
      const list = this.state.listColor;
      list.push(this.props.route.params.oldColor);
      this.props.route.params = {};
      this.setState({listColor: list, addImage: false});
    }
  }
  onColorChange(color) {
    this.setState({color});
  }
  renderInput({item}) {
    if (item.isColor) {
      return (
        <View>
          <ColorPickerComponent
            addColor={isAdded => this.setState({addImage: isAdded})}
            isManageItem={true}
            data={this.state.listColor}
            navigation={this.props.navigation}
          />
        </View>
      );
    } else {
      return (
        <TextInput
          placeholder={item.title}
          style={styles.input}
          placeholderTextColor="#363b74"
        />
      );
    }
  }
  renderHeader = () => {
    return <Text style={styles.screenTitle}>{this.state.screenTitle}</Text>;
  };
  separateItem = () => {
    return <View style={{width: 10}} />;
  };
  renderFooter = () => {
    return (
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={[
            styles.btnBuy,
            styles.shadowBox,
            {backgroundColor: '#363b74'},
          ]}>
          <Text style={styles.btnText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btnBuy, styles.shadowBox, {backgroundColor: '#ccc'}]}>
          <Text style={styles.btnText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    return (
      <View>
        <HeaderComponent navigation={this.props.navigation} />
        <FlatList
          ListHeaderComponent={this.renderHeader}
          data={this.list}
          renderItem={item => this.renderInput({...item})}
          keyExtractor={item => item.title}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={this.separateItem}
          style={{paddingTop: 30, paddingHorizontal: 20}}
          ListFooterComponent={this.renderFooter}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  screenTitle: {
    fontSize: 24,
    width: '100%',
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: 20,
  },
  input: {
    padding: 16,
    borderColor: '#363b74',
    borderWidth: 1,
    borderRadius: 20,
    color: '#363b74',
    marginVertical: 16,
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 30,
    paddingBottom: 10,
    height: 130,
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
    marginTop: -20,
  },
  shadowBox: {
    shadowColor: '#bbb',
    shadowOffset: {width: -2, peak: 4},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 6,
  },
});
