import React from 'react';
import {
    TouchableOpacity,
    TouchableNativeFeedback,
    Text,
    View,
    StyleSheet,
    Platform
} from 'react-native';

const button = props => {
    const content = (
        <View
            style={[
                styles.button,
                {
                    backgroundColor: props.bgColor,
                    borderColor: props.brColor
                }
            ]}>
            <Text style={[styles.textButton, { color: props.color }]}>
                {props.children}
            </Text>
        </View>
    );
    if (Platform.OS === 'android') {
        return (
            <TouchableNativeFeedback onPress={props.onPress}>
                {content}
            </TouchableNativeFeedback>
        );
    }
    return (
        <TouchableOpacity onPress={props.onPress}>{content}</TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        margin: 5,
        borderRadius: 5,
        borderWidth: 1
    },
    textButton: {
        color: 'white'
    }
});

export default button;
