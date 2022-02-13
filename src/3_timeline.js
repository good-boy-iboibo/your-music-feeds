
const Timeline = ({ items }) => {

    const x = Number(localStorage.getItem("STLPerpage"));
    const [state, setState] = React.useState({
        totalItem: items.length,
        totalPage: Math.floor((items.length + x-1) / x),
        curPage: 1,
    })

    const Div = styled("div")({
        flexGrow: 1,
        marginRight: (isPC? "1em": 0),

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    });

    return (
        <Div>
            <PageNav
                state={state}
                setState={setState}
            />
            <Cards
                items={items}
                state={state}
            />
            <Pagination
                color="secondary"
                count={state.totalPage}
                page={state.curPage}
                onChange={(e, v) => {
                    if (isPC)
                        scrollTo(0, 0);
                    else {
                        document.getElementById("scrollTarget").scrollIntoView(true);
                        scrollBy(0, -40);
                    }
                    setState({ ...state, curPage: v });
                }}
                style={{ padding: "1em 0 4em 0" }}
            />
            { isPC || <MadeBy /> }
        </Div>
    );
};


const PageNav = ({ state, setState }) => {

    const changePerpage = (event) => {
        const x = event.target.value;
        localStorage.setItem("STLPerpage", x);
        setState({
            totalItem: state.totalItem,
            totalPage: Math.floor((state.totalItem + x-1) / x),
            curPage: 1,
        });
    };

    const Div = styled("div")({
        width: "100%",
        marginBottom: "1em",

        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    });

    const perpageArr = [8, 16, 32, 64, 128];

    return (
        <Div id="scrollTarget">
            <Tooltip title="Items per page">
                <FormControl
                    variant="outlined"
                    size="small"
                    style={{ minWidth: "5em" }}
                >
                    <Select value={localStorage.getItem("STLPerpage")} onChange={changePerpage}>
                        {perpageArr.map(
                            e => <MenuItem key={e} value={e}>{e}</MenuItem>
                            )}
                    </Select>
                </FormControl>
            </Tooltip>

            <Pagination
                color="secondary"
                count={state.totalPage}
                page={state.curPage}
                onChange={(e,v) => setState({...state, curPage: v})}
            />
        </Div>
    )
};