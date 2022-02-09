
const check_token = () => {

    console.log("check_token() is called");

    const endpoint = "https://api.spotify.com/v1/me";
    const header = {
        "Authorization": `Bearer ${localStorage.getItem("STLToken")}`,
    };

    fetch(endpoint, {
        method: "GET",
        headers: header,
    })
    .then(res => {
        if (res.ok)
            return res.json();
        else if (res.status == 429)
            retry(() => check_token());
        else
            get_token("refresh");
    })
    .then(json => {
        localStorage.setItem("STLUserCountry", json.country);
        launch();
    });
};