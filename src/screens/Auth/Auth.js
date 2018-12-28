import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    TextInput,
    StyleSheet,
    ImageBackground
} from 'react-native';

import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import BackgroundedButton from '../../components/UI/BackgrounedButton/Button';

import bgImage from '../../assets/background.jpg';

class AuthScreen extends Component {
    loginHandler = () => {
        startMainTabs();
    };

    render() {
        return (
            <ImageBackground source={bgImage} style={styles.backgroundImage}>
                <View style={styles.container}>
                    <MainText>
                        <HeadingText>Please Log In</HeadingText>
                    </MainText>
                    <BackgroundedButton color="#29aaf4">
                        Login Here
                    </BackgroundedButton>
                    <View style={styles.inputContainer}>
                        <DefaultInput
                            placeholder="Email"
                            style={styles.input}
                        />
                        <DefaultInput
                            placeholder="Password"
                            style={styles.input}
                        />
                        <DefaultInput
                            placeholder="Confirm Password"
                            style={styles.input}
                        />
                    </View>
                    <BackgroundedButton
                        color="#29aaf4"
                        onPress={this.loginHandler}>
                        Submit
                    </BackgroundedButton>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    backgroundImage: {
        width: '100%',
        flex: 1
    },
    inputContainer: {
        width: '75%'
    },
    input: {
        backgroundColor: '#eee',
        borderColor: '#bbb'
    }
});

export default AuthScreen;
