import React from 'react'
import { View, Text, StyleSheet, TextInput, FlatList, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

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
export default class HomeScreen extends React.Component {


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
  render() {
    return (
      <View style={styles.Container}>

        {/* Search input text  */}
        <View style={styles.searchInput}>
          <Icon
            name="search"
            size={18}
            style={{ marginLeft: 20, color: '#bbbbbb' }}
          >
          </Icon>
          <TextInput style={{ flex: 1 }}>

          </TextInput>
        </View>
        {/* end  Search input text  */}
        <View style={{ flexDirection: 'row', paddingTop: 10 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18, fontWeight: '900' }}>
              Categories
            </Text>
          </View>
          <View style={{ justifyContent: 'flex-end' }}>
            <Text style={{ color: '#66b8ff' }}>
              Show all
            </Text>
          </View>
        </View>

        {/* flatlist category */}
        <View style = {{ padding : 10}}>
        <FlatList
          horizontal
          data={Categories}
          renderItem={this.renderCategories}
          keyExtractor={(item) => item.title}
          showsHorizontalScrollIndicator = {false}
        >
        </FlatList>
        </View>
        {/* end flatlist category */}

        { /* Car you like */}
        <View style={{ flexDirection: 'row', paddingTop: 10 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18, fontWeight: '900' }}>
              Car you like 
            </Text>
          </View>
          <View style={{ justifyContent: 'flex-end' }}>
            <Text style={{ color: '#66b8ff' }}>
              Show all
            </Text>
          </View>
        </View>
        { /*End car you like */}
      </View>
    )
  }
}

const styles = new StyleSheet.create({
  Container: {
    backgroundColor: '#ffffff',
    padding: 15,
    flex : 1 
  },
  searchInput: {
    flexDirection: 'row', borderWidth: 1.5, alignItems: 'center',
    borderColor: '#bbbbbb'
  },
  renderItemStyle: {
    margin: 10,
    alignItems: 'center',
  }
})