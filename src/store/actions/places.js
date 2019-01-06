import { SET_PLACES, REMOVE_PLACE } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';

export const addPlace = (placeName, location, image) => {
    return (dispatch, getState) => {
        const token = getState().auth.token;
        if (!token) {
            return;
        }
        dispatch(uiStartLoading());
        fetch(
            'https://us-central1-place-finder-d3f4b.cloudfunctions.net/storeImage',
            {
                method: 'POST',
                body: JSON.stringify({
                    image: image.base64
                }),
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .catch(err => {
                console.log(err);
                alert('Something went wrong, please try again!');
                dispatch(uiStopLoading());
            })
            .then(res => res.json())
            .then(parsedRes => {
                const placeData = {
                    name: placeName,
                    location,
                    image: parsedRes.imageUrl
                };
                return fetch(
                    `https://place-finder-d3f4b.firebaseio.com/places.json?auth=${token}`,
                    {
                        method: 'POST',
                        body: JSON.stringify(placeData)
                    }
                );
            })
            .catch(err => {
                console.log(err);
                alert('Something went wrong, please try again!');
                dispatch(uiStopLoading());
            })
            .then(res => res.json())
            .then(parsedRes => {
                console.log(parsedRes);
                dispatch(uiStopLoading());
            });
    };
};

export const getPlaces = () => {
    return (dispatch, getState) => {
        const token = getState().auth.token;
        if (!token) {
            return;
        }
        fetch(
            `https://place-finder-d3f4b.firebaseio.com/places.json?auth=${token}`
        )
            .catch(err => {
                alert('An error has occured');
            })
            .then(res => res.json())
            .then(parsedRes => {
                const places = [];
                for (let key in parsedRes) {
                    places.push({
                        ...parsedRes[key],
                        image: { uri: parsedRes[key].image },
                        key
                    });
                }
                dispatch(setPlaces(places));
            });
    };
};

export const setPlaces = places => {
    return {
        type: 'SET_PLACES',
        places
    };
};

export const deletePlace = key => {
    return (dispatch, getState) => {
        dispatch(removePlace(key));
        const token = getState().auth.token;
        if (!token) {
            return;
        }
        fetch(
            `https://place-finder-d3f4b.firebaseio.com/places/${key}.json?auth=${token}`,
            {
                method: 'DELETE'
            }
        )
            .catch(err => {
                alert('An error has occured');
                console.log(err);
            })
            .then(res => res.json())
            .then(parsedRes => {
                console.log('Done!');
            });
    };
};

export const removePlace = key => {
    return {
        type: REMOVE_PLACE,
        key: key
    };
};
