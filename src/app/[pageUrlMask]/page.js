import PageContent from "@/components/displayHTMLContent/displayHTMLContent";
import NotFound from "./not-found";
import styles from "../page.module.css";
import { headers } from "next/headers";
import Navbar from "@/components/navbar/Navbar";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import SatisfiedClientSlider from "@/components/satisfiedClientSlider/SatisfiedClientSlider";
import ToldYouSection from "@/components/toldYouSection/ToldYouSection";
import Head from "next/head";
import Script from "next/script";

async function fetchPageByUrlmask(urlmask) {
  console.log("ddafdasf", urlmask);
  const pageResponse = await fetch(
    `${process.env.API_BASE_URL}/api/v1/page/url?url=${urlmask}`,
    {
      // cache: "force-cache", ///< SSG getStaticSideProps
      cache: "no-store", ///< SSR getServerSideProps
      // next: {
      //   revalidate: 20, ///< ISR revalidate
      // },
    }
  );

  // await wait(4000);

  return pageResponse.json();
}

async function fetchMetaByUrlmask(url) {
  console.log("page-url", url);
  const fetchMetaByUrlmaskResponse = await fetch(
    `${process.env.API_BASE_URL}/api/v1/seo/pageUrl?pageUrl=${url}`,
    {
      // cache: "force-cache", ///< SSG getStaticSideProps
      cache: "no-store", ///< SSR getServerSideProps
      // next: {
      //   revalidate: 20, ///< ISR revalidate
      // },
    }
  );

  // await wait(4000);

  return fetchMetaByUrlmaskResponse.json();
}

