/* eslint-disable react/no-did-mount-set-state */
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import HeaderComponent from '../../headerComponent';
import {connect} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
import ColorPickerComponent from '../component/ColorPickerComponent';
import {addItem} from '../../../redux/action/manage-item-action/AddItemAction';
import {updateItem} from '../../../redux/action/manage-item-action/UpdateItemAction';
import {updateQuantity} from '../../../redux/action/manage-item-action/UpdateQuantityAction';
import {addColor} from '../../../redux/action/manage-item-action/AddColorAction';
import {setColor} from '../../../redux/action/list-color/ListColorAction';
import {getListCar} from '../../../redux/action/get-list-car/GetListCar';
import {ProcessLoading} from '../../modal/ProcessLoading';
class UpsertItemScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      prices: '',
      listColor: this.props.listColor,
      height: '',
      length: '',
      width: '',
      description: '',
      img: '',
      screenTitle: '',
      action: '',
      selectedCategory: this.props.category?.data[0]?.name ?? '',
      loading: false,
    };
  }
  list = [
    {
      disabled: this.props.route.params.action === 'Add' ? true : false,
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
    if (data?.color) {
      this.props.setColor(data.color);
    }
    this.setState({
      id: data?._id ?? '',
      name: data?.name ?? '',
      selectedCategory: data?.category ?? '',
      prices: data?.prices ?? '',
      height: data?.height ?? '',
      width: data?.width ?? '',
      length: data?.length ?? '',
      description: data?.description ?? '',
      listColor: data?.color ?? this.props.listColor,
    });
  };
  componentDidMount() {
    console.log('data', this.props.route.params?.data);
    switch (this.props.route.params.action) {
      case 'Add':
        this.setState({screenTitle: 'Add Item'});
        break;
      case 'Edit':
        this.setState({screenTitle: 'Edit Item'});
        this.setData(this.props.route.params?.data);
        break;
      default:
        this.setState({screenTitle: 'View Item'});
        break;
    }
    this.setState({action: this.props.route.params.action});
  }
  componentDidUpdate() {
    if (this.props.reload) {
      this.setState({loading: false});
      this.setData();
      this.props.navigation.push('ManageItemsScreen');
    }
  }
  renderInput({item}) {
    if (item.isColor) {
      return (
        <View>
          <ColorPickerComponent
            currentScreen={this.props.route.params.action}
            isManageItem={true}
            data={this.props.listColor}
            navigation={this.props.navigation}
          />
        </View>
      );
    } else {
      return item.title === 'category' ? (
        <Picker
          mode="dropdown"
          selectedValue={this.state.selectedCategory}
          onValueChange={(itemValue, itemIndex) => {
            console.log('ITEM VALUE __', itemValue);
            this.setState({selectedCategory: itemValue});
          }}>
          {this.props.category.data?.map((el, index) => {
            const catSelected = el.name;
            return (
              <Picker.Item label={catSelected} value={el.name} key={index} />
            );
          })}
        </Picker>
      ) : (
        <TextInput
          editable={item.disabled ?? true}
          onChangeText={value => item.onChange(value)}
          placeholder={item.title}
          style={styles.input}
          placeholderTextColor="#363b74"
          value={String(this.state[item.title])}
        />
      );
    }
  }
  handleUpsertItem = () => {
    const data = {
      name: this.state.name,
      category: this.state.selectedCategory,
      prices: parseInt(this.state.prices, 10),
      color: this.props.listColor,
      height: this.state.height,
      length: this.state.length,
      width: this.state.width,
      description: this.state.description,
    };
    if (this.state.listColor.length > 0) {
      switch (this.props.route.params.action) {
        case 'Add':
          this.props.addItem(data);
          break;
        case 'Edit':
          this.props.updateItem(data);
          // this.props.addColor(data);
          this.props.updateQuantity(data);
          break;
        default:
          this.setState({screenTitle: 'View Item'});
          break;
      }
    }
    this.setState({loading: true});
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
          onPress={() => this.handleUpsertItem()}
          style={[
            styles.btnBuy,
            styles.shadowBox,
            {backgroundColor: '#363b74'},
          ]}>
          <Text style={styles.btnText}>
            {this.props.route.params?.action ?? 'Add'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={[styles.btnBuy, styles.shadowBox, {backgroundColor: '#ccc'}]}>
          <Text style={styles.btnText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
        <ScrollView style={{height: '100%'}}>
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
        </ScrollView>
        <ProcessLoading visible={this.state.loading} />
      </KeyboardAvoidingView>
    );
  }
}
const mapStateToProps = state => {
  return {
    listColor: state.ListColorReducer.colors,
    reload: state.CarReducer.reload ?? false,
    category: state.CategoryReducer.category.data,
  };
};

export default connect(mapStateToProps, {
  addItem,
  updateItem,
  setColor,
  getListCar,
  addColor,
  updateQuantity,
})(UpsertItemScreen);
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
