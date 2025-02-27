import { Link } from 'react-router-dom';
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
                    <li>To create a smart contract for your organization, visit: <Link className='Home__link' to="/CreateContract">Create Contract</Link></li>
                    <li>To fetch the smart contract address linked to a wallet, visit: <Link className='Home__link' to="/GetContract">Fetch Address</Link></li>
                    <li>To add products to your contract, visit: <Link className='Home__link' to="/AddProduct">Add Products</Link></li>
                    <li>To verify product authenticity, visit: <Link className='Home__link' to="/VerifyProduct">Verify Product</Link></li>
                </ul>
            </div>
        </div>
    );
}

export default Home;
