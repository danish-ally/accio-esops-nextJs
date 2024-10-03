import connectMongoDB from "../../../../../../libs/mongodb";
import { NextResponse } from "next/server";
import Lead from "../../../../../models/lead";
import userHTML from "../../../../../common/userHtml";
import adminHTML from "../../../../../common/adminHtml";
import { SendMailClient } from "zeptomail";

export async function POST(request) {
  try {
    const requestBody = await request.json(); // Parse the entire request body
    console.log(requestBody);
    await connectMongoDB();

    let modifiedUserHTML;
    let modifiedAdminHTML;
    let User_subject;
    let Admin_subject;

    if (requestBody.scheduleDate) {
      User_subject="Your consultation call with AccioESOPs expert has been scheduled";
      Admin_subject="A founder has scheduled a meeting for demo";
      const inputDateTime = requestBody.scheduleDate;
      const date = new Date(inputDateTime);
      // dtae and time
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      const formattedDate = `${day}-${month}-${year}`;

      // Format the time as h:mm a
      const hours = String(date.getHours() % 12 || 12).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const ampm = date.getHours() < 12 ? "AM" : "PM";

      const formattedTime = `${hours}:${minutes} ${ampm}`;

      requestBody.leadsDescription = "Scheduled call";
      modifiedUserHTML = userHTML.replace(/{name}/g, requestBody.name);
      modifiedAdminHTML = adminHTML.replace(/{name}/g, "Admin");
      modifiedUserHTML = modifiedUserHTML.replace(
        /{comment}/g,
        `Thank you for showing interest in AccioESOPs. call has been scheduled with our expert on ${formattedDate}, ${formattedTime}.

      For any query, reach out to us at +918040245425
      <br>
      <br>
      Regards
      <br>
      Team AccioESOPs


       `
      );
      modifiedAdminHTML = modifiedAdminHTML.replace(
        /{comment}/g,
        `A founder is showing interest in AccioESOPs.<br>Here are the details:
        
        <table style="width:100%;">
        <tr>
            <td>Name:</td>
            <td><strong>${requestBody.name}</strong></td>
        </tr>
        <tr>
            <td>Email:</td>
            <td><strong>${requestBody.email}</strong></td>
        </tr>
        <tr>
            <td>Phone:</td>
            <td><strong>${requestBody.countryCode}${requestBody.phone}</strong></td>
        </tr>
        <tr>
            <td>Business sector:</td>
            <td><strong>${requestBody.businessSector}</strong></td>
        </tr>
        <tr>
            <td>Company size:</td>
            <td><strong> ${requestBody.companySize}</strong></td>
        </tr>
        <tr>
            <td>Scheduled time:</td>
            <td><strong>${formattedDate} ${formattedTime}</strong></td>
        </tr>
    </table>

       `
      );
    } else {
      User_subject="Your AccioESOPs expert will be calling you shortly";
      Admin_subject="A founder has booked a call";
      requestBody.leadsDescription = "Booked for instant call";
      modifiedUserHTML = userHTML.replace(/{name}/g, requestBody.name);
      modifiedAdminHTML = adminHTML.replace(/{name}/g, "Admin");

      modifiedUserHTML = modifiedUserHTML.replace(
        /{comment}/g,
        `Thank you for showing interest in AccioESOPs.  One of our experts will get in touch with you soon. 

      For any query, reach out to us at +918040245425
      <br>
      <br>
      Regards
      <br>
      Team AccioESOPs

       `
      );
      modifiedAdminHTML = modifiedAdminHTML.replace(
        /{comment}/g,
        `A founder is showing interest in AccioESOPs.
        <br>
        <br>
        Here are the details:
        

        <table style="width:100%;">
        <tr>
            <td>Name:</td>
            <td><strong>${requestBody.name}</strong></td>
        </tr>
        <tr>
            <td>Email:</td>
            <td><strong>${requestBody.email}</strong></td>
        </tr>
        <tr>
            <td>Phone:</td>
            <td><strong>${requestBody.countryCode}${requestBody.phone}</strong></td>
        </tr>
        <tr>
            <td>Business sector:</td>
            <td><strong>${requestBody.businessSector}</strong></td>
        </tr>
        <tr>
            <td>Company size:</td>
            <td><strong> ${requestBody.companySize}</strong></td>
        </tr>
    </table>
       `
      );
    }

    await Lead.create(requestBody); // Pass the entire body object
    const useremail = requestBody.email;
    const adminEmail = process.env.ADMIN_EMAIL;
    const emailAddresses = [`${useremail}`, `${adminEmail}`];

    const url = process.env.ZEPTO_MAIL_URL;
    const token = process.env.ZEPTO_MAIL_TOKEN;
    let client = new SendMailClient({ url, token });

    for (const email of emailAddresses) {
      // Create a copy of htmlContent for each recipient
      let final_subject;
      console.log(email);
      let emailContent;
      if (email === adminEmail) {
        // Modify the emailContent for 'rupanshi.d@lawsikho.in'
        emailContent = modifiedAdminHTML; // Replace with appropriate content
        final_subject=Admin_subject;
      } else {
        emailContent = modifiedUserHTML;
        final_subject= User_subject;
      }

      client
        .sendMail({
          from: {
            address: "noreply@accioesops.com",
            name: "accioESOPs",
          },
          to: [
            {
              email_address: {
                address: `${email}`,
              },
            },
          ],
          subject: `${final_subject}`,
          htmlbody: `${emailContent}`,
        })
        .then((resp) => console.log("success"))
        .catch((error) => console.log("error"));
    }

    return NextResponse.json(
      { message: "Lead added successfully " },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json(
      { message: "Failed to add lead", error: error.message },
      { status: 500 }
    );
  }
}
