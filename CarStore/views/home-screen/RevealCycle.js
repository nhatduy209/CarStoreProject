import React from 'react'
import { View, TouchableOpacity, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import CircleTransition from 'react-native-circle-reveal-view'

export default class RevealCycle extends React.Component{
  render(){
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


              <TouchableOpacity style={{ marginLeft: 60, marginVertical: 8 }}>
                <Icon
                  name="sign-out-alt"
                  size={28}>
                </Icon>
              </TouchableOpacity>

              <TouchableOpacity style={{ marginLeft: 100, marginVertical: 8 }}>
                <Icon
                  name="user"
                  size={28}>
                </Icon>
              </TouchableOpacity>

              <TouchableOpacity style={{ marginLeft: 140, marginVertical: 8 }}>
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