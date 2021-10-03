import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import CardItem from '../CardItem';
import AllItemsScreen from '../AllItemsScreen';
import {getListCar} from '../../../redux/action/get-list-car/GetListCar';
class ManageItemsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listItems: [],
    };
  }
  componentDidMount() {
    // console.log("prop",this.props.car)
  }
  render() {
    return (
      <View>
          <AllItemsScreen isManagementScreen={true} navigation={this.props.navigation} screenTitle={'Items Management'}/>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    car: state.CarReducer.car,
    search_car: state.SearchReducer.car,
  };
};

export default connect(mapStateToProps, {})(
    ManageItemsScreen,
);

const styles = StyleSheet.create({});
