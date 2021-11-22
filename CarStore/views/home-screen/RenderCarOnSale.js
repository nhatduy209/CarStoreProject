import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
export default class RenderCarOnSale extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity>
        <View style={styles.renderCarOnSale}>
          <Image
            source={{uri: this.props.item.img}}
            style={{
              width: 250,
              height: 130,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          />

          <View style={{paddingVertical: 20}}>
            <View style={{flexDirection: 'row', padding: 8}}>
              <Text style={{fontWeight: 'bold'}}>{this.props.item.name}</Text>
              <Text style={{marginLeft: 'auto'}}>
                {this.props.item.category}
              </Text>
            </View>

            <View style={{paddingHorizontal: 8}}>
              <Text>{this.props.item.prices} USD</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = new StyleSheet.create({
  renderCarOnSale: {
    backgroundColor: '#ffffff',
    margin: 10,
    elevation: 2,
    borderRadius: 20,
  },
});
