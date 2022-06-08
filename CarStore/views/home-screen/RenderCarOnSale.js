import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {formatNumber} from '../../common/Utils';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {share} from '../../redux/action/sharing/SharingAction';
class RenderCarOnSale extends React.Component {
  constructor(props) {
    super(props);
  }

  handleShare = async item => {
    const data = {
      sender: this.props.user?.data?.email,
      name: item.name,
    };
    const result = await share(data);

    console.log('Result ---' + result);
  };

  render() {
    return (
      <>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('DetailItemScreen', {
              data: this.props.item,
            })
          }>
          <View style={styles.renderCarOnSale}>
            <TouchableOpacity
              style={{
                position: 'absolute',
                bottom: 170,
                top: 20,
                left: 200,
                right: 20,
                zIndex: 1000,
              }}
              onPress={() => this.handleShare(this.props.item)}>
              <Icon name="share-alt" size={23} color="##50A2F5" />
            </TouchableOpacity>
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
                <Text>
                  {this.props.language === 'vi'
                    ? `${formatNumber(this.props.item.prices * 23000)}VNĐ`
                    : `${formatNumber(this.props.item.prices)}USD`}{' '}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </>
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

const mapStateToProps = state => {
  return {
    language: state.LanguageReducer.language,
    user: state.UserReducer.user.data,
  };
};

export default connect(mapStateToProps, {})(RenderCarOnSale);
