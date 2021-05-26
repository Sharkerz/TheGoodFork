import React from 'react';
import { ImageBackground, StyleSheet, View, Text, Image, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import Paragraph from '../components/Paragraph';
import { images } from '../constants';



const HomeScreen = () => {

  const categoryData = [
    {
      id: 1,
      name: "Entrées",
      image: images.entree,
    },
    {
      id: 2,
      name: "Plats",
      image: images.plat,
    },
    {
      id: 3,
      name: "Desserts",
      image: images.dessert,
    },
    {
      id: 4,
      name: "Boissons",
      image: images.vin,
    },
    {
      id: 5,
      name: "Apéritifs",
      image: images.aperitif,
    },
    {
      id: 6,
      name: "Spécialités",
      image: images.specialite,
    },        
  ]


  const foodData = [
    {
      id: 1,
      categories: [2],
      name: "Tournedos de boeuf et son accompagnement",
      image: images.entree,
    },
    {
      id: 2,
      name: "Plats",
      categories: [2],
      image: images.plat,
    },
    {
      id: 3,
      name: "Desserts",
      categories: [3],
      image: images.dessert,
    },
    {
      id: 4,
      name: "Boissons",
      categories: [4],
      image: images.vin,
    },
    {
      id: 5,
      name: "Apéritifs",
      categories: [5],
      image: images.aperitif,
    },
    {
      id: 6,
      name: "Spécialités",
      categories: [6],
      image: images.specialite,
    },  

  ]


  const [categories, setCategories] = React.useState(categoryData)
  const [selectedCategory, setSelectedCategory] = React.useState(null)
  const [foods, setFoods] = React.useState(foodData)

  function onSelectCategory(category) {
    
    let foodList = foodData.filter(a => a.categories.includes(category.id))

    setFoods(foodList)
    setSelectedCategory(category)
  }

//   function getCategoryNameById(id) {
//     let category = categories.filter(a => a.id == id)

//     if (category.length > 0)
//         return category[0].name

//     return ""
// }

  function renderCategories() {
  const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
        style={{
          padding: 4,
          borderRadius: 30,
          paddingLeft: 10,
          // backgroundColor: (selectedCategory?.id == item.id) ? '#5A5B61' : 'rgba(0,0,0,0)',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 0,
          marginRight: 5,
          ...styles.shadow
        }}
        onPress={() => onSelectCategory(item)}>

        {/* <View
            style={{
                width: 80,
                height: 80,
                borderRadius: 25,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: 'transparant'
            }}
        > */}
            <Image
                source={item.image}
                resizeMode="contain"
                style={{
                    width: 85,
                    height: 85,
                    borderRadius: 25
                }}
            />
        {/* </View> */}
        <Text
            style={{
                marginTop: 10,
                color: '#fff',
                fontSize: (selectedCategory?.id == item.id) ? 20 : 15,
            }}
        >
            {item.name}
        </Text>

        </TouchableOpacity>
      
      )
  }

  return (
      <View>
        <Text style={{ paddingLeft: 20, marginTop: 25, fontSize: 25, fontWeight: '600', color: '#fff'}}>Composez votre menu</Text>

        <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => `${item.id}`}
            renderItem={renderItem}
            contentContainerStyle={{ paddingVertical: 20 }}
        />
      </View>
  )
}

function renderFoodList() {
  const renderItem = ({ item }) => (
      <TouchableOpacity
          style={{ marginBottom: 20 }}
          // onPress={() => navigation.navigate("Profile", {
          //     item,
          //     currentLocation
          // })}
      >
          {/* Image */}
          <View
              style={{
                  marginBottom: 10
              }}
          >
              <Image
                  source={item.image}
                  resizeMode="cover"
                  style={{
                      width: "100%",
                      height: 200,
                      borderRadius: 15
                  }}
              />

              {/* <View
                  style={{
                      position: 'absolute',
                      bottom: 0,
                      height: 50,
                      width: 100,
                      backgroundColor: '#fff',
                      borderTopRightRadius: 15,
                      borderBottomLeftRadius: 15,
                      alignItems: 'center',
                      justifyContent: 'center',
                      ...styles.shadow
                  }}
              >
                <Text style={{ fontSize: 15 }}>{item.name}</Text>
              </View> */}
          </View>
          <Text style={{ fontSize: 16, color: '#fff' }}>{item.name}</Text>




          <View
              style={{
                  marginTop: 0,
                  flexDirection: 'row'
              }}
          >
              {/* Rating */}
              {/* <Image
                  source={icons.star}
                  style={{
                      height: 20,
                      width: 20,
                      tintColor: COLORS.primary,
                      marginRight: 10
                  }}
              /> */}
              {/* <Text style={{ fontSize: 15 }}>{item.rating}</Text> */}

              {/* Categories */}
              {/* <View
                  style={{
                      flexDirection: 'row',
                      marginLeft: 10
                  }}
              >
                  {
                      item.categories.map((categoryId) => {
                          return (
                              <View
                                  style={{ flexDirection: 'row' }}
                                  key={categoryId}
                              >
                                  <Text style={{ fontSize: 15 }}>{getCategoryNameById(categoryId)}</Text>
                                  <Text style={{ fontSize: 15, color: '#111219' }}> . </Text>
                              </View>
                          )
                      })
                  }

              </View> */}
          </View>
      </TouchableOpacity>
  )

  return (
      <FlatList
          data={foods}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={{
              paddingHorizontal: 20,
              paddingBottom: 270
          }}
      />
  )
}

return (
  <ImageBackground style={styles.container} source={require("../assets/background2.png")} >
    <SafeAreaView>  
      {renderCategories()}
      {renderFoodList()}
    </SafeAreaView>
  </ImageBackground>



);

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