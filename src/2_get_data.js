
window.followings_map = new Map();
//  [id, name]
window.albumIDset = new Set();

window.albums_array = [[], [], []];
/*
albums_array: [
    0: [ albums (class Album) ],
    1: [ singles (class Album) ],
    2: [ compilations (class Album) ],
]
*/

class Album {
    /*
    create a instance with

        await Album.create(props)
        props: {
            id: "",
            date: Number (Date.getTime()),
            title: "",
            artists: [""],
            artistIDs: [""],
            type: Number (0:"album", 1:"single", 2:"compilation"),
            imgURL: "",
        }
*/
    constructor(props) {
        this.id = props.id;
        this.date = props.date.getTime();
        this.title = props.title;
        this.artists = props.artists;
        this.artistIDs = props.artistIDs;
        this.type = props.type;
        this.imgURL = props.imgURL;

        this.followingIDs = [];
        this.artistIDs.forEach((id) => {
            if (followings_map.has(id))
                this.followingIDs.push(id);
        });
    }
    async get_additional_info() {
        const res = await request_data("https://api.spotify.com/v1/albums/" + this.id)
            .catch (e => catch_error(e));
        this.popularity = res.popularity;
        res.artists.forEach((obj) => {
            if (followings_map.has(obj.id))
                this.followingIDs.push(obj.id);
        });
        return;
    }
    static async create (props) {
        const r = new Album(props);
        //await r.get_additional_info(); // slow!
        return r;
    }

    url() {
        return "https://open.spotify.com/album/" + this.id;
    }
}




const get_data = async () => {
    console.log("get_data() is called");
    await get_followings();

    { // faster
        const que = [];
        followings_map.forEach((value, key) => {
            que.push(get_artist_albums(key));
        });
        await Promise.all(que);
    }

    // { // slower but safe
    //     for (let id of followings_map.keys()) {
    //         await get_artist_albums(id);
    //     }
    // }

    console.log("get_data() is done");
    return;
};




const get_followings = async () => {

    const endpoint = "https://api.spotify.com/v1/me/following?";
    let params = new URLSearchParams({
        type: "artist",
        limit: 50,
    });
    let done_count = 0;
    let total = 99999999;

    while (done_count < total) {

        const res = await request_data(endpoint + params.toString())
        .catch(e => catch_error(e));
        if (done_count == 0) total = res.artists.total;
        done_count += 50;

        for (const obj of res.artists.items) {
            followings_map.set(obj.id, obj.name);
        }
        params.set("after", res.artists.cursors.after)
    }
    return;
};




const get_artist_albums = async (id) => {

    let done_count = 0;
    let total = 99999999;

    const endpoint = `https://api.spotify.com/v1/artists/${id}/albums?`;
    let params = new URLSearchParams({
        limit: 50,
        offset: 0,
        market: localStorage.getItem("STLUserCountry"),
    });

    while (done_count < total) {

        const res = await request_data(endpoint + params.toString())
        .catch(e => catch_error(e));
        if (done_count == 0) total = res.total;
        done_count += 50;

        params.set("offset", done_count);

        for (const obj of res.items) {
            if (albumIDset.has(obj.id)) continue;
            albumIDset.add(obj.id);

            let artists = [];
            let artistIDs = [];
            obj.artists.forEach(val => {
                artists.push(val.name);
                artistIDs.push(val.id);
            });

            const type = (obj.album_type == "album" ? 0 :
            (obj.album_type == "single" ? 1 : 2));

            albums_array[type].push(
                await Album.create({
                    id: obj.id,
                    date: new Date(obj.release_date),
                    title: obj.name,
                    artists: artists,
                    artistIDs: artistIDs,
                    type: type,
                    imgURL: obj.images.length == 0 ?
                        "" :
                        obj.images[Math.min(1,obj.images.length-1)].url,
                })
            );
        }
    }
    return;
};




const request_data = async (url) => { // return value is Promise<Response>

    const header = {
        "Authorization": `Bearer ${localStorage.getItem("STLToken")}`,
        "Accept-Language": "en-US"
    };
    while (true) {
        const res = await fetch(url, { headers: header })
        .catch(e => catch_error(e));
        if (res.ok) return res.json();
        else if (res.status != 429) return Promise.reject(res.status);
        else {
            const sleep_time = res.headers.has("Retry-After") ?
                Number(res.headers.get("Retry-After")) * 1000 + 1000 :
                1000;
            await new Promise(resolve => setTimeout(resolve, sleep_time)); // sleep
        }
    }
};




// motto nanika yaranakya
const catch_error = (e) => {
    console.log(`error: ${e}`)
};
