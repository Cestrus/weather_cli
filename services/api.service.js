import { promises } from "fs";
import axios from "axios";
import { getKeyValue } from "./storage.service.js";

export const getWeather = async () => {
    const token = await getKeyValue("token");
    const city = await getKeyValue("city");
    if (!token || !city) {
        throw new Error(
            "You did not set city or token please set it and try again!"
        );
    }
    const { data } = await axios(
        "https://api.openweathermap.org/data/2.5/weather",
        {
            params: {
                q: city,
                appid: token,
                lang: "ru",
                units: "metric",
            },
        }
        // "https://openweathermap.org/img/wn/10d@2x.png"
    );
    // console.log(data);
    return data;
};
