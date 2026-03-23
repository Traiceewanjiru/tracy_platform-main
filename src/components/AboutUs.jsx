import Navbar from "./Navbar";

const AboutUs = () => {
    return (
        <div className="row justify-content-center md-4">
            <Navbar />
            <h2 className="text-info text-center">Why us</h2>
            <p className="text-dark text-center">You can choose us because we link you with those in the same field as you.</p>
            <div className="col-md-4">

                <h4 className="text-success">BENEFITS</h4>
                <h5 className="text-dark">WE DEAL WITH THOSE WITH:</h5>
                <ol>
                    <li>Depression issues</li>
                    <li>Postpartum depression</li>
                    <li>Survivor cancer patients</li>
                    <li>Diabetes patients mental health</li>
                    <li>Stress issues</li>
                </ol>
            </div>

            <div className="col-md-4">
                <h4 className="text-success">FEATURES</h4>
                <ul>
                    <li>Help from us to get treated</li>
                    <li>Connect to those having the same issues</li>
                    <li>Guidance from professionals</li>
                    <li>Awareness to the public</li>
                </ul>
            </div>

            <div className="col-md-4">
                <h4 className="text-success">Contact us</h4>
                <b>0759432080</b>
                <br />
                <b>mwanikitracy14@gmail.com</b>
                <p>For personalised help and guidance feel free to call us.</p>
                <p>Email us your journey to be shared and help others.</p>
            </div>

        </div>
    );
}

export default AboutUs;