import './../css/CurrencyConversion.css';
import {customStyles,buttonStyles} from '../utils/styles';
import Modal from 'react-modal';

const Baseinput = ({base, isModalOpen, handleChange, compareCurrency ,closeCurrencyConversion, baseCurrencyInputField, compareCurrencyInputField}) => (
    <Modal 
    isOpen={isModalOpen}     
    style={customStyles}
    >  
        <div className="currency-conversion mt-3">
            <h2 className="text-center">Currency Conversion</h2>
                <div className="row justify-content-center"> 
                        <div className="d-flex col-12 col-md-4 align-items-center flex-column">
                            <h3>{base}</h3>
                            <div className={`currency-flag-${base.toLowerCase()} my-3 border border-dark currency-flag currency-flag-xl`}></div>
                            <input type="number" onChange={e => handleChange(e,'base',compareCurrency.rate)} value={baseCurrencyInputField} />
                        </div>
                      
                        <div className="d-flex align-items-center col-12 col-md-4 flex-column">
                            <h3>{compareCurrency.symbol}</h3>
                            <div className={`currency-flag-${compareCurrency.symbol.toLowerCase()} my-3 border border-dark currency-flag currency-flag-xl`}></div>
                            <input type="number" onChange={e => handleChange(e,'compare',1/compareCurrency.rate)} value={compareCurrencyInputField} />
                        </div>
                       
                </div>
        </div>
        <button onClick={closeCurrencyConversion} hidden={!isModalOpen} style={buttonStyles} className="btn btn-outline-dark">
            Close
        </button>
    </Modal>
);


export default Baseinput;