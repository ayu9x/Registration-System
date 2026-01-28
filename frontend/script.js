// ==================== DOM Elements ====================
const form = document.getElementById('registrationForm');
const submitBtn = document.getElementById('submitBtn');
const alertContainer = document.getElementById('alertContainer');

// Form fields
const fields = {
    firstName: document.getElementById('firstName'),
    lastName: document.getElementById('lastName'),
    email: document.getElementById('email'),
    phone: document.getElementById('phone'),
    age: document.getElementById('age'),
    gender: document.getElementsByName('gender'),
    address: document.getElementById('address'),
    country: document.getElementById('country'),
    state: document.getElementById('state'),
    city: document.getElementById('city'),
    password: document.getElementById('password'),
    confirmPassword: document.getElementById('confirmPassword'),
    terms: document.getElementById('terms')
};

// ==================== Initialize Application ====================
document.addEventListener('DOMContentLoaded', () => {
    initializeCountryDropdown();
    attachEventListeners();
    setupPasswordToggle();
    console.log('Registration System Initialized Successfully!');
});

// ==================== Country/State/City Dropdown Logic ====================
function initializeCountryDropdown() {
    const countrySelect = fields.country;
    
    // Populate countries
    const countries = Object.keys(locationData).sort();
    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
    });
}

// Handle country change
function handleCountryChange() {
    const country = fields.country.value;
    const stateSelect = fields.state;
    const citySelect = fields.city;

    // Reset state and city
    stateSelect.innerHTML = '<option value="">Select State</option>';
    citySelect.innerHTML = '<option value="">Select City</option>';
    citySelect.disabled = true;

    if (country && locationData[country]) {
        // Enable state dropdown
        stateSelect.disabled = false;

        // Populate states
        const states = Object.keys(locationData[country]).sort();
        states.forEach(state => {
            const option = document.createElement('option');
            option.value = state;
            option.textContent = state;
            stateSelect.appendChild(option);
        });

        // Update phone field placeholder with country code
        if (countryPhoneCodes[country]) {
            fields.phone.placeholder = `${countryPhoneCodes[country]} XXXXX XXXXX`;
        }
    } else {
        stateSelect.disabled = true;
        fields.phone.placeholder = '+91 98765 43210';
    }

    // Validate country field
    validateSingleField('country');
}

// Handle state change
function handleStateChange() {
    const country = fields.country.value;
    const state = fields.state.value;
    const citySelect = fields.city;

    // Reset city
    citySelect.innerHTML = '<option value="">Select City</option>';

    if (country && state && locationData[country] && locationData[country][state]) {
        // Enable city dropdown
        citySelect.disabled = false;

        // Populate cities
        const cities = locationData[country][state].sort();
        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        });
    } else {
        citySelect.disabled = true;
    }

    // Validate state field
    validateSingleField('state');
}

// Handle city change
function handleCityChange() {
    validateSingleField('city');
}

// ==================== Event Listeners ====================
function attachEventListeners() {
    // Country, State, City dropdowns
    fields.country.addEventListener('change', handleCountryChange);
    fields.state.addEventListener('change', handleStateChange);
    fields.city.addEventListener('change', handleCityChange);

    // Text inputs - validate on blur and input
    const textFields = ['firstName', 'lastName', 'email', 'phone', 'age', 'address'];
    textFields.forEach(fieldName => {
        const field = fields[fieldName];
        field.addEventListener('blur', () => validateSingleField(fieldName));
        field.addEventListener('input', () => {
            // Real-time validation for better UX
            if (field.classList.contains('invalid')) {
                validateSingleField(fieldName);
            }
        });
    });

    // Gender radio buttons
    fields.gender.forEach(radio => {
        radio.addEventListener('change', () => validateSingleField('gender'));
    });

    // Password field - real-time strength meter
    fields.password.addEventListener('input', () => {
        updatePasswordStrength();
        validateSingleField('password');
        
        // Also validate confirm password if it has a value
        if (fields.confirmPassword.value) {
            validateSingleField('confirmPassword');
        }
    });

    // Confirm password
    fields.confirmPassword.addEventListener('input', () => {
        validateSingleField('confirmPassword');
    });

    // Terms checkbox
    fields.terms.addEventListener('change', () => {
        validateSingleField('terms');
        updateSubmitButton();
    });

    // Form submission
    form.addEventListener('submit', handleFormSubmit);

    // Real-time form validation for submit button
    form.addEventListener('input', updateSubmitButton);
    form.addEventListener('change', updateSubmitButton);
}

// ==================== Field Validation ====================
function validateSingleField(fieldName) {
    const formData = getFormData();
    const value = formData[fieldName];
    
    const validation = formValidator.validateField(fieldName, value, formData);
    
    const field = fields[fieldName];
    const formGroup = field.closest ? field.closest('.form-group') : field[0].closest('.form-group');
    
    if (fieldName === 'gender' || fieldName === 'terms') {
        // Handle radio buttons and checkboxes differently
        const errorElement = formGroup.querySelector('.error-message');
        
        if (validation.isValid) {
            formGroup.classList.remove('invalid');
            formGroup.classList.add('valid');
            if (errorElement) errorElement.textContent = '';
        } else {
            formGroup.classList.remove('valid');
            formGroup.classList.add('invalid');
            if (errorElement) errorElement.textContent = validation.error;
        }
    } else {
        // Handle regular input fields
        const errorElement = formGroup.querySelector('.error-message');
        
        if (validation.isValid && value) {
            field.classList.remove('invalid');
            field.classList.add('valid');
            if (errorElement) errorElement.textContent = '';
        } else if (!validation.isValid) {
            field.classList.remove('valid');
            field.classList.add('invalid');
            if (errorElement) errorElement.textContent = validation.error;
        } else {
            field.classList.remove('valid', 'invalid');
            if (errorElement) errorElement.textContent = '';
        }
    }

    return validation.isValid;
}

