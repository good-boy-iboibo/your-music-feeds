
const redirect = "https://good-boy-iboibo.github.io/your-music-feeds/";
// const redirect = "http://127.0.0.1:5500/"
const client_id = "12803c2e0ae54cef8b217bfa8e7f9604";
const client_secret = "0e86c3318f9a498c8d849b5da344986f";
const scope = "user-follow-read user-read-private";

/* localStorage: {
    STLCode: (authorization code)
    STLToken: (access token)
    STLExp: (expiration time of access token)
    STLRefToken: (refresh token)
} */

let isPC = true;
(() => {
    if (screen.width < 870) {
        isPC = false;
        document
            .getElementById("viewport")
            .setAttribute("content", `width=${Math.max(screen.width, 520)}`);
    }
    if (window.innerWidth < 870) {
        isPC = false;
    }
})();


Promise.resolve()

// check if localStorage is available
.then(() => {

    function storageAvailable(type) {
        var storage;
        try {
            storage = window[type];
            var x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch (e) {
            return e instanceof DOMException && (
                e.code === 22 ||
                e.code === 1014 ||
                e.name === 'QuotaExceededError' ||
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                (storage && storage.length !== 0);
        }
    }
    return (
        storageAvailable("localStorage") ?
            Promise.resolve() :
            unavailable()
    );
})


// check url and get auth code
.then(async () => {
    const params = new URLSearchParams(location.search);
    if (params.has("code") &&
        params.get("state") == localStorage.getItem("STLState")) {
        localStorage.setItem("STLCode", params.get("code"));
    }
})


// jump
.then(() => {
    // is there access token?
    localStorage.getItem("STLToken") ?

        (   // isn't token expired?
            (Date.now() < localStorage.getItem("STLExp")) ?
            check_token() :
            get_token("refresh")
        ) :
        (   // is there auth code?
            localStorage.getItem("STLCode") ?
            get_token() :
            auth()
        )
});
