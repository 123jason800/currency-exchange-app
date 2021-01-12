import {Link} from 'react-router-dom';
import './../css/CurrencyRatesTable.css';

const CurrencyRatesButton = ({symbol,rate,openCurrencyConversion,base}) => (
    <div className="col-6 col-md-4 col-lg-2 mb-3">
        <Link className="btn btn-outline-dark px-2 d-block" to={`/base/${symbol}`}>
            <p>{symbol}</p>
            <div className={`currency-flag-${symbol.toLowerCase()} border border-dark currency-flag currency-flag-xl`}></div>
            <p>{rate.toFixed(3)}</p>
        </Link>
        <button onClick={e => openCurrencyConversion(symbol,rate,base)} className="btn btn-outline-dark w-100 mt-3">
            Compare
        </button>
    </div>
);

const CurrencyRatesTable = ({baseCurrencies,filterField,handleChange,openCurrencyConversion,base}) => {

    baseCurrencies = baseCurrencies.filter(currency => currency.symbol.includes(filterField.toUpperCase())).map(currency => {
        const {symbol,rate} = currency;
        return (
                <CurrencyRatesButton 
                symbol={symbol} 
                rate={rate} 
                key={symbol} 
                base={base}
                openCurrencyConversion={openCurrencyConversion} 
                />);
    });

    return (
        <div className="currency-rates-table">
            <div className="filter-currency d-flex justify-content-center mb-3">
                <input onChange={handleChange} type="text" placeholder="Filter Currencies" value={filterField} />
            </div>
            <div className="row">
                {baseCurrencies}
            </div>
        </div>
    );
}


export default CurrencyRatesTable;