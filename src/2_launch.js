
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




const IsGetDataDone = React.createContext(false);

const launch = () => {

    const interval_id = setInterval(() => {
        ReactDOM.render(
            <ThemeProvider theme={theme}>
                <IsGetDataDone.Provider value={false}>
                    <MainScreen />
                </IsGetDataDone.Provider>
            </ThemeProvider>,
            document.getElementById("root"));
    }, 1200);

    get_data()
        .then(() => {
            clearInterval(interval_id);
            ReactDOM.render(
                <ThemeProvider theme={theme}>
                    <IsGetDataDone.Provider value={true}>
                        <MainScreen />
                    </IsGetDataDone.Provider>
                </ThemeProvider>,
                document.getElementById("root"))
        });
};