

import { Link } from "react-router-dom";

const AboutUs = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="py-5 overflow-hidden" style={{ background: 'linear-gradient(135deg, #fff0f5 0%, #fff 100%)' }}>
                <div className="container py-5">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-6">
                            <h6 className="text-primary fw-bold text-uppercase mb-3 tracking-widest" style={{ letterSpacing: '2px' }}>Our Story</h6>
                            <h1 className="display-4 fw-bold mb-4" style={{ color: '#880e4f' }}>
                                Redefining Beauty <br />
                                <span className="text-primary">From the Inside Out</span>
                            </h1>
                            <p className="lead text-muted mb-5">
                                BeautyFTips was born from a simple belief: that everyone deserves access to premium beauty essentials that celebrate their unique self. We're not just a shop; we're your partner in self-care.
                            </p>
                            <div className="d-flex gap-3">
                                <Link to="/" className="btn btn-primary btn-lg px-5 rounded-pill shadow-sm transition-all text-decoration-none">
                                    Explore Products
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="position-relative">
                                <div className="position-absolute top-0 start-0 w-100 h-100 bg-primary opacity-10 rounded-5 translate-middle-x translate-middle-y" style={{ transform: 'translate(20px, 20px)' }}></div>
                                <img 
                                    src="/assets/beauty_hero.png" 
                                    alt="Beauty Products" 
                                    className="img-fluid rounded-5 shadow-lg position-relative"
                                    style={{ objectFit: 'cover', height: '500px', width: '100%' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-5">
                <div className="container py-5">
                    <div className="row g-4 justify-content-center">
                        <div className="col-md-4">
                            <div className="p-5 h-100 rounded-5 shadow-sm border-0 bg-light text-center hover-up transition-all">
                                <div className="mb-4 d-inline-block p-3 rounded-circle bg-white shadow-sm">
                                    <i className="bi bi-star-fill fs-2 text-primary"></i>
                                </div>
                                <h4 className="fw-bold mb-3">Premium Selection</h4>
                                <p className="text-muted mb-0">
                                    We meticulously curate our product listings to ensure you have access to the highest quality makeup, skincare, and beauty tools.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-5 h-100 rounded-5 shadow-sm border-0 bg-light text-center hover-up transition-all">
                                <div className="mb-4 d-inline-block p-3 rounded-circle bg-white shadow-sm">
                                    <i className="bi bi-heart-fill fs-2 text-primary"></i>
                                </div>
                                <h4 className="fw-bold mb-3">Community Driven</h4>
                                <p className="text-muted mb-0">
                                    Connect with others who share your passion. Discover routines, read honest reviews, and share your own beauty journey.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-5 h-100 rounded-5 shadow-sm border-0 bg-light text-center hover-up transition-all">
                                <div className="mb-4 d-inline-block p-3 rounded-circle bg-white shadow-sm">
                                    <i className="bi bi-shield-check fs-2 text-primary"></i>
                                </div>
                                <h4 className="fw-bold mb-3">Trusted Vendors</h4>
                                <p className="text-muted mb-0">
                                    Buy with confidence. Our sellers are verified, ensuring that every product you purchase is authentic and safe.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quote Section */}
            <section className="py-5 bg-primary text-white text-center">
                <div className="container py-5">
                    <i className="bi bi-quote display-1 opacity-25"></i>
                    <h2 className="display-6 fw-light italic mb-4">
                        "Real beauty is to be true to oneself. That's what makes us feel good."
                    </h2>
                    <div className="fw-bold text-uppercase tracking-widest">BeautyFTips Philosophy</div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-5 mb-5">
                <div className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="card border-0 shadow-lg rounded-5 overflow-hidden">
                                <div className="row g-0">
                                    <div className="col-md-6 bg-light p-5">
                                        <h3 className="fw-bold mb-4" style={{ color: '#880e4f' }}>Get In Touch</h3>
                                        <p className="text-muted mb-5">For personalised help, product recommendations, or vendor inquiries, feel free to reach out to us anytime.</p>
                                        
                                        <div className="d-flex align-items-center mb-4">
                                            <div className="bg-white p-2 rounded-3 shadow-sm me-3">
                                                <i className="bi bi-telephone-fill text-primary"></i>
                                            </div>
                                            <span className="fw-bold">0759432080</span>
                                        </div>
                                        
                                        <div className="d-flex align-items-center">
                                            <div className="bg-white p-2 rounded-3 shadow-sm me-3">
                                                <i className="bi bi-envelope-fill text-primary"></i>
                                            </div>
                                            <span className="fw-bold">hello@beautyftips.com</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6 bg-white p-5 d-flex flex-column justify-content-center">
                                        <h4 className="fw-bold mb-3">Office Location</h4>
                                        <p className="text-muted">
                                            Visit our headquarters for a physical consultation or to pick up your exclusive beauty kit.
                                        </p>
                                        <div className="mt-2">
                                            <i className="bi bi-geo-alt-fill text-primary me-2"></i>
                                            <span>Nairobi, Kenya - Central District</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AboutUs;