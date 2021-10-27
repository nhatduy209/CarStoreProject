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
    this.props.data
      ? this.props.data.forEach(element => list.push(element.color))
      : console.log(1);
    list.push('add');
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
  handleAddColor = () => {
    this.props.navigation.push('AddImageItemScreen');
  };
  renderItem({item}) {
    if (item === 'add' && this.props.isManageItem) {
      return (
        <TouchableOpacity
          onPress={() => this.handleAddColor()}
          style={[styles.addBox, {backgroundColor: '#ccc'}]}>
          <Icon name="plus" size={20} />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={[styles.colorBox, {backgroundColor: handleColor(item)}]}
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
