import { homedir } from "node:os";
import { join } from "node:path";
import { promises } from "node:fs";

const filePath = join(homedir(), "weather-data.json");

const isExistPath = async (path) => {
    try {
        await promises.stat(path);
        return true;
    } catch (err) {
        return false;
    }
};

export const readFile = async () => {
    const file = await promises.readFile(filePath);
    return JSON.parse(file);
};

export const setKeyValue = async (key, value) => {
    let fileData = {};

    if (await isExistPath(filePath)) {
        fileData = await readFile();
    }
    fileData[key] = value;
    const result = await promises.writeFile(filePath, JSON.stringify(fileData));
    return result;
};

export const getKeyValue = async (key) => {
    if (await isExistPath(filePath)) {
        const fileData = await readFile();
        return fileData[key];
    }
    return;
};