export default async function Page({ params, searchParams }) {
    let obj = null
    if(searchParams?.info ){
        const base64Pattern = /^([A-Za-z0-9+/=]{4})*([A-Za-z0-9+/=]{2}==|[A-Za-z0-9+/=]{3}=)?$/;
        if(base64Pattern.test(searchParams?.info)){
            const base64String = searchParams.info
            const decodedString = atob(base64String);
            obj = JSON.parse(decodedString);
        }
        
    }
    
  console.log("data", obj)
  const page = await fetchPageByUrlmask(params.pageUrlMask);
  const html = page?.page?.content || page.message;
  const name = page?.page?.name;
  const status = page?.page?.status;
  // const pagestyle = page?.page?.pagestyle || ``
  console.log("html: ", html);
  const aboutUsUrl = process.env.API_BASE_URL + "/about-us";
  console.log("aboutus url", aboutUsUrl);

  const clients = [
    {
      image: "/sebastian.png",
      name: "Sebastian Schaffarczyk",
      desg: "Director, AdStart Media Pte. Ltd., Singapore",
      desc: "I highly recommend Komal for her exceptional guidance and expertise in implementing our Phantom Stock Option (PSOP) scheme. Our initial uncertainty about phantom stock options was quickly dispelled thanks to her insightful explanations, which effectively clarified the distinctions between employee stock options and phantom stock options. She played a pivotal role in drafting our customized Phantom Stock Option scheme, ensuring it aligned perfectly with our organizational goals and requirements. Furthermore, when questions arose from our staff regarding the intricacies of phantom stock options, Komal provided invaluable assistance, leaving no query unanswered. I would highly recommend her.",
    },
    {
      image: "/christina.png",
      name: "Christina Sok",
      desg: "Founder, Classbubs Pte. Ltd., Singapore",
      desc: "Komal helped us with our investment transaction and completing our ESOP plan. She delivered the work quickly and efficiently and was there to clarify any doubts that we had. She understands these topics very well. I would certainly recommend her for any work related to ESOPs.",
    },
    {
      image: "/bhavuk.png",
      name: "Bhavuk Chawla",
      desg: "Founder, DataCouch",
      desc: "Quite a few founders are looking to use ESOPs as retention tools, and if you are looking to set up and install an ESOP plan in your company, Komal and the guys at AccioESOPs will take care of all the requirements right from planning to completing all filings. I would recommend them to any founder who is looking to implement ESOPs in their companies.",
    },
  ];

  const isThankYouPage = params.pageUrlMask === "thank-you";
  const email = typeof window !== "undefined" ? sessionStorage.getItem("email") : "";
  const phoneNo = typeof window !== "undefined" ? sessionStorage.getItem("phoneNo") : "";

  console.log("window",email)
  return (
    <div>
      {isThankYouPage && obj && (
        <Script id="data-layer-script" strategy="afterInteractive">
          {`
                  window.dataLayer = window.dataLayer || [];
                  dataLayer.push({
                    'event': 'ec_form_submit',
                    'user_data': {
                      "email": "${obj.email}", 
                      "phone_number": "+${obj.countryCode+obj.phone}"
                    }
                  });
                `}
        </Script>
      )}

      {html !== "Page not found" && status === "Active" ? (
        <div className={params.pageUrlMask}>
          <div className="bannerWrepp">
            <div className="mx-auto container pl-4 pr-4">
              <h2>{name}</h2>
            </div>
          </div>
          <div className="MainContentPage">
            <div>
              <div className="mx-auto container pl-4 pr-4">
                <div className="md:flex width-100">
                  <div className="pt-4 pb-4 width-100">
                    <PageContent html={html} />
                  </div>
                </div>
              </div>
              {params.pageUrlMask === "about-us" ? (
                <div>
                  {/* <div className={styles.accioEsopSection}>
                                        <div className="container mx-auto">
                                            <div className="reverse_row md:flex justify-between">
                                                <div className="w-2/3 pl-4 pr-4 section_4">
                                                    <h2> What is AccioESOPS </h2>
                                                    <p>

                                                        AccioESOPS is a consulting firm fully focussing on startups,
                                                        managed by experienced startup operators, lawyers and finance
                                                        experts.Whether you need guidance on contractual issues,
                                                        valuation, tax or regulatory regime, you can bet we have the
                                                        right consultants at hand to assist you.
                                                    </p>
                                                    <p>
                                                        What we are not : we are not a law firm, nor a CPA or CA
                                                        firm.We consult you to structure & launch your ESOPs.If we
                                                        need to hire any lawyer, CA, CPA, or valuation expert in the
                                                        process, we will take care of that on your behalf, with no
                                                        additional cost to you.
                                                    </p>
                                                </div>
                                                <div className="w-1/3 pl-4 pr-4 section_4">
                                                    <img src="/forex-trade.png" alt="forxtrade" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.diffrence}>
                                        <div className="container mx-auto">
                                            <div className="md:flex justify-between">
                                                <div className="w-2/5 pl-4 pr-4 section_5">
                                                    <img src="/diffrence.png" alt="diffrence" />
                                                </div>
                                                <div className="w-3/5 pl-4 pr-4 section_5">
                                                    <h2> The Difference: What Sets Us Apart? </h2>
                                                    <p>

                                                        <strong>The cost conundrum:</strong> We are offering you the
                                                        best available services in the market at a cost that is
                                                        severed orders lower than typical service providers. We are
                                                        not looking to make a profit out of your need. Rather, we
                                                        would like to build a long term relationship based on mutual
                                                        trust.
                                                    </p>
                                                    <p>
                                                        <strong>The talent pool:</strong> We have a large
                                                        international talent pool across the world thanks to our
                                                        association with SkillArbitrage and LawSikho. Tier 1
                                                        consulting companies and law firms would not or cannot hire
                                                        these talents but being fully remote we can and we do.
                                                    </p>
                                                    <p>
                                                        <strong>The flexibility factor:</strong> Your job is not a
                                                        routine, run-of-the-mill task  to us. We can devote time and
                                                        resources to hear you out, understand your unique needs and
                                                        draft customized ESOP plans and other documentation. We do not
                                                        believe in templatization, a shortcoming that most service
                                                        providers suffer from.
                                                    </p>
                                                    <p>
                                                        <strong>On time delivery:</strong> We promise clear timelines
                                                        in writing & ensure on time delivery for every task we
                                                        undertake.
                                                    </p>
                                                    <p>
                                                        <strong>The startup kinship:</strong> We have evolved from a
                                                        startup ourselves. Thus we are fully familiar with the
                                                        problems and nuances of the running of a startup, another edge
                                                        we have over the competition.
                                                    </p>
                                                    <p>
                                                        We have painstakingly put together the most awesome ESOP
                                                        solutions in the world for you. Why experiment with others for
                                                        whom this is just another gig when for us this is all we do?
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}

                  <div className="Satisfied SatisfiedClint">
                    <div className="container mx-auto pl-4 pr-4">
                      <h2>Satisfied Clients</h2>
                      <SatisfiedClientSlider clients={clients} />
                    </div>
                  </div>

                  {/* <div className="told_you">
                                        <div className="container mx-auto pl-4 pr-4">
                                            <h2>We told you this isn’t our first rodeo! We hope to add you to our list of clients happy with their ESOP policies.</h2>
                                            <button>
                                                BOOK A CALL NOW
                                            </button>
                                        </div>
                                    </div> */}
                  <ToldYouSection />
                  <div className="contectinformation">
                    <div className="container mx-auto">
                      <div className="md:flex justify-between">
                        <div className="w-2/6 pl-4 pr-4">
                          <img alt="india" src="/footercall.png" />
                          <h2 className="contect_mt">Contact information</h2>
                          <h4>
                            Contact Number:{" "}
                            <a href="tel:+918040245425">+91 80 40245425</a>{" "}
                          </h4>
                          <h4>
                            Email:{" "}
                            <a href="mailto:support@accioesops.com">
                              support@accioesops.com
                            </a>
                          </h4>
                        </div>
                        <div className="w-2/6 pl-4 pr-4">
                          <img alt="india" src="/india.png" />
                          <h3>India Office:</h3>
                          <p>
                            accioESOPs, Space Creattors Heights, 3rd floor,
                            Landmark Cyber Park, Golf Course Extension, Sector
                            67, Gurgaon, <br /> Haryana - 122102
                          </p>
                        </div>
                        <div className="w-2/6 pl-4 pr-4">
                          <img alt="usa" src="/usa.png" />
                          <h3>USA Office: </h3>
                          <p>8, The Green, STE B, Dover, Delaware 19901 </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        <>
          <NotFound />
        </>
      )}
    </div>
  );
}

export async function generateMetadata({ params }) {
  const headersList = headers();
  const currentPageURL = headersList.get("referer") || "";

  // Use currentPageURL as needed
  console.log("Current Pages URL:", currentPageURL);
  const pageMetadata = await fetchMetaByUrlmask(currentPageURL);
  console.log("metadata", pageMetadata);
  const seoKeywordsString = pageMetadata?.seo?.seoKeywords || ""; // Ensure it's not undefined
  const seoKeywordsArray = seoKeywordsString.split(",");

  console.log(seoKeywordsArray);

  return {
    title: pageMetadata?.seo?.seoTitle || "",
    description: pageMetadata?.seo?.seoDescription || "",
    keywords: seoKeywordsArray,
    openGraph: {
      title: pageMetadata?.seo?.ogTitle || "",
      // description: 'The React Framework for the Web',
      url: pageMetadata?.seo?.ogUrl || "",
      // siteName: 'Next.js',
      images: [
        {
          url: pageMetadata?.seo?.ogImageUrl,
          // width: 800,
          // height: 600,
        },
      ],
      // locale: 'en_US',
      type: "website",
    },
  };
}
