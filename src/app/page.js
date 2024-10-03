"use client"; // This is a client component 👈🏽
import BookACallForm from "@/components/bookACallForm/BookACallForm";
import Navbar from "@/components/navbar/Navbar";
import styles from "./page.module.css";
// import Logo from "../../../public/logo.png"
import Image from "next/image";
import WinningTeamCard from "@/components/winningTeamCard/WinningTeamCard";
import Footer from "@/components/footer/Footer";
import SatisfiedClientSlider from "@/components/satisfiedClientSlider/SatisfiedClientSlider";
import Komal from "../../public/komal.png";
import Mudassar from "../../public/nazar.png";
import Sapna from "../../public/sapna.png";
import Pinky from "../../public/pretty-woman.png";
import whatnext from "../../public/medium-shot.png";
import forxtrade from "../../public/forex-trade.png";
import diffrence from "../../public/diffrence.png";
import announced from "../../public/announced.png";
import NotFound from "./[pageUrlMask]/not-found";
import { useSearchParams } from 'next/navigation'

export default function Page() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clients = [
    {
      image: "/pankaj.jpg",
      name: "Pankaj Poddar",
      desg: "General Partner, SuperMorpheus Fund",
      desc: "When it comes to creating ESOPs, you are looking for someone who has the expertise and someone you can trust. Komal and the team at AccioESOPs have both in plenty. And coupled with the price point, this is a beautiful offering for founders."
    },
    {
      image: "/siraj.jpg",
      name: "Mohammed Sirajuddin",
      desg: "(General Partner, Da One Global Ventures)",
      desc: "I wholeheartedly endorse AccioESOPs. Their expertise have made a lasting impact on our organisation, and I am confident that they will continue to excel in their mission of empowering organisations and their team through well structured and effective solutions."
    },
    {
      image: "/chaitanya.png",
      name: "Chaitanya Salgarkar",
      desg: "Founder, Classboat Online Services Private Limited",
      desc: "Komal helped me understand the implications of the ESOPs and to plan the grant and vesting of ESOPs, particularly for our CXO. When I have questions about how these things work, Komal is always willing to get on a phone call with me and explain. The team at LawSikho guided us through the implications, drafted a comprehensive plan for us and also helped with the resolutions and filings. I think I can recommend the team without any hesitation if anyone needs ESOPs implemented within their company."
    }
  ]

  const searchParams = useSearchParams()

  const source = searchParams.get('p_source')
  const utm_source = searchParams.get('utm_source')
  const utm_medium = searchParams.get('utm_medium')
  const utm_campaign = searchParams.get('utm_campaign')
  const utm_content = searchParams.get('utm_content')

  console.log('source', source, utm_source, utm_medium, utm_campaign, utm_content)

  return (
    <>
      <div>
        <div className={styles.bookAFormSection}>
          <div className="container mx-auto pl-4 pr-4">
            <div className="md:flex justify-between">
              <div className={styles.left}>
                <h1>
                  Get and retain your star employees
                </h1>
                <h2>Unlock the power of ESOPs</h2>
                <p>CEOs and Founders, discover how Accio ESOPs can drive unprecedented business growth. Start today!</p>
              </div>
              <div className={styles.right}>
                <BookACallForm source={source} utm_source={utm_source} utm_medium={utm_medium} utm_campaign={utm_campaign} utm_content={utm_content} />
              </div>
            </div>
          </div>
        </div>{" "}
        <div className={styles.startupContentSection}>
          <div className={styles.startupContentSection1}>
            <div className="container mx-auto pl-4 pr-4">
              <div className="startup_wrepp">
                <div className="decstopbox">
                  <p>
                    {" "}
                    Pinky is a driven and ambitious startup founder who is looking to hire employees with a fantastic track record, but given that her startup is an early stage startup, she is not able to pay market salaries to them.{" "}
                  </p>{" "}
                  <p>
                    {" "}
                    She also wishes to reward a few of her employees who have been with her from the very early stages of the startup.{" "}
                  </p>{" "}
                  <p>
                    {" "}
                    She realises that the way out is to offer equity to such employees.{" "}
                  </p>{" "}
                  <p>
                    {" "}
                    She understands the importance of offering equity to employees but wants to ensure that the plan is well - structured and aligns with her company&apos;s goals.{" "}
                  </p>{" "}
                  <p>
                    {" "}
                    Pinky wants to create a well - designed and competitive employee stock option plan that motivates her employees, aligns with her company&apos;s vision, and helps her attract and retain top talent.{" "}
                  </p>{" "}
                  <h3>But she doesn’t know how.</h3>
                </div>
                <div className="reverse_row md:flex justify-between">
                  <div className="w-4/6 pl-4 pr-4 section_1">
                    {/* <div className="mobilebox">
                      <p>
                        {" "}
                        Pinky is a driven and ambitious startup founder who is
                        looking to create an employee stock option plan for her
                        company.{" "}
                      </p>{" "}
                      <p>
                        {" "}
                        She understands the importance of offering equity to
                        employees but wants to ensure that the plan is well -
                        structured and aligns with her company&#39;s goals.
                      </p>{" "}
                      <p>
                        {" "}
                        Pinky wants to create a well - designed and competitive
                        employee stock option plan that motivates her employees,
                        aligns with her company&#39;s vision, and helps her
                        attract and retain top talent.
                      </p>{" "}
                    </div> */}

                    <ul>
                      <li> Can she google it and figure it out on her own? </li>{" "}
                      <li>
                        {" "}
                        The how-to guides she came across had words like valuation, tax implication analysis, grant letters, ESOP Agreement, escrow, trusts and other stuff that would be outside her circle of competence{" "}
                      </li>{" "}
                      <li>
                        {" "}
                        She understands that there are clear legal and regulatory requirements{" "}
                      </li>{" "}
                      <li>
                        {" "}
                        She needs guidance on best practices & industry benchmarks{" "}
                      </li>{" "}
                      <li>
                        {" "}
                        She would also need help with compliances and equity dilution process{" "}
                      </li>{" "}
                      <li>
                        {" "}
                        Her uncle suggested her to hire a law firm or consulting firm to do this - but that would burn a hole in her pocket, the size of a small car{" "}
                      </li>{" "}
                      <li>
                        {" "}
                        She cannot afford mistakes that could negatively impact her company&apos;s future
                      </li>{" "}
                      <li>
                        {" "}
                        She worries that her plan won&apos;t be competitive or attractive enough to land and retain top talent
                      </li>{" "}
                    </ul>
                  </div>{" "}
                  <div className="w-2/6 pl-4 pr-4 section_1 flex items-center justify-center">
                    <img src="/pretty-woman2.png" alt="" />
                  </div>{" "}
                </div>
              </div>
            </div>
          </div>{" "}
          <div className={styles.startupContentSection2}>
            <div className="container mx-auto">
              <div className="md:flex justify-between mobile_reverse">
                <div className="w-2/6 pl-4 pr-4 section_2 flex items-center justify-center">
                  <img src="/medium-shot2.png" alt="whatnext" />
                </div>{" "}
                <div className="w-4/6 pl-4 pr-4 section_2">
                  <h2> What next? </h2>
                  <p> Pinky meets Komal. </p>{" "}
                  <p>
                    {" "}
                    Komal runs AccioESOPs, and has helped hundreds of founders to do exactly what Pinky wants to do.{" "}
                  </p>{" "}
                  <p> Komal provides Pinky with: </p>{" "}
                  <ul>
                    <li>A clear step by step roadmap with timelines</li>
                    <li>
                      {" "}
                      Spends 30 mins on call with her answering all questions
                      Pinky could think of{" "}
                    </li>{" "}
                    <li>
                      {" "}
                      Pinky is then able to decide whether to offer ESOPs or PSOPs (Phantom Stock Options){" "}
                    </li>{" "}
                    <li>
                      {" "}
                      All the documents and valuation report she needs are ready
                      in a week{" "}
                    </li>{" "}
                    <li>
                      {" "}
                      Clear and transparent cost structure{" "}
                    </li>{" "}
                    <li>
                      {" "}
                      Komal’s team will also take care of future compliances, so Pinky is sorted in the long run{" "}
                    </li>{" "}
                  </ul>{" "}
                  <p className="pt-4">
                    {" "}
                    The whole thing costs Pinky less than what she spent on a
                    team dinner last week. Not bad.{" "}
                  </p>{" "}
                </div>{" "}
              </div>
            </div>
          </div>{" "}
        </div>{" "}
        <div className={styles.achievementSection}>
          <div className="container mx-auto">
            <div className="md:flex justify-between">
              <div className="w-2/3 section_3">
                <h2> What she got: </h2>{" "}
                <ul>
                  <li>
                    {" "}
                    Improved ability to attract and retain top talent by
                    offering a compelling stock option plan{" "}
                  </li>{" "}
                  <li>
                    {" "}
                    Enhanced employee motivation and loyalty through the
                    offering of equity{" "}
                  </li>{" "}
                  <li>
                    {" "}
                    Increased alignment between employees&#39; interests and
                    company success
                  </li>{" "}
                </ul>
              </div>{" "}
              <div className="w-2/3 section_4">
                <div className="whatshe">
                  <h2> What she didn&apos;t get</h2>
                  <ul>
                    <li>
                      {" "}
                      A big fat bill
                    </li>{" "}
                  </ul>
                </div>
                <div className="didgetbox">
                  <h6>Be like Pinky. Be smart</h6>
                  <h6> Choose AccioESOPs</h6>
                  <img className="contect_crm" src="/zs-conect-crm.png" alt="conect crm" />
                </div>
                {/* <p> A big fat bill </p>
                <p> Be like Pinky.Be smart. </p>
                <p> Choose AccioESOPS. </p>{" "} */}
              </div>{" "}
            </div>
          </div>

        </div>{" "}
        {/* <div className={styles.achievementSectionButton}>
          <button className={styles.callButton} onClick={scrollToTop}>
            {" "}
            Book a free consultation or schedule a demo{" "}
          </button>{" "}
        </div>{" "} */}
        {/* <div className={styles.accioEsopSection}>
          <div className="container mx-auto">
            <div className="reverse_row md:flex justify-between">
              <div className="w-2/3 pl-4 pr-4 section_4">
                <h2> What is AccioESOPS </h2>{" "}
                <p>
                  {" "}
                  AccioESOPS is a consulting firm fully focussing on startups,
                  managed by experienced startup operators, lawyers and finance
                  experts.Whether you need guidance on contractual issues,
                  valuation, tax or regulatory regime, you can bet we have the
                  right consultants at hand to assist you.{" "}
                </p>{" "}
                <p>
                  What we are not : we are not a law firm, nor a CPA or CA
                  firm.We consult you to structure & launch your ESOPs.If we
                  need to hire any lawyer, CA, CPA, or valuation expert in the
                  process, we will take care of that on your behalf, with no
                  additional cost to you.{" "}
                </p>{" "}
              </div>{" "}
              <div className="w-1/3 pl-4 pr-4 section_4">
                <img src="/forex-trade.png" alt="forxtrade" />
              </div>{" "}
            </div>
          </div>
        </div>{" "} */}
        {/* <div className={styles.diffrence}>
          <div className="container mx-auto">
            <div className="md:flex justify-between">
              <div className="w-2/5 pl-4 pr-4 section_5">
                <img src="/diffrence.png" alt="diffrence" />
              </div>{" "}
              <div className="w-3/5 pl-4 pr-4 section_5">
                <h2> The Difference: What Sets Us Apart? </h2>{" "}
                <p>
                  {" "}
                  <strong>The cost conundrum:</strong> We are offering you the
                  best available services in the market at a cost that is
                  severed orders lower than typical service providers. We are
                  not looking to make a profit out of your need. Rather, we
                  would like to build a long term relationship based on mutual
                  trust.{" "}
                </p>{" "}
                <p>
                  <strong>The talent pool:</strong> We have a large
                  international talent pool across the world thanks to our
                  association with SkillArbitrage and LawSikho. Tier 1
                  consulting companies and law firms would not or cannot hire
                  these talents but being fully remote we can and we do.{" "}
                </p>{" "}
                <p>
                  <strong>The flexibility factor:</strong> Your job is not a
                  routine, run-of-the-mill task  to us. We can devote time and
                  resources to hear you out, understand your unique needs and
                  draft customized ESOP plans and other documentation. We do not
                  believe in templatization, a shortcoming that most service
                  providers suffer from.{" "}
                </p>{" "}
                <p>
                  <strong>On time delivery:</strong> We promise clear timelines
                  in writing & ensure on time delivery for every task we
                  undertake.{" "}
                </p>{" "}
                <p>
                  <strong>The startup kinship:</strong> We have evolved from a
                  startup ourselves. Thus we are fully familiar with the
                  problems and nuances of the running of a startup, another edge
                  we have over the competition.{" "}
                </p>{" "}
                <p>
                  We have painstakingly put together the most awesome ESOP
                  solutions in the world for you. Why experiment with others for
                  whom this is just another gig when for us this is all we do?{" "}
                </p>{" "}
              </div>{" "}
            </div>
          </div>
        </div>{" "} */}
        {/* <div className={styles.offersection}>
          <div className="container mx-auto">
            <h2> The Offer </h2> <h6>Fees breakdown:</h6>
            <ul>
              <li>Creation of ESOP Pool and ESOP Plan - INR 5000</li>
              <li>Tax implication analysis report - INR 2000</li>
              <li>
                Grant notice, stock option agreement and exercise agreements -
                INR 5000
              </li>
            </ul>
            <p>
              <span>No frills minimalistic package :</span>
              <strong>INR 10, 000(+GST) all - inclusive</strong>
            </p>
            <p>
              {" "}
              Full service pricing : INR 27, 000(+GST) (additional services on
              top of no - frills: up to 3 consulting sessions of 1 hr each, up
              to 3 reiterations of ESOP plan and related documentation,
              additional PSOP structuring, annual compliance for 12 months){" "}
            </p>
          </div>
        </div>{" "} */}
        {/* <div className={styles.winningTeamSection}>
          <div className="container mx-auto">
            <h2 className="pl-4 pr-4"> The Winning Team: </h2>{" "}
            <p className="pl-4 pr-4">
              {" "}
              Here are some of our consultants who can help you:{" "}
            </p>{" "}
            <div className="md:flex justify-between">
              <div className="w-2/6 pl-4 pr-4 section_6">
                <div className={styles.cards}>
                  <img src="/komal.png" alt="Komal" />
                  <h3>Komal Shah</h3>
                  <h4>
                    A qualified company secretary and lawyer, seasoned in
                    matters of corporate law and corporate governance with
                    experience of building and scaling a business. She and her
                    team are experts in handling ESOPs.
                  </h4>
                </div>
              </div>{" "}
              <div className="w-2/6 pl-4 pr-4 section_6">
                <div className={styles.cards}>
                  <img src="/nazar.png" alt="Mudassar" />
                  <h3>S.M Mudassar Nazar</h3>
                  <h4>
                    A practicing lawyer and a corporate finance expert, having
                    expertise in matters of corporate law, civil litigation,
                    investment banking and tort, with an experience of almost
                    two decades. He and his team are experienced in handling all
                    matters of civil litigation across India, the US, Canada and
                    the UK.
                  </h4>
                </div>
              </div>{" "}
              <div className="w-2/6 pl-4 pr-4 section_6">
                <div className={styles.cards}>
                  <img src="/sapna.png" alt="Sapna" />
                  <h3>Sapna Sarda</h3>
                  <h4>
                    A corporate lawyer and an associate company secretary with
                    expertise in drafting legal documents, overseeing corporate
                    regulatory compliance and conducting due diligence of
                    companies.
                  </h4>
                </div>
              </div>{" "}
            </div>
          </div>
        </div>{" "} */}
        <div className={styles.Satisfied}>
          <div className="container mx-auto">
            <h2>Satisfied Clients</h2>
            <SatisfiedClientSlider clients={clients} />
          </div>
        </div>{" "}
        <div className={styles.getStartedSection}>
          <div className="container mx-auto">
            <h2>
              Ready to Get Started?
            </h2>
            <p>
              Schedule a call today, and let AccioESOPs assist you in realising
              the full benefits of ESOPs for your startup.{" "}
            </p>{" "}
            <div className={styles.getStartedSectionButton}>
              <button className={styles.scheduleButton} onClick={scrollToTop}>
                {" "}
                BOOK A CALL NOW{" "}
              </button>{" "}
            </div>{" "}
          </div>
        </div>{" "}
      </div>
    </>
  );
}
