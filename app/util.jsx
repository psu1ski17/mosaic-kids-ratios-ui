//TODO make this more efficient
let replaceAll = (string, find, replace) => {
    let working = string;
    while (working.indexOf(find) !== -1) {
        working = working.replace(find, replace);
    }
    return working;
};

export let getTimezoneParts = (code) => {
    let santizedCode = replaceAll(code, "_", " ");
    let parts = santizedCode.split("/");
    return parts;
};

