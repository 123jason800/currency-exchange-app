import './../css/CurrencyConversion.css';
import {customStyles,buttonStyles} from '../utils/styles';
import CurrencyGraph from './CurrencyGraph';
import Loader from './Loader';
import Modal from 'react-modal';

const Baseinput = props => {
    const {
        base, 
        isModalOpen,
        handleChange, 
        compareCurrency ,
        closeCurrencyConversion, 
        baseCurrencyInputField, 
        compareCurrencyInputField, 
        graphData,
        onGraphChange,
        loaded} = props;

    return(
    <Modal 
    isOpen={isModalOpen}     
    style={customStyles}
    > 
        <div className="currency-conversion mt-3">
            <h2 className="text-center">Currency Conversion</h2>
                <div className="row justify-content-center"> 
                    <div className="d-flex col-12 col-md-4 align-items-center flex-column">
                        <h3>{base}</h3>
                        <div className={`currency-flag-${base.toLowerCase()} my-3 border border-dark currency-flag currency-flag-xl`}>
                        </div>
                        <input 
                        type="number" 
                        onChange={e => handleChange(e,'base',compareCurrency.rate)} 
                        value={baseCurrencyInputField} 
                        />
                    </div>
                    <div className="d-flex align-items-center col-12 col-md-4 flex-column">
                        <h3>{compareCurrency.symbol}</h3>
                        <div className={`currency-flag-${compareCurrency.symbol.toLowerCase()} my-3 border border-dark currency-flag currency-flag-xl`}>
                        </div>
                        <input 
                        type="number" 
                        onChange={e => handleChange(e,'compare',1/compareCurrency.rate)}
                        value={compareCurrencyInputField}
                        />
                    </div>
                </div>
        </div>
        <div className="btn-group my-2" role="group" aria-label="Basic example">
            <button type="button" onClick={e => onGraphChange(365,base,compareCurrency.symbol)} className="btn mr-2 btn-outline-dark btn-sm">1 Year</button>
            <button type="button" onClick={e => onGraphChange(90,base,compareCurrency.symbol)} className="btn mr-2 btn-outline-dark btn-sm">3 Months</button>
            <button type="button" onClick={e => onGraphChange(30,base,compareCurrency.symbol)} className="btn mr-2 btn-outline-dark btn-sm">1 Month</button>
        </div>
        {!loaded?<Loader size="small" />:<CurrencyGraph graphData={graphData} symbol={compareCurrency.symbol} base={base} />}
        <button 
        onClick={closeCurrencyConversion} 
        hidden={!isModalOpen} 
        style={buttonStyles} 
        className="btn btn-outline-dark"
        >
        Close
        </button>     
    </Modal>)
};


export default Baseinput;