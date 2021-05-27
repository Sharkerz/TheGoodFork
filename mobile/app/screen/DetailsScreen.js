import React  from 'react'
import { ImageBackground, StyleSheet, View, Text, Image, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { SERVER_IP } from '@env';

class DetailScreen extends React.Component {

    render(){
        const item = this.props.route.params.item;
        console.log(item)
        return(
            <ImageBackground style={styles.container} source={require("../assets/background2.png")} >
        <SafeAreaView>
            <Text style={{ paddingLeft: 20, fontSize: 30, fontWeight: '600', color: '#fff',marginBottom: '5%'}}>{item.name}</Text>
            <View style={{
                        paddingHorizontal: 20,
                    }}>
                <Image
                    source={{ uri: SERVER_IP + '/Images/MenuItem/'+item.image }}
                    resizeMode="cover"
                    style={{
                        width: "100%",
                        height: 200,
                        borderRadius: 15,
                        paddingHorizontal: 20,
                    }}
                />
            </View>
            
        </SafeAreaView>
      </ImageBackground>
        )
    }
    

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  })

export default DetailScreen;