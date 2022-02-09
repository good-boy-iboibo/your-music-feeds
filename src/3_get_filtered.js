

const get_filtered = (params) => {

    console.log("get_filtered() is called");
    const start_time = Date.now();

    let r = [];

    const filter_push = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            if (!params.appearsOn &&
                !arr[i].followingIDs.length)
                continue;
            if (params.until !== null &&
                arr[i].date > params.until)
                continue;
            if (params.since !== null &&
                arr[i].date < params.since)
                continue;
            r.push(arr[i]);
        }
    };

    params.albums       && filter_push(albums_array[0]);
    params.singles      && filter_push(albums_array[1]);
    params.compilations && filter_push(albums_array[2]);

    r.sort((a, b) => {
        return b.date - a.date;
    });

    if (params.search == "") {
        console.log(`${Date.now()-start_time}ms`);
        return r;
    }

    const fuse = new Fuse(r, {
        shouldSort: false,
        ignoreLocation: true,
        threshold: 0.25,
        useExtendedSearch: true,
        keys: [
            "title",
            "artists",
        ]
    });
    console.log(`${Date.now()-start_time}ms`);
    const formatArr = [];
    fuse.search(params.search).map((e) => formatArr.push(e.item));
    return formatArr;
};