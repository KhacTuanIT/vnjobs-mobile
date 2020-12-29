export function callLoginAPI(endpoint, method = "GET", body, callbacks) {
    const header = {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
    return fetch(endpoint, method, header, body)
    .then((response) => {
        if (response.status == 200) {
            navigation.navigate('Home', { userObject: response.json })
        } else {
            callbacks
        }
    })
    .catch((error) => {
        callbacks
    });
}