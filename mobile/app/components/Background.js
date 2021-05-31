import React from 'react';
import { ImageBackground, StyleSheet, KeyboardAvoidingView, View } from 'react-native'
import { theme } from '../core/theme'

export default function Background({ children }) {
    return (
    <View
        style={styles.background}>

        <KeyboardAvoidingView style={styles.container} behavior="padding">
            {children}
        </KeyboardAvoidingView>
    </View>
    );
}

const styles = StyleSheet.create({
    background: {
      flex: 1,
      width: '100%',
      backgroundColor: "#111219",
    },
    container: {
      flex: 1,
      width: '100%',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })


