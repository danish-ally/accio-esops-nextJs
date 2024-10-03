"use client"; // This is a client component 👈🏽
import React, { useState } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import Logo from "../../../public/logo.png";
import Image from "next/image";
import Modal from "react-modal";
import Close from "../../../public/close.png";
import countries from "../../../libs/countries";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import styled from "styled-components";
import { usePathname } from 'next/navigation'
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { useSearchParams } from 'next/navigation'

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};
const Navbar = () => {

    const [selectedOption, setSelectedOption] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});
    const [navbar, setNavbar] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    // Now, you can use the 'pathname' variable as needed
    const pathname = usePathname()
    console.log('Current pathname:', pathname);
    const searchParams = useSearchParams()

    const source = searchParams.get('p_source')
    const utm_source = searchParams.get('utm_source')
    const utm_medium = searchParams.get('utm_medium')
    const utm_campaign = searchParams.get('utm_campaign')
    const utm_content = searchParams.get('utm_content')

    console.log('source', source)


    const [modalIsOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        countryCode: "",
        phone: "",
        businessSector: "",
        companySize: "",
        wantDemo: false,
        scheduleDate: "", // Combine date and time into a single field
        source: source || 'AccioEsop',
        utm_source: utm_source || null,
        utm_medium: utm_medium || null,
        utm_campaign: utm_campaign || null,
        utm_content: utm_content || null
    });
    const clearValidationMessage = (fieldName) => {
        setValidationErrors((prevErrors) => {
            // Create a copy of the previous validation errors object
            const newErrors = { ...prevErrors };
            // Clear the error message for the specified field
            delete newErrors[fieldName];
            return newErrors;
        });
    };


    // const clearValidationMessage = (fieldName) => {
    //     setValidationErrors((prevErrors) => {
    //         // Create a copy of the previous validation errors object
    //         const newErrors = { ...prevErrors };
    //         // Clear the error message for the specified field
    //         delete newErrors[fieldName];
    //         return newErrors;
    //     });
    // };
    const handleCountryCodeChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        setFormData((prevFormData) => ({
            ...prevFormData,
            countryCode: selectedOption.value,
        }));

        // Clear the validation message for the "Country Code" field
        clearValidationMessage("countryCode");
    };

    // const handleChange = (e) => {
    //     const { name, value, type, checked } = e.target;
    //     setFormData({
    //         ...formData,
    //         [name]: type === 'checkbox' ? checked : value,
    //     });
    // };
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === "wantDemo" && !checked) {
            // If wantDemo is unchecked, clear the scheduleDate value
            setFormData({
                ...formData,
                [name]: type === "checkbox" ? checked : value,
                scheduleDate: "", // Clear scheduleDate
            });
        } else {
            setFormData({
                ...formData,
                [name]: type === "checkbox" ? checked : value,
            });
        }

        // Clear the validation message for the current input field
        clearValidationMessage(name);
    };
    const handleDateChange = (moment) => {
        // const value = moment._d.toString()
        // console.log(value)
        // setFormData({
        //     ...formData,
        //     scheduleDate: formData.wantDemo ? value : "" // Set to null if wantDemo is false
        // });
        if (moment.isAfter(new Date())) {
            setFormData({
                ...formData,
                scheduleDate: moment.toDate(),
            });
            clearValidationMessage("scheduleDate");
        } else {
            // If the selected date is in the past, don't update the state
            setValidationErrors({
                ...validationErrors,
                scheduleDate: 'Please select a future date and time.',
            });
        }

    };

    const validatePhoneNumber = (phone) => {
        // Regular expression to match a phone number with spaces and digits
        const phoneRegex = /^[0-9\s]+$/;
        return phoneRegex.test(phone);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Disable the submit button while submitting
        setIsSubmitting(true);
        // Validate phone number
        // if (!validatePhoneNumber(formData.phone)) {
        //     setValidationErrors({ ...validationErrors, phone: 'Invalid phone number format. Please use digits and spaces.' });
        //     return;
        // }

        // Check if any required fields are empty
        const requiredFields = [
            "name",
            "email",
            "countryCode",
            "phone",
            "businessSector",
            "companySize",
        ];
        const newErrors = {};
        for (const field of requiredFields) {
            if (!formData[field]) {
                newErrors[field] = `Please fill in the ${field} field.`;

            }
        }

        // If the checkbox is checked, validate the "Schedule Date and Time" field
        if (formData.wantDemo && !formData.scheduleDate) {
            newErrors.scheduleDate = "Please select a schedule date and time.";

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
            await JSON.stringify(formData);
            console.log(formData);

            console.log(process.env.API_BASE_URL);
            const obj ={...formData}

            const response = await axios.post(`/api/v1/lead/bookcall`, formData);
            setFormData({
                name: "",
                email: "",
                countryCode: "",
                phone: "",
                businessSector: "",
                companySize: "",
                wantDemo: false,
                scheduleDate: "",
            });
            setSelectedOption(null);
            // Redirect to the "Thank you" page
            window.location.href = "/thank-you?info="+btoa(JSON.stringify(obj))
            setIsSubmitting(false);
            console.log("API Response:", response.data);
        } catch (error) {
            // Handle API request error (e.g., show an error message)
            console.error("API Request Error:", error);
            toast.error(error.response.data.message || error.message);
            setIsSubmitting(false);
        } finally {
            setIsSubmitting(false); // Re-enable the submit button after submission
        }
    };

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
        setFormData({
            name: "",
            email: "",
            countryCode: "",
            phone: "",
            businessSector: "",
            companySize: "",
            wantDemo: false,
            scheduleDate: "",
        });
        setSelectedOption(null);
    }

    const showDateTimePicker = () => {
        console.log("clicked");
        // Show a date picker
        const inputDateElement = document.querySelector(
            'input[type="datetime-local"]'
        );
        inputDateElement.showPicker();
    };




    return (
        <>
            <div className={styles.navbar}>
                <div className="container mx-auto  pl-4 pr-4">
                    <nav className="flex justify-between">
                        <div className="flex justify-center">
                            <Link href="/" className="flex justify-center"><img
                                src="/logo.png"
                                alt="logo"
                                width="118px"
                                height="18px"
                                className="object-contain"
                            /></Link>
                        </div>{" "}
                        <ul>
                            <li className={pathname === "/" ? "active-new" : ""}>
                                <Link href="/"> Home </Link>{" "}
                            </li>{" "}
                            <li className={pathname === "/about-us" ? "active-new" : ""}>
                                <Link href="/about-us"> About Us </Link>{" "}
                            </li>{" "}
                            <li className={pathname === "/services" ? "active-new" : ""}>
                                <Link href="/services"> Services </Link>{" "}
                            </li>{" "}
                            <li className={pathname === "/contact-us" ? "active-new" : ""}>
                                <Link href="/contact-us"> Contact Us </Link>{" "}
                            </li>{" "}
                            <li className='callButton_nav'>
                                <button onClick={openModal}>
                                    Book a Call Now
                                </button>
                            </li>{" "}
                        </ul>{" "}
                    </nav>
                </div>
            </div>
            <div className='mobileNavebar'>

                <div className='logoMenu'>
                    <div>
                        <ToastContainer />
                    </div>
                    <div className="md:hidden">
                        <button
                            className="pt-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                            onClick={() => setNavbar(!navbar)}
                        >
                            {navbar ? (
                                // <Image src="/close.png" width={30} height={30} alt="logo" />
                                <h2><img
                                    src="/cross.png"
                                    alt="cross"
                                    className="object-contain"
                                /></h2>
                            ) : (
                                <a href="#" className="toggle-mnu"><span></span></a>
                            )}
                        </button>
                    </div>
                    <div className='hamburger'>
                        {/* <a href="#" className="toggle-mnu"><span></span></a> */}
                        <div className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? 'p-12 md:p-0 block' : 'hidden'} text-white`}>
                            <ul className='NavUl'>
                                <li className={pathname === "/" ? "active-new" : ""}>
                                    <Link href="/" onClick={() => setNavbar(!navbar)}> Home </Link>{" "}
                                </li>{" "}
                                <li className={pathname === "/about-us" ? "active-new" : ""}>
                                    <Link href="/about-us" onClick={() => setNavbar(!navbar)}>
                                        {" "}
                                        About Us{" "}
                                    </Link>{" "}
                                </li>{" "}
                                <li className={pathname === "/services" ? "active-new" : ""}>
                                    <Link href="/services" onClick={() => setNavbar(!navbar)}>
                                        {" "}
                                        Services{" "}
                                    </Link>{" "}
                                </li>{" "}
                                <li className={pathname === "/contact-us" ? "active-new" : ""}>
                                    <Link href="/contact-us" onClick={() => setNavbar(!navbar)}>
                                        {" "}
                                        Contact Us{" "}
                                    </Link>{" "}
                                </li>{" "}
                            </ul>{" "}
                        </div>
                    </div>
                    <div className="mobileLogo">
                        <Link href="/"><img
                            src="/logo.png"
                            alt="logo"
                            width="118px"
                            height="18px"
                            className="object-contain"
                        /></Link>
                    </div>
                </div>

                <div className="Mobilecall" onClick={openModal}>
                    <button>Book a Call Now</button>
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <img
                        src="/close.png"
                        alt="close"
                        width="18px"
                        height="18px"
                        className="object-contain"
                        onClick={closeModal}
                    />
                    <div className={styles.formContainer}>
                        <h2>Get a call now or schedule a demo for later.</h2>
                        <form onSubmit={handleSubmit}>
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Name of Founder"
                            />
                            {validationErrors.name && (
                                <div className={styles.errorMessage}>
                                    {validationErrors.name}
                                </div>
                            )}
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Founder's Email"
                            />
                            {validationErrors.email && (
                                <div className={styles.errorMessage}>
                                    {validationErrors.email}
                                </div>
                            )}
                            <div className="rowbox flex justify-between">
                                <div className="w-2/3 pl-3 pr-3">
                                    <label>Country Code</label>
                                    <Select
                                        defaultValue={selectedOption}
                                        onChange={handleCountryCodeChange}
                                        options={countries}
                                    />
                                    {validationErrors.countryCode && (
                                        <div className={styles.errorMessage}>
                                            {validationErrors.countryCode}
                                        </div>
                                    )}
                                </div>
                                <div className="w-2/3 pl-3 pr-3">
                                    <label>Phone</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Phone Number"
                                        minLength="6"
                                        maxLength="15"
                                        onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                                event.preventDefault();
                                            }
                                        }}
                                    />
                                    {validationErrors.phone && (
                                        <div className={styles.errorMessage}>
                                            {validationErrors.phone}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <label>Business Sector</label>
                            <div className={styles.arrowb}>
                                <select
                                    name="businessSector"
                                    value={formData.businessSector}
                                    onChange={handleChange}
                                >
                                    <option value="">Select a sector...</option>
                                    <option value="Fintech">Fintech</option>
                                    <option value="Biotechnology">Biotechnology</option>
                                    <option value="Education">Education</option>
                                    <option value="Entertainment & Media">
                                        Entertainment & Media
                                    </option>
                                    <option value="IT & ITES">IT & ITES</option>
                                    <option value="SaaS/PaaS/BaaS">SaaS/PaaS/BaaS</option>
                                    <option value="Pharmaceutical">Pharmaceutical</option>
                                    <option value="Food Processing">Food Processing</option>
                                    <option value="E Commerce">E Commerce</option>
                                    <option value="Fashion & Lifestyle">Fashion & Lifestyle</option>
                                    <option value="Retail">Retail</option>
                                    <option value="Others">Others...</option>
                                    {/* Add more sectors */}
                                </select>
                                <img className={styles.arrow_img} src="/down.png" alt="" />
                            </div>

                            {validationErrors.businessSector && (
                                <div className={styles.errorMessage}>
                                    {validationErrors.businessSector}
                                </div>
                            )}
                            <label>Size of the Company</label>
                            <div className={styles.arrowb}>
                                <select
                                    name="companySize"
                                    value={formData.companySize}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Size of the Company...</option>
                                    <option value="1-10">1-10</option>
                                    <option value="11-20">11-20</option>
                                    <option value="21-30">21-30</option>
                                    <option value="31-40">31-40</option>
                                    <option value="41-50">41-50</option>
                                    <option value="51-60">51-60</option>
                                    <option value="61-70">61-70</option>
                                    <option value="71-80">71-80</option>
                                    <option value="81-90">81-90</option>
                                    <option value="91-100">91-100</option>
                                    <option value="More than 100">More than 100</option>
                                </select>
                                <img className={styles.arrow_img} src="/down.png" alt="" />
                            </div>

                            {validationErrors.companySize && (
                                <div className={styles.errorMessage}>
                                    {validationErrors.companySize}
                                </div>
                            )}

                            <label className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    name="wantDemo"
                                    className='mr-2'
                                    checked={formData.wantDemo}
                                    onChange={handleChange}
                                />
                                Want to schedule a demo
                            </label>
                            <div className={formData.wantDemo ? "" : "disabled_box"}>
                                <label wantdemo={formData.wantDemo}>Schedule Date and Time</label>
                                {/* <DateTimeInput className='datetimeinput' wantdemo={formData.wantDemo} onClick={showDateTimePicker}>
                        <input
                            type="datetime-local"
                            name="scheduleDate"
                            value={formData.scheduleDate}
                            onChange={handleChange}
                            disabled={!formData.wantDemo}
                            min={new Date().toISOString().slice(0, 16)}
                        />
                    </DateTimeInput> */}

                                {formData.wantDemo ? (<>

                                    <Datetime
                                        initialValue={formData.scheduleDate}
                                        value={formData.scheduleDate}
                                        onChange={handleDateChange}
                                        disabled={!formData.wantDemo}
                                        input={true}
                                        dateFormat="MM/DD/YYYY"
                                        timeFormat="hh:mm A"
                                        inputProps={{ placeholder: 'Select a date and time', name: "scheduleDate", readOnly: true }}
                                    />
                                    {validationErrors.scheduleDate && (
                                        <div className={styles.errorMessage}>
                                            {validationErrors.scheduleDate}
                                        </div>
                                    )}
                                </>) : (<>



                                    <input
                                        type="text"
                                        name="scheduleDate"
                                        placeholder="Select a date and time"

                                    />


                                </>)}

                            </div>
                            <button type="submit" disabled={isSubmitting} className={isSubmitting ? "disabled-button" : ""}>Book Now</button>
                        </form>
                    </div>
                </Modal>
            </div>
        </>
    );
};
// $(".toggle-mnu").click(function () {
//     $(this).toggleClass("on");
//     $(".main-mnu").slideToggle();
//     return false;
// });

const DateTimeInput = styled.div`
  background-color: ${(props) => (props.wantdemo ? "lightgreen" : "white")};
  /* Add other CSS styles here */
`;
export default Navbar;
