import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import BackgroundedButton from '../UI/BackgrounedButton/Button';
import imagePlaceHolder from '../../assets/beautiful-place.jpg';
import MapView from 'react-native-maps';

class PickLocation extends Component {
    state = {
        focusedLoc: {
            latitude: -6.89148,
            longitude: 107.6107,
            latitudeDelta: 0.0122,
            longitudeDelta:
                (Dimensions.get('window').width /
                    Dimensions.get('window').height) *
                0.0122
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    initialRegion={this.state.focusedLoc}
                    style={styles.map}
                />
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
    map: {
        width: '100%',
        height: 250
    },
    button: {
        margin: 8
    }
});

export default PickLocation;
