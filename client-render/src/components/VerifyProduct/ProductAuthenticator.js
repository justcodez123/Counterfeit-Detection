import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { useEffect } from 'react';
import { ethers } from 'ethers';

import StatusModal from './StatusModal';
import './ProductAuthenticator.css';

const ProductAuthenticator = () => {
  const [scannedData, setScannedData] = useState(false);
  const [authStatus, setAuthStatus] = useState('');
  const [productInfo, setProductInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

   useEffect(() => {
    if (scannedData) {
      const timer = setTimeout(() => setScannedData(false), 5000000); // reset after 500s
      return () => clearTimeout(timer);
    }
  }, [scannedData]);

  const handleScan = async (data) => {
    if (data) {
      setScannedData(data);
      setAuthStatus('📸 QR code scanned! Verifying on blockchain...');
      setIsModalOpen(true);

      try {
        const parsedData = JSON.parse(data);
        const { contractAddress, manufacturerId, productId, productName, productBrand } = parsedData;

        const provider = new ethers.providers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/ALCHEMY_API_KEY');
        const code = await provider.getCode(contractAddress);

        if (code === '0x') {
          setAuthStatus('❌ Contract not found on Sepolia. Product may be fake.');
          setProductInfo(null);
          return;
        }

        if (data && !scannedData) {
           setScannedData(true);
           setAuthStatus(data);
           setIsModalOpen(true);
        }

        setAuthStatus('✅ Product authenticated successfully!');
        setProductInfo({
          Manufacturer_ID: manufacturerId,
          Product_ID: productId,
          Name: productName,
          Brand: productBrand,
        });
      } catch (error) {
        console.error('Error verifying product:', error);
        setAuthStatus('❌ Invalid QR or blockchain verification failed.');
        setProductInfo(null);
      }
    }
  };

  const handleError = (err) => {
    console.warn('QR Reader Error:', err?.message || err);
    console.error('QR Reader Error: ', err);
    setAuthStatus('❌ QR reader error.');
    setIsModalOpen(true);
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">QR Product Authenticator</h2>

      <div className="scanner-box">
        <QrReader
          constraints={{ facingMode: 'environment' }}
          onResult={(result, error) => {
            if (!!result) {
              handleScan(result?.text);
            }

            if (!!error) {
              handleError(error);
            }
          }}
          style={{ width: '100%' }}
        />
      </div>

      <StatusModal
        isOpen={isModalOpen}
        statusMessage={authStatus}
        onClose={() => setIsModalOpen(false)}
      />

      {productInfo && (
        <div className="product-info-box">
          <h3 className="product-title">Product Details:</h3>
          <ul className="product-list">
            {Object.entries(productInfo).map(([key, value]) => (
              <li key={key}><strong>{key}:</strong> {value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductAuthenticator;
