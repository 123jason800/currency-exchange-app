import './../css/Searchbar.css';
import {Link} from 'react-router-dom';

const Searchresult = ({currency}) => (
    <div className="d-flex justify-content-center col-12 col-sm-6 col-md-4 col-lg-3">
        <div className="card py-1 px-2 result-card justify-content-center border-dark mb-3 mb-lg-5 shadow-sm"> 
            <Link to={`/base/${currency}`} >
                <div className="body d-flex align-items-center font-weight-bold">
                    <span className="align-text-top mr-3">{currency} </span>
                    <div className={`currency-flag-${currency.toLowerCase()} border border-dark currency-flag currency-flag-xl`}>
                    </div>
                </div>   
            </Link>
        </div>
    </div>
);

const Searchbar = ({symbols,searchField,handleChange,base}) => {
    console.log(symbols);
    
    let filteredCurrencies = symbols.filter(symbol => symbol.includes(searchField)).map(currency => (
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