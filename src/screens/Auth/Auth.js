import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    TextInput,
    StyleSheet,
    ImageBackground,
    Dimensions
} from 'react-native';

import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import BackgroundedButton from '../../components/UI/BackgrounedButton/Button';

import bgImage from '../../assets/background.jpg';

import validate from '../../utility/validation';

class AuthScreen extends Component {
    state = {
        styles: {
            pwContainerDirection: 'column',
            pwContainerJustifyContent: 'flex-start',
            pwWrapperWidth: '100%'
        },
        controls: {
            email: {
                value: '',
                valid: false,
                validationRules: {
                    isEmail: true
                }
            },
            password: {
                value: '',
                valid: false,
                validationRules: {
                    minLength: 6
                }
            },
            confPassword: {
                value: '',
                valid: false,
                validationRules: {
                    equalTo: 'password'
                }
            }
        }
    };

    constructor(props) {
        super(props);
        Dimensions.addEventListener('change', this.updateStyles);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateStyles);
    }

    updateStyles = dims => {
        this.setState({
            styles: {
                pwContainerDirection:
                    Dimensions.get('window').height > 500 ? 'column' : 'row',
                pwContainerJustifyContent:
                    Dimensions.get('window').height > 500
                        ? 'flex-start'
                        : 'space-between',
                pwWrapperWidth:
                    Dimensions.get('window').height > 500 ? '100%' : '45%'
            }
        });
    };

    loginHandler = () => {
        startMainTabs();
    };

    updateInput = (key, value) => {
        let conValue = {};
        if (this.state.controls[key].validationRules.equalTo) {
            const eqControl = this.state.controls[key].validationRules.equalTo;
            const equalTo = this.state.controls[eqControl].value;
            conValue = {
                ...conValue,
                equalTo
            };
        }
        if (key === 'password') {
            conValue = { ...conValue, equalTo: value };
        }
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    confPassword: {
                        ...prevState.controls.confPassword,
                        valid:
                            key === 'password'
                                ? validate(
                                      prevState.controls.confPassword.value,
                                      prevState.controls.confPassword
                                          .validationRules,
                                      conValue
                                  )
                                : prevState.controls.confPassword.valid
                    },
                    [key]: {
                        ...prevState.controls[key],
                        value,
                        valid: validate(
                            value,
                            prevState.controls[key].validationRules,
                            conValue
                        )
                    }
                }
            };
        });
    };

    render() {
        let headingText = null;

        if (Dimensions.get('window').height > 500) {
            headingText = (
                <MainText>
                    <HeadingText>Please Log In</HeadingText>
                </MainText>
            );
        }
        return (
            <ImageBackground
                source={bgImage}
                style={styles.backgroundImage}
                imageStyle={{ resizeMode: 'stretch' }}>
                <View style={styles.container}>
                    {headingText}
                    <BackgroundedButton
                        bgColor="#29aaf4"
                        color="white"
                        brColor="transparent">
                        Login Here
                    </BackgroundedButton>
                    <View style={styles.inputContainer}>
                        <DefaultInput
                            placeholder="Email"
                            style={styles.input}
                            value={this.state.controls.email.value}
                            onChangeText={val => this.updateInput('email', val)}
                        />
                        <View
                            style={{
                                flexDirection: this.state.styles
                                    .pwContainerDirection,
                                justifyContent: this.state.styles
                                    .pwContainerJustifyContent
                            }}>
                            <View
                                style={{
                                    width: this.state.styles.pwWrapperWidth
                                }}>
                                <DefaultInput
                                    placeholder="Password"
                                    style={styles.input}
                                    value={this.state.controls.password.value}
                                    onChangeText={val =>
                                        this.updateInput('password', val)
                                    }
                                />
                            </View>
                            <View
                                style={{
                                    width: this.state.styles.pwWrapperWidth
                                }}>
                                <DefaultInput
                                    placeholder="Confirm Password"
                                    style={styles.input}
                                    value={
                                        this.state.controls.confPassword.value
                                    }
                                    onChangeText={val =>
                                        this.updateInput('confPassword', val)
                                    }
                                />
                            </View>
                        </View>
                    </View>
                    <BackgroundedButton
                        bgColor="#29aaf4"
                        color="white"
                        brColor="transparent"
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
