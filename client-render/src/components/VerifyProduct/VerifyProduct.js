import React, { useState, useRef } from 'react';
import QrScanner from 'qr-scanner';
import './VerifyProduct.css';

const VerifyProduct = ({ provider, central }) => {
    const [companyContractAddress, setCompanyContractAddress] = useState('');
    const [productId, setProductId] = useState('');
    const [productStatus, setProductStatus] = useState(null);
    const [file, setFile] = useState(null);
    const [data, setData] = useState(null);
    const fileRef = useRef();

    const handleInput1Change = (e) => setCompanyContractAddress(e.target.value);
    const handleInput2Change = (e) => setProductId(e.target.value);

    const showErrorMessage = (error) => {
        alert(`An error occurred while connecting to MetaMask: ${error.message}`);
    };

    const checkProduct = async () => {
        try {
            const result = await central.checkProduct(companyContractAddress, parseInt(productId));
            setProductStatus(result);
        } catch (error) {
            console.error(error);
            showErrorMessage(error);
        }
    };

    const handleClick = () => fileRef.current.click();

    const handleChange = async (e) => {
        const file = e.target.files[0]; // FIXED FILE ACCESS BUG
        if (!file) return;
        
        setFile(file);
        try {
            const result = await QrScanner.scanImage(file);
            setData(result);
        } catch (error) {
            console.error("QR Scan Failed:", error);
            setData("Failed to scan QR code.");
        }
    };

    return (
        <div className='VerifyProduct'>
            <h3 className='Component__titleVP'>Verify Product</h3>
            <div className='Component__form'>
                {/* <div className='form__content'>
                    <label className='form__label'>Enter Company Contract Address</label>
                    <input type="text" className='form__input' value={companyContractAddress} onChange={handleInput1Change} />
                </div>
                <div className='form__content'>
                    <label className='form__label'>Enter Product ID</label>
                    <input type="text" className='form__input' value={productId} onChange={handleInput2Change} />
                </div> */}

                <div className='form__content'>
                    <h2 className='text-center mb-4'>Scan Your QR Code</h2>
                    <div className='card border-0'>
                        <div className="card-body">
                            <button type='button' onClick={handleClick} className='btn btn-success'>
                                Scan QR Code
                            </button>
                            <input type="file"
                                ref={fileRef}
                                onChange={handleChange}
                                accept=".png, .jpg, .jpeg" 
                                className='d-none' />
                            <div className='mt-4'>
                                {file && <img src={URL.createObjectURL(file)} alt="QR Code Preview" className="qr-preview" />}
                                {data && <p className="small mt-3">Scanned Data: {data}</p>}
                            </div>
                        </div>
                    </div>
                </div>

                <button className='button__toggleVP form__button' onClick={checkProduct}>Verify</button>
                {productStatus && <p>Result: {productStatus}</p>}
            </div>
        </div>
    );
};

export default VerifyProduct;
