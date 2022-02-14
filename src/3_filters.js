
const Filters = ({params, setParams, count}) => {

    const Div = styled("div")({
        alignSelf: (isPC ? "flex-start" : "stretch"),
        marginBottom: (isPC? 0: "4em"),

        padding: "0.9em",
        display: "flex",
        flexDirection: "column",
        backgroundColor: pal.bgdark,
        borderRadius: radius,
        boxShadow: "rgba(0, 0, 0, 0.3) 0px 2px 4px, rgba(0, 0, 0, 0.225) 0px 7px 13px -3px, rgba(0, 0, 0, 0.15) 0px -3px 0px inset",
        userSelect: "none",
    });

    const setUntil = (x) => setParams({ ...params, until: x });
    const setSince = (x) => setParams({ ...params, since: x });
    const dateOrderCheck = (
        params.until !== null &&
        params.since !== null &&
        params.until < params.since
    );

    return (
        <div style={{
            height: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
        }}>
            <Div>
                <SearchBox
                    value={ params.search }
                    func={ x => setParams({...params, search: x })}
                />
                <CheckboxStyled
                    label={["Albums", <b>Albums</b>]}
                    checked={params.albums}
                    onChange={() => setParams({ ...params, albums: !params.albums })}
                    tabIndex={1}
                />
                <CheckboxStyled
                    label={["Singles", <b>Singles</b>]}
                    checked={params.singles}
                    onChange={() => setParams({ ...params, singles: !params.singles })}
                />
                <CheckboxStyled
                    label={["Compilations", <b>Compilations</b>]}
                    checked={params.compilations}
                    onChange={() => setParams({ ...params, compilations: !params.compilations })}
                />
                <DividingBar />
                <Tooltip title="Show releases that the artist(s) you follow is in but not credited as the main album artist"><div>
                    <CheckboxStyled
                        label={['Show "Appears On"',<p>Show <b>"Appears On"</b></p>]}
                        checked={params.appearsOn}
                        onChange={() => setParams({ ...params, appearsOn: !params.appearsOn })}
                    />
                </div></Tooltip>
                <DividingBar />
                <DPLabel style={{ marginTop:"0.3em" }}>until</DPLabel>
                <DatePicker
                    type="until"
                    value={params.until}
                    func={setUntil}
                    error={dateOrderCheck}
                />
                <DPLabel>since</DPLabel>
                <DatePicker
                    type="since"
                    value={params.since}
                    func={setSince}
                    error={dateOrderCheck}
                />
                <Typography style={{
                    color: `${pal.spotify.green}`,
                    margin: "1.7em  0  0.2em  0",
                    textAlign: "right",
                }}>
                    {count.filtered} / {count.total} items
                </Typography>
            </Div>
            { isPC && <MadeBy /> }
        </div>
    );
};


const SearchBox = ({ value, func }) => {

    const [query, setQuery] = React.useState(value);

    return (
        <TextField
            fullwidth
            variant="outlined"
            color="secondary"
            label={<i class="fas fa-search" />}
            style={{ marginBottom: "1em" }}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => (e.keyCode===13 && func(query))}
            onBlur={() => func(query)}
            value={query}
        />
    );
}


const CheckboxStyled = (props) => {
    return (
        <FormControlLabel
            label={props.checked? props.label[1]: props.label[0]}
            style={{
                color: pal.txtmain,
                height: "2.4em",
                margin: "0",
            }}
            control={<Checkbox
                color="primary"
                checked={props.checked}
                onChange={props.onChange}
            />}
        />
    );
}


const DPLabel = styled(Typography)(({ theme }) => ({
    marginTop: "0.8em",
    marginBottom: "0.6em",
    marginLeft: "0.2em",
    color: pal.txtdark,
}));


const DividingBar = () => {
    return (
        <hr width="100%"
            noshade
            style={{
                margin: "1em 0",
                height: "2px",
                backgroundColor: "rgba(255,255,255,0.2)",
                border: "none",
            }}
        />
    )
}

const MadeBy = () => {
    const Typo = styled(Typography)(({ theme }) => ({
        margin: 0,
        textAlign: "right",
        color: pal.lightgray,
        fontWeight: "bold",
        transition: "0.3s",
        "&:hover": { color: pal.yellow },
    }));
    return (
        <a
            href="https://twitter.com/good_boy_iboibo"
            target="_blank"
            rel="noopener noreferrer"
            style={{
                textDecoration: "none",
                margin: (isPC? "2em 0 3.85em 0": "0 0 4em 0"),
            }}
        >
            <Typo>
                Made by @<u>good_boy_iboibo</u>
            </Typo>
        </a>
    );
};
