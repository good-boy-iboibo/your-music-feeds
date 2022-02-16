
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


const launch = () => {

    const Loading = () => {
        const Div = styled("div")({
            position: "fixed",
            width: "200vw",
            height: "200vh",
            top: "50%",
            left: "50%",
            transform: "translateY(-50%) translateX(-50%)",
            zIndex: 9999,

            background: pal.bgloading,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        });
        return <Div><Spinner/></Div>;
    };

    const render = () => {
        ReactDOM.render(
            <ThemeProvider theme={theme}>
                <Loading />
                <MainScreen />
            </ThemeProvider>,
            document.getElementById("root")
        );
    };

    const interval_id = setInterval(() => render(), 1200);

    get_data()
        .then(() => {
            clearInterval(interval_id);
            ReactDOM.render(
                <ThemeProvider theme={theme}>
                    <MainScreen />
                </ThemeProvider>,
                document.getElementById("root")
            )
        });
};
