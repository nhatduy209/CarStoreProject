import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, ScrollView, TextInput, Dimensions } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from "react-native-image-picker";



class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: 'img',
      isModalVisible: true,
      username: "",
      email: "nhatduy20000@gmail.com",
      birthday: "",
      phoneNum: "",
      gender: true,     // true is male and false is female 
      Avatar: "",
      isCalendarVisible: false,
      date: new Date(),
      address: "",
    }
  }

  componentDidMount() {

  }

  componentDidUpdate(prevProps) {

  }

  handlePhotos = () => {
    const Options = {};
    ImagePicker.launchImageLibrary(Options, response => {
      try {
        this.setState({ url: response.assets[0].uri })
        this.setState({ Avatar: response.assets[0].fileName })
        this.setState({ PathImageDevice: response.assets[0].uri })
      }
      catch (err) {
        this.setState({ PathImageDevice: "" })
      }
    })
  }

  handleReset = () => {

  }

  handleSave = () => {

  }

  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    this.setState({ date: currentDate, isCalendarVisible: false })
  };

  showDatepicker = () => {
    this.setState({ isCalendarVisible: true })
  }

  handleGender = (value) => {
    if(value === 'male'){
      this.setState({ gender : true })
    }else{
      this.setState({ gender : false})
    }
  }



  render() {
    const setDate = (this.state.date.toLocaleDateString() === new Date().toLocaleDateString()) ? "Add your birthday" : this.state.date.toLocaleDateString();

    const isGender = (this.state.gender)
     ? { colorMale : '#4db8ff' , colorFemale : '#bbbbbb'} 
     : {colorMale : '#bbbbbb' , colorFemale : 'pink'}
    return (
      <View style={styles.container}>
        {/* <View>
          <Modal isVisible={this.state.isModalVisible}>
            <View>
              <Text>Hello!</Text>
            </View>
          </Modal>
        </View> */}
        <View style={styles.avtImage}>
          <TouchableOpacity onPress={this.handlePhotos}>
            <Image
              style={{ height: 130, width: 130, borderRadius: 70, position: 'absolute', alignSelf: 'center' }}
              source={{ uri: this.state.url }}>
            </Image>
            <Icon
              size={24}
              name="camera"
              style={styles.cameraIcon}
            >
            </Icon>
          </TouchableOpacity>
        </View>

        {/* View for detail info */}
        <ScrollView>
          <View>
            <View style={styles.detailInfo}>
              <Text style={styles.textStyleTitle}>{' '}Email</Text>
              <TextInput style={styles.textStyleData}
                onChangeText={value => {
                  this.setState({ email: value })
                }}
                value={this.state.email}
                editable = {false}
              ></TextInput>
            </View>

            <View style={styles.detailInfo}>
              <Text style={styles.textStyleTitle}>{' '}Birthday</Text>
              <TouchableOpacity onPress={this.showDatepicker}>
                <Text style={{ ...styles.textStyleData, paddingVertical: 10 }}> {setDate}</Text>
              </TouchableOpacity>
              {
                this.state.isCalendarVisible && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={this.state.date}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={this.onChange}
                  />
                )
              }


            </View>

            <View style={styles.detailInfo}>
              <Text style={styles.textStyleTitle}>{' '}Phone Number</Text>
              <TextInput style={styles.textStyleData}
                onChangeText={value => {
                  this.setState({ phoneNum: value })
                }}
                value={this.state.phoneNum}
              ></TextInput>
            </View>

            <View style={{ ...styles.detailInfo, flexDirection: 'row', alignItems: 'center' , paddingVertical : 20}}>
              <Text style={styles.textStyleTitle}>{' '}Gender</Text>
              <View style = {{flexDirection: 'row' }}>
                <TouchableOpacity style={{ marginHorizontal: 20 }} onPress = { () => this.handleGender('male')}>
                  <Icon
                    name="male"
                    size={35}
                    color={isGender.colorMale}>
                  </Icon>
                </TouchableOpacity>

                <TouchableOpacity onPress = { () => this.handleGender('female')} >
                    <Icon
                      name="female"
                      size={35}
                      color={isGender.colorFemale}>
                    </Icon>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.detailInfo}>
              <Text style={styles.textStyleTitle}>{' '}Address</Text>
              <TextInput style={styles.textStyleData}
                onChangeText={value => {
                  this.setState({ address: value })
                }}
                value={this.state.address}
              ></TextInput>
            </View>

          </View>


          <View style={{ flexDirection: 'row', marginVertical: 20, }}>
            <View style={styles.btnReset}>
              <TouchableOpacity onPress={this.handleReset}>
                <Text style={{ fontSize: 25, padding: 5 }}>Reset</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.btnSave}>
              <TouchableOpacity onPress={this.handleSave}>
                <Text style={{ fontSize: 25, padding: 5, color: '#ffffff' }}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>


        </ScrollView>

      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}
export default connect(mapStateToProps, {})(ProfileScreen);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  avtImage: {
    height: 200,
    backgroundColor: '#f2e6ff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cameraIcon: {
    height: 25, width: 25, alignSelf: 'center', marginLeft: 80, marginTop: 110, color: '#bbbbbb'
  },
  detailInfo: {
    borderBottomWidth: 0.5,
    borderColor: '#bbbbbb',
    marginHorizontal: 20,
    paddingTop: 15
  },
  textStyleTitle: {
    color: '#d9b3ff',
    fontSize: 17
  },
  textStyleData: {
    fontSize: 19,
  },
  btnReset: {
    width: Dimensions.get('window').width / 2 - 40,
    borderColor: '#bbbbbb',
    borderWidth: 0.5,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    borderRadius: 20,
    marginLeft: 20,
  },
  btnSave: {
    width: Dimensions.get('window').width / 2 - 40,
    borderColor: '#bbbbbb',
    borderWidth: 0.5,
    backgroundColor: '#1e90ff',
    alignItems: 'center',
    borderRadius: 20,
    marginLeft: 'auto',
    marginRight: 20
  }
})
