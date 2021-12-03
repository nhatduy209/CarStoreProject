import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import HeaderComponent from '../headerComponent';
import {editStoreInfo} from '../../redux/action/store-info/StoreInfoAction';

class EditStoreInfoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: this.props.storeInfo.address,
      phone: this.props.storeInfo.phone,
      intro: this.props.storeInfo.intro,
      nameStore: this.props.storeInfo.nameStore,
    };
  }
  componentDidMount() {
    console.log('ìnfo', this.props.storeInfo);
  }
  handleEdit = () => {
    const data = this.state;
    this.props.editStoreInfo(data);
    this.props.navigation.goBack();
  };
  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
        <ScrollView style={styles.container}>
          <HeaderComponent navigation={this.props.navigation} />
          <View style={styles.bodyContent}>
            <Text
              style={{
                fontSize: 36,
                fontWeight: '700',
                alignSelf: 'center',
                marginBottom: 50,
              }}>
              Edit Store
            </Text>
            <Text style={styles.inputLabel}>Name Store</Text>
            <View style={styles.Input}>
              <TextInput
                style={{flex: 1, color: '#000'}}
                placeholder={'Address'}
                value={this.state.Store}
              />
            </View>
            <Text style={styles.inputLabel}>Address</Text>
            <View style={styles.Input}>
              <TextInput
                style={{flex: 1, color: '#000'}}
                placeholder={'Address'}
                onChangeText={value => this.setState({address: value})}
                value={this.state.address}
              />
            </View>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <View style={styles.Input}>
              <TextInput
                style={{flex: 1, color: '#000'}}
                placeholder={'Phone number'}
                onChangeText={value => this.setState({phoneNumber: value})}
                value={this.state.phone}
              />
            </View>
            <Text style={styles.inputLabel}>Introduction</Text>
            <View style={styles.Input}>
              <TextInput
                style={{flex: 1, color: '#000'}}
                placeholder={'Introduction'}
                onChangeText={value => this.setState({intro: value})}
                value={this.state.intro}
              />
            </View>
            <View style={styles.groupButton}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => this.handleEdit()}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#ffe',
                    textAlign: 'center',
                  }}>
                  Edit
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => this.props.navigation.goBack()}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#ffe',
                    textAlign: 'center',
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.UserReducer.user,
    storeInfo: state.StoreInfoReducer.storeInfo,
  };
};

export default connect(mapStateToProps, {editStoreInfo})(EditStoreInfoScreen);

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  bodyContent: {
    marginTop: 100,
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#323637',
    marginBottom: '4%',
  },
  Input: {
    borderWidth: 0.5,
    borderRadius: 10,
    paddingHorizontal: 10,
    borderColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '4%',
  },
  editButton: {
    borderRadius: 10,
    backgroundColor: '#363b74',
    padding: 12,
    width: 120,
  },
  cancelButton: {
    borderRadius: 10,
    backgroundColor: '#ccc',
    padding: 12,
    width: 120,
  },
  groupButton: {
    justifyContent: 'space-around',
    width: '100%',
    flexDirection: 'row',
    marginTop: 50,
  },
});
