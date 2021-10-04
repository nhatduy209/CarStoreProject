import React from 'react'
import { View, Text, StyleSheet, TextInput, FlatList, Image, TouchableOpacity, ScrollView ,BackHandler} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { getListCar } from '../../redux/action/get-list-car/GetListCar'
import { connect } from 'react-redux'
import RevealCycle from './RevealCycle'
import RenderCarOnSale from './RenderCarOnSale'
import { searchCar } from '../../redux/action/search-car/SearchAction'
import ModalWarningLogin from '../modal/ModalWarningLogin';
const Categories = [
  {
    title: "Toyota",
    img: require('../../images/categories-car/toyota.png'),
  },
  {
    title: 'Ford',
    img: require('../../images/categories-car/ford.png'),
  },
  {
    title: 'Vinfast',
    img: require('../../images/categories-car/vinfast.png'),
  },
  {
    title: 'Suzuki',
    img: require('../../images/categories-car/suzuki.png'),
  }
]
class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      visible: false
    }
  }

  componentDidMount() {
    this.props.getListCar();
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.backAction
    );
  }


  backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to go back?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  }; 
  renderCategories = ({ item }) => {
    return (
      <TouchableOpacity>
        <View style={styles.renderItemStyle}>
          <Image
            source={item.img}
            style={{ width: 100, height: 100 }} />
          <Text style={{ fontWeight: 'bold' }}>
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderCarOnSale = ({ item }) => {
    //const imgURL = (this.props.car.data[0].img  === undefined ? "" : this.props.car.data[0].img);
    return (
      <RenderCarOnSale item={item} />
    )
  }

  renderRevealCycle = () => {
    return (
      <RevealCycle navigation={this.props.navigation} />
    )
  }

  separateItem = () => {
    return (

      <View style={{ width: 30 }}>

      </View>
    )
  }

  handleSearch = (value) => {
    this.setState({ searchText: value });
    if (value.length > 0) {
      this.setState({ visible: true });
    } else {
      this.setState({ visible: false });
    }
  }

  handleSearchPress = () => {
    this.props.searchCar(this.state.searchText)
  }

  render() {
    const count = (this.props.search_car?.length === undefined ? 0 : this.props.search_car.length)
    if (this.state.searchText.length > 0 && count >= 0) {
      return (
        <View style={styles.Container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <this.renderRevealCycle />
            {/* Search input text  */}
            <View style={styles.searchInput}>
              <TextInput style={{ flex: 1, paddingHorizontal: 15 }}
                onChangeText={value => {
                  this.handleSearch(value)
                }}
                placeholder="Search......"
                value={this.state.searchText}
              >

              </TextInput>

              {this.state.visible &&
                <TouchableOpacity onPress={this.handleSearchPress}>
                  <View style={{ alignItems: 'center', width: 80 }} >
                    <Icon
                      name="search"
                      size={18}
                      style={{ color: '#bbbbbb' }}
                    >
                    </Icon>
                  </View>
                </TouchableOpacity>
              }

            </View>
            {/* end  Search input text  */}


            {/* TODO add search data component TRAN THANH TOÀN */}

          </ScrollView>
        </View>
      )
    }
    else {
      return (
        <View style={styles.Container}>
          <ModalWarningLogin navigation = {this.props.navigation}/>
          <ScrollView showsVerticalScrollIndicator={false}>
            <this.renderRevealCycle />
            {/* Search input text  */}
            <View style={styles.searchInput}>
              <TextInput style={{ flex: 1, paddingHorizontal: 15 }}
                onChangeText={value => {
                  this.handleSearch(value)
                }}
                placeholder="Search......"
                value={this.state.searchText}
              >

              </TextInput>

              {this.state.visible &&
                <TouchableOpacity onPress={this.handleSearchPress}>
                  <View style={{ alignItems: 'center', width: 80 }} >
                    <Icon
                      name="search"
                      size={18}
                      style={{ color: '#bbbbbb' }}
                    >
                    </Icon>
                  </View>
                </TouchableOpacity>

              }

            </View>
            {/* end  Search input text  */}
            <View style={{ flexDirection: 'row', paddingTop: 10 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18, fontWeight: '900' }}>
                  Categories
                </Text>
              </View>
              <View style={{ justifyContent: 'flex-end' }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("AllItemsScreen")}>
                  <Text style={{ color: '#66b8ff' }}>
                    Show all
                  </Text>
                </TouchableOpacity>

              </View>
            </View>

            {/* flatlist category */}
            <View style={{ padding: 10 }}>
              <FlatList
                horizontal
                data={Categories}
                renderItem={this.renderCategories}
                keyExtractor={(item) => item.title}
                showsHorizontalScrollIndicator={false}
              >
              </FlatList>
            </View>
            {/* end flatlist category */}

            { /* Car on sale  */}
            <View style={{ flexDirection: 'row', paddingTop: 10 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18, fontWeight: '900' }}>
                  Discount
                </Text>
              </View>
              <View style={{ justifyContent: 'flex-end' }}>
                <Text style={{ color: '#66b8ff' }}>
                  Show all
                </Text>
              </View>
            </View>

            <FlatList
              horizontal
              data={this.props.car.data}
              renderItem={this.renderCarOnSale}
              keyExtractor={(item) => item.name}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={this.separateItem}
            />
            { /*End car on sale */}
          </ScrollView>
        </View>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    car: state.CarReducer.car,
    search_car: state.SearchReducer.car,
    isShow: state.ModalReducer.isShow,
  }
}

export default connect(mapStateToProps, { getListCar, searchCar })(HomeScreen)

const styles = new StyleSheet.create({
  Container: {
    backgroundColor: '#ffffff',
    padding: 15,
    flex: 1
  },
  searchInput: {
    flexDirection: 'row', borderWidth: 1.5, alignItems: 'center',
    borderColor: '#bbbbbb'
  },
  renderItemStyle: {
    margin: 10,
    alignItems: 'center',
  },
})