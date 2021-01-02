import React from 'react';
import Searchbar from './Searchbar';

const currencies = ['AUD', 'BGN', 'BRL', 'CAD', 'CHF', 'CNY','CZK', 'DKK', 'EUR', 'GBP', 'HKD', 'HRK', 'HUF', 'IDR', 'ILS', 'INR', 'ISK', 'JPY', 'KRW', 'MXN', 'MYR', 'NOK', 'NZD', 'PHP', 'PLN', 'RON', 'RUB', 'SEK', 'SGD', 'THB', 'TRY', 'USD', 'ZAR'];

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchField:'',
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let {value} = event.target;
        value = value.toUpperCase();
        this.setState({searchField:value});
    }

    render() {
        return (
            <div className="container">
                <div className="search-bar-container">
                    <Searchbar 
                    handleChange={this.handleChange} 
                    searchField={this.state.searchField} 
                    />
                    
                </div>
                <button>Show All Currencies</button>
            </div>
        );
    }
}


export default Home;