import './../css/Searchbar.css';
import Currencylist from './Currencylist';


const Searchbar = ({symbols,searchField,handleChange}) => {
    
    let filteredCurrencies = symbols.filter(symbol => symbol.includes(searchField)).map(currency => (
         <Currencylist currency={currency} key={currency} sizing="col-6 col-md-4 col-lg-3" />));

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
           
            <div className='search-results mt-5'>
                <div className="container w-75">
                    <div className="row">
                        {searchField && (filteredCurrencies.length > 0 ? filteredCurrencies: <h2>No Results Available</h2>)}
                    </div>
                </div>
            </div>
        </div>
    );
   
};

export default Searchbar;