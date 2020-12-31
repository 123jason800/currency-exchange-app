import './../css/Searchbar.css';

const Searchbar = ({searchField,handleChange}) => (
    <div className="mt-5 search-form ">
        <input
         autoFocus 
         placeholder="Search a Currency" 
         className="search-bar" 
         type="text" 
         onChange={handleChange} 
         value={searchField} 
         />
         
    </div>
);

export default Searchbar;