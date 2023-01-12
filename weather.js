#!/usr/bin/env node

import {getArgs}  from './helpers/args.js';
import { getWeather, getIcon} from './services/api.service.js';
import {printHelp, printSucces, printError, printWeather} from './services/log.service.js';
import { getKeyValue, saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';


const saveToken = async(token)=>{
    
    try{
        if(!token.length){
            throw new Error('Не передан token');
        }
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSucces('Token has been saved!');
        
    }
    catch(e){
        printError(e.message);
    }
    
}

const saveCity = async(city)=>{
    try{
        if(!city.length){
            throw new Error('Не передан город');
        }
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        printSucces('City has been saved!');
    }
    catch(e){
        printError(e.message);
    }
    
}

const getForcast = async()=>{
    try{
        const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city)        
        const weather =  await getWeather(city);
          printWeather(weather, getIcon(weather.weather[0].icon));
    }
    catch(e){
        if(e?.response?.status==404){
            printError('Неверно указан город');
        }
        else if(e?.response?.status ==401){
            printError('Неверно указан token');
        }
        else printError(e.message);
    }
}
const initCLI = ()=> {
    const args =  getArgs(process.argv)
    if(args.h) {
        return printHelp();
    }
    if(args.s){
        return saveCity(args.s)
    }
    if(args.t){
    return saveToken(args.t);
    }
    return getForcast( );
}

initCLI();