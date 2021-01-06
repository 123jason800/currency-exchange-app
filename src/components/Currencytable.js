import Modal from 'react-modal';
import {customStyles} from './../utils/styles';
import {buttonStyles} from './../utils/styles';
import Currencylist from './Currencylist';



Modal.setAppElement('#root');
const Currencytable = ({isOpen,symbols,handleModal}) => {

    return (
 
            <Modal 
            isOpen={isOpen}     
            style={customStyles}
            >   
            <button onClick={handleModal} hidden={!isOpen} style={buttonStyles} className="btn btn-outline-dark">
               Close
            </button>

  
            <div className="container pt-5 ">
                    <div className="currency-table row">
                        {symbols.map(symbol => <Currencylist currency={symbol} key={symbol} sizing="col-6 col-sm-4 col-md-3 col-lg-2" />)}
                    </div>
                </div>
            </Modal>
            
           
           
  
    );
   
}



export default Currencytable;