
const Cards = ({ items, state }) => {

    const targetItems = () => {
        const per = Number(localStorage.getItem("STLPerpage"));
        const cur = state.curPage;
        const r = [];
        for (let i = per*(cur-1); i < Math.min(per*cur,items.length); i++)
            r.push(i);
        return r;
    };

    return (
        <React.Fragment>
            {targetItems().map(
                e => <CardItem item={items[e]} key={items[e].id} />
            )}
        </React.Fragment>
    );
};




const CardItem = ({ item }) => {

    const [embedOpen, setEmbedOpen] = React.useState(false);

    const marginsInCard = "0.9em";

    const Div = styled("div")({
        width: "100%",
        marginBottom: "1em",

        backgroundColor: pal.bglight,
        borderRadius: radius,
        boxShadow: "rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px",

        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

        ".txtmain": {
            color: pal.txtmain,
            transition: "0.3s"
        },
        ".txtdark": {
            color: pal.txtdark,
            transition: "0.3s"
        },
        "i": {
            color: pal.spotify.green,
        },

        transition: "0.3s",
        "&:hover": {
            backgroundColor: pal.bgyellow,
            ".txtmain,.txtdark": { color: pal.spotify.black },
            "i": {
                color: pal.darkgreen,
                "&:hover": {
                    color: pal.spotify.black,
                },
            },
        },
    });


    const ArtworkSize = "4em";
    const Artwork = styled("img")({
        height: ArtworkSize,
        width: ArtworkSize,
        margin: marginsInCard,
        borderRadius: "0.15em",
        boxShadow: `rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px`,
        userSelect: "none",
    });


    const artistsString = () => {
        let r = "";
        item.artists.map(e => r += `${e} · `);
        return r.slice(0, -3);
    };
    const Names = () => {
        const Div = styled("div")({
            flexGrow: 1,
            margin: `${marginsInCard} ${marginsInCard} ${marginsInCard} 0`,
        });
        const Artist = styled(Typography)(({ theme }) => ({
            fontWeight: "bold",
            overflowWrap: "anywhere",
        }));
        const Title = styled(Artist)({
            fontSize: "94%",
            fontWeight: "normal",
        });
        return (
            <Div>
                <Artist className="txtmain">{artistsString()}</Artist>
                <Title className="txtdark">{item.title}</Title>
            </Div>
        );
    };


    const dateString = () => {
        const dd = new Date(item.date);
        const y = dd.getUTCFullYear();
        const m = dd.getUTCMonth()+1;
        const d = dd.getUTCDate();
        return `${y}-${m<10? "0"+m: m}-${d<10? "0"+d: d}`
    }
    const typeString = () => {
        if (item.type === 0) return "Album"
        if (item.type === 1) return "Single"
        if (item.type === 2) return "Compilation"
    }
    const DateLink = () => {
        const Wrap = styled("div")({
            flexShrink: 0,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
        });
        const DateText = styled(Typography)(({ theme }) => ({
            fontSize: "92%",
            marginRight: marginsInCard,
        }));
        const LinkIcon = styled("i")({
            fontSize: "125%",
            transition: "0.3s",
            "&:hover": {
                fontSize: "168%",
            },
        });
        const IconWrapper = styled("div")({
            width: "1.6em",
            textAlign: "center",
            marginRight: marginsInCard,
        });

        return (
            <Wrap>
                <DateText className="txtdark">
                    {typeString()}<br/>
                    {dateString()}
                </DateText>

                <Tooltip title="Open in Spotify">
                    <IconWrapper>
                        <a
                            href={`spotify:album:${item.id}`}
                            onClick={e => e.stopPropagation()}
                            >
                            {/* <LinkIcon className="fab fa-spotify" /> */}
                            <LinkIcon className="fas fa-play-circle" />
                        </a>
                    </IconWrapper>
                </Tooltip>

                <Tooltip title="Open in new tab">
                    <IconWrapper>
                        <a
                            href={item.url()}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            >
                            <LinkIcon className="fas fa-external-link-alt" />
                        </a>
                    </IconWrapper>
                </Tooltip>
            </Wrap>
        );
    };

    const ModalBox = styled("div")({
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "&:focus": {
            outline:"none",
        },
    });

    return (
        <React.Fragment>
            <Div onClick={() => {
                if (window.getSelection().isCollapsed)
                    setEmbedOpen(true)
            }}>
                <Artwork
                    src={item.imgURL}
                    />
                <Names />
                <DateLink />
            </Div>
            <Modal
                open={embedOpen}
                onClose={() => setEmbedOpen(false)}
                style={{ border:"none" }}
                >
                <ModalBox onClick={() => setEmbedOpen(false)}>
                    <Spinner />
                    <div style={{
                        width: "100%",
                        padding: "0 3.4em",
                        maxWidth: "530px",
                    }}>
                        <iframe
                            src={`https://open.spotify.com/embed/album/${item.id}`}
                            width="100%"
                            height="360"
                            frameBorder="0"
                            style={{
                                borderRadius: radius,
                                position: "relative",
                                zIndex: 2,
                            }}
                            allow="encrypted-media"
                            >
                        </iframe>
                    </div>
                </ModalBox>
            </Modal>
        </React.Fragment>
    );
};
