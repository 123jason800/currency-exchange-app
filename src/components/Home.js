import React from 'react';
import Searchbar from './Searchbar';

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
                <Searchbar 
                handleChange={this.handleChange} 
                searchField={this.state.searchField} 
                />
            </div>
        );
    }
}


export default Home;