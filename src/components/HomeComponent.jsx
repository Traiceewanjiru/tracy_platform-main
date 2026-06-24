import { Link } from "react-router-dom";

const HomeComponent = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="py-5 overflow-hidden" style={{ background: 'linear-gradient(135deg, #fff0f5 0%, #fff 100%)' }}>
                <div className="container py-5">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-6">
                            <h6 className="text-primary fw-bold text-uppercase mb-3 tracking-widest" style={{ letterSpacing: '2px' }}>Welcome to Seluna Beauty</h6>
                            <h1 className="display-4 fw-bold mb-4" style={{ color: '#880e4f' }}>
                                Your Ultimate <br />
                                <span className="text-primary">Beauty Marketplace</span>
                            </h1>
                            <p className="lead text-muted mb-5">
                                Discover a curated world of premium skincare, makeup, and professional beauty services. Elevate your self-care routine with products trusted by experts and loved by our community.
                            </p>
                            <div className="d-flex gap-3">
                                <Link to="/products" className="btn btn-primary btn-lg px-5 rounded-pill shadow-sm transition-all text-decoration-none">
                                    Shop Products
                                </Link>
                                <Link to="/services" className="btn btn-outline-primary btn-lg px-5 rounded-pill transition-all text-decoration-none">
                                    Book Services
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="position-relative">
                                <div className="position-absolute top-0 start-0 w-100 h-100 bg-primary opacity-10 rounded-5 translate-middle-x translate-middle-y" style={{ transform: 'translate(20px, 20px)' }}></div>
                                <img 
                                    src={process.env.PUBLIC_URL + "/assets/beauty_hero.png"} 
                                    alt="Beauty Essentials" 
                                    className="img-fluid rounded-5 shadow-lg position-relative"
                                    style={{ objectFit: 'cover', height: '500px', width: '100%' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-5 bg-light">
                <div className="container py-5">
                    <div className="text-center mb-5">
                        <h2 className="fw-bold mb-3" style={{ color: '#880e4f' }}>Why Shop With Us?</h2>
                        <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>Experience the best in beauty with our professional-grade products and personalized services.</p>
                    </div>
                    <div className="row g-4 justify-content-center">
                        <div className="col-md-4">
                            <div className="p-5 h-100 rounded-5 shadow-sm border-0 bg-white text-center hover-up transition-all">
                                <div className="mb-4 d-inline-block p-3 rounded-circle bg-light shadow-sm">
                                    <i className="bi bi-gem fs-2 text-primary"></i>
                                </div>
                                <h4 className="fw-bold mb-3">Authentic Products</h4>
                                <p className="text-muted mb-0">
                                    Every item in our catalog is 100% authentic, sourced directly from authorized distributors.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-5 h-100 rounded-5 shadow-sm border-0 bg-white text-center hover-up transition-all">
                                <div className="mb-4 d-inline-block p-3 rounded-circle bg-light shadow-sm">
                                    <i className="bi bi-magic fs-2 text-primary"></i>
                                </div>
                                <h4 className="fw-bold mb-3">Expert Services</h4>
                                <p className="text-muted mb-0">
                                    Book sessions with certified beauty professionals for consultations, styling, and treatments.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-5 h-100 rounded-5 shadow-sm border-0 bg-white text-center hover-up transition-all">
                                <div className="mb-4 d-inline-block p-3 rounded-circle bg-light shadow-sm">
                                    <i className="bi bi-truck fs-2 text-primary"></i>
                                </div>
                                <h4 className="fw-bold mb-3">Fast Delivery</h4>
                                <p className="text-muted mb-0">
                                    Get your beauty essentials delivered to your doorstep within 24-48 hours.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomeComponent;
