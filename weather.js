#!usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { getWeather } from "./services/api.service.js";
import {
    printHelp,
    printSuccess,
    printError,
    printWeather,
} from "./services/log.service.js";
import { setKeyValue } from "./services/storage.service.js";

const saveKey = async (key, value) => {
    if (key && (typeof value !== "string" || value.trim().length === 0)) {
        if (key === "token") printError("Token values is not setted!");
        if (key === "city") printError("City values is not setted!");
        return;
    }
    try {
        await setKeyValue(key, value);
        printSuccess("Value set successfully!");
    } catch (err) {
        printError(err);
    }
};

const getForecast = async () => {
    try {
        const weatherData = await getWeather();
        printWeather(weatherData);
    } catch (err) {
        printError(err?.response?.data.message || err.message);
        return;
    }
};

const initCli = () => {
    const args = getArgs(process.argv);
    if (args.h) {
        printHelp();
        return;
    }
    if (args.c) {
        saveKey("city", args.c);
    }
    if (args.t) {
        saveKey("token", args.t);
    }

    getForecast();
    return;
};

initCli();
