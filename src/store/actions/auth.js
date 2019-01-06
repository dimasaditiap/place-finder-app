import { AsyncStorage } from 'react-native';

import { TRY_AUTH, AUTH_SET_TOKEN } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';
import startMainTabs from '../../screens/MainTabs/startMainTabs';

export const tryAuth = (authData, authMode) => {
    return dispatch => {
        dispatch(uiStartLoading());
        const apiKey = 'AIzaSyCqAemkoezNbfMnfIGgU2rAY2FZlTEls24';
        let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${apiKey}`;
        if (authMode === 'signup') {
            url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${apiKey}`;
        }
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .catch(err => {
                console.log(err);
                alert('Authentication failed, please try again');
                dispatch(uiStopLoading());
            })
            .then(res => res.json())
            .then(parsedRes => {
                console.log(parsedRes);
                dispatch(uiStopLoading());
                if (!parsedRes.idToken) {
                    if (parsedRes.error.message === 'EMAIL_EXISTS') {
                        alert('Email exists, please use another email');
                    } else if (parsedRes.error.message === 'INVALID_PASSWORD') {
                        alert('Invalid password, please try again');
                    } else {
                        alert('Authentication failed, please try again');
                    }
                } else {
                    dispatch(
                        authStoreToken(parsedRes.idToken, parsedRes.expiresIn)
                    );
                    startMainTabs();
                }
            });
        dispatch(uiStopLoading());
    };
};

export const authStoreToken = (token, expiresIn) => {
    return dispatch => {
        dispatch(authSetToken(token));
        const now = new Date();
        const expiryDate = now.getTime() + expiresIn * 1000;
        AsyncStorage.setItem('pf:auth:token', token);
        AsyncStorage.setItem('pf:auth:expiryDate', expiryDate.toString());
    };
};

export const authSetToken = token => {
    return { type: AUTH_SET_TOKEN, token };
};

export const authAutoSignIn = () => {
    return dispatch => {
        let fetchedToken;
        AsyncStorage.getItem('pf:auth:token')
            .then(storedToken => {
                if (!storedToken) {
                    return;
                }
                fetchedToken = storedToken;
                AsyncStorage.getItem('pf:auth:expiryDate').then(expiryDate => {
                    const parsedExpiryDate = new Date(parseInt(expiryDate));
                    const now = new Date();
                    if (parsedExpiryDate > now) {
                        dispatch(authSetToken(fetchedToken));
                        startMainTabs();
                    } else {
                        return;
                    }
                });
            })
            .catch(err => {
                return;
            });
    };
};
