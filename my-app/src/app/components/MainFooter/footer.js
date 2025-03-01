import React from 'react';
import Image from 'next/image';
import Tree from '../../Assets/Tree.png';
import { Link as ScrollLink } from 'react-scroll';
import './Footer.css';
import Link from 'next/link';   
import { FaInstagram, FaYoutube,FaTelegram } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="Footer">
      <div className="Footer-in">
        <div className="Footer-one">
          <div className="Footer-one-in">
            <h1>The goal of Smart Village Revolution (SVR) is to translate this comprehensive and organic vision of Mahatma Gandhi into reality, keeping in view the present context.</h1>
          </div>
        </div>
        <div className="Footer-two">
          <div className="Footer-two-in">
            <div className="Footer-two-in-one">
              <div className="Footer-two-in-one-in">
                <div className="Footer-two-in-one-in-one">
                  <Image src={Tree} alt="Tree" width={200} height={200} />
                </div>
                <div className="Footer-two-in-one-in-two">
                  <p>Grassroots Research and Advocacy Movement (GRAAM) is an Indian public policy initiative specializing in research, evaluation, community consultation, policy engagement, strategic consultation, and academic programs.</p>
                </div>
              </div>
            </div>
            <div className="Footer-two-in-two">
              <div className="Footer-two-in-two-in">
                <div className="Footer-two-in-two-in-boxes">
                  <div className="Footer-two-in-two-in-boxes-in">
                    <h3>Our collaborations with Programs</h3>
                    <ul>
                      <li>
                        <Link href="https://drive.google.com/file/d/1a-X9rWklMfXHZz10RdaTmsCVI3cwRdI8/view?usp=share_link" target='_blank' rel="noopener">Goverment of Andhra Pradesh</Link>
                      </li>
                      <li>
                        <Link href="https://saanjhi.gov.in" legacyBehavior>
                          <a target="_blank" rel="noopener noreferrer">Sansad Adarsh Gram Yojana</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="http://graam.org.in" legacyBehavior>
                        <a target="_blank" rel="noopener noreferrer">GRAAM</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="https://sac.kluniversity.in/" target="_blank" rel="noopener noreferrer">KL SAC</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="Footer-two-in-two-in-boxes">
                  <div className="Footer-two-in-two-in-boxes-in">
                    <h3>Contact Us</h3>
                    <ul>
                      <li>
                        <Link href="https://www.instagram.com/klusac_svr?igsh=eDVmZWNpeHR5N2h5" target="_blank" rel="noopener noreferrer"><FaInstagram /> Instagram</Link>
                      </li>
                      <li>
                        <Link href="https://t.me/y23_svr_sac" target="_blank" rel="noopener noreferrer"><FaTelegram /> Telegram</Link>
                      </li>
                      <li>
                        <Link href="https://www.youtube.com/watch?v=q9R8qWt3fmY" target="_blank" rel="noopener noreferrer"><FaYoutube /> Youtube</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="Footer-two-in-two-in-boxes">
                  <div className="Footer-two-in-two-in-boxes-in">
                    <h3>Quick Links</h3>
                    <ul>
                      <li>
                        <ScrollLink to="home-two" offset={-70} smooth={true} duration={600}>About</ScrollLink>
                      </li>
                      <li>
                        <ScrollLink to="home-seven" offset={-70} smooth={true} duration={600}>Our Work</ScrollLink>
                      </li>
                      <li>
                        <ScrollLink to="home-five" offset={-70} smooth={true} duration={600}>Parameters</ScrollLink>
                      </li>
                      <li>
                        <ScrollLink to="home-eight" offset={-70} smooth={true} duration={600}>Annual Reports</ScrollLink>
                      </li>
                      {/* <li>
                        <a href="https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.kluniversity.in/AQAR1819/SV.pdf&ved=2ahUKEwiazc3rrIGIAxUXklYBHfDTB-cQFnoECBUQAQ&usg=AOvVaw2FAQC3fzLhntiGTqlCW4vx" target="_blank" rel="noopener noreferrer">Past Year Reports</a>
                      </li> */}
                      <li>
                        <Link href='https://drive.google.com/file/d/1RdP4R6HnP5pt2cmLxvEKg6uilsyTVWZQ/view?usp=share_link'> Awards List</Link>
                      </li>
                      <li>
                        <Link href='https://drive.google.com/file/d/1hqXfW0VcCbDN8Dz_QDi3UuzMU1h7z96I/view?usp=share_link'>Village Adopted</Link>
                      </li>
                      <li>
                        <Link href='https://drive.google.com/file/d/1pi69cRuq_VUAc60UQ4v0USRNugUPoQhm/view?usp=share_link'>List of staff</Link>
                      </li>
                      <li>
                        <Link href='/gallery'> Gallery</Link>
                      </li>
                      <li>
                        <Link href='/news'> News</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Footer-last">
          <div className="Footer-last-in">
            <p>This site is designed & Developed by <a href="https://dineshkorukonda.in/" target='_blank'>Dinesh Korukonda</a> of <a href="https://klzeroone.vercel.app/" target='_blank'>ZeroOne CodeClub</a> | Department of Student Activity Center, KLEF(Deemed to be University) | Content owned by Smart Village Revolution.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
