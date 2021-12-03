import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import HeaderComponent from '../headerComponent';
import {getStoreInfo} from '../../redux/action/store-info/StoreInfoAction';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import AppText from '../../i18/AppText';
class StoreInfoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      role: '',
    };
  }
  componentDidMount() {
    this.props.getStoreInfo();
  }
  renderButton = () => {
    if (this.props.user.data.data.role === 'admin') {
      return (
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => this.props.navigation.navigate('EditStoreInfoScreen')}>
          <AppText
            style={{
              fontSize: 24,
              color: '#ffe',
              textAlign: 'center',
            }}
            i18nKey={'Edit'}
          />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity style={styles.contactUsButton}>
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
    );
  };
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
              fontSize: 52,
              fontWeight: '700',
              color: '#000',
              marginTop: 120,
              textAlign: 'center',
            }}>
            Welcome to {this.props.storeInfo.nameStore}
          </Text>
          <Text style={styles.subInfoContainer}>
            <Text style={styles.titleStyle}>Address: </Text>
            {this.props.storeInfo.address}
          </Text>
          <Text style={styles.subInfoContainer}>
            <Text style={styles.titleStyle}>Phone number: </Text>
            {this.props.storeInfo.phone}
          </Text>
          <Text style={styles.subInfoContainer}>
            <Text style={styles.titleStyle}>Like: </Text>
            {this.props.storeInfo.like} like
          </Text>
          <Text style={styles.subInfoContainer}>
            <Text style={styles.titleStyle}>Introduction: </Text>
            {this.props.storeInfo.intro}
          </Text>
          {this.renderButton()}
          <Image
            source={require('../../images/TestImage.png')}
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
    storeInfo: state.StoreInfoReducer.storeInfo,
  };
};

export default connect(mapStateToProps, {getStoreInfo})(StoreInfoScreen);

const styles = StyleSheet.create({
  contactUsButton: {
    justifyContent: 'center',
    padding: 12,
    width: '60%',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 50,
    borderRadius: 30,
    borderWidth: 1,
    flexDirection: 'row',
  },
  editButton: {
    marginTop: 50,
    borderRadius: 10,
    backgroundColor: '#363b74',
    padding: 12,
    width: 150,
    alignSelf: 'center',
  },
  subInfoContainer: {fontSize: 20, color: '#000', marginTop: 12},
  titleStyle: {fontWeight: '700', paddingRight: 8},
});
