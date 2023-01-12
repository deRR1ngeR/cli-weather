import t from 'chalk';

const {bgRed, bgGreen, bgCyan, bgYellow} = t;

const printError = (error)=> {
    console.log(bgRed(' ERROR ') + ' ' + error);
};

const printSucces = (message) => {
    console.log(bgGreen(' SUCCES ' ) + ' ' + message);
};

const printHelp = ()=> {
    console.log(
        bgCyan(' HELP ') + '\n' + 
        'Без параметров - вывод погоды' + '\n' +
        '-s [CITY] для установки города' + '\n' + 
        '-h для вывода помощи' + '\n' + 
        '-t [API_KEY] для сохранения токена'
    );
}

const printWeather = (res, icon)=> {
    console.log(
        bgYellow(' WEATHER ') + `Погода в городе ${res.name}` + '\n'
        + `${icon}  ${res.weather[0].description}` + '\n'
        + `Температура: ${res.main.temp} (ощущается как ${res.main.feels_like})` + '\n'
        + `Влажность: ${res.main.humidity}%` + '\n'
        + `Скорость ветра: ${res.main.speed}`
    );
};
export {printError, printSucces, printHelp, printWeather};