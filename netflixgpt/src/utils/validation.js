// Validation for the formData - Name, Email, Password using regex

export const validateName = (name) => {
    if (!name) return "Name is required";
    const nameRegex = /^[a-zA-Z\s]+$/;
    return nameRegex.test(name) ? "" : "Name can only contain letters and spaces";
}

export const validateEmail = (email) => {
    if (!email) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const domain = email.split("@")[1];
    const allowedDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];
    
    if (!emailRegex.test(email)) return "Invalid email address";
    if (!allowedDomains.includes(domain)) return "Please use a valid email domain (gmail.com, yahoo.com, hotmail.com, outlook.com)";
    
    return "";
}

export const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password should be at least 8 characters long";
    if (!/[A-Z]/.test(password)) return "Password should have a capital letter";
    if (!/[0-9]/.test(password)) return "Password should have a number";
    if (!/[!@#$%^&*]/.test(password)) return "Password should have a special character";
    
    return "";
}