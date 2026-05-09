import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const CartComponent = () => {
  const [cartItems, setCartItems] = useState([]);
  const [phone, setPhone] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const img_url = "https://tracymwaniki.alwaysdata.net/static/images/";

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('beautyCart')) || [];
    setCartItems(cart);
  }, []);

  const removeItem = (indexToRemove) => {
    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCart);
    localStorage.setItem('beautyCart', JSON.stringify(updatedCart));
  };

  const updateQuantity = (index, delta) => {
    const updatedCart = [...cartItems];
    const item = updatedCart[index];
    item.quantity += delta;
    if (item.quantity <= 0) {
      updatedCart.splice(index, 1);
    }
    setCartItems(updatedCart);
    localStorage.setItem('beautyCart', JSON.stringify(updatedCart));
  };

  const totalCost = cartItems.reduce((total, item) => {
    const cost = typeof item.product_cost === 'string'
      ? parseInt(item.product_cost.replace(/[^0-9]/g, ''), 10)
      : item.product_cost;
    return total + (cost * (item.quantity || 1));
  }, 0);

  const handleCheckout = async () => {
    if (!phone) {
      setPaymentStatus('Please enter your M-Pesa phone number.');
      return;
    }

    setLoading(true);
    setPaymentStatus('');

    try {
      const formData = new FormData();
      formData.append('amount', totalCost); // Can be 1 for testing as per backend
      formData.append('phone', phone);

      const response = await axios.post("https://tracymwaniki.alwaysdata.net/api/mpesa_payment", formData);
      if (response.status === 200) {
        setPaymentStatus(response.data.message || "Please Complete Payment in Your Phone.");
      }
    } catch (error) {
      setPaymentStatus("Failed to initiate payment: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <div className="container py-5 flex-grow-1">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-primary mb-2">Your Shopping Bag</h2>
          <p className="text-muted">Review your selected beauty essentials and proceed to checkout</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-5 bg-white shadow-sm rounded-5 border-0 mx-auto" style={{ maxWidth: '600px' }}>
            <div className="mb-4 d-inline-block p-4 rounded-circle bg-light">
              <i className="bi bi-bag-x text-primary" style={{ fontSize: '3rem' }}></i>
            </div>
            <h4 className="fw-bold text-dark mb-3">Your bag is beautifully empty</h4>
            <p className="text-muted mb-4 px-5">It looks like you haven't added any beauty treasures yet. Explore our collection to find your perfect match.</p>
            <Link to="/products" className="btn btn-primary btn-lg px-5 rounded-pill shadow-sm transition-all text-decoration-none">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm rounded-5 overflow-hidden">
                <div className="card-header bg-white border-bottom py-4 px-4">
                  <h5 className="fw-bold mb-0 d-flex align-items-center">
                    <i className="bi bi-cart3 me-2 text-primary"></i>
                    Shopping Items ({cartItems.length})
                  </h5>
                </div>
                <div className="card-body p-0">
                  {cartItems.map((item, index) => {
                    const cost = typeof item.product_cost === 'string'
                      ? parseInt(item.product_cost.replace(/[^0-9]/g, ''), 10)
                      : item.product_cost;

                    const pImage = item.product_image ? img_url + item.product_image : '';

                    return (
                      <div key={index} className="p-4 border-bottom last-child-border-0">
                        <div className="row align-items-center">
                          <div className="col-4 col-md-2">
                            <div className="rounded-4 overflow-hidden shadow-sm" style={{ aspectRatio: '1/1' }}>
                              {pImage ? (
                                <img
                                  src={pImage}
                                  className="img-fluid h-100 w-100"
                                  alt={item.product_name}
                                  style={{ objectFit: 'cover' }}
                                />
                              ) : (
                                <div className="w-100 h-100 bg-light d-flex align-items-center justify-content-center">
                                  <i className="bi bi-image text-muted fs-3"></i>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="col-8 col-md-4 mt-2 mt-md-0">
                            <span className="badge bg-secondary mb-1 d-inline-block text-uppercase small" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>
                              {item.product_category || 'Beauty'}
                            </span>
                            <h6 className="text-dark mb-1 fw-bold text-truncate">{item.product_name}</h6>
                            <p className="text-muted small mb-0 d-none d-md-block text-truncate">{item.product_description || 'Premium quality selection'}</p>
                          </div>
                          <div className="col-6 col-md-3 mt-3 mt-md-0 d-flex align-items-center justify-content-center">
                            <div className="input-group input-group-sm bg-light rounded-pill p-1 border" style={{ width: '110px' }}>
                              <button className="btn btn-white rounded-circle border-0 shadow-none p-0 d-flex align-items-center justify-content-center" style={{ width: '28px', height: '28px' }} onClick={() => updateQuantity(index, -1)}>
                                <i className="bi bi-dash"></i>
                              </button>
                              <input type="text" className="form-control bg-transparent border-0 text-center fw-bold p-0" value={item.quantity || 1} readOnly />
                              <button className="btn btn-white rounded-circle border-0 shadow-none p-0 d-flex align-items-center justify-content-center" style={{ width: '28px', height: '28px' }} onClick={() => updateQuantity(index, 1)}>
                                <i className="bi bi-plus"></i>
                              </button>
                            </div>
                          </div>
                          <div className="col-4 col-md-2 mt-3 mt-md-0 text-center text-md-end">
                            <h6 className="mb-0 fw-bold text-primary">Ksh {cost.toLocaleString()}</h6>
                          </div>
                          <div className="col-2 col-md-1 mt-3 mt-md-0 text-end">
                            <button className="btn btn-light rounded-circle p-2 text-danger border-0 transition-all shadow-none" onClick={() => removeItem(index)}>
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card border-0 shadow-lg rounded-5 sticky-top" style={{ top: '100px' }}>
                <div className="card-body p-5">
                  <h4 className="fw-bold mb-4" style={{ color: '#880e4f' }}>Order Summary</h4>
                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">Bag Subtotal</span>
                    <span className="fw-bold">Ksh {totalCost.toLocaleString()}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">Shipping Fee</span>
                    <span className="fw-bold text-success">Negotiable</span>
                  </div>
                  <hr className="my-4" />
                  <div className="d-flex justify-content-between mb-5 align-items-center">
                    <span className="fw-bold fs-5">Estimated Total</span>
                    <span className="fs-3 fw-bold text-primary">Ksh {totalCost.toLocaleString()}</span>
                  </div>

                  {!isCheckingOut ? (
                    <button
                      onClick={() => setIsCheckingOut(true)}
                      className="btn btn-primary btn-lg w-100 py-3 rounded-pill fw-bold shadow-sm transition-all">
                      Secure Checkout
                    </button>
                  ) : (
                    <div className="mt-4 animate-fade-in">
                      <div className="p-4 rounded-4 bg-light border-dashed mb-3">
                        <h6 className="fw-bold mb-3 d-flex align-items-center">
                          <i className="bi bi-phone-fill me-2 text-success"></i> Pay via M-Pesa
                        </h6>
                        {paymentStatus && (
                          <div className={`alert ${paymentStatus.includes('Failed') ? 'alert-danger' : 'alert-success'} p-3 rounded-4 small fw-medium mb-3`}>
                            {paymentStatus}
                          </div>
                        )}
                        <div className="mb-3">
                          <label className="form-label small fw-bold text-muted text-uppercase">M-Pesa Number</label>
                          <input
                            type="tel"
                            placeholder="e.g. 254712345678"
                            className="form-control form-control-lg rounded-4 border-0 shadow-sm"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </div>
                        <button
                          onClick={handleCheckout}
                          disabled={loading}
                          className="btn btn-success btn-lg w-100 py-3 rounded-pill fw-bold shadow-sm transition-all">
                          {loading ? (
                            <><span className="spinner-border spinner-border-sm me-2"></span> Finalizing...</>
                          ) : "Authorize Payment"}
                        </button>
                      </div>
                      <button className="btn btn-link text-muted w-100 text-decoration-none small fw-bold" onClick={() => setIsCheckingOut(false)}>
                        <i className="bi bi-arrow-left me-1"></i> Back to bag
                      </button>
                    </div>
                  )}

                  <div className="mt-5 text-center text-muted">
                    <div className="d-flex justify-content-center gap-3 opacity-50 mb-3">
                      <i className="bi bi-shield-lock fs-4"></i>
                      <i className="bi bi-credit-card fs-4"></i>
                      <i className="bi bi-patch-check fs-4"></i>
                    </div>
                    <p className="small mb-0">Secure and encrypted checkout process.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartComponent;