// ==================== Get Form Data ====================
function getFormData() {
    // Get gender value
    let genderValue = '';
    fields.gender.forEach(radio => {
        if (radio.checked) genderValue = radio.value;
    });

    return {
        firstName: fields.firstName.value.trim(),
        lastName: fields.lastName.value.trim(),
        email: fields.email.value.trim(),
        phone: fields.phone.value.trim(),
        age: fields.age.value.trim(),
        gender: genderValue,
        address: fields.address.value.trim(),
        country: fields.country.value,
        state: fields.state.value,
        city: fields.city.value,
        password: fields.password.value,
        confirmPassword: fields.confirmPassword.value,
        terms: fields.terms.checked ? 'accepted' : ''
    };
}

// ==================== Password Strength Meter ====================
function updatePasswordStrength() {
    const password = fields.password.value;
    const strength = formValidator.calculatePasswordStrength(password);
    
    const meter = document.querySelector('.strength-meter-fill');
    const text = document.querySelector('.strength-text');

    if (!password) {
        meter.className = 'strength-meter-fill';
        meter.style.width = '0';
        text.textContent = '';
        return;
    }

    // Update meter
    meter.className = `strength-meter-fill ${strength}`;
    
    // Update text
    text.className = `strength-text ${strength}`;
    if (strength === 'weak') {
        text.textContent = '🔴 Weak Password';
    } else if (strength === 'medium') {
        text.textContent = '🟡 Medium Password';
    } else {
        text.textContent = '🟢 Strong Password';
    }
}

// ==================== Password Toggle ====================
function setupPasswordToggle() {
    const toggleButtons = document.querySelectorAll('.toggle-password');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const targetField = document.getElementById(targetId);
            
            if (targetField.type === 'password') {
                targetField.type = 'text';
                button.innerHTML = `
                    <svg class="eye-icon" viewBox="0 0 24 24" fill="none">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
                        <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" stroke-width="2"/>
                    </svg>
                `;
            } else {
                targetField.type = 'password';
                button.innerHTML = `
                    <svg class="eye-icon" viewBox="0 0 24 24" fill="none">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
                    </svg>
                `;
            }
        });
    });
}

// ==================== Update Submit Button ====================
function updateSubmitButton() {
    const formData = getFormData();
    const validation = formValidator.validateForm(formData);
    
    // Check if all required fields are filled
    const requiredFieldsFilled = 
        formData.firstName && 
        formData.lastName && 
        formData.email && 
        formData.phone && 
        formData.gender && 
        formData.country && 
        formData.state && 
        formData.city && 
        formData.password && 
        formData.confirmPassword && 
        formData.terms;

    submitBtn.disabled = !requiredFieldsFilled || !validation.isValid;
}

// ==================== Form Submission ====================
async function handleFormSubmit(e) {
    e.preventDefault();

    // Get form data
    const formData = getFormData();

    // Validate entire form
    const validation = formValidator.validateForm(formData);

    if (!validation.isValid) {
        // Show error alert
        showAlert('Please correct the errors in the form before submitting.', 'error');
        
        // Highlight all invalid fields
        Object.keys(validation.errors).forEach(fieldName => {
            validateSingleField(fieldName);
        });

        // Scroll to first error
        const firstError = document.querySelector('.form-control.invalid');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        return;
    }

    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Success!
        showAlert('Registration Successful! Your profile has been submitted successfully.', 'success');

        // Reset form after 2 seconds
        setTimeout(() => {
            form.reset();
            clearFormValidation();
            fields.state.disabled = true;
            fields.city.disabled = true;
            updateSubmitButton();
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 2000);

    } catch (error) {
        showAlert('An error occurred during registration. Please try again.', 'error');
    } finally {
        submitBtn.classList.remove('loading');
    }
}

// ==================== Alert Messages ====================
function showAlert(message, type) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    alertContainer.innerHTML = '';
    alertContainer.appendChild(alert);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        alert.style.opacity = '0';
        setTimeout(() => alert.remove(), 300);
    }, 5000);
}

// ==================== Clear Form Validation ====================
function clearFormValidation() {
    // Remove all validation classes
    const allInputs = form.querySelectorAll('.form-control');
    allInputs.forEach(input => {
        input.classList.remove('valid', 'invalid');
    });

    const allGroups = form.querySelectorAll('.form-group');
    allGroups.forEach(group => {
        group.classList.remove('valid', 'invalid');
    });

    // Clear all error messages
    const allErrors = form.querySelectorAll('.error-message');
    allErrors.forEach(error => {
        error.textContent = '';
    });

    // Clear password strength
    const meter = document.querySelector('.strength-meter-fill');
    const text = document.querySelector('.strength-text');
    if (meter) {
        meter.className = 'strength-meter-fill';
        meter.style.width = '0';
    }
    if (text) {
        text.textContent = '';
    }

    // Clear alert
    alertContainer.innerHTML = '';
}

// ==================== Utility Functions ====================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ==================== Console Logs for Testing ====================
console.log('%c🎨 Registration System Loaded! ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 16px; padding: 10px 20px; border-radius: 5px;');
console.log('%c📝 Form Validation: Active', 'color: #10b981; font-size: 14px;');
console.log('%c🔒 Security Features: Enabled', 'color: #3b82f6; font-size: 14px;');
console.log('%c✨ Smart Validations: Ready', 'color: #8b5cf6; font-size: 14px;');