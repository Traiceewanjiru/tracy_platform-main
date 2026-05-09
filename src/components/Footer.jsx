const Footer = () => {
    return ( 
        <footer className="footer">
         <div className="footer-content">
            <p className="footer-copy center">
                 &copy; {new Date().getFullYear()} Tracy Platform. All rights reserved.
            </p>
         </div>
        </footer>
     );
}
 
export default Footer;