
const auth = (err) => {

    console.log(`auth(${err===undefined?"":`"${err}"`}) is called`);
    const pp = localStorage.getItem("STLPerpage") || 16;
    localStorage.clear();
    localStorage.setItem("STLPerpage", pp);

    const ButtonClick = () => {
        location = request_code();
    };

    const Div = styled("div")({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    });

    ReactDOM.render(
        <ThemeProvider theme={theme}>
            <Div className="vh100">
                <SmallTitle>
                    Your Music Feeds{/* <span style={{ fontSize: "50%" }}>BETA</span>*/}
                </SmallTitle>
                <MsgArea err={err} />
                <BigButton
                    label="Login with Spotify"
                    icon="fab fa-spotify"
                    func={ () => location = request_code() }
                />
            </Div>
            <BGParticles />
        </ThemeProvider>,
        document.getElementById("root")
    );
}

const request_code = () => {
    const endpoint = "https://accounts.spotify.com/authorize?";
    const params = new URLSearchParams({
        client_id: client_id,
        response_type: "code",
        redirect_uri: redirect,
        state: gen_state(),
        scope: scope,
    });
    return endpoint + params.toString();
}

const gen_state = () => {
    const c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let r = "";
    for (let i = 0; i < 40; i++) {
        r += c.charAt(Math.floor(Math.random() * c.length));
    }
    localStorage.setItem("STLState", r);
    return r;
}


const BigButton = (props) => { // props: { label:, icon:, func: }

    const StyledButton = styled(Button)(({ theme }) => ({
        color: pal.spotify.white,
        backgroundColor: pal.darkgreen,
        padding: 20,
        transition: "0.4s",
        "&:hover": {
            color: pal.spotify.black,
            backgroundColor: pal.yellow,
            padding: 23,
            boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
        },
    }));

    const StyledIcon = styled("i")({
        fontSize: "22px",
        margin: "0 11px 1px 0",
    });

    const Div = styled("div")({
        height: "128px",
        display: "flex",
        alignItems: "center",
    });

    return (
        <Div>
            <StyledButton onClick={ props.func } size="large">
                <StyledIcon className={ props.icon } />
                <b>{ props.label }</b>
            </StyledButton>
        </Div>
    );
}


const MsgArea = (props) => {

    const Msg = styled(Typography)(({ theme }) => ({
        color: pal.yellow,
        padding: "32px",
        margin: "0 1.5em",
        maxWidth: "30em",
        borderRadius: radius,
        backgroundColor: pal.bgdark,
        fontSize: "19px",
        fontWeight: "bold",
        whiteSpace: "pre-wrap",
        textAlign: "center",
    }));

    return (
        <Msg>
            On this site, you can check all new songs by artists you follow on Spotify. Please sign in with Spotify to allow this site to check who you're following and your country.<br/>
            {props.err === undefined ||
                <p style={{
                    color: theme.palette.error.main,
                    marginBottom: 0,
                }}>
                    {props.err}
                </p>
            }
        </Msg>
    );
}


const BGParticles = () => {

    const showParticles = () => {
        Particles.init({
            selector: ".particles",
            maxParticles: 96,
            sizeVariations: 7,
            speed: 2,
            color: pal.yellow,
        });
    };
    React.useEffect(showParticles);

    const Canvas = styled("canvas")({
        width: "100%",
        position: "absolute",
        top: 0,
        zIndex: -1,
        backgroundColor: pal.bgmain,
    });

    return (
        <Canvas className="particles vh100" />
    );
}




const SmallTitle = styled(BigTitle)({
    padding: "16px 32px",
    margin: "0.5em",
    borderRadius: radius,
    backgroundColor: pal.bgdark,
    textAlign: "center",
});
