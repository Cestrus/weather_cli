export const getArgs = (procArgs) => {
    const args = {};
    procArgs.slice(2).forEach((value, index, array) => {
        if (value.charAt(0) === "-") {
            if (array[index + 1] && array[index + 1].charAt(0) !== "-") {
                args[value.slice(1)] = array[index + 1];
            } else {
                args[value.slice(1)] = true;
            }
        }
    });
    return args;
};
