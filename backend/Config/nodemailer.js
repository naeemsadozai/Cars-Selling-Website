// Import the nodemailer module
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: process.env.NODEMAILER_MAIL, 
        pass: process.env.NODEMAILER_PASS 
    }
});

// 3. Send the email
export const sendMail = async (email,otp)=>{   
    await transporter.sendMail({
    from: 'CARZONE',
    to: email,
    subject: `Your One-Time Password (OTP) for ${process.env.APP_NAME || 'CARZONE'}`,
    text: `Your OTP is: ${otp}\n\nThis code is valid for 5 minutes. Do not share it with anyone.`,
    html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px; max-width: 600px; margin: auto;">
                <h2 style="color: #333;">One-Time Password (OTP)</h2>
                <p>Hello,</p>
                <p>Use the following code to verify your action:</p>
                <div style="background-color: #f0f0f0; padding: 15px; text-align: center; border-radius: 5px; margin: 20px 0;">
                    <span style="font-size: 32px; font-weight: bold; color: #007bff;">${otp}</span>
                </div>
                <p style="font-size: 14px; color: #666;">This code is valid for 5 minutes and is intended for ${email}. Please do not share this code with anyone.</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                <p style="font-size: 12px; color: #999;">If you did not request this OTP, please ignore this email.</p>
            </div>
        `
    }
);
}



// Helper function to calculate the date two days from now and format it
const getScheduledDateTime = () => {
    const today = new Date();
    // Set the date two days from now
    const scheduledDate = new Date(today.setDate(today.getDate() + 2));
    
    // Set a standard meeting time (e.g., 10:30 AM)
    scheduledDate.setHours(10, 30, 0, 0); 
    
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        timeZoneName: 'short'
    };

    // Format the date/time string
    const dateString = scheduledDate.toLocaleDateString('en-US', options);
    
    return {
        date: scheduledDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        time: scheduledDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        full: dateString
    };
};

export const purchaseConfirmation = async (buyer ,email, carName, brand, price) => {   
    const meeting = getScheduledDateTime();
    const formattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);

    await transporter.sendMail({
        from: 'CARZONE',
        to: email,
        subject: `✅ Purchase Confirmed: Your ${brand} ${carName} Awaits!`,
        text: `Congratulations! Your purchase of the ${brand} ${carName} is confirmed. Please visit our dealership on ${meeting.full} for payment and collection. Total Price: ${formattedPrice}.`,
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #007bff; border-radius: 12px; max-width: 600px; margin: auto; background-color: #f9fbfd;">
                <h1 style="color: #007bff; text-align: center; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
                    🎉 Purchase Confirmation: ${brand} ${carName}
                </h1>
                
                <p style="font-size: 16px; color: #333;">
                    Dear ${buyer},
                </p>
                <p style="font-size: 16px; color: #333;">
                    Congratulations! We have successfully reserved your vehicle. Your purchase order for the 
                    <strong style="color: #1c7430;">${brand} ${carName}</strong> is confirmed.
                </p>
                
                <div style="background-color: #e9f2ff; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 5px solid #007bff;">
                    <h3 style="color: #007bff; margin-top: 0;">Order Details</h3>
                    <p style="font-size: 16px; margin: 5px 0;"><strong>Vehicle:</strong> ${brand} ${carName}</p>
                    <p style="font-size: 16px; margin: 5px 0;"><strong>Total Price:</strong> <span style="font-size: 20px; font-weight: bold; color: #1c7430;">${formattedPrice}</span></p>
                </div>

                <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 5px solid #ffc107;">
                    <h3 style="color: #856404; margin-top: 0;">Next Steps: Payment & Collection</h3>
                    <p style="font-size: 16px; color: #333; margin-bottom: 15px;">
                        Please visit our dealership for final payment processing and to complete the vehicle collection procedure:
                    </p>
                    <table style="width: 100%; border-collapse: collapse; text-align: left;">
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold; width: 40%;">🗓️ Scheduled Date:</td>
                            <td style="padding: 8px 0; color: #007bff; font-weight: bold;">${meeting.date}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold;">⏱️ Time:</td>
                            <td style="padding: 8px 0; color: #007bff; font-weight: bold;">${meeting.time}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold;">📍 Dealership:</td>
                            <td style="padding: 8px 0; color: #333;">CarZone University-chowk Bahawalpur,Pakistan</td>
                        </tr>
                    </table>
                </div>

                <p style="font-size: 14px; color: #666; margin-top: 25px;">
                    Please bring a valid photo ID and your preferred method of payment. If you need to reschedule, please contact us immediately.
                </p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                <p style="font-size: 12px; color: #999; text-align: center;">
                    Thank you for choosing CARZONE. We look forward to seeing you!
                </p>
            </div>
        `
    });

};

