import React from 'react';
import Searchbar from './Searchbar';
import Randomdisplay from './RandomDisplay';
import Currencytable from './Currencytable';
import {handleRes,getRandomCurrency} from './../utils/util';
import {random, sample} from 'underscore';
import Loader from './Loader';
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
        const {message} = error;
       this.setState({error:message});
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
        fetch(`https://alt-exchange-rate.herokuapp.com/latest?base=${symbol}`)
            .then(handleRes)
            .then(data => {
                const {base,rates} = data;
                const randomCurrencySymbol = getRandomCurrency(Object.keys(rates));
                const randomCurrency = {};
                randomCurrency['symbol'] = randomCurrencySymbol;
                randomCurrency['rate'] = rates[randomCurrencySymbol];
                randomCurrency['base'] = base;
                const {randomCurrencies} = this.state;
                randomCurrencies.push(randomCurrency);
                this.setState({
                    loaded:true,
                    error:'',
                    randomCurrencies
                });
            })
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
            <div className="error-page">
                <div className="alert alert-danger" role="alert">
                {error}
                </div>
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