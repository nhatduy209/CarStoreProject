import React from 'react'
import { View, TouchableOpacity, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import CircleTransition from 'react-native-circle-reveal-view'
import { connect } from 'react-redux'
import { STATUS } from '../../config/Status'
import {showModalNotLogin} from '../../redux/action/show-modal/ShowModalAction'
class RevealCycle extends React.Component {

  constructor(props) {
    super(props)
  }

  renderSignInIcons = () => {
    if (this.props.user.status === STATUS.SUCCESS) {
      return (
        <TouchableOpacity style={{ marginLeft: 60, marginVertical: 8 }}
          onPress={() => this.props.navigation.navigate('LoginScreen')}
        >
          <Icon
            name="sign-out-alt"
            size={28}>
          </Icon>
        </TouchableOpacity>

      )
    }
    else {
      return (
        <TouchableOpacity style={{ marginLeft: 60, marginVertical: 8 }}
          onPress={() => this.props.navigation.navigate('LoginScreen')}
        >
          <Icon
            name="sign-in-alt"
            size={28}>
          </Icon>
        </TouchableOpacity>
      )

    }
  }

  handleGoToUserProfile = () => {
    if (this.props.user.status === STATUS.SUCCESS) {
        this.props.navigation.navigate('ProfileScreen')
    } else {
      this.props.showModalNotLogin();
    }
  }

  handleGoToCart = () => {
    this.props.navigation.navigate('CartStack')
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          style={{ marginLeft: 'auto', marginTop: 5, marginBottom: 10 }}
          onPress={() => {
            this.transitedView.toggle()
          }}>
          <View>
            <Icon
              name="cog"
              size={23}
              color="#666666"
            >
            </Icon>
          </View>

        </TouchableOpacity>

        <View>
          <CircleTransition
            backgroundColor={'#f2f2f2'}
            ref={(ref) => this.transitedView = ref}
            duration={1000}
            style={{ borderBottomStartRadius: 100, marginBottom: 5, marginLeft: Dimensions.get('window').width / 3 }}
            revealPositionArray={{ top: true, right: true, }}// must use less than two combination e.g bottom and left or top right or right
          >
            <View>

              <this.renderSignInIcons />

              <TouchableOpacity style={{ marginLeft: 100, marginVertical: 8 }}
              onPress = {this.handleGoToUserProfile}
                >
                <Icon
                  name="user"
                  size={28}>
                </Icon>
              </TouchableOpacity>

              <TouchableOpacity style={{ marginLeft: 140, marginVertical: 8 }}
              onPress = {this.handleGoToCart}>
                <Icon
                  name="shopping-cart"
                  size={28}>
                </Icon>
              </TouchableOpacity>

            </View>
          </CircleTransition>
        </View>
      </View>
    )
  }
}




const mapStateToProps = state => {
  return {
    user: state.UserReducer.user,
    isShow :  state.ModalReducer.isShow,
  }
}

export default connect(mapStateToProps, {showModalNotLogin})(RevealCycle)