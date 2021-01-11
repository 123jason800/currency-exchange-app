import React from 'react';
import {handleRes,calculateCurrency} from './../utils/util';
import CurrencyConversion from './CurrencyConversion';
import CurrencyRatesTable from './CurrencyRatesTable';
import Loader from './Loader';

class Basecurrency extends React.Component {
    constructor(props) {
        super(props);
      
        this.state = {
            base:'',
            baseCurrencies:[],
            loaded: false,
            filterField:'',
            baseCurrencyInputField:'1',
            compareCurrencyInputField:'',
            compareCurrency: {
                symbol:'',
                rate:0,
            },
            error:'',
            isModalOpen: false,
            
        }

        this.getData = this.getData.bind(this);
        this.openCurrencyConversion = this.openCurrencyConversion.bind(this);
        this.closeCurrencyConversion = this.closeCurrencyConversion.bind(this);
    }


    handleChangeFilterField = (e) => {
        const {value} = e.target;
        this.setState({filterField:value});
    }

    handleChangeCurrencyInputField = (e,current,rate) => {
        const {value} = e.target;
      
        if (current === 'base') {
            let {compareCurrencyInputField} = this.state;
            compareCurrencyInputField = calculateCurrency(value,rate).toFixed(3);
            this.setState({
                baseCurrencyInputField:value,
                compareCurrencyInputField
            });
        }
        else if (current === 'compare') {
            let {baseCurrencyInputField} = this.state;
            baseCurrencyInputField = calculateCurrency(value,rate).toFixed(3);
            this.setState({
                compareCurrencyInputField:value,
                baseCurrencyInputField
            });
        }
    }

    handleError(error) {
        this.setState({error:''});
    }

    getData(base) {
        fetch(`https://alt-exchange-rate.herokuapp.com/latest?base=${base}`)
        .then(handleRes)
        .then(data => {
            let baseCurrencies = [];
            for (const currency in data.rates) {
                if (currency !== base){
                    const currencyObj = {}
                    currencyObj['symbol'] = currency;
                    currencyObj['rate'] = data.rates[currency];
                    baseCurrencies.push(currencyObj);
                }
            }
            this.setState({
                base,
                baseCurrencies,
                loaded: true,
                error: '',
            });
        });
    }

    openCurrencyConversion(symbol,rate) {
        this.setState({
            isModalOpen:true,
            compareCurrency: {
                symbol,
                rate,
                error:''
            },
            compareCurrencyInputField: rate.toFixed(3),
        });
    }  

    closeCurrencyConversion() {
        this.setState({
            isModalOpen:false,
            baseCurrencyInputField:'1',
            compareCurrencyInputField:'',
            compareCurrency: {
                symbol:'',
                rate:0,
                error:''
            }
        });
    }

    componentDidMount() {
        const currentBase =  this.props.location.pathname.split('/')[2];
        this.getData(currentBase);
    }

    componentWillReceiveProps(nextProps) {
        const currentBase = nextProps.location.pathname.split('/')[2];
        this.setState({loaded:false});
        this.getData(currentBase);
    }

    render() {
        const {
               base, 
               error, 
               baseCurrencies, 
               loaded, 
               filterField, 
               isModalOpen, 
               compareCurrency, 
               baseCurrencyInputField, 
               compareCurrencyInputField
            } = this.state;
        
        if (!loaded) {
            return (<Loader />);
        }

        else if (error){
            return (
                <div className="alert alert-danger" role="alert">
                {error}
                </div>
            );
        }
        return (
            <div className="container my-3">
                <div className="d-flex justify-content-center align-items-center p-3">
                    <h1 className="mb-0 mr-3">{base}</h1>
                    <div className={`currency-flag-${base.toLowerCase()} border border-dark currency-flag currency-flag-xl`}>
                    </div>
                </div>
                <CurrencyRatesTable 
                openCurrencyConversion={this.openCurrencyConversion} 
                filterField={filterField} baseCurrencies={baseCurrencies} 
                handleChange={this.handleChangeFilterField} 
                />
                <CurrencyConversion 
                base={base} 
                isModalOpen={isModalOpen} 
                compareCurrency={compareCurrency} 
                closeCurrencyConversion={this.closeCurrencyConversion} 
                baseCurrencyInputField={baseCurrencyInputField} 
                compareCurrencyInputField={compareCurrencyInputField}
                handleChange={this.handleChangeCurrencyInputField}
                /> 
            </div>
        );
    }

}

export default Basecurrency;