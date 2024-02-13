import chalk from 'chalk'
import dedent from 'dedent-js';

const printError = error =>{
    console.log(chalk.bgRed("Error")  + ' ' + error);
}

const printSuccess =  message =>{
    console.log(chalk.bgGreen("SUCCESS") + " " + message);
}

const printHelp = () =>{
    console.log(dedent`
 ${chalk.bgCyan("HELP")}
-s [CITY] for install city
-h for help
-t [API_KEY] fro saving token
 ` );
}
const printWeather= (response , icon )=>{
    console.log(dedent`
      ${chalk.bgYellowBright(`Wearher `)} City Weather ${response.name}
      ${icon} ${response.weather[0].description}
      Temprature : ${response.main.temp}  (feels like ${response.main.feels_like})
      Humidity : ${response.main.humidity}%
      Waind speed : ${response.wind.speed}
    `);
}

export  {printError,printSuccess,printHelp,printWeather}

