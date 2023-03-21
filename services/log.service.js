import chalk from "chalk";
import { getIcon } from "../helpers/icons.js";

export const printError = (err) => {
    console.log(chalk.bgRed(" ERROR ") + " " + err);
};

export const printSuccess = (message) => {
    console.log(chalk.bgGreen(" SUCCESS ") + " " + message);
};

export const printHelp = () => {
    console.log(
        `${chalk.bgCyan(" HELP ")} 
        Без параметров - вывод погоды
        -h             - вывод помощи
        -с [CITY]      - задать город
        -t [API_KEY]   - задать токен        
    `
    );
};

export const printWeather = (weatherData) => {
    const {
        name: city,
        main: { temp, feels_like },
        weather: [{ description, icon }],
        wind: { speed: windSpeed },
    } = weatherData;

    console.log(
        `${chalk.blueBright(" ПОГОДА ")}${city}
        ${getIcon(icon)} ${description}
        ${temp}C, ощущается как ${feels_like}C
        скорость ветра ${windSpeed} м/с
    `
    );
};
