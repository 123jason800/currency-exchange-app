const Searchresult = ({currency}) => (
    <div className="col-6 col-sm-6 col-md-4 col-lg-3">
        <a  href="www.google.com" className="card border-dark mb-3 shadow-sm">
            <div className="card-body">
                {currency}
            </div>
        </a>
    </div>
);

export default Searchresult;