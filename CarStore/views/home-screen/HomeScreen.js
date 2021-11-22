import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {getListCar} from '../../redux/action/get-list-car/GetListCar';
import {connect} from 'react-redux';
import RevealCycle from './RevealCycle';
import RenderCarOnSale from './RenderCarOnSale';
import {searchCar} from '../../redux/action/search-car/SearchAction';
import {getListCategory} from '../../redux/action/get-list-category/GetListCategory';
import {ModalComponent} from '../modal/ModalComponent';
import AllItemsScreen from '../item-screens/list-item/AllItemsScreen';
import AppText from '../../i18/AppText';
class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      visible: false,
      isShow: false,
      isSearch: false,
    };
  }

  componentDidMount() {
    this.props.getListCar(0, 5);
    this.props.getListCategory();
  }

  renderCategories = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        this.props.navigation.navigate('CarCategory', {category: item.name})
      }>
      <View style={styles.renderItemStyle}>
        <Image source={{uri: item.image}} style={{width: 100, height: 100}} />
        <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  renderCarOnSale = ({item}) => {
    return <RenderCarOnSale item={item} navigation={this.props.navigation} />;
  };

  renderRevealCycle = () => {
    return <RevealCycle navigation={this.props.navigation} state={this} />;
  };

  separateItem = () => {
    return <View style={{width: 30}} />;
  };

  handleSearch = value => {
    this.setState({searchText: value});
    if (value.length > 0) {
      this.setState({visible: true});
    } else {
      this.setState({visible: false, isSearch: false});
    }
  };

  handleSearchPress = () => {
    this.props.searchCar(this.state.searchText);
    this.setState({isSearch: true});
  };

  renderIcon = () => (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={this.handleSearchPress}>
        <View
          style={{
            alignItems: 'center',
            width: 50,
          }}>
          <Icon name="search" size={18} style={{color: '#bbbbbb'}} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          this.setState({searchText: '', isSearch: false, visible: false})
        }>
        <View
          style={{
            alignItems: 'center',
            width: 50,
          }}>
          <Icon name="times" size={18} style={{color: '#bbbbbb'}} />
        </View>
      </TouchableOpacity>
    </View>
  );

  render() {
    if (this.props.search_car?.length >= 0 && this.state.isSearch) {
      return (
        <View style={styles.Container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <this.renderRevealCycle />
            {/* Search input text  */}
            <View style={styles.searchInput}>
              <TextInput
                style={{flex: 1, paddingHorizontal: 15}}
                onChangeText={value => {
                  this.handleSearch(value);
                }}
                placeholder="Search......"
                value={this.state.searchText}
              />

              {this.state.visible && this.renderIcon()}
            </View>
            {/* end  Search input text  */}
            <AllItemsScreen
              navigation={this.props.navigation}
              listSearchItems={this.props.search_car}
              isSearch={true}
            />
          </ScrollView>
        </View>
      );
    } else {
      return (
        <View style={styles.Container}>
          <ModalComponent
            navigation={this.props.navigation}
            state={this}
            isShow={this.state.isShow}
            descriptionText="You are not login, please login first"
            textAction="Sign in"
            textCancel="Cancel"
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <this.renderRevealCycle />
            {/* Search input text  */}
            <View style={styles.searchInput}>
              <TextInput
                style={{flex: 1, paddingHorizontal: 15}}
                onChangeText={value => {
                  this.handleSearch(value);
                }}
                placeholder="Search......"
                value={this.state.searchText}
              />

              {this.state.visible && this.renderIcon()}
            </View>

            <View style={{flexDirection: 'row', paddingTop: 10}}>
              <View style={{flex: 1}}>
                <Text style={{fontSize: 18, fontWeight: '900'}}>New Car</Text>
              </View>
            </View>

            {/* flatlist category */}
            <View style={{padding: 10}}>
              <FlatList
                horizontal
                data={this.props.car}
                renderItem={this.renderCarOnSale}
                keyExtractor={item => item.name}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={this.separateItem}
              />
            </View>

            <View style={{flexDirection: 'row', paddingTop: 10}}>
              <View style={{flex: 1}}>
                <Text style={{fontSize: 18, fontWeight: '900'}}>
                  Top choice
                </Text>
              </View>
            </View>

            {/* flatlist category */}
            <View style={{padding: 10}}>
              <FlatList
                horizontal
                data={this.props.car}
                renderItem={this.renderCarOnSale}
                keyExtractor={item => item.name}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={this.separateItem}
              />
            </View>

            {/* end  Search input text  */}
            <View style={{flexDirection: 'row', paddingTop: 10}}>
              <View style={{flex: 1}}>
                <AppText
                  style={{fontSize: 18, fontWeight: '900'}}
                  i18nKey={'Categories'}
                />
              </View>
            </View>

            {/* flatlist category */}
            <View style={{padding: 10}}>
              <FlatList
                horizontal
                data={
                  this.props.category.data ? this.props.category.data.data : []
                }
                renderItem={this.renderCategories}
                keyExtractor={item => item.name}
                showsHorizontalScrollIndicator={false}
              />
            </View>
            {/* end flatlist category */}

            {/* Car on sale  */}
            <View style={{flexDirection: 'row', paddingTop: 10}}>
              <View style={{flex: 1}}>
                <AppText
                  style={{fontSize: 18, fontWeight: '900'}}
                  i18nKey={'AllCarInStore'}
                />
              </View>
              <View style={{justifyContent: 'flex-end'}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('AllItemsScreen')
                  }>
                  <AppText style={{color: '#66b8ff'}} i18nKey={'ShowAll'} />
                </TouchableOpacity>
              </View>
            </View>

            <FlatList
              horizontal
              data={this.props.car}
              renderItem={this.renderCarOnSale}
              keyExtractor={item => item.name}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={this.separateItem}
            />
            {/*End car on sale */}
          </ScrollView>
        </View>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    car: state.CarReducer.car,
    search_car: state.SearchReducer.car,
    category: state.CategoryReducer.category,
  };
};

export default connect(mapStateToProps, {
  getListCar,
  searchCar,
  getListCategory,
})(HomeScreen);

const styles = new StyleSheet.create({
  Container: {
    backgroundColor: '#ffffff',
    padding: 15,
    flex: 1,
  },
  searchInput: {
    flexDirection: 'row',
    borderWidth: 1.5,
    alignItems: 'center',
    borderColor: '#bbbbbb',
  },
  renderItemStyle: {
    margin: 10,
    alignItems: 'center',
  },
});
