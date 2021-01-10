import moment from 'moment';


export const handleRes = response => {


    if (!Array.isArray(response)) {
        if (response.ok) {
            return response.json();
        }
        throw Error('404 or 500 error');
    }

    else {
        if (response.every(response => response.ok !== true)) {
            throw Error('404 or 500 error');
        }
        
        return Promise.all(response.map(response => response.json()));
    }

}



export const getPreviousDate = () => {
    const intTime = moment().utc();
    const currentHour = parseInt(intTime.format("HH"));
   
    // Account for Stock Open Hours in UTC time
    
    console.log(intTime.subtract(1, 'days').format('YYYY-MM-DD'));
    console.log(intTime.subtract(2, 'days').format('YYYY-MM-DD'));
    if (currentHour >= 7 &&  currentHour <= 16) {
        const currentMinutes =  parseInt(intTime.format("mm"));
        if (currentMinutes >= 30) {
            return intTime.subtract(1, 'days').format('YYYY-MM-DD');
        }
    }    
    return intTime.subtract(2, 'days').format('YYYY-MM-DD');


    
}

export const calculateRate = (rate,rateYesterday) => {
  

    return Math.abs(((rate-rateYesterday)/rate * 100).toFixed(2));
}

export const calculateCurrency = (baseRate,againstRate) => {
    return parseFloat(baseRate) * parseFloat(againstRate);
}