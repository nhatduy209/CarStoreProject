import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {getStoreInfo} from '../../redux/action/store-info/StoreInfoAction';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import AppText from '../../i18/AppText';
import * as Animatable from 'react-native-animatable';

const titleStep = [
  {
    step1Title: 'titleStoreInfo1',
    step1Messge: 'messageStoreInfo1',
  },
  {
    step1Title: 'titleStoreInfo2',
    step1Messge: 'messageStoreInfo2',
  },
  {
    step1Title: 'titleStoreInfo3',
    step1Messge: 'messageStoreInfo3',
  },
];

class StoreInfoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      changeTitle: {
        step1Title: 'titleStoreInfo1',
        step1Messge: 'messageStoreInfo1',
      },
    };
  }
  componentDidMount() {
    this.props.getStoreInfo();
  }

  handleChangeTitle = () => {
    switch (this.state.step) {
      case 1:
        this.setState({step: 2, changeTitle: titleStep[1]});
        break;
      case 2:
        this.setState({step: 3, changeTitle: titleStep[2]});
        break;
      default:
        break;
    }
  };

  navigateContact = () => {
    Linking.openURL('tel:' + this.props.storeInfo.phone);
  };

  navigateMail = () => {
    Linking.openURL('mailto:' + 'nhatduy20000@gmail.com');
  };

  navigateMaps = () => {
    const address = this.props.storeInfo.phone;
    Linking.openURL(
      'https://www.google.com/maps/search/?api=1&query=' + address,
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{padding: 20}}>
          <Animatable.View duration={2000} animation={'zoomInUp'}>
            <View style={styles.headerButton}>
              <TouchableOpacity
                style={{marginLeft: 'auto'}}
                onPress={() => this.handleChangeTitle()}>
                <AppText i18nKey={'Next'} />
              </TouchableOpacity>
            </View>
            <Image
              source={require('../../images/car.png')}
              style={styles.image}
            />
          </Animatable.View>
          <View style={{marginVertical: 20}}>
            <Animatable.View animation={'bounceInLeft'} duration={2000}>
              <AppText
                i18nKey={this.state.changeTitle.step1Title}
                style={styles.title}
              />
              <AppText
                i18nKey={this.state.changeTitle.step1Messge}
                style={{fontSize: 17}}
              />
              {this.state.step === 3 && (
                <>
                  <TouchableOpacity
                    onPress={this.navigateContact}
                    style={styles.info}>
                    <AwesomeIcon
                      name="phone-alt"
                      color="#66b3ff"
                      style={styles.Icon}
                      size={20}
                    />
                    <AppText i18nKey={'PhoneNumber'} />

                    <Text style={styles.contactText}>
                      {this.props.storeInfo.phone}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.info}
                    onPress={this.navigateMaps}>
                    <AwesomeIcon
                      name="map-marker"
                      style={styles.Icon}
                      size={20}
                    />
                    <AppText i18nKey={'Address'} />
                    <Text numberOfLines={2} style={styles.contactText}>
                      {this.props.storeInfo.address}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.info}
                    onPress={this.navigateMail}>
                    <AwesomeIcon
                      name="envelope"
                      color="#ff6666"
                      style={styles.Icon}
                      size={20}
                    />
                    <AppText i18nKey={'Email'} />
                    <Text style={styles.contactText}>
                      nhatduy20000@gmail.com
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </Animatable.View>
          </View>

          <View style={styles.bottom}>
            <View style={{...styles.headerButton, marginBottom: 10}}>
              <Animatable.Text
                style={{fontSize: 20}}
                animation="bounceOut"
                iterationCount={Infinity}
                direction="alternate">
                CarStore - TND - TTT
              </Animatable.Text>

              <TouchableOpacity
                style={{borderRadius: 20, borderWidth: 1}}
                onPress={() => this.handleChangeTitle()}>
                <AwesomeIcon
                  name="angle-right"
                  size={25}
                  style={{padding: 20}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    storeInfo: state.StoreInfoReducer.storeInfo,
  };
};

export default connect(mapStateToProps, {getStoreInfo})(StoreInfoScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9967a',
  },
  image: {
    height: 250,
    width: 300,
  },
  headerButton: {
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    width: 250,
  },
  bottom: {
    height: 130,
    justifyContent: 'flex-end',
  },
  info: {
    width: 300,
    marginVertical: 5,
    flexDirection: 'row',
  },
  Icon: {
    marginHorizontal: 10,
  },
  contactText: {
    marginLeft: 20,
  },
});
