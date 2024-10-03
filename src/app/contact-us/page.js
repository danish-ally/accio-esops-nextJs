import ContactForm from "@/components/contactForm/ContactForm";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Navbar from "@/components/navbar/Navbar";
import { headers } from 'next/headers';


async function fetchMetaByUrlmask(url) {

    console.log("page-url", url)
    const fetchMetaByUrlmaskResponse = await fetch(`${process.env.API_BASE_URL}/api/v1/seo/pageUrl?pageUrl=${url}`, {
        // cache: "force-cache", ///< SSG getStaticSideProps
        cache: "no-store", ///< SSR getServerSideProps
        // next: {
        //   revalidate: 20, ///< ISR revalidate
        // },
    });

    // await wait(4000);


    return fetchMetaByUrlmaskResponse.json();
}

export default async function Page({ params }) {
    return (
        <div>
            <ContactForm />
        </div>
    )
}


export async function generateMetadata({ params }) {

    const headersList = headers();
    const currentPageURL = headersList.get('referer') || "";

    // Use currentPageURL as needed
    console.log('Current Pages URL:', currentPageURL);


    const pageMetadata = await fetchMetaByUrlmask(currentPageURL);
    console.log("metadata", pageMetadata)
    const seoKeywordsString = pageMetadata?.seo?.seoKeywords || ''; // Ensure it's not undefined
    const seoKeywordsArray = seoKeywordsString.split(',');

    console.log(seoKeywordsArray);

    return {

        title: pageMetadata?.seo?.seoTitle || '',
        description: pageMetadata?.seo?.seoDescription || '',
        keywords: seoKeywordsArray,
        openGraph: {
            title: pageMetadata?.seo?.ogTitle || '',
            // description: 'The React Framework for the Web',
            url: pageMetadata?.seo?.ogUrl || '',
            // siteName: 'Next.js',
            images: [
                {
                    url: pageMetadata?.seo?.ogImageUrl,
                    // width: 800,
                    // height: 600,
                }
            ],
            // locale: 'en_US',
            type: 'website',
        },
    }
}