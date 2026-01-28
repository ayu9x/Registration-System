// ==================== Validation Functions ====================
// Version: 2.0 - Updated password validation (2026-01-28)

class FormValidator {
    constructor() {
        this.validationRules = {
            firstName: {
                required: true,
                minLength: 2,
                maxLength: 50,
                pattern: /^[a-zA-Z\s]+$/,
                errorMessages: {
                    required: 'First name is required',
                    minLength: 'First name must be at least 2 characters',
                    maxLength: 'First name cannot exceed 50 characters',
                    pattern: 'First name can only contain letters and spaces'
                }
            },
            lastName: {
                required: true,
                minLength: 2,
                maxLength: 50,
                pattern: /^[a-zA-Z\s]+$/,
                errorMessages: {
                    required: 'Last name is required',
                    minLength: 'Last name must be at least 2 characters',
                    maxLength: 'Last name cannot exceed 50 characters',
                    pattern: 'Last name can only contain letters and spaces'
                }
            },
            email: {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                errorMessages: {
                    required: 'Email address is required',
                    pattern: 'Please enter a valid email address',
                    disposable: 'Disposable email addresses are not allowed'
                }
            },
            phone: {
                required: true,
                errorMessages: {
                    required: 'Phone number is required',
                    pattern: 'Please enter a valid phone number',
                    countryCode: 'Phone number must match the selected country code'
                }
            },
            age: {
                required: false,
                min: 18,
                max: 100,
                errorMessages: {
                    min: 'You must be at least 18 years old',
                    max: 'Age cannot exceed 100 years',
                    pattern: 'Please enter a valid age'
                }
            },
            gender: {
                required: true,
                errorMessages: {
                    required: 'Please select your gender'
                }
            },
            address: {
                required: false,
                minLength: 5,
                maxLength: 200,
                errorMessages: {
                    minLength: 'Address must be at least 5 characters',
                    maxLength: 'Address cannot exceed 200 characters'
                }
            },
            country: {
                required: true,
                errorMessages: {
                    required: 'Please select a country'
                }
            },
            state: {
                required: true,
                errorMessages: {
                    required: 'Please select a state'
                }
            },
            city: {
                required: true,
                errorMessages: {
                    required: 'Please select a city'
                }
            },
            password: {
                required: true,
                minLength: 8,
                errorMessages: {
                    required: 'Password is required',
                    minLength: 'Password must be at least 8 characters',
                    strength: 'Password is too weak. Use a mix of uppercase, lowercase, numbers, and special characters'
                }
            },
            confirmPassword: {
                required: true,
                errorMessages: {
                    required: 'Please confirm your password',
                    match: 'Passwords do not match'
                }
            },
            terms: {
                required: true,
                errorMessages: {
                    required: 'You must agree to the Terms & Conditions'
                }
            }
        };
    }

    // Validate single field
    validateField(fieldName, value, formData = {}) {
        const rules = this.validationRules[fieldName];
        if (!rules) return { isValid: true, error: '' };

        // Required validation
        if (rules.required && !value) {
            return { isValid: false, error: rules.errorMessages.required };
        }

        // Skip other validations if field is empty and not required
        if (!rules.required && !value) {
            return { isValid: true, error: '' };
        }

        // Field-specific validations
        switch (fieldName) {
            case 'firstName':
            case 'lastName':
                return this.validateName(value, rules);

            case 'email':
                return this.validateEmail(value, rules);

            case 'phone':
                return this.validatePhone(value, formData.country, rules);

            case 'age':
                return this.validateAge(value, rules);

            case 'address':
                return this.validateAddress(value, rules);

            case 'password':
                return this.validatePassword(value, rules);

            case 'confirmPassword':
                return this.validateConfirmPassword(value, formData.password, rules);

            case 'gender':
            case 'country':
            case 'state':
            case 'city':
            case 'terms':
                return { isValid: true, error: '' };

            default:
                return { isValid: true, error: '' };
        }
    }

