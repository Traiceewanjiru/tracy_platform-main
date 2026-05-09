import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const ProductsComponent = ({ type }) => {
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const img_url = "https://tracymwaniki.alwaysdata.net/static/images/";

  useEffect(() => {
    const fetchData = async () => {
      setLoading("Loading beauty essentials and services...");
      try {
        const [productsRes, servicesRes] = await Promise.all([
          axios
            .get("https://tracymwaniki.alwaysdata.net/api/get_products")
            .catch(() => ({ status: 500, data: [] })),
          axios
            .get("https://tracymwaniki.alwaysdata.net/api/get_services")
            .catch(() => ({ status: 500, data: [] }))
        ]);

        const beautyProductCats = [
          "skincare",
          "makeup",
          "haircare",
          "fragrance",
          "tools"
        ];

        const beautyServiceCats = [
          "spa",
          "hair",
          "nails",
          "makeup",
          "consultation"
        ];

        if (productsRes.status === 200 && Array.isArray(productsRes.data)) {
          setProducts(
            productsRes.data.filter((p) =>
              beautyProductCats.includes(p.product_category?.toLowerCase())
            )
          );
        } else {
          setProducts([]);
        }

        if (servicesRes.status === 200 && Array.isArray(servicesRes.data)) {
          setServices(
            servicesRes.data.filter((s) =>
              beautyServiceCats.includes(s.service_category?.toLowerCase())
            )
          );
        } else {
          setServices([]);
        }

        setLoading("");
      } catch (err) {
        setError("Failed to load data. " + err.message);
        setLoading("");
      }
    };

    fetchData();
  }, []);

  const addToCart = (item, isService = false) => {
    const cart = JSON.parse(localStorage.getItem("beautyCart")) || [];
    const itemName = isService ? item.service_name : item.product_name;

    const existingItem = cart.find(
      (cartItem) => cartItem.product_name === itemName
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        ...item,
        quantity: 1,
        product_name: itemName,
        product_cost: isService
          ? item.service_cost || 1000
          : item.product_cost || 1000,
        product_image: isService ? item.service_image : item.product_image,
        product_category: isService
          ? item.service_category
          : item.product_category
      });
    }

    localStorage.setItem("beautyCart", JSON.stringify(cart));
    showToast(`Added ${itemName} to cart!`);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredProducts = useMemo(() => {
    if (!normalizedQuery) return products;
    return products.filter(
      (p) =>
        (p.product_name &&
          p.product_name.toLowerCase().includes(normalizedQuery)) ||
        (p.product_description &&
          p.product_description.toLowerCase().includes(normalizedQuery))
    );
  }, [products, normalizedQuery]);

  const filteredServices = useMemo(() => {
    if (!normalizedQuery) return services;
    return services.filter(
      (s) =>
        (s.service_name &&
          s.service_name.toLowerCase().includes(normalizedQuery)) ||
        (s.service_description &&
          s.service_description.toLowerCase().includes(normalizedQuery))
    );
  }, [services, normalizedQuery]);

  const showNoProductsMatch =
    !loading &&
    !error &&
    (type === "products" || !type) &&
    normalizedQuery &&
    products.length > 0 &&
    filteredProducts.length === 0;

  const showNoServicesMatch =
    !loading &&
    !error &&
    (type === "services" || !type) &&
    normalizedQuery &&
    services.length > 0 &&
    filteredServices.length === 0;

  return (
    <>
      <div className="bg-light min-vh-100 py-5">
        <div className="container">
          {toastMessage && (
            <div
              className="position-fixed top-0 end-0 p-3"
              style={{ zIndex: 1050 }}
            >
              <div
                className="toast show align-items-center text-white bg-success border-0"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
              >
                <div className="d-flex">
                  <div className="toast-body">{toastMessage}</div>
                  <button
                    type="button"
                    className="btn-close btn-close-white me-2 m-auto"
                    onClick={() => setToastMessage("")}
                    aria-label="Close"
                  ></button>
                </div>
              </div>
            </div>
          )}

          {/* Live Search Bar */}
          <div className="row justify-content-center mb-5">
            <div className="col-md-8 col-lg-6">
              <div className="input-group input-group-lg shadow-sm rounded-pill overflow-hidden border-0">
                <span className="input-group-text bg-white border-0 ps-4">
                  <i className="bi bi-search text-primary"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-0 py-3"
                  placeholder={`Search for ${type === "products"
                      ? "skincare, makeup..."
                      : "spa, styling, massage..."
                    }`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ boxShadow: "none" }}
                />
              </div>
            </div>
          </div>

          <h5 className="text-warning text-center">{loading}</h5>
          <h5 className="text-danger text-center">{error}</h5>

          {products.length === 0 && services.length === 0 && !loading && !error && (
            <div className="text-center py-5">
              <i
                className="bi bi-box-seam text-muted"
                style={{ fontSize: "4rem" }}
              ></i>
              <h4 className="mt-3 text-muted">No products or services available yet</h4>
              <p className="text-muted">Check back later for exciting new arrivals!</p>
            </div>
          )}

          {/* PRODUCTS SECTION */}
          {(type === "products" || !type) && products.length > 0 && (
            <div className="mb-5">
              <h2 className="mb-4 text-center pb-4 fw-bold text-primary">
                Curated Beauty Products
              </h2>

              {showNoProductsMatch ? (
                <div className="text-center py-5">
                  <i
                    className="bi bi-search text-muted"
                    style={{ fontSize: "3rem" }}
                  ></i>
                  <h4 className="mt-3 text-muted">No matching products found</h4>
                  <p className="text-muted">Try a different search like “skincare” or “makeup”.</p>
                </div>
              ) : (
                <div className="row g-4">
                  {filteredProducts.map((product, idx) => {
                    const pName = product.product_name;
                    const pDesc = product.product_description;
                    const pCost = product.product_cost || 0;
                    const pImage = product.product_image
                      ? img_url + product.product_image
                      : "";

                    return (
                      <div key={idx} className="col-sm-6 col-md-4 col-lg-3">
                        <div className="card h-100 shadow-sm border-0 rounded-4">
                          <div className="position-relative overflow-hidden rounded-top-4">
                            {pImage && (
                              <img
                                src={pImage}
                                alt={pName}
                                className="card-img-top"
                                style={{ height: "280px", objectFit: "cover" }}
                              />
                            )}
                            <div className="position-absolute top-0 end-0 m-3">
                              <span className="badge bg-primary">
                                {product.product_category || "Beauty"}
                              </span>
                            </div>
                          </div>
                          <div className="card-body d-flex flex-column p-4">
                            <h5 className="card-title fw-bold mb-2 text-dark">
                              {pName}
                            </h5>
                            <p className="card-text text-muted small flex-grow-1">
                              {pDesc}
                            </p>
                            <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                              <span className="fs-5 fw-bold text-primary">
                                Ksh {typeof pCost === "number" ? pCost.toLocaleString() : pCost}
                              </span>
                              <button
                                onClick={() => addToCart(product, false)}
                                className="btn btn-outline-primary rounded-circle p-2 d-flex align-items-center justify-content-center"
                                style={{ width: "40px", height: "40px" }}
                              >
                                <i className="bi bi-cart-plus fs-5"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* SERVICES SECTION */}
          {(type === "services" || !type) && services.length > 0 && (
            <div className="mb-5">
              <h2 className="mb-4 text-center pb-4 fw-bold text-primary">
                Our Premium Services
              </h2>

              {showNoServicesMatch ? (
                <div className="text-center py-5">
                  <i
                    className="bi bi-search text-muted"
                    style={{ fontSize: "3rem" }}
                  ></i>
                  <h4 className="mt-3 text-muted">No matching services found</h4>
                  <p className="text-muted">Try a different search like “spa” or “nails”.</p>
                </div>
              ) : (
                <div className="row g-4">
                  {filteredServices.map((service, idx) => {
                    const sName = service.service_name;
                    const sDesc = service.service_description;
                    const sCost = service.service_cost || 1000;
                    const sImage = service.service_image
                      ? img_url + service.service_image
                      : "";

                    return (
                      <div key={idx} className="col-sm-6 col-md-4 col-lg-3">
                        <div className="card h-100 shadow-sm border-0 rounded-4">
                          <div className="position-relative overflow-hidden rounded-top-4">
                            {sImage && (
                              <img
                                src={sImage}
                                alt={sName}
                                className="card-img-top"
                                style={{ height: "280px", objectFit: "cover" }}
                              />
                            )}
                            <div className="position-absolute top-0 end-0 m-3">
                              <span className="badge bg-info">
                                {service.service_category || "Service"}
                              </span>
                            </div>
                          </div>
                          <div className="card-body d-flex flex-column p-4">
                            <h5 className="card-title fw-bold mb-2 text-dark">
                              {sName}
                            </h5>
                            <p className="card-text text-muted small flex-grow-1">
                              {sDesc}
                            </p>
                            <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                              <span className="fs-5 fw-bold text-info">
                                Ksh {typeof sCost === "number" ? sCost.toLocaleString() : sCost}
                              </span>
                              <button
                                onClick={() => addToCart(service, true)}
                                className="btn btn-outline-info rounded-circle p-2 d-flex align-items-center justify-content-center"
                                style={{ width: "40px", height: "40px" }}
                              >
                                <i className="bi bi-calendar-plus fs-5"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductsComponent;

