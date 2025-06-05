// import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    return (
        <div className="Home">
            <h3 className="Component__title">Welcome</h3>
            <div className="Home__description">
                <p>
                    Companies may register to receive a customized smart contract, which will serve
                    as a registry of all products produced by the company. This smart contract will
                    be made publicly accessible, allowing any individual to verify the authenticity
                    of a product by checking its presence on the corresponding smart contract.<br />
                    <span className="Home__warning">Note: Only contract owners can add products to their contract</span>
                </p>
            </div>

            <div className="Home__instructions">
                <ul>
                    <li className='Home__warning'>  Instructions : </li>
                    <li>1. You Need to Have MetaMask Installed.</li>
                    <li>2. You need to create a contract first, for each of the Product, You can do it by clicking on the Create Contract Button on the Navigation Bar.</li>
                    <li>3. After Contract Creation, Make Sure to Add Products, You can do it by clicking on the Add Product Button on the Navigation Bar.</li>
                    <li>4. After Adding the Product, You can Verify the Product by clicking on the Verify Product Button on the Navigation Bar.</li>    
                </ul>
            </div>
        </div>
    );
}

export default Home;
