const Searchresult = ({currency}) => (
    <div className="d-flex justify-content-center col-6 col-sm-6 col-md-4 col-lg-3">
        <a href="www.google.com" className="card py-1 px-2 result-card justify-content-center border-dark mb-3 shadow-sm">   
            <div className="body">
                <span className="align-text-bottom">{currency} </span>
                <div className={`currency-flag-${currency.toLowerCase()} currency-flag`}>
                </div>
            </div>   
        </a>
    </div>
);

export default Searchresult;