import { TRY_AUTH } from './actionTypes';
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
                if (parsedRes.error) {
                    if (parsedRes.error.message === 'EMAIL_EXISTS') {
                        alert('Email exists, please use another email');
                    } else if (parsedRes.error.message === 'INVALID_PASSWORD') {
                        alert('Invalid password, please try again');
                    } else {
                        alert('Authentication failed, please try again');
                    }
                } else {
                    startMainTabs();
                }
            });
        dispatch(uiStopLoading());
    };
};
