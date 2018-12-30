import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import DefaultInput from '../UI/DefaultInput/DefaultInput';

const placeInput = props => (
    <DefaultInput
        placeholder="Place Name"
        value={props.placeName}
        style={styles.input}
        onChangeText={props.onChangeText}
    />
);

const styles = StyleSheet.create({
    input: {
        marginLeft: '20%',
        marginRight: '20%',
        borderWidth: 3
    }
});

export default placeInput;
