import moment from 'moment';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {CalendarList} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {getMeetings} from '../../redux/action/booking/BookingAction';
let list_meetings = {};
class CalendarScreen extends React.Component {
  showDateMeetings = () => {
    try {
      let objSample = {
        key1: {
          marked: true,
          selected: true,
          selectedColor: 'red',
          dotColor: '#ffffffff',
        },
        key2: {
          marked: true,
          selected: true,
          selectedColor: '#bbbbbb',
          dotColor: '#ffffffff',
        },
      };
      const currentDate = moment(new Date());
      this.props.meetings.map(item => {
        const newDate = moment.utc(item.date_meeting).format('YYYY-MM-DD');
        if (moment(item.date_meeting).isAfter(currentDate)) {
          list_meetings[newDate] = objSample.key1;
        } else {
          list_meetings[newDate] = objSample.key2;
        }
      });
      return list_meetings;
    } catch {
      return {};
    }
  };

  handleDayPress = date => {
    this.props.meetings.filter(item => {
      if (
        date.dateString === moment.utc(item.date_meeting).format('YYYY-MM-DD')
      ) {
        this.props.navigation.navigate('BookingDetailScreen', {booking: item});
      }
    });
  };

  componentDidMount() {
    this.props.getMeetings(this.props.user.email);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{alignItems: 'center', padding: 20}}>
          <Icon name="calendar-alt" size={30} />
          <Text style={{marginTop: 20}}>
            You are having {this.props.meetings?.length ?? 0} booking
            appointment
          </Text>
        </View>
        <CalendarList
          hideArrows={false}
          onPressArrowLeft={subtractMonth => subtractMonth()}
          // Handler which gets executed when press arrow icon right. It receive a callback can go next month
          onPressArrowRight={addMonth => addMonth()}
          // Enable horizontal scrolling, default = false
          horizontal={true}
          // Enable paging on horizontal, default = false
          pagingEnabled={true}
          // Set custom calendarWidth.
          markedDates={this.showDateMeetings()}
          onDayPress={date => this.handleDayPress(date)}
          minDate={new Date()}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.UserReducer.user.data.data,
    meetings: state.BookingReducer.meetings,
  };
}
export default connect(mapStateToProps, {getMeetings})(CalendarScreen);

const styles = new StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
    alignItems: 'center',
  },
});
