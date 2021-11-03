import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import HeaderComponent from '../headerComponent';

export default class BookingDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: 'hihi',
    };
  }
  render() {
    // const {booking} = this.props.route.params;
    // console.log('BOOKING DETAILS', booking);
    return (
      <ScrollView>
        <HeaderComponent navigation={this.props.navigation} />
        <View style={styles.bodyContent}>
          <Text
            style={{
              fontSize: 36,
              fontWeight: '700',
              alignSelf: 'center',
              marginBottom: 30,
            }}>
            BOOKING DETAIL
          </Text>
          <Text style={styles.inputLabel}>Email contact</Text>
          <View style={styles.Input}>
            <Text style={{flex: 1, color: '#000'}}>{this.state.info}</Text>
          </View>
          <Text style={styles.inputLabel}>Choose your car</Text>
          <View style={styles.Input}>
            <Text style={{flex: 1, color: '#000'}}>{this.state.info}</Text>
          </View>
          <Text style={styles.inputLabel}>Full name</Text>
          <View style={styles.Input}>
            <Text style={{flex: 1, color: '#000'}}>{this.state.info}</Text>
          </View>
          <Text style={styles.inputLabel}>Country</Text>
          <View style={styles.Input}>
            <Text style={{flex: 1, color: '#000'}}>{this.state.info}</Text>
          </View>
          <Text style={styles.inputLabel}>Birthday</Text>
          <View style={styles.Input}>
            <Text style={{flex: 1, color: '#000'}}>{this.state.info}</Text>
          </View>
          <Text style={styles.inputLabel}>Personal ID</Text>
          <View style={styles.Input}>
            <Text style={{flex: 1, color: '#000'}}>{this.state.info}</Text>
          </View>
          <Text style={styles.inputLabel}>Phone number</Text>
          <View style={styles.Input}>
            <Text style={{flex: 1, color: '#000'}}>{this.state.info}</Text>
          </View>
          <Text style={styles.inputLabel}>Pick contact date</Text>
          <View style={styles.Input}>
            <Text style={{flex: 1, color: '#000'}}>{this.state.info}</Text>
          </View>
          <View style={styles.groupButton}>
            <TouchableOpacity style={styles.editButton}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#ffe',
                  textAlign: 'center',
                }}>
                Confirm
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
    );
  }
}

const styles = StyleSheet.create({
  bodyContent: {
    marginTop: 60,
    paddingHorizontal: 16,
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#323637',
    marginBottom: '2%',
  },
  Input: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '2%',
    height: 50,
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
    marginVertical: 30,
  },
});
