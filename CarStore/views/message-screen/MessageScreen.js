import React from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image,
} from 'react-native';
import HeaderComponent from '../headerComponent';
import {styles} from './Style';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import MessageItem from './component/message-item/MessageItem';
const deliveryStatus = [
  {
    value: 0,
    label: 'Chats',
  },
  {
    value: 1,
    label: 'Status',
  },
];

export default class MessageScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0,
      isShow: false,
      isType: false,
      comment: '',
      rating: 0,
      itemRating: {},
    };
    this.car = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  }
  renderEmpty = () => (
    <View>
      <Text style={{position: 'absolute', top: '30%', alignSelf: 'center'}}>
        No result
      </Text>
      <Image
        source={require('../../images/car.png')}
        style={{resizeMode: 'center', width: '100%'}}
      />
    </View>
  );
  renderFooter = () => {
    return <View style={{height: 0}} />;
  };
  separateItem = () => {
    return <View style={{height: 10}} />;
  };
  separateHeaderItem = () => {
    return <View style={{width: 50}} />;
  };
  renderHeaderItem = item => {
    return (
      <TouchableOpacity onPress={() => this.setState({currentTab: item.value})}>
        <Text
          style={[
            {padding: 20, fontSize: 20, fontWeight: '700'},
            item.value === this.state.currentTab
              ? {
                  color: 'rgb(32,45,70)',
                  borderRadius: 50,
                  backgroundColor: '#eee',
                }
              : {color: '#fff'},
          ]}>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };
  renderItem = item => {
    return <MessageItem navigation={this.props.navigation} />;
  };
  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
        <HeaderComponent
          navigation={this.props.navigation}
          screenTitle={'Messages'}
        />
        <ScrollView style={{height: '100%'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 80,
              marginBottom: 20,
            }}>
            {deliveryStatus.map(tab => this.renderHeaderItem(tab))}
          </View>
          <View style={styles.messageBody}>
            <View style={styles.searchInput}>
              <Text style={{fontSize: 20}}>Search</Text>
            </View>
            <FlatList
              data={this.car}
              renderItem={item => this.renderItem(item)}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={this.separateItem}
              ListFooterComponent={this.renderFooter}
              ListEmptyComponent={this.renderEmpty}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
