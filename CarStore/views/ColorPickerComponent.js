import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
const handleColor=(item)=>{
  switch(item.toUpperCase()){
    case 'SILVER':
      return '#aaa';
      case 'BLACK':
        return '#000';
    default:
      return item;
  }
}
export default class ColorPickerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      listColor:[]
    }
  }
  componentDidMount() {
    const list = [];
    this.props.data ?this.props.data.forEach(element=> list.push(element.color)):console.log(1);
    this.setState({listColor:list});
  }
  componentDidUpdate(prevProps){
    if(prevProps.data!==this.props.data){
      console.log(this.props.data)
      const list = [];
      this.props.data ?this.props.data.forEach(element=> list.push(element.color)):console.log(1);
      this.setState({listColor:list});
    }
  }
  renderItem({item}){
    return(
      <TouchableOpacity style={[styles.colorBox,{backgroundColor:handleColor(item)}]}></TouchableOpacity>
    )
  }
  separateItem = () => {
    return <View style={{width: 12}}></View>;
  };
  render() {
    return (
      <View>
        <Text style={{marginBottom:12,marginLeft:20}}>Choose color</Text>
          <FlatList
          horizontal
          data={this.state.listColor}
          renderItem={(item)=>this.renderItem(item)}
          keyExtractor={item => item}
          showsHorizontalScrollIndicator={false}
          style={{paddingLeft:20}}
          ItemSeparatorComponent={this.separateItem}></FlatList>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  colorBox:{
    width:50,
    height:50,
    borderRadius:50,
  }
});
