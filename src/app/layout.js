import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/header/Header'
import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'
import Script from 'next/script'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'accioesops.com',
  description: 'We make Employee Stock Option Plans ESOPs easy-on-the-pocket, fast, and convenient kind of like ordering fast food!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script src='/GTM.js' />
        {/* <script>
          {`(function(w,d,s,l,i){
            w[l] = w[l] || [];
            w[l].push({'gtm.start': new Date().getTime(), event: 'gtm.js'});
            var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
          })(window, document, 'script', 'dataLayer', 'GTM-TZXJJ9C4');`}
        </script> */}


        {/* START <!-- Google tag (gtag.js) --> */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=AW-11111864025" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || []; 
            function gtag(){dataLayer.push(arguments);} 
            gtag('js', new Date()); 
            gtag('config', 'AW-11111864025'); 
        `}
        </Script>

        {/* END <!-- Google tag (gtag.js) --> */}

        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Raleway:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"></link>
      </head>
      <body className={inter.className}>
        {/* <!-- Google Tag Manager (noscript) --> */}
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TZXJJ9C4" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe>
        </noscript>
        {/* <!-- End Google Tag Manager (noscript) --> */}
        {/* <Header /> */}
        <Navbar />
        <div className="flex1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}

