import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import BackgroundedButton from '../UI/BackgrounedButton/Button';
import imagePlaceHolder from '../../assets/beautiful-place.jpg';

class PickLocation extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.placeholder}>
                    <Text>Map</Text>
                </View>
                <View style={styles.button}>
                    <BackgroundedButton
                        color="#29aaf4"
                        bgColor="white"
                        brColor="#29aaf4">
                        Locate Me
                    </BackgroundedButton>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center'
    },
    placeholder: {
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#eee',
        width: '80%',
        height: 150
    },
    button: {
        margin: 8
    }
});

export default PickLocation;
