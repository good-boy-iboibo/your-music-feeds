
const Spinner = () => {
    return (
        <div className="sk-circle">
            <div className="sk-circle1 sk-child"></div>
            <div className="sk-circle2 sk-child"></div>
            <div className="sk-circle3 sk-child"></div>
            <div className="sk-circle4 sk-child"></div>
            <div className="sk-circle5 sk-child"></div>
            <div className="sk-circle6 sk-child"></div>
            <div className="sk-circle7 sk-child"></div>
            <div className="sk-circle8 sk-child"></div>
            <div className="sk-circle9 sk-child"></div>
            <div className="sk-circle10 sk-child"></div>
            <div className="sk-circle11 sk-child"></div>
            <div className="sk-circle12 sk-child"></div>
        </div>
    );
};




const launch = async () => {

    const Div = styled("div")({
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: pal.bgmain,
    });

    ReactDOM.render(
        <Div>
            <Spinner />
        </Div>,
        document.getElementById("root")
    );

    get_data()
        .then(() =>
            ReactDOM.render(
                <ThemeProvider theme={theme}>
                    <MainScreen/>
                </ThemeProvider>,
            document.getElementById("root")
            )
        );
};