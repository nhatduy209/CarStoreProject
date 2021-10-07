import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import AllItemsScreen from '../AllItemsScreen';
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
        <AllItemsScreen
          isManagementScreen={true}
          navigation={this.props.navigation}
          screenTitle={'Items Management'}
        />
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

export default connect(mapStateToProps, {})(ManageItemsScreen);
