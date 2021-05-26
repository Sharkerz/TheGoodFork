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
      }

  ]


  const [categories, setCategories] = React.useState(categoryData)

  function onSelectCategory(category) {
    
    let foodList = foodData.filter(a => a.categories.includes(category.id))

    setFoods(foodList)
    setSelectCategory(category)
  }

  function renderMainCategories() {
  const renderItem = ({ item }) => {
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
                    width: 80,
                    height: 80,
                    borderRadius: 25
                }}
            />
        {/* </View> */}
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
return (
  <ImageBackground style={styles.container} source={require("../assets/background2.png")} >
    <SafeAreaView>  
      
        <Paragraph style={styles.textHome}>
          Home
        </Paragraph>
      {renderMainCategories()}
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