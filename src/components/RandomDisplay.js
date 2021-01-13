import React from 'react';
import {Link} from 'react-router-dom';
import './../css/RandomDisplay.css';

const CurrencyPair = ({base,rate,currency}) => (
    <div className="font-weight-bold col-lg-3 col-md-4 col-12 col-sm-6">
        <Link className="card currency-card shadow  align-items-center p-3 mb-3" to={`/base/${base}`} >
            <div className={`currency-flag-${base.toLowerCase()} currency-flag  currency-flag-xl  border border-dark`}>
            </div> 
            <div className="my-2">
                1 {base} 
            </div>
            <div className="my-2">
                {rate.toFixed(5)} {currency}
            </div>
            <div className={`currency-flag-${currency.toLowerCase()} currency-flag currency-flag-xl  border border-dark `}>
            </div> 
        </Link>
    </div>
)
const Randomdisplay = ({currencies}) => {

    currencies = currencies.map(currency => {
        const {rate,symbol,base} = currency;
        return (
            <CurrencyPair 
            rate={rate} 
            currency={symbol} 
            key={symbol} 
            base={base} 
            />
        )
    });
  
    return (
        <React.Fragment>
            <div className="my-5 random-display p-3 animate__animated animate__fadeIn">
                <div className="row">
                    {currencies} 
                </div>
            </div>
        </React.Fragment>
        
    );
}

export default Randomdisplay;