import {Link} from 'react-router-dom';

const Currencylist = ({currency,sizing}) => (
    <div className={`d-flex justify-content-center mb-3 mb-lg-5 ${sizing}`}>
        <div className="card py-1 px-2 result-card justify-content-center border-dark shadow-sm"> 
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

export default Currencylist;