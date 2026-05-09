import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const cart = JSON.parse(localStorage.getItem("beautyCart")) || [];
    const location = useLocation();

    let navigator = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        navigator("/signin");
    };

    const isActive = (path) => location.pathname === path ? "active fw-bold" : "";

    return (
        <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3">
            <div className="container">
                <Link className="navbar-brand d-flex align-items-center fs-4 fw-bold text-primary" to='/'>
                    Seluna Beauty
                </Link>
                <button className="navbar-toggler border-0 shadow-none" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav mx-auto gap-2">
                        <Link className={`nav-link px-3 ${isActive('/')}`} to="/">Home</Link>
                        <Link className={`nav-link px-3 ${isActive('/products')}`} to="/products">Our Products</Link>
                        <Link className={`nav-link px-3 ${isActive('/services')}`} to="/services">Our Services</Link>
                        <Link className={`nav-link px-3 ${isActive('/aboutus')}`} to="/aboutus">About Us</Link>
                        {user && user.role === "admin" && (
                            <>
                                <Link className={`nav-link px-3 ${isActive('/addproduct')}`} to="/addproduct">
                                    Add Product
                                </Link>
                                <Link className={`nav-link px-3 ${isActive('/addservice')}`} to="/addservice">
                                    Add Service
                                </Link>
                            </>
                        )}
                    </div>

                    <div className="navbar-nav align-items-center gap-3">
                        <Link className={`nav-link position-relative px-3 ${isActive('/cart')}`} to="/cart">
                            <i className="bi bi-cart3 fs-5 text-dark"></i>
                            {cart.length > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {cart.length}
                                </span>
                            )}
                        </Link>
                        
                        {user ? (
                            <div className="d-flex align-items-center gap-3">
                                <span className="text-muted fw-medium">Hello, <span className="text-primary">{user.username}</span></span>
                                <button className="btn btn-outline-danger px-4 py-2" onClick={handleLogout}>Log Out</button>
                            </div>
                        ) : (
                            <div className="d-flex gap-2 mt-3 mt-lg-0">
                                <Link className="btn btn-outline-primary px-4 py-2" to="/signin">Sign In</Link>
                                <Link className="btn btn-primary px-4 py-2" to="/signup">Sign Up</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
