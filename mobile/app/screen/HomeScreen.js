import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    Platform, ActivityIndicator
} from 'react-native';
import { SERVER_IP } from '@env';
import MenuService from '../service/MenuService'


class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
        categories: [],
        foodData: [],
        categoryContainer: [],
        waitingAnimation: true
    }
}

  componentDidMount(){
    this.getMenuItems()
    this.getCategories()
  }

  getCategories = async () => {
    await MenuService.getCategories()
    .then(async (response) => {
      if(response.status===200){
        this.setState({categories: response.data.categories}) 
        firstcategory = response.data.categories[0]
        this.setState({categoryContainer :this.state.foodData.filter(function(item) {
          return item.category_id == firstcategory.id;
        })})
        this.setState({selectedCategory: firstcategory})
      } else {
        this.setState({error: response.data}) 
      }
    })
  }


  getMenuItems = async () => {
    return await MenuService.getMenuItems()
    .then(async (response) => {
        this.setState({waitingAnimation: false})
      if(response.status===200){
        this.setState({foodData: response.data.menu_items}) 
      } else {
        this.setState({error: response.data}) 
      }
    })

  }

  onSelectCategory = async(category) =>{
    this.setState({categoryContainer :this.state.foodData.filter(function(item) {
      return item.category_id === category.id;
    })})
    this.setState({selectedCategory: category})
  }

  renderMainCategories() {
    const renderItem = ({ item }) => {
      const image = SERVER_IP + '/Images/MenuCategory/' + item.image
        return (
          <TouchableOpacity
          style={{
            padding: 4,
            backgroundColor: 'transparant',
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
            paddingRight: 10,
            ...styles.shadow
          }}
          onPress={() => this.onSelectCategory(item)}>
              <Image
                  source={{ uri: image }}
                  resizeMode="contain"
                  style={{
                      width: 80,
                      height: 80,
                      borderRadius: 25
                  }}
              />
          <Text
              style={{
                  marginTop: 10,
                  color: '#fff',
                  fontSize: (this.state.selectedCategory?.id == item.id) ? 20 : 15,
              }}
          >
              {item.name}
          </Text>
          </TouchableOpacity>
        )
    }

  return (
      <View>
          <Text style={styles.title}>Menu</Text>
        <FlatList
            data={this.state.categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => `${item.id}`}
            renderItem={renderItem}
            contentContainerStyle={{ paddingVertical: 20 }}
        />
      </View>
  )
}

  renderFoodList() {
    const renderItem = ({ item }) => {
      const image = SERVER_IP + '/Images/MenuItem/' + item.image
      return (
        <TouchableOpacity
            style={{ marginBottom: Platform.OS === 'ios' ? 20 : 60, }}
            onPress={() => 
              this.props.navigation.navigate('DetailScreen', {
                item,
            }
            )}
        >
          
            <View
                style={{
                    marginBottom: 10,
                }}
            >
                <Image
                    source={{ uri: image }}
                    resizeMode="cover"
                    style={{
                        width: "100%",
                        height: 170,
                        borderRadius: 15
                    }}
                />
            </View>
            <Text style={{ fontSize: 16, color: '#fff' }}>{item.name}</Text>

            <View
                style={{
                    marginTop: 0,
                    flexDirection: 'row'
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: 5
                    }}
                >

                <Text style={{ fontSize: 14, color: '#fff', fontWeight: '600' }}>{item.price.toFixed(2)}€</Text>


                </View>
            </View>
        </TouchableOpacity>
      )
    }

    return (
        <FlatList
            data={this.state.categoryContainer}
            keyExtractor={item => `${item.id}`}
            renderItem={renderItem}
            contentContainerStyle={{
                paddingHorizontal: 20,
                paddingBottom: 270
            }}
        />
    )
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.waitingView}>
              <ActivityIndicator size="large" color="#999999" animating={this.state.waitingAnimation}/>
          </View>
        <SafeAreaView>
          {this.renderMainCategories()}
          {this.renderFoodList()}
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    title : {
        marginTop: Platform.OS === 'ios' ? 13 : 40,
        paddingLeft: 20,
        fontSize: 30,
        fontWeight: '600',
        color: '#fff'
    },
  textHome: {
    fontSize: 40,
    textAlign: 'center',
    top: 420,
    marginBottom: 0,
    color: "#fff",
    fontWeight: "600"
  },
  container: {
    flex: 1,
    backgroundColor :'#111219',
  },
    waitingView: {
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
        position: 'absolute'
    },
  shadow: {
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1
  }
})

export default HomeScreen;