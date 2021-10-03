import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import RelatedCardItem from './RelatedCardItem';

export default class RelatedItemList extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // console.log("props related",this.props.data)
  }
  renderItem({item,navigation}){
    return(
        <TouchableOpacity onPress={()=>navigation.push('DetailItemScreen',{data:item})}>
            <RelatedCardItem data={item} />
        </TouchableOpacity>
    )
  }
  separateItem = () => {
    return <View style={{width: 4}}></View>;
  };
  render() {
    return (
      <View>
          <FlatList
          horizontal
          data={this.props.data}
          renderItem={(item)=>this.renderItem({...item,navigation:this.props.navigation})}
          keyExtractor={item => item.name}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={this.separateItem}></FlatList>
      </View>
    );
  }
}
const styles = StyleSheet.create({
});
