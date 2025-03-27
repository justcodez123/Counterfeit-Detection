import { useState, useRef, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import './Product.css';

const AddProduct = ({central}) => {

    const [account, setAccount] = useState(null);

    useEffect(() => {
        async function fetchAccount() {
            if (window.ethereum) {
                try {
                    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                    if (accounts.length > 0) {
                        setAccount(accounts[0]);
                    }
                } catch (error) {
                    console.error("Error fetching accounts:", error);
                }
            }
        }

        fetchAccount();

        const handleAccountsChanged = (accounts) => {
            setAccount(accounts.length > 0 ? accounts[0] : null);
        };


        window.ethereum?.on("accountsChanged", handleAccountsChanged);

        // Listen for account changes
        window.ethereum?.on("accountsChanged", (accounts) => {
            setAccount(accounts.length > 0 ? accounts[0] : null);
        });

        return () => {
            window.ethereum?.removeListener("accountsChanged", setAccount);
        };
    }, []);



    const [companyContractAddress, setCompanyContractAddress] = useState('');
    const [productId, setProductId] = useState('');
    const [manufactureId, setManufactureId] = useState('');
    const [productName, setProductName] = useState('');
    const [productBrand, setProductBrand] = useState('');
    const [loading, setLoading] = useState(false);
    const [updateStatus, setUpdateStatus] = useState('');
    const [qrValue, setQrValue] = useState('');
    
    const qrRef = useRef();

    useEffect(() => {
        // Update QR value whenever form data changes
        setQrValue(JSON.stringify({
            companyContractAddress,
            productId,
            manufactureId,
            productName,
            productBrand
        }));
    }, [companyContractAddress, productId, manufactureId, productName, productBrand]);

    const showErrorMessage = (error) => {
        setLoading(false);
        alert(`An error occurred while connecting to MetaMask: ${error.message}`);
    };

    const handleInputChange = (setter) => (e) => setter(e.target.value);

    const downloadQRCode = (e) => {
        e.preventDefault();
        let canvas = qrRef.current.querySelector("canvas");
        let image = canvas.toDataURL("image/png");
        let anchor = document.createElement("a");
        anchor.href = image;
        anchor.download = `qr-code.png`;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    };

    const addProducts = async () => {
        try {
            const list = JSON.parse("[" + productId + "]");
            if(account && companyContractAddress && list){
                setUpdateStatus("Validate the transaction through your wallet");
                let transaction = await central.addproduct(account, companyContractAddress, list);
                setLoading(true);
                await transaction.wait();
                setUpdateStatus("Products Added");
                setLoading(false);
            } else {
                throw Error('Please check that you are connected to a wallet, and that you have provided all the fields');
            }
        } catch(error) {
            console.log(error);
            showErrorMessage(error);
        }
    };

    return (
        <div className='AddProduct'>
            <h3 className='Component__title'>Add Products</h3>
            <div className='Component__form'>
                <div className='form__content'>
                    <label className='form__label'>Enter Company contract address</label>
                    <input type="text" className='form__input' value={companyContractAddress} onChange={handleInputChange(setCompanyContractAddress)} />
                </div>
                <div className='form__content'>
                    <label className='form__label'>Enter Product ID</label>
                    <input type="text"  className='form__input' value={productId} onChange={handleInputChange(setProductId)} />
                </div>
                <div className='form__content'>
                    <label className='form__label'>Enter Manufacture ID</label>
                    <input type="text"  className='form__input' value={manufactureId} onChange={handleInputChange(setManufactureId)} />
                </div>
                <div className='form__content'>
                    <label className='form__label'>Enter Product Name</label>
                    <input type="text"  className='form__input' value={productName} onChange={handleInputChange(setProductName)} />
                </div>
                <div className='form__content'>
                    <label className='form__label'>Enter Product Brand</label>
                    <input type="text"  className='form__input' value={productBrand} onChange={handleInputChange(setProductBrand)} />
                </div>
                <button className='button__toggleAP form__button' onClick={addProducts}>Add Product</button>
                { account ? (
                    <>
                        {loading  ? (
                            <div>Transaction in progress..... It can take a few minutes</div>
                        ) : ( 
                            <p>{updateStatus}</p>
                        )}
                    </>
                ) : (
                    <h2>Connect to a crypto wallet first.......</h2>
                )}
            </div>

            {/* QR Code Section */}
            <div className="qrcode__container">
                <div ref={qrRef} className="qr_itself">
                    <QRCodeCanvas
                        id="qrCode"
                        value={qrValue}
                        size={300}
                        bgColor={"#ffffff"}
                        level={"H"}
                    />
                </div >
                <div>
                    <button onClick={downloadQRCode} disabled={!qrValue} className="button__toggleQR">
                        Download QR code
                    </button>
                </div>
                
            </div>    
        </div>
    );
};

export default AddProduct;