    // Validate name fields
    validateName(value, rules) {
        if (value.length < rules.minLength) {
            return { isValid: false, error: rules.errorMessages.minLength };
        }
        if (value.length > rules.maxLength) {
            return { isValid: false, error: rules.errorMessages.maxLength };
        }
        if (!rules.pattern.test(value)) {
            return { isValid: false, error: rules.errorMessages.pattern };
        }
        return { isValid: true, error: '' };
    }

    // Validate email
    validateEmail(value, rules) {
        if (!rules.pattern.test(value)) {
            return { isValid: false, error: rules.errorMessages.pattern };
        }

        // Check for disposable email domains
        const domain = value.split('@')[1];
        if (domain && disposableEmailDomains.includes(domain.toLowerCase())) {
            return { isValid: false, error: rules.errorMessages.disposable };
        }

        return { isValid: true, error: '' };
    }

    // Validate phone number
    validatePhone(value, country, rules) {
        // Remove all non-digit characters except +
        const cleanPhone = value.replace(/[^\d+]/g, '');

        if (cleanPhone.length < 10) {
            return { isValid: false, error: rules.errorMessages.pattern };
        }

        // Check country code if country is selected
        if (country && countryPhoneCodes[country]) {
            const countryCode = countryPhoneCodes[country];
            if (!cleanPhone.startsWith(countryCode.replace('+', ''))) {
                return {
                    isValid: false,
                    error: `${rules.errorMessages.countryCode} (${countryCode})`
                };
            }
        }

        return { isValid: true, error: '' };
    }

    // Validate age
    validateAge(value, rules) {
        const age = parseInt(value);
        if (isNaN(age)) {
            return { isValid: false, error: rules.errorMessages.pattern };
        }
        if (age < rules.min) {
            return { isValid: false, error: rules.errorMessages.min };
        }
        if (age > rules.max) {
            return { isValid: false, error: rules.errorMessages.max };
        }
        return { isValid: true, error: '' };
    }

    // Validate address
    validateAddress(value, rules) {
        if (value.length > 0 && value.length < rules.minLength) {
            return { isValid: false, error: rules.errorMessages.minLength };
        }
        if (value.length > rules.maxLength) {
            return { isValid: false, error: rules.errorMessages.maxLength };
        }
        return { isValid: true, error: '' };
    }

    // Validate password
    validatePassword(value, rules) {
        if (value.length < rules.minLength) {
            return { isValid: false, error: rules.errorMessages.minLength };
        }

        // Password meets minimum requirements - allow submission
        // Strength meter still provides visual feedback to user
        return { isValid: true, error: '' };
    }

    // Validate confirm password
    validateConfirmPassword(value, password, rules) {
        if (value !== password) {
            return { isValid: false, error: rules.errorMessages.match };
        }
        return { isValid: true, error: '' };
    }

    // Calculate password strength
    calculatePasswordStrength(password) {
        let strength = 0;

        // Length check
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;

        // Character variety checks
        if (/[a-z]/.test(password)) strength++; // lowercase
        if (/[A-Z]/.test(password)) strength++; // uppercase
        if (/[0-9]/.test(password)) strength++; // numbers
        if (/[^a-zA-Z0-9]/.test(password)) strength++; // special characters

        if (strength <= 2) return 'weak';
        if (strength <= 4) return 'medium';
        return 'strong';
    }

    // Validate entire form
    validateForm(formData) {
        const errors = {};
        let isValid = true;

        // Validate all fields
        for (const [fieldName, value] of Object.entries(formData)) {
            const validation = this.validateField(fieldName, value, formData);
            if (!validation.isValid) {
                errors[fieldName] = validation.error;
                isValid = false;
            }
        }

        return { isValid, errors };
    }
}

// Export validator
const formValidator = new FormValidator();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = FormValidator;
}