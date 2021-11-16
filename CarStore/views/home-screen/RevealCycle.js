import React from 'react';
import {View, TouchableOpacity, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CircleTransition from 'react-native-circle-reveal-view';
import {connect} from 'react-redux';
import {STATUS, STATUS_LOGOUT} from '../../config/Status';
import {logout} from '../../redux/action/login-action/LoginAction';
import {_retrieveData} from '../../common/Utils';
import {TOKEN_DEVICE} from '../../config/StorageKey';
import {testIds} from '../../config/TestID';
const marginL = 20;

class RevealCycle extends React.Component {
  constructor(props) {
    super(props);
  }

  logout = async () => {
    const getToken = await _retrieveData(TOKEN_DEVICE);

    this.props.logout(this.props.user.data.data.email, getToken);
  };

  componentDidUpdate() {
    if (this.props.user.status === STATUS_LOGOUT.SUCCESS) {
      this.props.navigation.push('LoginScreen');
    }
  }

  renderSignInIcons = () => {
    if (this.props.user.status === STATUS.SUCCESS) {
      return (
        <TouchableOpacity
          testID={testIds.logoutButton}
          style={{marginLeft: marginL, marginVertical: 8}}
          onPress={this.logout}>
          <Icon name="sign-out-alt" size={28} />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          testID={testIds.logoutButton}
          style={{marginLeft: marginL, marginVertical: 8}}
          onPress={this.logout}>
          <Icon name="sign-in-alt" size={28} />
        </TouchableOpacity>
      );
    }
  };

  handleGoToUserProfile = () => {
    if (this.props.user.status === STATUS.SUCCESS) {
      this.props.navigation.navigate('ProfileScreen');
    } else {
      this.props.state.setState({isShow: true});
    }
  };

  handleGoToCart = () => {
    if (this.props.user.status === STATUS.SUCCESS) {
      this.props.navigation.navigate('CartStack');
    } else {
      this.props.state.setState({isShow: true});
    }
  };

  handleGoToCalendar = () => {
    if (this.props.user.status === STATUS.SUCCESS) {
      this.props.navigation.navigate('CalendarStack');
    } else {
      this.props.state.setState({isShow: true});
    }
  };

  render() {
    return (
      <View>
        <TouchableOpacity
          testID={testIds.toogleReview}
          style={{marginLeft: 'auto', marginTop: 5, marginBottom: 10}}
          onPress={() => {
            this.transitedView.toggle();
          }}>
          <View>
            <Icon name="cog" size={23} color="#666666" />
          </View>
        </TouchableOpacity>

        <View>
          <CircleTransition
            backgroundColor={'#f2f2f2'}
            ref={ref => (this.transitedView = ref)}
            duration={1000}
            style={{
              borderBottomStartRadius: 100,
              marginBottom: 5,
              marginLeft: Dimensions.get('window').width / 3,
            }}
            revealPositionArray={{top: true, right: true}} // must use less than two combination e.g bottom and left or top right or right
          >
            <View>
              <this.renderSignInIcons />

              <TouchableOpacity
                style={{marginLeft: marginL + 40, marginVertical: 8}}
                onPress={this.handleGoToUserProfile}>
                <Icon name="user" size={28} />
              </TouchableOpacity>

              <TouchableOpacity
                style={{marginLeft: marginL + 80, marginVertical: 8}}
                onPress={this.handleGoToCart}>
                <Icon name="shopping-cart" size={28} />
              </TouchableOpacity>

              <TouchableOpacity
                style={{marginLeft: marginL + 120, marginVertical: 8}}
                onPress={this.handleGoToCalendar}>
                <Icon name="calendar" size={28} />
              </TouchableOpacity>
            </View>
          </CircleTransition>
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

export default connect(mapStateToProps, {logout})(RevealCycle);
