import moment from 'moment';
import {sample} from 'underscore';

export const handleRes = response => {
    if (!Array.isArray(response)) {
        if (response.ok) {
            return response.json();
        }
        throw new Error('404 or 500 error');
    }

    else {
        if (response.every(response => response.ok !== true)) {
            throw new Error('404 or 500 error');
        }
        
        return Promise.all(response.map(response => response.json()));
    }

}

export const getPreviousDate = () => {
    const intTime = moment().utc();
    const currentHour = parseInt(intTime.format("HH"));
    // Account for Stock Open Hours in UTC time
    if (currentHour >= 7 &&  currentHour <= 16) {
        const currentMinutes =  parseInt(intTime.format("mm"));
        if (currentMinutes >= 30) {
            return intTime.subtract(1, 'days').format('YYYY-MM-DD');
        }
    }    
    return intTime.subtract(2, 'days').format('YYYY-MM-DD');
}

export const calculateRate = (rate,rateYesterday) => Math.abs(((rate-rateYesterday)/rate * 100).toFixed(2));

export const calculateCurrency = (baseRate,againstRate) => parseFloat(baseRate) * parseFloat(againstRate);

// Get Date from current date - days 
export const getDateSubtracted = days => {
    const intTime = moment().utc();
    return intTime.subtract(days, 'days').format('YYYY-MM-DD');
}

export const getcurrentDate = () => moment().utc().format('YYYY-MM-DD');

export const getDataXY = data => {
    const arr = [];

    for (let date in data) {
        const tempObj = {};
        let tempDate = date.split("-");
        const newTime = new Date(tempDate[0],tempDate[1] - 1,tempDate[2]);
        tempObj['x'] = newTime.getTime();
        tempObj['y'] = Object.values(data[date])[0];
        arr.push(tempObj);
    }

    return arr;
}

export const getRandomCurrency = symbols => {
   
    return sample(symbols,1).join('');
}