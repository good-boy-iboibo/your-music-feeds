
const MainScreen = () => {

    const BG = styled("div")({
        width: "100%",
        minHeight: "100vh",
        backgroundColor: pal.bgmain,
    });

    const SideLimit = styled("div")({
        maxWidth: "64em",
        margin: "0 auto",
        padding: "0 1.7em",
    });

    return (
        <BG>
            <SideLimit>
                <AppTitle />
                <MainArea />
            </SideLimit>
        </BG>
    );
}


const MainArea = () => {

    const a = new Date();
    const b = new Date(Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())).getTime();
    const c = new Date(Date.UTC(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate())).getTime();

    const [params, setParams] = React.useState({
        search: "",
        albums: true,
        singles: true,
        compilations: true,
        appearsOn: false,
        until: Math.max(b,c),
        since: null,
    });

    const items = get_filtered(params);
    const count = {
        filtered: items.length,
        total: albums_array[0].length + albums_array[1].length + albums_array[2].length,
    }

    const Div = styled("div")({
        display: "flex",
        flexDirection: (isPC? "row": "column-reverse"),
    });

    return (
        <Div>
            <Timeline items={items} />
            <Filters params={params} setParams={setParams} count={count}/>
        </Div>
    );
};


const AppTitle = () => {

    const tweetURL = "https://good-boy-iboibo.github.io/your-music-feeds/"
    const tweetText = "Your Music Feeds"

    const Icon = styled("i")({
        color: pal.gray,
        fontSize: "2.1em",
        marginLeft: "0.8em",
        transition: "0.3s",
    });
    const Twitter = styled(Icon)({
        "&:hover": { color: "hsl(203,100%,68%)" }
    });
    const Logout = styled(Icon)({
        "&:hover": { color: "hsl(17,81%,55%)"}
    });

    const Div = styled("div")({
        padding: "2em 0",
        display: "flex",
        alignItems: "center",
    });


    return (
        <Div>
            <BigTitle>
                Your Music Feeds{/* <span style={{ fontSize: "50%" }}>BETA</span>*/}
            </BigTitle>

            <div style={{ marginLeft: "auto" }}>
                <Tooltip title="Share this app on Twitter" placement="bottom">
                    <a
                        href={`https://twitter.com/share?url=${tweetURL}&text=${tweetText}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Twitter className="fab fa-twitter-square" />
                    </a>
                </Tooltip>
                <Tooltip title="Sign out" placement="bottom">
                    <Logout className="fas fa-sign-out-alt" onClick={()=>auth()}/>
                </Tooltip>
            </div>
        </Div>
    )
}


const BigTitle = styled(Typography)(({ theme }) => ({
    color: pal.yellow,
    fontSize: "2.4em",
    fontWeight: "bold",
    userSelect: "none",
    textShadow: "hsla(0, 0%, 0%, 0.6) 0.10em 0.07em 0.02em",
}));