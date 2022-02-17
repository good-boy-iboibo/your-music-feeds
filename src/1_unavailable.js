
const unavailable = () => {

    console.log("unavailable() is called");
    localStorage.clear();

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
                <MsgArea err=
                    {"Your browser isn't supported\n(can't use localStorage)"}
                />
            </Div>
            <BGParticles />
        </ThemeProvider>,
        document.getElementById("root")
    );
}