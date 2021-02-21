

import logo from '../../assets/imgs/mamovies-logo.png';

const Footer = (props)=>{
    return (
        
      <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-8 col-md-8 col-lg-6 text-left footer-brand ">
            <a
              id="brand-logo"
              className="navbar-brand mr-3 ma"
              href="/">
             <img className='img-fluid' src={logo} alt="MaMovies" />
            </a>
            <p>
              This website gets its data from themoviedb API, we only use it here
              to practice. We aspire that you would enjoy your visit to our application
               and hopefully you will come back again!
            </p>
          </div>

          <div className="col-12 col-sm-4 col-md-4 col-lg-3 text-left  helpful-links ">
            <h6>Social Links</h6>
            <div className="row ">
              <div className="col">
                <ul className="footer-links1">
                  <li>
                    <a href="https://www.linkedin.com/in/nour-wagdy-932918184">Linkedin</a>
                  </li>
                  <li>
                    <a href="https://github.com/NourBasha">Github</a>
                  </li>
                  <li>
                    <a href="https://www.facebook.com/nour.wagdy.334839">Facebook</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-3 text-left footer-address">
            <h6>Contact Us</h6>
            <ul>
              <li>Phone: +201020696796</li>
              <li>
                Email: <a href="/">Nour.basha2011@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  
    )
}

export default Footer;