// Calculate password strength
export const calculatePasswordStrength = (password: any) => {
    if (!password) {
        return { score: 0, level: 0, label: "" };
    }

    let score = 0;

    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;

    // Complexity checks
    if (/[a-z]/.test(password)) score += 1; // lowercase
    if (/[A-Z]/.test(password)) score += 1; // uppercase
    if (/[0-9]/.test(password)) score += 1; // numbers
    if (/[^a-zA-Z0-9]/.test(password)) score += 1; // special characters

    // Determine level (1-4 bars) and label based on score
    let level = 0;
    let label = "";

    if (score <= 2) {
        level = 1;
        label = "Weak";
    } else if (score <= 3) {
        level = 2;
        label = "Fair";
    } else if (score <= 4) {
        level = 3;
        label = "Good";
    } else {
        level = 4;
        label = "Strong";
    }

    return { score, level, label };
};
