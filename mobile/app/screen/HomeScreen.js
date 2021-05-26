import React from 'react';
import { ImageBackground, StyleSheet, View, Text, Image, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import Paragraph from '../components/Paragraph';
import { images } from '../constants';
import * as SecureStore from "expo-secure-store";
import axios from 'axios'
import { SERVER_IP } from '@env';
import MenuService from '../service/MenuService'


class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
        categories: [],
        foodData: [],
    }
}
  // const categoryData = [
  //   {
  //     id: 1,
  //     name: "Entrées",
  //     image: images.entree,
  //   },
  //   {
  //     id: 2,
  //     name: "Plats",
  //     image: images.plat,
  //   },
  //   {
  //     id: 3,
  //     name: "Desserts",
  //     image: images.dessert,
  //   },
  //   {
  //     id: 4,
  //     name: "Boissons",
  //     image: images.vin,
  //   },
  //   {
  //     id: 5,
  //     name: "Apéritifs",
  //     image: images.aperitif,
  //   },
  //   {
  //     id: 6,
  //     name: "Spécialités",
  //     image: images.specialite,
  //   },        
  // ]



  // const [categories, setCategories] = React.useState(categoryData)
  componentDidMount(){
    this.getCategories()
  }

  getCategories = async () => {
    await MenuService.getCategories()
    .then(async (response) => {
      if(response.status===200){
        this.setState({categories: response.data.categories}) 
      } else {
        this.setState({error: response.data}) 
      }
    })
  }


  onSelectCategory = async (category) => {
    await MenuService.getMenuItems(category.id)
    .then(async (response) => {
      if(response.status===200){
        this.setState({foodData: response.data.menu_items}) 
      } else {
        this.setState({error: response.data}) 
      }
    })

  }

  renderMainCategories() {
    const renderItem = ({ item }) => {
      const image = SERVER_IP + '/Images/MenuCategory/' + item.image
        return (
          <TouchableOpacity
          style={{
            padding: 4,
            paddingBottom: 20,
            backgroundColor: 'transparant',
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 10,
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
                  fontSize: 15
              }}
          >
              {item.name}
          </Text>
          </TouchableOpacity>
        )
    }

  return (
      <View style={{padding: 20}}>
        <Text style={{ fontSize: 25, fontWeight: '600', color: '#fff'}}>Categories</Text>
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
            style={{ marginBottom: 20 }}
            // onPress={() => navigation.navigate("Profile", {
            //     item,
            //     currentLocation
            // })}
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
            data={this.state.foodData}
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
      <ImageBackground style={styles.container} source={require("../assets/background2.png")} >
        <SafeAreaView>
          {this.renderMainCategories()}
          {this.renderFoodList()}
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
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