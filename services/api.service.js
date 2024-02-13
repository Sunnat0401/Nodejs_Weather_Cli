import axios from 'axios'
import { TOKEN_DICTIONARY, getKeyValue } from './storage.service.js'

const getIcon = icon => {
	switch (icon.slice(0, -1)) {
		case '01':
			return '☀️'
		case '02':
			return '🌤️'
		case '03':
			return '☁️'
		case '04':
			return '☁️'
		case '09':
			return '🌧️'
		case '10':
			return '🌦️'
		case '11':
			return '🌩️'
		case '13':
			return '❄️'
		case '50':
			return '🌫️'
	}
}

// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key} eef00a187fcee162fbb3326b89876795

const getWeather = async  city =>{

  const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token)
  if(!token){
    throw new Error("API doesn't exist, -t [API_KEY] for saving token")
  }
  // https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
	const {data} = await axios.get(' https://api.openweathermap.org/data/2.5/weather', {
		params: {
			q: city,
			appid: token,
			lang: 'en',
			units: 'metric',
		},
	})
	return data
}

export {getWeather,getIcon}