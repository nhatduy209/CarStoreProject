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
import {connect} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';
import ColorPickerComponent from '../component/ColorPickerComponent';
import {addItem} from '../../../redux/action/manage-item-action/AddItemAction';
import {setDefaultListColor} from '../../../redux/action/list-color/ListColorAction';
class UpsertItemScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      category: '',
      prices: 0,
      listColor: this.props.listColor,
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
      title: 'name',
      isColor: false,
      onChange: value => this.setState({name: value}),
    },
    {
      title: 'category',
      isColor: false,
      onChange: value => this.setState({category: value}),
    },
    {
      title: 'prices',
      isColor: false,
      onChange: value => this.setState({prices: value}),
    },
    {
      title: 'color',
      isColor: true,
    },
    {
      title: 'height',
      isColor: false,
      onChange: value => this.setState({height: value}),
    },
    {
      title: 'length',
      isColor: false,
      onChange: value => this.setState({length: value}),
    },
    {
      title: 'width',
      isColor: false,
      onChange: value => this.setState({width: value}),
    },
    {
      title: 'description',
      isColor: false,
      onChange: value => this.setState({description: value}),
    },
  ];
  setData = data => {
    console.log('data', data);
    this.setState({
      id: data._id,
      name: data.name,
      category: data.category,
      prices: data.prices,
      height: data.height,
      width: data.width,
      length: data.length,
      description: data.description,
    });
  };
  componentDidMount() {
    switch (this.props.route.params.action) {
      case 'add':
        this.setState({screenTitle: 'Add Item'});
        break;
      case 'edit':
        this.setState({screenTitle: 'Edit Item'});
        this.setData(this.props.route.params?.data);
        break;
      default:
        this.setState({screenTitle: 'View Item'});
        break;
    }
  }
  renderInput({item}) {
    if (item.isColor) {
      return (
        <View>
          <ColorPickerComponent
            isManageItem={true}
            data={this.props.listColor}
            navigation={this.props.navigation}
          />
        </View>
      );
    } else {
      return (
        <TextInput
          onChangeText={value => item.onChange(value)}
          placeholder={item.title}
          style={styles.input}
          placeholderTextColor="#363b74"
          value={String(this.state[item.title])}
        />
      );
    }
  }
  handleAddItem = () => {
    const data = {
      name: this.state.name,
      category: this.state.category,
      prices: parseInt(this.state.prices, 10),
      color: this.props.listColor,
      height: this.state.height,
      length: this.state.length,
      width: this.state.width,
      description: this.state.description,
    };
    if (this.state.listColor.length > 0) {
      this.props.addItem(data);
      this.props.setDefaultListColor();
      this.props.navigation.push('ManageItemsScreen');
    }
  };
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
          onPress={() => this.handleAddItem()}
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
const mapStateToProps = state => {
  return {
    listColor: state.ListColorReducer.colors,
  };
};

export default connect(mapStateToProps, {addItem, setDefaultListColor})(
  UpsertItemScreen,
);
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
