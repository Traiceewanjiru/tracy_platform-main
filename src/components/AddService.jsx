import { useState } from "react";
import axios from "axios";


const AddService = () => {
    let [service_name, setServiceName] = useState("");
    let [service_description, setServiceDescription] = useState("");
    let [service_category, setServiceCategory] = useState("");
    let [service_cost, setServiceCost] = useState("");
    let [service_image, setServiceImage] = useState(null);

    let [loading, setLoading] = useState("");
    let [error, setError] = useState("");
    let [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading("Saving service...");

        try {
            const formData = new FormData();
            formData.append("service_name", service_name);
            formData.append("service_description", service_description);
            formData.append("service_category", service_category);
            formData.append("service_cost", service_cost);
            formData.append("service_image", service_image);

            const response = await axios.post("https://tracymwaniki.alwaysdata.net/api/add_service", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                setLoading("");
                setSuccess(response.data.message || "Service added successfully!");

                // clear the form
                setServiceName("");
                setServiceDescription("");
                setServiceCategory("");
                setServiceCost("");
                setServiceImage(null);
                
                // Clear file input value visually
                const fileInput = document.getElementById('imageFileService');
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
                                <h2 className="fw-bold text-primary">Add New Service</h2>
                                <p className="text-muted">Fill in the details to add a service to the catalog</p>
                            </div>

                            {success && <div className="alert alert-success rounded-3 fw-medium">{success}</div>}
                            {error && <div className="alert alert-danger rounded-3 fw-medium">{error}</div>}

                            <form onSubmit={handleSubmit} className="row g-4">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold text-muted">Service Name</label>
                                        <input
                                            type="text"
                                            className="form-control bg-light"
                                            placeholder="e.g. Deep Tissue Massage"
                                            required
                                            onChange={(e) => setServiceName(e.target.value)}
                                            value={service_name}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold text-muted">Category</label>
                                        <select
                                            className="form-select bg-light"
                                            required
                                            onChange={(e) => setServiceCategory(e.target.value)}
                                            value={service_category}
                                        >
                                            <option value="">Select Category</option>
                                            <option value="spa">Spa & Massage</option>
                                            <option value="hair">Hair Styling</option>
                                            <option value="nails">Nails & Manicure</option>
                                            <option value="makeup">Makeup Artistry</option>
                                            <option value="consultation">Beauty Consultation</option>
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
                                                onChange={(e) => setServiceCost(e.target.value)}
                                                value={service_cost}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="mb-3 h-100 d-flex flex-column">
                                        <label className="form-label fw-semibold text-muted">Description</label>
                                        <textarea
                                            className="form-control bg-light flex-grow-1"
                                            placeholder="Describe the service features and benefits..."
                                            rows="5"
                                            required
                                            onChange={(e) => setServiceDescription(e.target.value)}
                                            value={service_description}
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="col-12 mt-4">
                                    <div className="card border-0 bg-light rounded-4 p-4 text-center">
                                        <label className="form-label fw-semibold d-block mb-3">Service Image</label>
                                        <input
                                            type="file"
                                            id="imageFileService"
                                            className="form-control bg-white w-100"
                                            accept="image/*"
                                            onChange={(e) => setServiceImage(e.target.files[0])}
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
                                            <><span className="spinner-border spinner-border-sm me-2"></span> Adding Service...</>
                                        ) : "Add Service to Catalog"}
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

export default AddService;
