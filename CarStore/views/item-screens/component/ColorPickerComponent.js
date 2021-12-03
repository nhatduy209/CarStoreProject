/* eslint-disable react/no-did-mount-set-state */
import React from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {setStateColor} from '../../../redux/action/list-color/ListColorAction';
const handleColor = item => {
  switch (item.toUpperCase()) {
    case 'SILVER':
      return '#aaa';
    case 'BLACK':
      return '#000';
    default:
      return item;
  }
};
class ColorPickerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listColor: [],
    };
  }
  componentDidMount() {
    const list = [];
    // eslint-disable-next-line valid-typeof
    this.props.data && typeof this.props.data === 'array'
      ? this.props.data.forEach(element => list.push(element.color))
      : console.log(1);
    if (this.props.isManageItem) {
      list.push('add');
    }
    this.setState({listColor: list});
  }
  changeListColor = listData => {
    const list = [];
    listData.forEach(element => list.push(element.color));
    list.push('add');
    this.setState({listColor: list});
  };
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.changeListColor(this.props.data);
    }
    if (this.props.listColor.addState === 'SUCCESS') {
      this.changeListColor(this.props.listColor.colors);
      this.props.setStateColor();
    }
  }
  handleAddColor = item => {
    if (item !== 'add') {
      item = this.props.listColor.colors.find(el => el.color === item);
    }
    this.props.navigation.push('AddImageItemScreen', {
      data: item,
      action: this.props.currentScreen,
    });
  };
  renderItem({item}) {
    if (this.props.isManageItem) {
      return (
        <TouchableOpacity
          onPress={() => this.handleAddColor(item)}
          style={[
            styles.addBox,
            {backgroundColor: item === 'add' ? '#ccc' : handleColor(item)},
          ]}>
          {item === 'add' ? <Icon name="plus" size={20} /> : <View />}
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() => console.log('push')}
          style={[
            styles.addBox,
            {backgroundColor: item === 'add' ? '#ccc' : handleColor(item)},
          ]}
        />
      );
    }
  }
  separateItem = () => {
    return <View style={{width: 12}} />;
  };
  render() {
    return (
      <View>
        <Text style={{marginBottom: 12, marginLeft: 20}}>Choose color</Text>
        <FlatList
          horizontal
          data={this.state.listColor}
          renderItem={item => this.renderItem(item)}
          keyExtractor={item => item}
          showsHorizontalScrollIndicator={false}
          style={{paddingLeft: 20}}
          ItemSeparatorComponent={this.separateItem}
        />
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    listColor: state.ListColorReducer,
  };
};

export default connect(mapStateToProps, {setStateColor})(ColorPickerComponent);
const styles = StyleSheet.create({
  colorBox: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  addBox: {
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
