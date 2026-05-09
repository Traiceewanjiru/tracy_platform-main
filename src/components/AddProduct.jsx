import { useState } from "react";
import axios from "axios";


const AddProduct = () => {
    let [product_name, setProductName] = useState("");
    let [product_description, setProductDescription] = useState("");
    let [product_cost, setProductCost] = useState("");
    let [product_category, setProductCategory] = useState("");
    let [product_image, setProductImage] = useState(null);

    let [loading, setLoading] = useState("");
    let [error, setError] = useState("");
    let [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading("Saving product...");

        try {
            const formData = new FormData();
            formData.append("product_name", product_name);
            formData.append("product_description", product_description);
            formData.append("product_category", product_category);
            formData.append("product_cost", product_cost);
            formData.append("product_image", product_image);

            const response = await axios.post("https://tracymwaniki.alwaysdata.net/api/add_product", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                setLoading("");
                setSuccess(response.data.message || "Product added successfully!");

                // clear the form
                setProductName("");
                setProductDescription("");
                setProductCategory("");
                setProductCost("");
                setProductImage(null);
                
                // Clear file input value visually
                const fileInput = document.getElementById('imageFile');
                if (fileInput) fileInput.value = '';

                setTimeout(() => setSuccess(""), 3000);
            }
        } catch (error) {
            setError(error.message);
            setLoading("");
        }
    };

    return (
        <div className="bg-light py-5">
            <div className="container py-5 flex-grow-1">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="card shadow-sm border-0 rounded-4 p-4 p-md-5 bg-white">
                            <div className="text-center mb-5">
                                <h2 className="fw-bold text-primary">Add Beauty Product</h2>
                                <p className="text-muted">List a new item on the BeautyFTips marketplace</p>
                            </div>

                            {success && <div className="alert alert-success rounded-3 fw-medium">{success}</div>}
                            {error && <div className="alert alert-danger rounded-3 fw-medium">{error}</div>}

                            <form onSubmit={handleSubmit} className="row g-4">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold text-muted">Product Name</label>
                                        <input
                                            type="text"
                                            className="form-control bg-light"
                                            placeholder="e.g. Glowing Face Serum"
                                            required
                                            onChange={(e) => setProductName(e.target.value)}
                                            value={product_name}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold text-muted">Category</label>
                                        <select
                                            className="form-select bg-light"
                                            required
                                            onChange={(e) => setProductCategory(e.target.value)}
                                            value={product_category}
                                        >
                                            <option value="">Select Category</option>
                                            <option value="skincare">Skincare</option>
                                            <option value="makeup">Makeup</option>
                                            <option value="haircare">Haircare</option>
                                            <option value="fragrance">Fragrance</option>
                                            <option value="tools">Beauty Tools</option>
                                        </select>
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold text-muted">Price (Ksh)</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-0 fw-bold">Ksh</span>
                                            <input
                                                type="number"
                                                className="form-control bg-light"
                                                placeholder="0.00"
                                                min="0"
                                                required
                                                onChange={(e) => setProductCost(e.target.value)}
                                                value={product_cost}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="mb-3 h-100 d-flex flex-column">
                                        <label className="form-label fw-semibold text-muted">Description</label>
                                        <textarea
                                            className="form-control bg-light flex-grow-1"
                                            placeholder="Describe the product features and benefits..."
                                            rows="5"
                                            required
                                            onChange={(e) => setProductDescription(e.target.value)}
                                            value={product_description}
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="col-12 mt-4">
                                    <div className="card border-0 bg-light rounded-4 p-4 text-center">
                                        <label className="form-label fw-semibold d-block mb-3">Product Image</label>
                                        <input
                                            type="file"
                                            id="imageFile"
                                            className="form-control bg-white w-100"
                                            accept="image/*"
                                            onChange={(e) => setProductImage(e.target.files[0])}
                                        />
                                        <div className="form-text mt-2 text-muted">
                                            <i className="bi bi-info-circle me-1"></i>
                                            For best results, upload a square image (e.g. 800x800px).
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 mt-5 text-center">
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary btn-lg px-5 py-3"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <><span className="spinner-border spinner-border-sm me-2"></span> Adding Product...</>
                                        ) : "Add Product to Catalog"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;