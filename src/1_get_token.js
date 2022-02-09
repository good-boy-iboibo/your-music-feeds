
const get_token = (arg = "") => {
    console.log(`get_token("${arg}") is called`)
    const mode = Boolean(arg != "refresh");
    // mode -> true  : get token
    // mode -> false : refresh token


    if (!mode && localStorage.getItem("STLRefToken") == "") {
        return auth();
    }


    const endpoint = "https://accounts.spotify.com/api/token";
    const header = {
        "Authorization": "Basic " + btoa(client_id + ":" + client_secret),
        "Content-Type": "application/x-www-form-urlencoded",
    };
    const body = new URLSearchParams(
        mode ? {
            "grant_type": "authorization_code",
            "code": localStorage.getItem("STLCode"),
            "redirect_uri": redirect,
        } : {
            "grant_type": "refresh_token",
            "refresh_token": localStorage.getItem("STLRefToken"),
        }
    );


    fetch(endpoint, {
        method: "POST",
        headers: header,
        body: body,
    })
    .then(res => {
        if (res.ok)
            return res.json();
        else if (res.status == 429)
            retry(mode ? get_token : () => get_token("refresh"));
        else {
            if (mode)
                auth(`Couldn't get access token.\nPlease login again.\n(error code ${res.status})`);
            else
                get_token();
        }
        return Promise.reject();
    })
    .then(async res_json => {
        localStorage.setItem("STLToken", res_json.access_token);
        localStorage.setItem("STLRefToken", res_json.refresh_token);
        const expTime = Date.now() + (Number(res_json.expires_in) - 10) * 1000;
        localStorage.setItem("STLExp", expTime);
    })
    .then(() => {
        mode || localStorage.setItem("STLRefToken", "");
        check_token();
    })
}