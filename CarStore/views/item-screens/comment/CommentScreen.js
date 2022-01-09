import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  BackHandler,
  Alert,
} from 'react-native';
import {Rating} from 'react-native-ratings';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {getListComment} from '../../../redux/action/comment/CommentAction';
import {connect} from 'react-redux';

const DATA = [
  {
    id: 0,
    title: 'All',
  },
  {
    id: 5,
    title: '5 star',
  },
  {
    id: 4,
    title: '4 star',
  },
  {
    id: 3,
    title: '3 star',
  },

  {
    id: 2,
    title: '2 star',
  },
  {
    id: 1,
    title: '1 star ',
  },
];

class CommentScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: 0,
    };
  }

  backAction = () => {
    Alert.alert('Hold on!', 'Are you sure you want to go back?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'YES', onPress: () => this.props.navigation.goBack()},
    ]);
    return true;
  };

  componentDidMount() {
    this.props.getListComment(this.props.route.params.name);
  }

  renderItem = ({item, index}) => (
    <TouchableOpacity onPress={() => this.setState({selectedItem: item.id})}>
      <View
        style={
          item.id === this.state.selectedItem
            ? styles.renderSelectedItem
            : styles.renderItemStyle
        }>
        <Text
          style={{
            color: index === this.state.selectedItem ? 'red' : 'black',
          }}>
          ({item.title}){' '}
        </Text>
        <Rating
          fullStarColor="yellow"
          ratingCount={5}
          imageSize={20}
          readonly
          startingValue={item.id}
        />
      </View>
    </TouchableOpacity>
  );

  itemSeparator = () => {
    return <View style={{width: 15}}></View>;
  };

  renderComment = ({item}) => (
    <View style={{borderBottomWidth: 1.5, borderBottomColor: '#f5f5f5'}}>
      <View style={{flexDirection: 'row', margin: 20}}>
        <Icon name="user" size={15} style={{marginRight: 10}} />
        <View>
          <Text>{item.email}</Text>
          <View style={{alignItems: 'flex-start'}}>
            <Rating
              fullStarColor="yellow"
              ratingCount={5}
              imageSize={15}
              readonly
              startingValue={item.rating}
            />
          </View>

          <Text>{item.comment}</Text>
        </View>
      </View>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <View style={{padding: 10}}>
          <FlatList
            horizontal
            data={DATA}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={this.itemSeparator}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View
          style={{borderBottomColor: '#f5f5f5', borderBottomWidth: 2}}></View>
        <FlatList
          data={
            this.state.selectedItem === 0
              ? this.props.comment.data
              : this.props.comment.data.filter(
                  item => item.rating === this.state.selectedItem,
                )
          }
          renderItem={this.renderComment}
          keyExtractor={item => item.username}
          //ItemSeparatorComponent={this.itemSeparator}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    comment: state.CommentReducer.comment.data,
  };
};

export default connect(mapStateToProps, {getListComment})(CommentScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  renderItemStyle: {
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    padding: 7,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  renderSelectedItem: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: 'red',
    padding: 7,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
