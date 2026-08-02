const validator = require("validator");
const dns = require("dns").promises;

const validateEmail = async (email) => {
    // Check if email is provided
    if (!email) {
        return {
            success: false,
            message: "Email is required",
        };
    }

    // Check email format
    if (!validator.isEmail(email)) {
        return {
            success: false,
            message: "Invalid email format",
        };
    }

    // Extract domain
    const domain = email.split("@")[1];

    try {
        // Check MX records
        const mxRecords = await dns.resolveMx(domain);

        if (!mxRecords || mxRecords.length === 0) {
            return {
                success: false,
                message: "Email domain cannot receive emails",
            };
        }

        return {
            success: true,
            message: "Email is valid",
        };
    } catch (error) {
        return {
            success: false,
            message: "Email domain does not exist",
        };
    }
};

module.exports = validateEmail;