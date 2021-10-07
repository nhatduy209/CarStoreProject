import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import HeaderComponent from './headerComponent';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';

class StoreInfoScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  render() {
    return (
      <View>
        <HeaderComponent
          screenTitle={'Store Information'}
          navigation={this.props.navigation}
        />
        <View style={{height: '100%', paddingHorizontal: 20}}>
          <Text
            style={{
              fontSize: 56,
              fontWeight: '700',
              color: '#000',
              marginTop: 150,
              textAlign: 'center',
            }}>
            Welcome
          </Text>
          <Text style={{fontSize: 20, color: '#000', marginTop: 12}}>
            Address: ở đâu đó không biết, chỉ biết là không biết nó nằm ở đâu.
          </Text>
          <Text style={{fontSize: 20, color: '#000', marginTop: 12}}>
            Number phone: 1234567890
          </Text>
          <Text style={{fontSize: 20, color: '#000', marginTop: 12}}>
            Rating: 1 sao
          </Text>
          <Text style={{fontSize: 20, color: '#000', marginTop: 12}}>
            Like: 10 like
          </Text>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              padding: 12,
              width: '60%',
              alignItems: 'center',
              alignSelf: 'center',
              marginTop: 20,
              borderRadius: 30,
              borderWidth: 1,
              flexDirection: 'row',
            }}>
            <Icon
              name="heart"
              style={{
                padding: 12,
                backgroundColor: '#aaa',
                borderRadius: 20,
              }}
            />
            <Text
              style={{
                fontSize: 24,
                color: '#000',
                textAlign: 'center',
                marginLeft: 8,
              }}>
              Contact to us
            </Text>
          </TouchableOpacity>
          <Image
            source={require('../images/TestImage.png')}
            style={{
              resizeMode: 'center',
              height: 250,
              width: '100%',
              bottom: 0,
              position: 'absolute',
            }}
          />
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.UserReducer.user,
  };
};

export default connect(mapStateToProps, {})(StoreInfoScreen);
