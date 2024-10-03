"use client"; // This is a client component 👈🏽
import React, { useState } from 'react';
import styles from "./ContactForm.module.css"
import Select from 'react-select';
import countries from '../../../libs/countries';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from 'next/navigation'


const ContactForm = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    // const [value, onChange] = useState(new Date());
    console.log(validationErrors)

    const searchParams = useSearchParams()

    const source = searchParams.get('p_source')
    const utm_source = searchParams.get('utm_source')
    const utm_medium = searchParams.get('utm_medium')
    const utm_campaign = searchParams.get('utm_campaign')
    const utm_content = searchParams.get('utm_content')



    console.log('source', source)


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        countryCode: '',
        phone: '',
        question: '.',
        message: '',
        source: source || 'AccioEsop',
        utm_source: utm_source || null,
        utm_medium: utm_medium || null,
        utm_campaign: utm_campaign || null,
        utm_content: utm_content || null
    });


    const handleCountryCodeChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        setFormData((prevFormData) => ({ ...prevFormData, countryCode: selectedOption.value }));

        // Clear the validation message for the "Country Code" field
        clearValidationMessage('countryCode');
    };

    const clearValidationMessage = (fieldName) => {
        setValidationErrors((prevErrors) => {
            // Create a copy of the previous validation errors object
            const newErrors = { ...prevErrors };
            // Clear the error message for the specified field
            delete newErrors[fieldName];
            return newErrors;
        });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? checked : value,
        }));

        // Clear the validation message for the current input field
        clearValidationMessage(name);
    };


    const validatePhoneNumber = (phone) => {
        // Regular expression to match a phone number with spaces and digits
        const phoneRegex = /^[0-9\s]+$/;
        return phoneRegex.test(phone);
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        setIsSubmitting(true);

        // Validate phone number
        // if (!validatePhoneNumber(formData.phone)) {
        //     setValidationErrors({ ...validationErrors, phone: 'Invalid phone number format. Please use digits and spaces.' });
        //     return;
        // }

        // Check if any required fields are empty
        const requiredFields = ['name', 'email', 'countryCode', 'phone', 'question', 'message'];
        const newErrors = {};
        for (const field of requiredFields) {
            if (!formData[field]) {
                newErrors[field] = `Please fill in the ${field} field.`;
            }
        }



        // If there are validation errors, set them in the state
        if (Object.keys(newErrors).length > 0) {
            setValidationErrors(newErrors);
            setIsSubmitting(false);
            return;
        }

        // If no errors, continue with form submission
        setValidationErrors({}); // Clear any previous errors

        try {
            await JSON.stringify(formData)
            console.log(formData)


            console.log(process.env.API_BASE_URL)
            const response = await axios.post(`/api/v1/contactUs`, formData);
            console.log("selectedOPtion", selectedOption)

            const email = formData.email
            const phoneNo = formData.phone

            setSelectedOption(null);
            setFormData({
                name: '',
                email: '',
                countryCode: '',
                phone: '',
                question: '.',
                message: ''
            });
            console.log("selectedOPtion", selectedOption)
            // Redirect to the "Thank you" page
            window.location.href = "/thank-you";
            setIsSubmitting(false);
            console.log('API Response:', response.data);
        } catch (error) {
            // Handle API request error (e.g., show an error message)
            console.error('API Request Error:', error);
            toast.error(error.response.data.message || error.message);
            setIsSubmitting(false);
        } finally {
            setIsSubmitting(false); // Re-enable the submit button after submission
        }
    };




    return (
        <div>
            <div className='bannerWrepp'>
                <div className='mx-auto container pl-4 pr-4'>
                    <h2>CONTACT US</h2>
                </div>
            </div>
            <div className='MainContentPage'>
                <div className='bannerWreppService hidden'>
                    <div className='mx-auto container pl-4 pr-4'>
                        <h2>Our Service Packages</h2>
                    </div>
                </div>
                <div className='serviceWrepp hidden'>
                    <div className='mx-auto container'>
                        <div className='md:flex'>
                            <div className='servicecol1 w-1/3 pl-4 pr-4'>
                                <h1>We have two packages to choose from:</h1>
                            </div>
                            <div className='servicecol1 w-1/3 pl-4 pr-4'>
                                <h2>All Inclusive Starter Package (INR 10,000 + GST) -</h2>
                                <p>It covers the basics</p>
                                <ul>
                                    <li>Creation of ESOP plans,</li>
                                    <li>Understanding taxes, and</li>
                                    <li>Guidance on Documentation & Due Diligence</li>
                                </ul>
                            </div>
                            <div className='secCol w-1/3 pl-4 pr-4'>
                                <h2>Full-service pricing - INR 27,000 (+GST), (additional services on top of no-frills) includes:</h2>
                                <ul>
                                    <li>Up to 3 consulting sessions of 1 hour each</li>
                                    <li>Drafting board and shareholder resolutions</li>
                                    <li>Filing necessary forms</li>
                                    <li>Creation of an Excel sheet which helps you keep tabs on grant, vesting and exercise</li>
                                    <li>Support with the first allotment from ESOP vesting</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='aboutWrepp hidden'>
                    <div className='mx-auto container pl-4 pr-4'>
                        <p>
                            At AccioESOPS, we&apos;re here to help startup founders make the most of Employee Stock Ownership Plans (ESOPs). We are a solution-driven legal freelancing and Upworking agency with a simple goal - to help resolve doubts and overcome challenges faced by startup founders interested in getting effective ESOPs.
                            <br />
                            Our mission is simple - we want to help startup founders understand and use ESOPs without spending too much money. We know startups face challenges, and we&apos;re here to provide all the services you need.
                            <br />
                            Our team knows ESOPs inside and out. We can help you with:
                        </p>
                        <br />
                        <br />
                        <p>
                            <strong>Creation of ESOP Pool and ESOP Plan-</strong>
                            <br />
                            <strong>sure you share company ownership with your employees in a way that matches your business goals.</strong>
                            <br />
                            <strong>TTax Implication Analysis Report-Our experts explain the tax rules so you know what to expect from your ESOP plan. This keeps everything fair and clear.</strong>
                            <br />
                            Grant Notice, Stock Option Agreement, and Exercise Agreements- We carefully draft and review these important papers to protect the interests of both your company and your employees.
                            <br />
                            The best part? Our services are as affordable as a weekend getaway.
                        </p>
                        <br />
                        <br />
                        <h1>Our Service Packages</h1>
                        <p>We have two packages to choose from:</p>
                        <p><strong>All Inclusive Starter Package (INR 10,000 + GST) - It covers the basics - </strong></p>
                        <ol>
                            <li>Creation of ESOP plans, </li>
                            <li>Understanding taxes, and </li>
                            <li>Guidance on Documentation & Due Diligence</li>
                        </ol>
                        <p>Full-service pricing - INR 27,000 (+GST), (additional services on top of no-frills) includes:</p>
                        <ul>
                            <li>Up to 3 consulting sessions of 1 hour each</li>
                            <li>Drafting board and shareholder resolutions</li>
                            <li>Filing necessary forms</li>
                            <li>Creation of an Excel sheet which helps you keep tabs on grant, vesting and exercise</li>
                            <li>Support with the first allotment from ESOP vesting</li>
                        </ul>
                    </div>

                </div>
                <div className='mainContect'>
                    <div className='mx-auto container'>
                        <div className='md:flex contectBox'>
                            <div className='contectWith1 w-3/5 pl-4 pr-4'>
                                <div className='contectCol1'>
                                    <h2>Have questions?</h2>
                                    <p>We’d love to hear from you. Please connect with us</p>
                                    <p>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                                            <path d="M14.1313 14.875C12.6556 14.875 11.1976 14.5533 9.75729 13.9099C8.31701 13.2665 7.0066 12.3545 5.82604 11.174C4.64549 9.9934 3.73351 8.68299 3.0901 7.24271C2.4467 5.80243 2.125 4.34444 2.125 2.86875C2.125 2.65625 2.19583 2.47917 2.3375 2.3375C2.47917 2.19583 2.65625 2.125 2.86875 2.125H5.7375C5.90278 2.125 6.05035 2.18108 6.18021 2.29323C6.31007 2.40538 6.38681 2.53819 6.41042 2.69167L6.87083 5.17083C6.89444 5.35972 6.88854 5.5191 6.85313 5.64896C6.81771 5.77882 6.75278 5.89097 6.65833 5.98542L4.94062 7.72083C5.17674 8.15764 5.45712 8.57969 5.78177 8.98698C6.10642 9.39427 6.46354 9.78681 6.85313 10.1646C7.2191 10.5306 7.60278 10.87 8.00417 11.1828C8.40556 11.4957 8.83056 11.7819 9.27917 12.0417L10.9438 10.3771C11.05 10.2708 11.1887 10.1911 11.3599 10.138C11.5311 10.0849 11.6993 10.0701 11.8646 10.0938L14.3083 10.5896C14.4736 10.6368 14.6094 10.7224 14.7156 10.8464C14.8219 10.9703 14.875 11.109 14.875 11.2625V14.1313C14.875 14.3438 14.8042 14.5208 14.6625 14.6625C14.5208 14.8042 14.3438 14.875 14.1313 14.875ZM4.26771 6.375L5.43646 5.20625L5.13542 3.54167H3.55938C3.6184 4.02569 3.70104 4.50382 3.80729 4.97604C3.91354 5.44826 4.06701 5.91458 4.26771 6.375ZM10.6073 12.7146C11.0677 12.9153 11.537 13.0747 12.0151 13.1927C12.4932 13.3108 12.9743 13.3875 13.4583 13.4229V11.8646L11.7937 11.5281L10.6073 12.7146Z" fill="#A9C25D" />
                                        </svg>
                                        <span>Phone: </span><a href='tel:+918040245425'>+91 8040245425</a>
                                    </p>
                                    <p>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="14" viewBox="0 0 17 14" fill="none">
                                            <path d="M1.66667 13.3333C1.20833 13.3333 0.815972 13.1701 0.489583 12.8437C0.163194 12.5174 0 12.125 0 11.6667V1.66667C0 1.20833 0.163194 0.815972 0.489583 0.489583C0.815972 0.163194 1.20833 0 1.66667 0H15C15.4583 0 15.8507 0.163194 16.1771 0.489583C16.5035 0.815972 16.6667 1.20833 16.6667 1.66667V11.6667C16.6667 12.125 16.5035 12.5174 16.1771 12.8437C15.8507 13.1701 15.4583 13.3333 15 13.3333H1.66667ZM8.33333 7.5L1.66667 3.33333V11.6667H15V3.33333L8.33333 7.5ZM8.33333 5.83333L15 1.66667H1.66667L8.33333 5.83333ZM1.66667 3.33333V1.66667V11.6667V3.33333Z" fill="#A9C25D" />
                                        </svg>
                                        <span>Email: </span><a href='mail:support@accioesops.com'>support@accioesops.com</a>
                                    </p>
                                    <div className='contect_mt'>

                                        <div className="flex ">
                                            <div className='w-2/3 pl-4 pr-4'>
                                                <img style={{ marginBottom: '10px' }} alt="india" src="/india.png" />
                                                <h4>India Office:</h4>
                                                <p>accioESOPs, Space Creattors Heights, 3rd floor, Landmark Cyber Park, Golf Course Extension, Sector 67, Gurgaon, Haryana - 122102</p>
                                            </div>
                                            <div className='w-2/3 pl-4 pr-4'>
                                                <img style={{ marginBottom: '10px' }} alt="usa" src="/usa.png" />
                                                <h4>USA Office: </h4>
                                                <p>8, The Green, STE B, Dover, Delaware 19901 </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='contectWith2 w-2/5 pl-4 pr-4'>
                                <div className={styles.formContainer}>
                                    <form onSubmit={handleSubmit}>
                                        <label>Name</label>
                                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder='Name of Founder' />
                                        {validationErrors.name && <div className={styles.errorMessage}>{validationErrors.name}</div>}
                                        <label>Email</label>
                                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Founder's Email" />
                                        {validationErrors.email && <div className={styles.errorMessage}>{validationErrors.email}</div>}

                                        <div className='rowbox'>
                                            <div className='w-2/3 pl-4 pr-4'>
                                                <label>Country Code</label>
                                                <Select
                                                    defaultValue={selectedOption}
                                                    onChange={handleCountryCodeChange}
                                                    options={countries}

                                                />
                                                {validationErrors.countryCode && <div className={styles.errorMessage}>{validationErrors.countryCode}</div>}
                                            </div>
                                            <div className='w-2/3 pl-4 pr-4'>
                                                <label>Phone</label>
                                                <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder='Phone Number' minlength="6" maxlength="15" onKeyPress={(event) => {
                                                    if (!/[0-9]/.test(event.key)) {
                                                        event.preventDefault();
                                                    }
                                                }} />
                                                {validationErrors.phone && <div className={styles.errorMessage}>{validationErrors.phone}</div>}
                                            </div>

                                        </div>
                                        {/* <label>Question</label>
                                        <input type="text" name="question" value={formData.question} onChange={handleChange} placeholder='Your question' />
                                        {validationErrors.question && <div className={styles.errorMessage}>{validationErrors.question}</div>} */}
                                        <label>Message</label>
                                        <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Write your message" ></textarea>
                                        {validationErrors.message && <div className={styles.errorMessage}>{validationErrors.message}</div>}
                                        <button type="submit" disabled={isSubmitting} className={isSubmitting ? "disabled-button" : ""}>Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactForm