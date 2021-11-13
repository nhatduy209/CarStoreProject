import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import HeaderComponent from '../headerComponent';
import {LineChart, PieChart} from 'react-native-chart-kit';
import Moment from 'react-moment';
import MonthPicker from 'react-native-month-year-picker';
const chartConfig = {
  backgroundGradientFromOpacity: 0,
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(32, 49, 72, ${opacity})`,
  decimalPlaces: 2,
  strokeWidth: 2, // optional, default 3
  barPercentage: 1.5,
  useShadowColorFromDataset: false, // optional
};
export default class StatisticScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: new Date(),
      isCalendarVisible: false,
    };
  }
  onMonthChange = (event, selectedDate) => {
    const date = new Date();
    const currentDate = selectedDate || date;
    this.setState({month: currentDate, isCalendarVisible: false});
  };
  getLabel = month => {
    let labels = [];
    const currentMonth = month.getMonth();
    while (labels.length < 6) {
      labels.push(((currentMonth + labels.length) % 12) + 1);
    }
    return labels.reverse();
  };
  render() {
    const month = new Date(this.state.month);
    const data = [
      {
        name: 'Seoul',
        summary: 2150,
        color: '#006666',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'Toronto',
        summary: 200,
        color: '#008080',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'Beijing',
        summary: 527,
        color: '#66b2b2',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'New York',
        summary: 853,
        color: '#b2d8d8',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
    ];
    return (
      <ScrollView style={{height: Dimensions.get('window').height}}>
        <HeaderComponent navigation={this.props.navigation} />
        <View style={styles.statisticContainer}>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 40,
              paddingBottom: 40,
              fontWeight: '700',
            }}>
            Statistic
          </Text>
          <View style={styles.subStatistic}>
            <Text style={styles.label}>Revenue</Text>
            <View style={styles.statisticTitle}>
              <Text style={styles.title}>Selected month</Text>
              <View
                style={{
                  ...styles.inputInfo,
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      isCalendarVisible: true,
                    })
                  }>
                  <Moment date={month} format="MM/YYYY" element={Text} />
                </TouchableOpacity>
              </View>
              {this.state.isCalendarVisible && (
                <MonthPicker
                  onChange={this.onMonthChange}
                  value={new Date()}
                  mode="number"
                  autoTheme={true}
                  locale="en"
                />
              )}
            </View>
            <LineChart
              data={{
                labels: this.getLabel(month),
                datasets: [
                  {
                    data: [50, 100, 12, 67, 88, 34],
                  },
                ],
              }}
              fromZero={true}
              showValuesOnTopOfBars={true}
              width={Dimensions.get('window').width - 60}
              height={190}
              yAxisLabel="$"
              chartConfig={chartConfig}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 8,
              }}
            />
          </View>
          <View style={styles.subStatistic}>
            <Text style={styles.label}>Selling Rate</Text>
            <PieChart
              data={data}
              width={Dimensions.get('window').width - 32}
              height={260}
              chartConfig={chartConfig}
              accessor={'summary'}
              backgroundColor={'transparent'}
              center={[10, 10]}
              absolute
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  statisticContainer: {
    height: '100%',
    paddingHorizontal: 16,
    marginTop: 60,
    marginBottom: 20,
  },
  groupItemTitle: {
    fontSize: 24,
    marginBottom: 20,
  },
  statisticTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
  },
  inputInfo: {
    fontSize: 16,
    marginRight: 40,
    padding: 8,
    borderWidth: 0.5,
    borderRadius: 8,
    width: 100,
  },
  label: {
    fontSize: 24,
    fontWeight: '700',
    alignSelf: 'center',
  },
  subStatistic: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginVertical: 4,
    shadowColor: '#bbb',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 4,
  },
});
