
import React from 'react';
import styles from './Footer.module.css';
import Link from 'next/link';

const Footer = () => {

    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className='container mx-auto pl-4 pr-4'>
                <div className='md:flex justify-between footer_logo_wrepp'>
                    <div className='footer_logo'>
                        <img src="/logo.png" alt="Logo" />
                    </div>
                    <div className='footer_logo_social'>
                        <ul>
                            <li>
                                <img src="/telephone.png" alt="telephone" />
                                <a href='tel:+918040245425'>

                                    +91 8040245425
                                </a>
                            </li>
                            <li>
                                <img src="/mail.png" alt="mail" />
                                <a href='mailto:support@accioesops.com'>

                                    support@accioesops.com
                                </a>
                            </li>
                            <li>
                                Connect with us
                            </li>
                            <li>
                                <div className='social_img'>
                                    <a target='_blank' href='https://instagram.com/accioesops?igshid=MzRlODBiNWFlZA=='><img src="/instagram.png" alt="Logo" /></a>
                                    <a target='_blank' href='https://www.facebook.com/profile.php?id=61552559650091'><img src="/facebook.png" alt="Logo" /></a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='md:flex justify-between'>
                    <div className={styles.socialLinks}>
                        <ul>
                            {/* <li>Follow us on:</li>
                            <li><a href='https://www.facebook.com/profile.php?id=61552559650091' target='_blank'>Facebook</a>,</li>
                            <li><a href='https://instagram.com/accioesops?igshid=MzRlODBiNWFlZA==' target='_blank'>Instagram</a>,</li> */}
                            <li>
                                <Link href="/cookies-policy">Cookies Policy</Link>
                            </li>
                            <li>
                                <Link href="/privacy-policy">Privacy policy</Link>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.copyright}>
                        <p>&copy; {currentYear} All Rights Reserved </p>
                    </div>
                </div>
            </div>

        </footer>
    );
};

export default Footer;
