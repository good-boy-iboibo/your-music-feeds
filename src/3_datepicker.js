
// month arguments of Date ofject's methods is 0-11 !!!!

const DatePicker = ({ type, value, func, error }) => {

    const date = (value === null ? null : new Date(value));

    const year  = (date === null ? 0 : date.getUTCFullYear());
    const month = (date === null ? 0 : date.getUTCMonth()+1);
    const day   = (date === null ? 0 : date.getUTCDate());




    const nowYear = Math.max(
        new Date().getFullYear(),
        new Date().getUTCFullYear()
    );

    let a = new Date().getMonth();
    let b = new Date().getUTCMonth();
    if (a > b) [a, b] = [b, a];
    const nowMonth = (a === 0 && b === 11) ? a : b;

    const isLeap = (year) => {
        return !(year % 4) && !(!(year % 100) && year % 400);
    }
    const maxDay =
        [31, (isLeap(year||nowYear)? 29: 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


    const changeYear = (event) => {
        const x = event.target.value;
        (date === null ?
            (type === "until" ?
                func(Date.UTC(x, 11, 31)) :
                func(Date.UTC(x, 0, 1))
            ) :
            (x === 0 ?
                func(null) :
                (() => {
                    (   month === 2  &&
                        day   === 29 &&
                        !isLeap(x)   &&
                        date.setUTCDate(28)
                    )
                    date.setUTCFullYear(x);
                    func(date.getTime());
                })()
            )
        );
    };

    const changeMonth = (event) => {
        const x = event.target.value;
        (date === null ?
            (type === "until" ?
                func(Date.UTC(nowYear, x-1, maxDay[x-1])) :
                func(Date.UTC(nowYear, x-1, 1))
            ) :
            (x === 0 ?
                func(null) :
                (() => {
                    date.setUTCDate(Math.min(day, maxDay[x-1]));
                    date.setUTCMonth(x-1);
                    func(date.getTime());
                })()
            )
        );
    };

    const changeDay = (event) => {
        let x = event.target.value;
        (date === null ?
            func(Date.UTC(nowYear, nowMonth, Math.min(x, maxDay[nowMonth]))) :
            (x === 0 ?
                func(null) :
                (() => {
                    x = Math.min(x, maxDay[date.getUTCMonth()]);
                    date.setUTCDate(x);
                    func(date.getTime());
                })()
            )
        );
    };




    const Div = styled("div")({
        display: "flex",
        flexDirection: "row",
    });

    const defaultItem = <MenuItem value={0}>-</MenuItem>;


    return (
        <Div>
            <FormControl
                variant="outlined"
                style={{ minWidth: "6em" }}
                error={error}
            >
                <InputLabel id="year">year</InputLabel>
                <Select
                    labelID="year"
                    label="year"
                    value={year}
                    onChange={changeYear}
                >
                    {defaultItem}
                    {iota(nowYear, 1900, "desc").map(
                        e => <MenuItem key={e} value={e}>{e}</MenuItem>
                    )}
                </Select>
            </FormControl>

            <FormControl
                variant="outlined"
                style={{ minWidth: "4em", margin: "0 0.5em" }}
                error={error}
            >
                <InputLabel id="month">month</InputLabel>
                <Select
                    labelID="month"
                    label="month"
                    value={month}
                    onChange={changeMonth}
                >
                    {defaultItem}
                    {iota(1, 12).map(
                        e => <MenuItem key={e} value={e}>{e}</MenuItem>
                    )}
                </Select>
            </FormControl>

            <FormControl
                variant="outlined"
                style={{ minWidth: "4em" }}
                error={error}
            >
                <InputLabel id="day">day</InputLabel>
                <Select
                    labelID="day"
                    label="day"
                    value={day}
                    onChange={changeDay}
                >
                    {defaultItem}
                    {iota(1, 31).map(
                        e => <MenuItem key={e} value={e}>{e}</MenuItem>
                    )}
                </Select>
            </FormControl>

        </Div>
    );
}




const iota = (start, end, type) => {
    let r = [];
    if (type === "desc") {
        for (let i = start; i >= end; i--) r.push(i);
    } else {
        for (let i = start; i <= end; i++) r.push(i);
    }
    return r;
};