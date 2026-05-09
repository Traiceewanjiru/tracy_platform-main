import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignInComponent = () => {
    let [email, updateEmail] = useState("");
    let [password, updatePassword] = useState("");

    let [loading, setLoading] = useState("");
    let [success, setSuccess] = useState("");
    let [error, setError] = useState("");
    let [showPassword, setShowPassword] = useState(false);

    // create a variable for useNavigate
    let navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();

        // notify the user to wait
        setError("")
        setSuccess("")
        setLoading("Please wait ...")

        // try send data to server
        try {
            // create form data
            const user_data = new FormData()
            user_data.append("email", email);
            user_data.append("password", password);

            const response = await axios.post("https://tracymwaniki.alwaysdata.net/api/signin", user_data);

            console.log(response.data.user)
            if (response.status === 200) {
                if (response.status === 200 && response.data.user) {
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                    window.location.href = "/";
                }
            }
        } catch (error) {
            console.log(error);
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                setError("Invalid credentials.");
            } else {
                setError("Something went wrong. Please check your connection.");
            }
            setLoading("");
        }
    }
    return (
        <div className="row justify-content-center align-items-center min-vh-100 py-5">
            <div className="col-md-5">
                <div className="card shadow-lg p-5 border-0 rounded-5 bg-white">
                    <div className="text-center mb-5">
                        <div className="mb-3 d-inline-block p-3 rounded-circle bg-light">
                            <i className="bi bi-person-heart fs-1 text-primary"></i>
                        </div>
                        <h2 className="fw-bold text-dark">Welcome Back</h2>
                        <p className="text-muted">Sign in to your Seluna Beauty profile</p>
                    </div>

                    {loading && <div className="alert alert-info py-2 rounded-pill text-center small animate-fade-in">{loading}</div>}
                    {error && <div className="alert alert-danger py-2 rounded-pill text-center small animate-fade-in">{error}</div>}
                    {success && <div className="alert alert-success py-2 rounded-pill text-center small animate-fade-in">{success}</div>}

                    <form onSubmit={handleSubmit} className="mt-4">
                        <div className="mb-4">
                            <label className="form-label small fw-bold text-muted text-uppercase ms-2">Email Address</label>
                            <div className="input-group input-group-lg rounded-pill overflow-hidden bg-light border-0 shadow-sm">
                                <span className="input-group-text bg-transparent border-0 ps-4">
                                    <i className="bi bi-envelope text-primary"></i>
                                </span>
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="form-control bg-transparent border-0 py-3 shadow-none"
                                    required
                                    onChange={(e) => updateEmail(e.target.value)}
                                    value={email}
                                />
                            </div>
                        </div>
                        <div className="mb-5">
                            <label className="form-label small fw-bold text-muted text-uppercase ms-2">Password</label>
                            <div className="input-group input-group-lg rounded-pill overflow-hidden bg-light border-0 shadow-sm">
                                <span className="input-group-text bg-transparent border-0 ps-4">
                                    <i className="bi bi-lock text-primary"></i>
                                </span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="form-control bg-transparent border-0 py-3 shadow-none"
                                    required
                                    onChange={(e) => updatePassword(e.target.value)}
                                    value={password}
                                />
                                <button
                                    className="btn border-0 pe-4 shadow-none text-muted"
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <i className={`bi bi-eye${showPassword ? '-slash' : ''}`}></i>
                                </button>
                            </div>
                        </div>
                        <button className="btn btn-primary btn-lg w-100 rounded-pill py-3 fw-bold shadow-sm transition-all mb-4">
                            Sign In
                        </button>

                        <div className="text-center">
                            <p className="text-muted mb-0">Don't have an account?</p>
                            <Link to="/signup" className="text-primary fw-bold text-decoration-none hover-up d-inline-block mt-2">
                                Create New Account
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignInComponent;