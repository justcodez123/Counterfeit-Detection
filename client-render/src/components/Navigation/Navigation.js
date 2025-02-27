import './Navigation.css';
import { useNavigate } from 'react-router-dom';

const Navigation = ({ account, setAccount }) => {
  const navigate = useNavigate();

  function showErrorMessage(error) {
    alert(`An error occurred while connecting to MetaMask: ${error.message}`);
  }

  const connectHandler = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask is not installed. Please install it.");
        return;
      }

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]); // Store first account

    } catch (error) {
      console.error("MetaMask Connection Error:", error);
      showErrorMessage(error);
    }
  };

  return (
    <nav className='nav container'>
      <a href="/" className="nav__logo">Product Verifier</a>
      <div className='nav__menu'>
        <ul className='nav__list grid'>
          <li className='nav__item'>
            <button className='nav__link button__toggleH' onClick={() => navigate('/')}>Home</button>
          </li>
          <li className='nav__item'>
            <button className='nav__link button__toggleC' onClick={() => navigate('/CreateContract')}>Create Contract</button>
          </li>
          <li className='nav__item'>
            <button className='nav__link button__toggleF' onClick={() => navigate('/GetContract')}>Fetch Contract</button>
          </li>
          <li className='nav__item'>
            <button className='nav__link button__toggleA' onClick={() => navigate('/AddProduct')}>Add Products</button>
          </li>
          <li className='nav__item'>
            <button className='nav__link button__toggleV' onClick={() => navigate('/VerifyProduct')}>Verify Product</button>
          </li>
          <li>
            {account ? (
              <button type="button" className='button__toggle'>
                {account.slice(0, 6) + '...' + account.slice(-4)}
              </button>
            ) : (
              <button type="button" className='button__toggleMetamask' onClick={connectHandler}>
                Connect to MetaMask
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
