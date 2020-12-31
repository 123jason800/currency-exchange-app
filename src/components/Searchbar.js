import './../css/Searchbar.css';
import Searchresult from './../components/Searchresult';
const Searchbar = ({searchField,handleChange}) => {
    let currencies = ['AUD', 'BGN', 'BRL', 'CAD', 'CHF', 'CNY','CZK', 'DKK', 'EUR', 'GBP', 'HKD', 'HRK', 'HUF', 'IDR', 'ILS', 'INR', 'ISK', 'JPY', 'KRW', 'MXN', 'MYR', 'NOK', 'NZD', 'PHP', 'PLN', 'RON', 'RUB', 'SEK', 'SGD', 'THB', 'TRY', 'USD', 'ZAR']; 
  
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
                <div className="row">
                {
                   searchField && currencies.filter(currency => {
                    return currency.includes(searchField);   
                }).map(currency => (
                    <Searchresult currency={currency} key={currency}/>
                ))
                }
                </div>
            </div>
        </div>
    );
   
};

export default Searchbar;