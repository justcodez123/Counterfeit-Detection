import './components/app.css';
import AddProduct from './components/AddProduct/AddProduct';
import CreateContract from './components/CreateContract/CreateContract';
// import GetContract from './components/GetContract/GetContract';
import Home from './components/Home/Home';
import Navigation from './components/Navigation/Navigation';
import QRScanner from './components/QRScanner/QRScanner';
import ProductAuthenticator from './components/VerifyProduct/ProductAuthenticator';
import React,{useState} from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

export const Metamask = () => {
  const [account, setAccount] = useState(null);
  return <Navigation account={account} setAccount={setAccount} />;
};

function App({ location }) {
  const [account, setAccount] = useState(null);
  return (
      <>  
      <Navigation account={account} setAccount={setAccount} />
           <Routes location = {location}>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/AddProduct" element={<AddProduct />} />
            <Route exact path="/CreateContract" element={<CreateContract />} />
            {/* <Route exact path="/GetContract" element={<GetContract />} /> */}
            <Route exact path="/VerifyProduct" element={<ProductAuthenticator />} />
            <Route exact path="/QRScanner" element={<QRScanner />} />
           </Routes>
      </>
  );
}


export default App ;