import React from 'react';
import { ImageBackground, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { theme } from '../core/theme'

export default function Background({ children }) {
    return (
    <ImageBackground 
        style={styles.background}
        source={require("../assets/background2.png")} resizeMode="repeat">

        <KeyboardAvoidingView style={styles.container} behavior="padding">
            {children}
        </KeyboardAvoidingView>
    </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
      flex: 1,
      width: '100%',
      backgroundColor: theme.colors.surface,
    },
    container: {
      flex: 1,
      padding: 20,
      width: '100%',
      maxWidth: 340,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })



