import React from 'react';
import Searchbar from './Searchbar';
import Randomdisplay from './RandomDisplay';
import Currencytable from './Currencytable';
import {handleRes,getPreviousDate} from './../utils/util';
import Loader from './Loader';
import {sample} from 'underscore';
import './../css/Mobile.css';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchField:'',
            randomCurrencies:[],
            symbols:[],
            error:'',
            loaded:false,
            isOpen:false,
                    }
        this.handleChange = this.handleChange.bind(this);
        this.getData = this.getData.bind(this);
        this.handleError = this.handleError.bind(this);
        this.handleModal = this.handleModal.bind(this);
    }

    handleChange(event) {
        let {value} = event.target;
        value = value.toUpperCase();
        this.setState({searchField:value});
    }

    handleError(error) {
        this.setState({error});
    }

    getRandomData() {
        fetch('https://alt-exchange-rate.herokuapp.com/latest')
            .then(handleRes)
            .then(data => {
                const {base,rates} = data;
                const symbols = Object.keys(rates).concat(base);
                this.setState({
                    symbols,
                    randomCurrencies:[]}
                    );
                sample(symbols,4).forEach(symbol => this.getData(symbol));
                });
    }

    getData(symbol) {
        Promise.all([
                    fetch(`https://alt-exchange-rate.herokuapp.com/latest?base=${symbol}`),
                    fetch(`https://alt-exchange-rate.herokuapp.com/${getPreviousDate()}?base=${symbol}`)
                ])
                .then(handleRes)
                .then(data => {
                    const {base,rates} = data[0];
                    const {rates:ratesYesterday} = data[1];
                    const randomCurrencies = this.state.randomCurrencies;
                    let currencies = [];
                    
                    for (const symbol in rates) {
                        if (symbol !== base) {
                            const currency = {};
                            currency['symbol'] = symbol;
                            currency['rate'] =  rates[symbol];
                            currency['rateYesterday'] = ratesYesterday[symbol];
                            currency['base'] = base;
                            currencies.push(currency);
                        }}
                
                    randomCurrencies.push(...sample(currencies,1));
                    this.setState({
                        loaded:true,
                        error:'',
                        randomCurrencies
                    });})
                 .catch(this.handleError);
    }

    handleModal() {
        let {isOpen} = this.state;
        isOpen = !isOpen;
        this.setState({isOpen});
    }

    componentDidMount() {
        this.getRandomData();
    }

    render() {   
        const {
            searchField, 
            symbols, 
            randomCurrencies, 
            loaded, 
            isOpen, 
            error
            } = this.state;

        if (!loaded) {
            return <Loader />
        }

        else if (error) {
            return (
            <div className="alert alert-danger" role="alert">
               {error}
            </div>
            );
        }
        
        return (
            <React.Fragment>
                <div className="search-bar-container">
                    <Searchbar 
                    handleChange={this.handleChange} 
                    searchField={searchField} 
                    symbols={symbols}
                    />
                    <button 
                    className="mx-auto mt-5 btn currency-button d-block shadow" 
                    onClick={this.handleModal}
                    >Show All Currencies
                    </button>
                </div>
                <Currencytable 
                handleModal={this.handleModal} 
                isOpen={isOpen} 
                symbols={symbols} 
                />
            <div className="container">
                <Randomdisplay 
                currencies={randomCurrencies}
                />
            </div>
        </React.Fragment>
        );
    }
}


export default Home;