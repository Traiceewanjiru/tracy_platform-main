import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignUpComponent = () => {
    let [username, updateUsername] = useState("");
    let [email, updateEmail] = useState("");
    let [phone, updatePhone] = useState("");
    let [password, updatePassword] = useState("");

    let [loading, setLoading] = useState("");
    let [error, setError] = useState("");
    let [success, setSuccess] = useState("");
    let [showPassword, setShowPassword] = useState(false);

    const validatePassword = (pass) => {
        const minLength = 8;
        const hasLetter = /[a-zA-Z]/.test(pass);
        const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
        
        if (!pass) return null;
        if (pass.length < minLength) return "Weak: At least 8 characters required.";
        if (!hasLetter) return "Medium: Add at least one letter.";
        if (!hasSymbol) return "Almost there: Add a special symbol.";
        return "Strong password";
    };

    const passwordFeedback = validatePassword(password);
    const isPasswordStrong = passwordFeedback === "Strong password";
    const feedbackColor = isPasswordStrong ? "text-success" : (passwordFeedback?.startsWith("Weak") ? "text-danger" : "text-warning");
    
    const handleSubmit = async (e) => {
        // prevent default behaviour
        e.preventDefault();

        setError("");
        setSuccess("");

        if (!isPasswordStrong) {
            setError(passwordFeedback || "Please enter a strong password.");
            return;
        }

        setLoading("Creating your Seluna profile...");

        // try send data to server
        try {
            // create form data
            const user_data = new FormData()
            user_data.append("username", username);
            user_data.append("email", email);
            user_data.append("phone", phone);
            user_data.append("password", password);

            // use axios to send data to server
            const response = await axios.post("https://tracymwaniki.alwaysdata.net/api/signup", user_data)
            if (response.status === 200) {
                setSuccess(response.data.message);
                setLoading("");
                updateUsername("");
                updateEmail("");
                updatePhone("");
                updatePassword("");
            }
        } catch (error) {
            console.log(error);
            setError(error.message);
            setLoading("");
        }
    };

    return (
        <div className="row justify-content-center align-items-center min-vh-100 py-5">
            <div className="col-md-6 col-lg-5">
                <div className="card shadow-lg p-5 border-0 rounded-5 bg-white">
                    <div className="text-center mb-5">
                        <div className="mb-3 d-inline-block p-3 rounded-circle bg-light">
                            <i className="bi bi-person-plus-fill fs-1 text-primary"></i>
                        </div>
                        <h2 className="fw-bold text-dark">Join Us</h2>
                        <p className="text-muted">Start your journey with Seluna Beauty</p>
                    </div>
                    
                    {loading && <div className="alert alert-info py-2 rounded-pill text-center small animate-fade-in">{loading}</div>}
                    {error && <div className="alert alert-danger py-2 rounded-pill text-center small animate-fade-in">{error}</div>}
                    {success && <div className="alert alert-success py-2 rounded-pill text-center small animate-fade-in">{success}</div>}
                    
                    <form onSubmit={handleSubmit} className="mt-4">
                        <div className="mb-4">
                            <label className="form-label small fw-bold text-muted text-uppercase ms-2">Username</label>
                            <div className="input-group input-group-lg rounded-pill overflow-hidden bg-light border-0 shadow-sm">
                                <span className="input-group-text bg-transparent border-0 ps-4">
                                    <i className="bi bi-person text-primary"></i>
                                </span>
                                <input
                                    type="text"
                                    className="form-control bg-transparent border-0 py-3 shadow-none"
                                    placeholder="yourname"
                                    required
                                    onChange={(e) => updateUsername(e.target.value)}
                                    value={username}
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="form-label small fw-bold text-muted text-uppercase ms-2">Email Address</label>
                            <div className="input-group input-group-lg rounded-pill overflow-hidden bg-light border-0 shadow-sm">
                                <span className="input-group-text bg-transparent border-0 ps-4">
                                    <i className="bi bi-envelope text-primary"></i>
                                </span>
                                <input
                                    type="email"
                                    className="form-control bg-transparent border-0 py-3 shadow-none"
                                    placeholder="your@email.com"
                                    required
                                    onChange={(e) => updateEmail(e.target.value)}
                                    value={email}
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="form-label small fw-bold text-muted text-uppercase ms-2">Phone Number</label>
                            <div className="input-group input-group-lg rounded-pill overflow-hidden bg-light border-0 shadow-sm">
                                <span className="input-group-text bg-transparent border-0 ps-4">
                                    <i className="bi bi-telephone text-primary"></i>
                                </span>
                                <input
                                    type="tel"
                                    className="form-control bg-transparent border-0 py-3 shadow-none"
                                    placeholder="2547..."
                                    required
                                    onChange={(e) => updatePhone(e.target.value)}
                                    value={phone}
                                />
                            </div>
                        </div>
                        <div className="mb-5">
                            <label className="form-label small fw-bold text-muted text-uppercase ms-2">Create Password</label>
                            <div className="input-group input-group-lg rounded-pill overflow-hidden bg-light border-0 shadow-sm">
                                <span className="input-group-text bg-transparent border-0 ps-4">
                                    <i className="bi bi-lock text-primary"></i>
                                </span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control bg-transparent border-0 py-3 shadow-none"
                                    placeholder="••••••••"
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
                            <div className="mt-2 ms-2">
                                {password && (
                                    <p className={`small fw-bold mb-1 ${feedbackColor} animate-fade-in`}>
                                        {passwordFeedback}
                                    </p>
                                )}
                                <p className="text-muted small mb-0">8+ chars, letters & symbols required</p>
                            </div>
                        </div>
                        <button 
                            className="btn btn-primary btn-lg w-100 rounded-pill py-3 fw-bold shadow-sm transition-all mb-4"
                            disabled={!isPasswordStrong || !!loading}
                        >
                            Create Account
                        </button>
                        
                        <div className="text-center">
                            <p className="text-muted mb-0">Already have an account?</p>
                            <Link to="/signin" className="text-primary fw-bold text-decoration-none hover-up d-inline-block mt-2">
                                Sign In Instead
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUpComponent;