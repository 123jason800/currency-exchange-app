import './../css/Searchbar.css';
import Searchresult from './../components/Searchresult';
import 'currency-flags/dist/currency-flags.css';
import {currencies} from './../data/currencies';

const Searchbar = ({searchField,handleChange}) => {
    
    let filteredCurrencies = currencies.filter(currency => currency.includes(searchField)).map(currency => (
        <Searchresult currency={currency} key={currency}/>));

    return (
        <div className="mt-5 search-form">
            <input
            autoFocus 
            placeholder="Search a Currency" 
            className="search-bar" 
            type="text" 
            onChange={handleChange} 
            value={searchField} 
            />
            <div className='search-results my-5'>
                <div className="container w-50">
                    <div className="row">
                        {searchField && (filteredCurrencies.length > 0 ? filteredCurrencies: <h2>No Results Available</h2>)}
                    </div>
                </div>
            </div>
        </div>
    );
   
};

export default Searchbar;