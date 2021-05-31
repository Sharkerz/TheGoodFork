import React, {Component} from 'react';
import {ImageBackground, StyleSheet, View, Text, Image, DevSettings, FlatList} from 'react-native';
import Button from '../components/Button'
import * as SecureStore from "expo-secure-store";

class ProfileScreen extends Component {
  logout = () => {
    SecureStore.deleteItemAsync('secure_token').then(r => console.log('deleted'))
    SecureStore.deleteItemAsync('cartSaved').then(r => console.log('deleted cart'))
    DevSettings.reload();
  }

  navigateFromList = () => {
    //this.props.navigation
  }

  list = [
    {
      key: '🎟️ Points de fidelité',
      val: '45',
      navigable: false
    },
    {
      key: '🍽️ Visites',
      val: '6',
      navigable: false
    },
    {
      key: '🍕 Nourriture',
      val: '8',
      navigable: false
    },
    {
      key: '🍺 Boissons',
      val: '22',
      navigable: false
    },
    {
      title: 'Editer mon profil',
      navigable: true
    }
  ]

  render() {
    return (
        <ImageBackground style={styles.container} source={require("../assets/background2.png")} >

          <FlatList style={styles.list}
              data={this.list}
              renderItem={({item}) =>
                {
                  if (item.navigable) {
                    return <View style={styles.item}>
                            <Text onPress={() => this.navigateFromList(item.title)} style={styles.textRowList}>{item.title}</Text>
                           </View>
                  }
                  else {
                    return <View style={styles.item}>
                      <View style={styles.leftViewItem}>
                        <Text style={styles.textRowList}>{item.key}</Text>
                      </View>
                      <View style={styles.rightViewItem}>
                        <Text style={styles.textRowList}>{item.val}</Text>
                      </View>
                          </View>
                  }
                }
              }
              />

          <Button color='#111219' style={styles.textRegister}
                  mode="outlined" onPress={() => this.logout()}>
            Se déconnecter
          </Button>
        </ImageBackground>
    );
}
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textRegister: {
    color: '#111219',
    width: 300
  },
  list: {
    marginTop: 70
  },
  item: {
    padding: 16,
    marginVertical: 1,
    marginHorizontal: 0,
    borderBottomColor: '#343434',
    borderBottomWidth: 0.2,
    flexDirection: 'row'
  },
  leftViewItem: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  rightViewItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  textRowList: {
    color: '#FFFF',
    fontSize: 19,
  }

})

