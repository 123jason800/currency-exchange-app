import React from 'react';
import Searchbar from './Searchbar';
import Randomdisplay from './RandomDisplay';
import {handleRes,getPreviousDate} from './../utils/util';
import Loader from './Loader';
import {sample} from 'underscore';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchField:'',
            base:'',
            randomCurrencies:[],
            symbols:[],
            error:'',
            loaded:false,
            showTable:false
                    }
        this.handleChange = this.handleChange.bind(this);
        this.getData = this.getData.bind(this);
        this.handleError = this.handleError.bind(this);
    }

    handleChange(event) {
        let {value} = event.target;
        value = value.toUpperCase();
        this.setState({searchField:value});
    }

    handleError(error) {
        this.state({error});
    }

    getRandomData() {
                    fetch('https://alt-exchange-rate.herokuapp.com/latest')
                        .then(handleRes)
                                .then(data => {
                                        const {base,rates} = data;
                                        const symbols = Object.keys(rates).concat(base);
                                        this.getData(sample(symbols,1));  
                                        this.setState({symbols});
                                    });
    }

    getData(symbol) {
        Promise.all([
                    fetch(`https://alt-exchange-rate.herokuapp.com/latest?base=${symbol}`),
                    fetch(`https://alt-exchange-rate.herokuapp.com/${getPreviousDate()}?base=${symbol}`)
                ]).then(handleRes)
                    .then(data => {
                            const {base,rates} = data[0];
                            const {rates:ratesYesterday} = data[1];
                            let currencies = [];
                            
                            for (const symbol in rates) {
                                if (symbol !== base) {
                                    const currency = {};
                                    currency['symbol'] = symbol;
                                    currency['rate'] =  rates[symbol];
                                    currency['rateYesterday'] = ratesYesterday[symbol];
                                    currencies.push(currency);
                                }
                            }

                            const randomCurrencies = sample(currencies,4);
                            this.setState({
                                base,
                                loaded:true,
                                error:'',
                                randomCurrencies
                            });       
                        });
    }



    

    componentDidMount() {
        this.getRandomData();
    }



    render() {
       
        if (!this.state.loaded) {
            return <Loader />
        }
        return (
        <div className="container">
            <div className="search-bar-container">
                <Searchbar 
                handleChange={this.handleChange} 
                searchField={this.state.searchField} 
                symbols={this.state.symbols}
                />
                <button className={`mx-auto mt-5 btn ${this.state.showTable?'d-none':'d-block'} currency-button shadow`}>Show All Currencies</button>
            </div>
            <Randomdisplay 
            base={this.state.base}
            currencies={this.state.randomCurrencies}
            loaded={this.state.loaded}
            />

        </div>
          
        );
    }
}


export default Home;