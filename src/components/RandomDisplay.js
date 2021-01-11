import React from 'react';
import './../css/RandomDisplay.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp,faArrowDown } from '@fortawesome/free-solid-svg-icons';
import {calculateRate} from './../utils/util';


const CurrencyPair = ({rateYesterday,base,rate,currency}) => (
    <div className="font-weight-bold col-lg-3 col-md-4 col-12 col-sm-6">
        <div className="card currency-card shadow  align-items-center p-3 mb-3">
            <div className={`currency-flag-${base.toLowerCase()} currency-flag  currency-flag-xl  border border-dark`}>
            </div> 
            <div className="my-2">
                1 {base} 
            </div>
            <div className="my-2">
                <span> 
                    {rateYesterday > rate ? 
                    <FontAwesomeIcon 
                    className="mr-2" 
                    size="lg" 
                    icon={faArrowDown} 
                    color="red"
                    />
                    : 
                    <FontAwesomeIcon 
                    className="mr-2" 
                    size="lg" 
                    icon={faArrowUp} 
                    color="green"
                    />}
                </span>
                {calculateRate(rate,rateYesterday)}%
            </div>
            <div className="my-2">
                {rate.toFixed(3)} {currency}
            </div>
            <div className={`currency-flag-${currency.toLowerCase()} currency-flag currency-flag-xl  border border-dark `}>
            </div> 
        </div>
    </div>
)
const Randomdisplay = ({currencies}) => {
    currencies = currencies.map(currency => {
        const {rateYesterday,rate,symbol,base} = currency;
        return (
            <CurrencyPair 
            rateYesterday={rateYesterday} 
            rate={rate} 
            currency={symbol} 
            key={symbol} 
            base={base} 
            />
        )
    });
  
    return (
        <React.Fragment>
            <div className="my-5 random-display p-3">
                <div className="row">
                    {currencies} 
                </div>
            </div>
        </React.Fragment>
    );
}

export default Randomdisplay;