import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    ScrollView,
    Image
} from 'react-native';
import { connect } from 'react-redux';

import { addPlace } from '../../store/actions/index';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import BackgroundedButton from '../../components/UI/BackgrounedButton/Button';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';

import imagePlaceHolder from '../../assets/beautiful-place.jpg';

class SharePlaceScreen extends Component {
    static navigatorStyle = {
        navBarButtonColor: '#29aaf4'
    };

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);

        this.state = {
            showNotif: false
        };
    }

    onNavigatorEvent = event => {
        if (event.type === 'NavBarButtonPress') {
            if (event.id === 'sideDrawerToggle') {
                this.props.navigator.toggleDrawer({
                    side: 'left'
                });
            }
        }
    };

    placeNameChangeHandler = placeName => {
        this.setState({ placeName });
    };

    placeAddedHandler = () => {
        if (this.state.placeName.trim() !== '') {
            this.props.onAddPlace(this.state.placeName);
        }
    };

    handleOpen = () => {
        this.setState({ showNotif: true });
    };

    handleClose = () => {
        this.setState({ showNotif: false });
    };

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <PickImage />
                    <PickLocation />
                    <PlaceInput
                        placeName={this.state.placeName}
                        onChangeText={this.placeNameChangeHandler}
                    />
                    <View style={styles.button}>
                        <BackgroundedButton
                            color="#29aaf4"
                            bgColor="white"
                            brColor="#29aaf4"
                            onPress={this.placeAddedHandler}>
                            Share The Place
                        </BackgroundedButton>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    },
    previewImage: {
        width: '100%',
        height: '100%'
    }
});

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: placeName => dispatch(addPlace(placeName))
    };
};

export default connect(
    null,
    mapDispatchToProps
)(SharePlaceScreen);
