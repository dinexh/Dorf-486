import './main_footer.css';
export const FooterData = {
    collaborations: {
        heading: "Our collaborations with Programs",
        links: [
            {
                title: "Government of Andhra Pradesh",
                url: "https://drive.google.com/file/d/1a-X9rWklMfXHZz10RdaTmsCVI3cwRdI8/view?usp=share_link"
            },
            {
                title: "Sansad Adarsh Gram Yojana",
                url: "https://saanjhi.gov.in"
            },
            {
                title: "GRAAM",
                url: "http://graam.org.in"
            },
            {
                title: "KL SAC",
                url: "https://sac.kluniversity.in/"
            }
        ]
    },
    contact: {
        heading: "Contact Us",
        links: [
            {
                title: "Instagram",
                url: "https://www.instagram.com/klusac_svr?igsh=eDVmZWNpeHR5N2h5",
                icon: "FaInstagram"
            },
            {
                title: "Telegram",
                url: "https://t.me/y23_svr_sac",
                icon: "FaTelegram"
            },
            {
                title: "Youtube",
                url: "https://www.youtube.com/watch?v=q9R8qWt3fmY",
                icon: "FaYoutube"
            }
        ]
    },
    quickLinks: {
        heading: "Quick Links",
        links: [
            { title: "About", scrollTo: "home-two" },
            { title: "Our Work", scrollTo: "home-seven" },
            { title: "Parameters", scrollTo: "home-five" },
            { title: "Annual Reports", scrollTo: "home-eight" },
            { title: "Gallery", url: "/gallery" },
            { title: "News", url: "/news" }
        ]
    },
    reference: {
        heading: "Reference Documents",
        links: [
            { title: "Awards List", url: "https://drive.google.com/file/d/1RdP4R6HnP5pt2cmLxvEKg6uilsyTVWZQ/view?usp=share_link" },
            { title: "Village Adopted", url: "https://drive.google.com/file/d/1hqXfW0VcCbDN8Dz_QDi3UuzMU1h7z96I/view?usp=share_link" },
            { title: "List of staff", url: "https://drive.google.com/file/d/1pi69cRuq_VUAc60UQ4v0USRNugUPoQhm/view?usp=share_link" }
        ]
    },
    address: {
        heading: "Official Address",
        links: [
            {
                title: "Smart Village Revolution (SVR)",
                isAddress: true
            },
            {
                title: "Student Activity Center (SAC)",
                isAddress: true
            },
            {
                title: "K L Deemed to be University",
                isAddress: true
            },
            {
                title: "Vaddeswaram, Guntur District",
                isAddress: true
            },
            {
                title: "Andhra Pradesh - 522302",
                isAddress: true
            }
        ]
    }
};

const Footer = () => {
    return (
        <div className="footer-component">
            <div className="footer-component-in">
                <div className="footer-component-in-header">
                    <h1>The goal of Smart Village Revolution (SVR) is to translate this comprehensive and organic vision of Mahatma Gandhi into reality, keeping in view the present context.</h1>
                </div>
                <div className="footer-component-in-main">
                    {Object.entries(FooterData).map(([key, section]) => (
                        <div key={key} className="footer-component-in-main-boxes">
                            <div className="footer-component-in-main-boxes-heading">
                                <h1>{section.heading}</h1>
                            </div>
                            <div className="footer-component-in-main-boxes-links">
                                {section.links.map((link, index) => (
                                    link.isAddress ? (
                                        <p key={index} className="address-line">
                                            {link.title}
                                        </p>
                                    ) : (
                                        <a 
                                            key={index} 
                                            href={link.url || `#${link.scrollTo}`}
                                            target={link.url ? "_blank" : "_self"}
                                            rel={link.url ? "noopener noreferrer" : ""}
                                        >
                                            {link.icon && <i className={link.icon} />}
                                            {link.title}
                                        </a>
                                    )
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="footer-component-in-main-copyright">
                    <p>This Site is Designed and Developed by <span><a href="https://dineshkorukonda.in">Dinesh Korukonda</a></span> of ZeroOne CodeClub , Department of <span> <a href="https://sac.kluniversity.in">Student Activity Center</a></span> , KLEF(Deemed to be University) | Content owned and Maintained by Smart Village Revolution Team</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;