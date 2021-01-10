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
    const currentHour = parseInt(moment().format("HH"));
    // Account for Stock Open Hours
    if (currentHour >= 5 &&  currentHour <= 16) {
        return moment().subtract(1, 'days').format('YYYY-MM-DD');
    }    
    return moment().subtract(2, 'days').format('YYYY-MM-DD');
    
}

export const calculateRate = (rate,rateYesterday) => {
  

    return Math.abs(((rate-rateYesterday)/rate * 100).toFixed(2));
}

export const calculateCurrency = (baseRate,againstRate) => {
    return parseFloat(baseRate) * parseFloat(againstRate);
}