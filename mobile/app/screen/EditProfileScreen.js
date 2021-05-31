import React, {Component} from 'react';
import {ImageBackground, StyleSheet, View, Text, Image, DevSettings, FlatList, TouchableOpacity} from 'react-native';
import Button from '../components/Button'
import * as SecureStore from "expo-secure-store";

class EditProfileScreen extends Component {

    list = [
        {
            val: '1',
        },
        {
            val: '2',
        },
        {
            val: '3',
        },
        {
            val: '4',
        },
        {
            val: '5',
        }
    ]

  render() {
    return (
        <ImageBackground style={styles.container} source={require("../assets/background2.png")} >

          <Text>Hello</Text>

            <FlatList style={styles.list}
                      data={this.list}
                      renderItem={({item}) => <Text style={styles.textRowList}>{item.val}</Text>
                      }
            />

        </ImageBackground>
    );
}
}

export default EditProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

})

