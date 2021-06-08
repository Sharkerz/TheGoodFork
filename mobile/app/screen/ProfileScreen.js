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
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileService from "../service/ProfileService";

class ProfileScreen extends Component {
    constructor() {
      super();
      this.state = {
        name: "",
        email: "",
        fidelity: 0,
        numbersCookOrder: 0,
        numbersBarOrder: 0,
        numbersVisit: 0
      }
    }

    loadData = async () => {
      await SecureStore.getItemAsync('user').then(JSON.parse).then((res) => {
        this.setState({name: res.name})
        this.setState({email: res.email})
      });
      ProfileService.getInfos().then((res) => {
        this.setState({fidelity: res.fidelity})
        this.setState({numbersCookOrder: res.numbersCookOrder})
        this.setState({numbersBarOrder: res.numbersBarOrder})
        this.setState({numbersVisit: res.numbersVisit})
      })

    }
    componentDidMount() {
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
        // Load details user data
        this.loadData()
      });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  logout = () => {
    SecureStore.deleteItemAsync('secure_token').then(r => console.log('deleted'))
    AsyncStorage.removeItem('cartSaved').then(r => console.log('deleted cart'),this.props.route.params.auth(false))
  }


  list = [
    {
      title: 'Pseudo',
      key: 'Pseudo',
      val: ''
    },
    {
      title: 'Email',
      key: 'Email',
      val: '',
    },
    {
      key: 'fidelity',
      title: '🎟️ Points de fidelité',
      val: '45',
    },
    {
      key: 'numbersVisit',
      title: '🍽️ Visites',
      val: '6',
    },
    {
      key: 'numbersCookOrder',
      title: '🍕 Nourriture',
      val: '8',
    },
    {
      key: 'numbersBarOrder',
      title: '🍺 Boissons',
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
                            <Text style={styles.textRowList}>{item.title}</Text>
                          </View>
                          <View style={styles.rightViewItem}>
                            {item.key === "Pseudo"
                                ? <Text style={styles.textRowList}>{this.state.name}</Text>
                                : item.key === "Email" ? <Text style={styles.textRowList}>{this.state.email}</Text>
                                : item.key === "fidelity" ? <Text style={styles.textRowList}>{this.state.fidelity}</Text>
                                : item.key === "numbersVisit" ? <Text style={styles.textRowList}>{this.state.numbersVisit}</Text>
                                : item.key === "numbersCookOrder" ? <Text style={styles.textRowList}>{this.state.numbersCookOrder}</Text>
                                : item.key === "numbersBarOrder" ? <Text style={styles.textRowList}>{this.state.numbersBarOrder}</Text>
                                : <Text style={styles.textRowList}>{item.val}</Text>
                            }
                          </View>
                        </TouchableOpacity>
                      }
                    }
          />
          <View style={{alignItems:'center'}}>
            <Button color='#111219' style={styles.editButton}
                    mode="outlined" onPress={() => this.props.navigation.navigate('OrderListScreen')}>
              Commandes en cours
            </Button>
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