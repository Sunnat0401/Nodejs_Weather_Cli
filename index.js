import getArgs from './helpers/args.js'
import {printError, printSuccess,printHelp, printWeather} from './services/log.service.js'
import { TOKEN_DICTIONARY, getKeyValue, saveKeyValue } from './services/storage.service.js';
import {getIcon, getWeather } from './services/api.service.js'
//  bu holat import xossasini yangi moduli hisoblanadi 
// require orniga import ishlatiladi pacjsondagi type: module strukturags o'zgartirladi

// const getArgs = require("./helpers/args")
//   const {printError, printSuccess} =  require('./services/log.service')

const saveToken =async (token) =>{
 if(!token.length){
    printError(" Token Doesn't exist")
    return 
 } 
   try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token)
        printSuccess("Token was saved ")
    } catch (error) {
                printError(error.message)
    }
}
const saveCity =async (city) =>{
  if(!city.length){
     printError(" City Doesn't exist")
     return 
  } 
    try {
         await saveKeyValue(TOKEN_DICTIONARY.city, city)
         printSuccess("City was saved ")
     } catch (error) {
                 printError(error.message)
     }
 }
const getForcast = async()=>{
  try {
    const city = process.env.CITY ??(await getKeyValue(TOKEN_DICTIONARY.city))
    const response = await  getWeather(city)
        printWeather(response, getIcon(response.weather[0].icon))
  } catch (error) {
    if(error?.response?.status ==404){
      printError("City not fount")
    } else if (error?.response?.status == 401){
      printError("Token invalid tokken")
    }else{
      printError(error.message)
    }
  }
} 

const startCli =()=>{
    const args = getArgs(process.argv)
   if(args.h){
    // help
    return  printHelp()
   }
   if(args.s){
    // save city
    return saveCity(args.s)
   }
  if(args.t){
 return    saveToken( args.t)
    // save  tokken
    // result ko'rsatishimiz kerak bo'ladi
  }
  return getForcast()
}
startCli()