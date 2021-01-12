import './../css/Loader.css';

const Loader = ({size}) => (
    <div className={`loader loader-${size}`}>
        <div className="loader-inner line-scale">
            <div></div> 
            <div></div> 
            <div></div> 
            <div></div> 
            <div></div>
        </div>
    </div>
);

export default Loader;