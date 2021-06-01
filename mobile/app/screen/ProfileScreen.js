import React, {Component} from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  Image,
  DevSettings,
  FlatList,
  TouchableOpacity,
  Platform
} from 'react-native';
import Button from '../components/Button'
import * as SecureStore from "expo-secure-store";

class ProfileScreen extends Component {
    constructor() {
      super();
      this.state = {
        name: "",
        email: ""
      }
    }

  async componentDidMount() {
    await SecureStore.getItemAsync('user').then(JSON.parse).then((res) => {
      this.setState({name: res.name})
      this.setState({email: res.email})
    }).then(() => {
      // this.list[0].push('val')
      // console.log(this.list)
    })
  }

  logout = () => {
    SecureStore.deleteItemAsync('secure_token').then(r => console.log('deleted'))
    SecureStore.deleteItemAsync('cartSaved').then(r => console.log('deleted cart'))
    DevSettings.reload();
  }


  list = [
    {
      key: 'Pseudo',
      val: ''
    },
    {
      key: 'Email',
      val: '',
    },
    {
      key: '🎟️ Points de fidelité',
      val: '45',
    },
    {
      key: '🍽️ Visites',
      val: '6',
    },
    {
      key: '🍕 Nourriture',
      val: '8',
    },
    {
      key: '🍺 Boissons',
      val: '22',
    },
  ]

  render() {
    return (
        <View style={styles.container} >
          <Text style={styles.title}>Votre Profil</Text>
          <FlatList style={styles.list}
                    data={this.list}
                    renderItem={({item}) =>
                      {
                        return <TouchableOpacity style={styles.item}>
                          <View style={styles.leftViewItem}>
                            <Text style={styles.textRowList}>{item.key}</Text>
                          </View>
                          <View style={styles.rightViewItem}>
                            {item.key === "Pseudo"
                                ? <Text style={styles.textRowList}>{this.state.name}</Text>
                                : item.key === "Email" ? <Text style={styles.textRowList}>{this.state.email}</Text>
                                : <Text style={styles.textRowList}>{item.val}</Text>
                            }
                          </View>
                        </TouchableOpacity>
                      }
                    }
          />
          <View style={{alignItems:'center'}}>
            <Button color='#111219' style={styles.editButton}
              mode="outlined" onPress={() => this.props.navigation.navigate('editProfile')}>
              Editer mon profil
            </Button>
            <Button color='#111219' style={styles.disconnectButton}
                    mode="outlined" onPress={() => this.logout()}>
              Se déconnecter
            </Button>
          </View>
        </View>
    );
  }
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111219',
  },
  disconnectButton: {
    color: '#111219',
    width: 300,
    marginBottom: 100
  },
  editButton: {
    color: '#111219',
    width: 300,
    marginBottom: 10,
  },
  list: {
    marginTop: 40,
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
  },
  title : {
    marginTop: Platform.OS === 'ios' ? 60 : 40,
    paddingLeft: 20,
    fontSize: 30,
    fontWeight: '600',
    color: '#fff'
  },

})