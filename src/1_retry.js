
const retry = (arg) => {

    console.log("retry(...) is called");

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
                    {"Too Many Requests (429)\nPlease wait for a while and retry."}
                />
                <BigButton
                    label="Retry"
                    icon="fas fa-redo-alt"
                    func={arg}
                />
            </Div>
            <BGParticles />
        </ThemeProvider>,
        document.getElementById("root")
    );
}