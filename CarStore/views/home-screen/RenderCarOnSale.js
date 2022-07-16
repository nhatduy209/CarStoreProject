import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {
  formatNumber,
  showToastFail,
  showToastSuccess,
} from '../../common/Utils';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {share} from '../../redux/action/sharing/SharingAction';
import RBSheet from 'react-native-raw-bottom-sheet';
import AppText from '../../i18/AppText';
import {ACTION_NAME} from '../../redux/action/sharing/ActionName';

class RenderCarOnSale extends React.Component {
  constructor(props) {
    super(props);
  }

  handleShare = async item => {
    const data = {
      sender: this.props?.user?.data?.email,
      name: item.name,
    };
    const result = await share(data);
    if (result.type === ACTION_NAME.SHARE_ACTION.SHARE_ACTION_SUCCESS) {
      showToastSuccess(
        'Success',
        'Sharing item to admin success , please check',
      );
    } else {
      showToastFail('Fail', 'Sharing item to admin fail , try again');
    }
  };

  render() {
    return (
      <>
        <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          height={70}
          openDuration={250}
          customStyles={{
            container: {
              marginVertical: 8,
              backgroundColor: 'rgba(255, 255, 255, 0)',
            },
          }}>
          <TouchableOpacity
            style={{
              padding: 20,
              flexDirection: 'row',
              backgroundColor: '#fff',
              borderRadius: 50,
              marginHorizontal: 10,
            }}
            onPress={() => {
              this.handleShare(this.props.item);
              this.RBSheet.close();
            }}>
            <Icon
              name="share"
              size={20}
              color="#50A2F5"
              style={{paddingRight: 20}}
            />
            <AppText i18nKey={'ShareAdmin'} />
          </TouchableOpacity>
        </RBSheet>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('DetailItemScreen', {
              data: this.props.item,
            })
          }>
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

              <View
                style={{
                  paddingHorizontal: 8,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text>
                  {this.props.language === 'vi'
                    ? `${formatNumber(this.props.item.prices * 23000)}VNĐ`
                    : `${formatNumber(this.props.item.prices)}USD`}{' '}
                </Text>
                <TouchableOpacity
                  style={{
                    marginRight: 8,
                  }}
                  onPress={() => this.RBSheet.open()}>
                  <Icon name="share-alt" size={16} color="##50A2F5" />
                </TouchableOpacity>
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
    user: state.UserReducer?.user.data,
  };
};

export default connect(mapStateToProps, {})(RenderCarOnSale);
