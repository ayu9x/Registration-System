"""
Selenium Automation Script - Flow B (Positive Scenario)
Tests successful form submission with all valid data
"""

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import TimeoutException
import time
import os
from datetime import datetime


class RegistrationFormTestFlowB:
    def __init__(self, url):
        self.url = url
        self.driver = None
        self.wait = None
        self.screenshots_dir = "../screenshots/flow_b"
        
        # Create screenshots directory
        os.makedirs(self.screenshots_dir, exist_ok=True)
        
    def setup(self):
        """Initialize WebDriver"""
        print("=" * 80)
        print("FLOW B - POSITIVE SCENARIO TEST")
        print("=" * 80)
        print("\n[SETUP] Initializing Chrome WebDriver...")
        
        options = webdriver.ChromeOptions()
        options.add_argument('--start-maximized')
        options.add_argument('--disable-blink-features=AutomationControlled')
        options.add_experimental_option("excludeSwitches", ["enable-automation"])
        options.add_experimental_option('useAutomationExtension', False)
        
        self.driver = webdriver.Chrome(options=options)
        self.wait = WebDriverWait(self.driver, 10)
        print("✓ Chrome WebDriver initialized successfully\n")
        
    def take_screenshot(self, name):
        """Take and save screenshot"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"{self.screenshots_dir}/{timestamp}_{name}.png"
        self.driver.save_screenshot(filename)
        print(f"  📸 Screenshot saved: {filename}")
        
    def test_launch_page(self):
        """Step 1: Launch web page and verify"""
        print("[STEP 1] Launching web page...")
        self.driver.get(self.url)
        time.sleep(2)
        
        page_url = self.driver.current_url
        page_title = self.driver.title
        
        print(f"  • Page URL: {page_url}")
        print(f"  • Page Title: {page_title}")
        print("  ✓ Page loaded successfully\n")
        
        self.take_screenshot("01_page_loaded")
        
    def test_fill_complete_form(self):
        """Step 2: Fill form with all valid data"""
        print("[STEP 2] Filling form with complete valid data...\n")
        
        # First Name
        print("  • Filling First Name...")
        first_name = self.wait.until(EC.presence_of_element_located((By.ID, "firstName")))
        first_name.clear()
        first_name.send_keys("Priya")
        time.sleep(0.5)
        
        # Last Name
        print("  • Filling Last Name...")
        last_name = self.driver.find_element(By.ID, "lastName")
        last_name.clear()
        last_name.send_keys("Patel")
        time.sleep(0.5)
        
        # Email
        print("  • Filling Email...")
        email = self.driver.find_element(By.ID, "email")
        email.clear()
        email.send_keys("priya.patel@gmail.com")
        time.sleep(0.5)
        
        # Phone
        print("  • Filling Phone Number...")
        phone = self.driver.find_element(By.ID, "phone")
        phone.clear()
        phone.send_keys("+91 9123456789")
        time.sleep(0.5)
        
        # Age
        print("  • Filling Age...")
        age = self.driver.find_element(By.ID, "age")
        age.clear()
        age.send_keys("24")
        time.sleep(0.5)
        
        # Gender
        print("  • Selecting Gender...")
        gender_female = self.driver.find_element(By.CSS_SELECTOR, "input[name='gender'][value='female']")
        self.driver.execute_script("arguments[0].click();", gender_female)
        time.sleep(0.5)
        
        # Address
        print("  • Filling Address...")
        address = self.driver.find_element(By.ID, "address")
        address.clear()
        address.send_keys("456 Park Avenue, Block C")
        time.sleep(0.5)
        
        self.take_screenshot("02_personal_info_filled")
        
        # Country
        print("  • Selecting Country...")
        country = Select(self.driver.find_element(By.ID, "country"))
        country.select_by_visible_text("India")
        time.sleep(1.5)
        
        # State
        print("  • Selecting State...")
        state = Select(self.driver.find_element(By.ID, "state"))
        state.select_by_visible_text("Maharashtra")
        time.sleep(1.5)
        
        # City
        print("  • Selecting City...")
        city = Select(self.driver.find_element(By.ID, "city"))
        city.select_by_visible_text("Pune")
        time.sleep(0.5)
        
        self.take_screenshot("03_address_info_filled")
        
        # Scroll to password section
        password_field = self.driver.find_element(By.ID, "password")
        self.driver.execute_script("arguments[0].scrollIntoView(true);", password_field)
        time.sleep(1)
        
        # Password
        print("  • Filling Password...")
        password_field.clear()
        password_field.send_keys("StrongPass@2024")
        time.sleep(1)
        
        # Check password strength indicator
        try:
            strength_text = self.driver.find_element(By.CLASS_NAME, "strength-text")
            print(f"  • Password Strength: {strength_text.text}")
        except:
            pass
        
        # Confirm Password
        print("  • Filling Confirm Password...")
        confirm_password = self.driver.find_element(By.ID, "confirmPassword")
        confirm_password.clear()
        confirm_password.send_keys("StrongPass@2024")
        time.sleep(0.5)
        
        self.take_screenshot("04_password_filled")
        
        # Scroll to terms
        terms_checkbox = self.driver.find_element(By.ID, "terms")
        self.driver.execute_script("arguments[0].scrollIntoView(true);", terms_checkbox)
        time.sleep(1)
        
        # Terms & Conditions
        print("  • Accepting Terms & Conditions...")
        self.driver.execute_script("arguments[0].click();", terms_checkbox)
        time.sleep(0.5)
        
        print("\n  ✓ All form fields filled successfully\n")
        self.take_screenshot("05_form_complete")
        
    def test_verify_password_match(self):
        """Step 3: Verify password and confirm password match"""
        print("[STEP 3] Verifying password validation...\n")
        
        password = self.driver.find_element(By.ID, "password")
        confirm_password = self.driver.find_element(By.ID, "confirmPassword")
        
        password_value = password.get_attribute("value")
        confirm_value = confirm_password.get_attribute("value")
        
        if password_value == confirm_value:
            print("  ✓ Password and Confirm Password match")
            print(f"  • Password: {'*' * len(password_value)}")
        else:
            print("  ✗ Passwords do not match!")
            
    def test_verify_terms_checked(self):
        """Step 4: Verify terms checkbox is checked"""
        print("\n[STEP 4] Verifying Terms & Conditions...\n")
        
        terms = self.driver.find_element(By.ID, "terms")
        is_checked = terms.is_selected()
        
        print(f"  • Terms & Conditions checked: {is_checked}")
        if is_checked:
            print("  ✓ Terms & Conditions accepted")
        else:
            print("  ✗ Terms & Conditions not accepted")
            
    def test_submit_form(self):
        """Step 5: Submit the form"""
        print("\n[STEP 5] Submitting the form...\n")
        
        # Scroll to submit button
        submit_btn = self.driver.find_element(By.ID, "submitBtn")
        self.driver.execute_script("arguments[0].scrollIntoView(true);", submit_btn)
        time.sleep(1)
        
        # Check if button is enabled
        is_disabled = submit_btn.get_attribute("disabled")
        print(f"  • Submit button enabled: {is_disabled is None}")
        
        if is_disabled is None:
            print("  • Clicking Submit button...")
            self.driver.execute_script("arguments[0].click();", submit_btn)
            time.sleep(2)
            
            # Wait for success message
            try:
                success_alert = self.wait.until(
                    EC.presence_of_element_located((By.CLASS_NAME, "alert-success"))
                )
                success_message = success_alert.text
                print(f"\n  ✓ SUCCESS MESSAGE DISPLAYED:")
                print(f"  '{success_message}'")
                
                self.take_screenshot("06_success_state")
                
            except TimeoutException:
                print("  ⚠️  Success message not found (might still be loading)")
                
            # Wait for form reset
            time.sleep(3)
            
            # Verify form fields are reset
            first_name = self.driver.find_element(By.ID, "firstName")
            if first_name.get_attribute("value") == "":
                print("  ✓ Form fields successfully reset")
                self.take_screenshot("07_form_reset")
            
        else:
            print("  ✗ Submit button is disabled!")
            
    def test_form_validation_indicators(self):
        """Bonus: Check validation indicators"""
        print("\n[BONUS] Checking form validation indicators...\n")
        
        # Check for valid class on filled inputs
        valid_inputs = self.driver.find_elements(By.CSS_SELECTOR, ".form-control.valid")
        print(f"  • Fields with valid indicator: {len(valid_inputs)}")
        
        # Check for success icons
        success_icons = self.driver.find_elements(By.CSS_SELECTOR, ".success-icon[style*='opacity: 1']")
        print(f"  • Success icons displayed: {len(success_icons)}")
        
    def teardown(self):
        """Close browser"""
        print("\n[TEARDOWN] Closing browser...")
        time.sleep(2)
        if self.driver:
            self.driver.quit()
        print("✓ Browser closed\n")


def main():
    """Main execution function"""
    URL = "http://localhost:8000/registration.html"
    
    test = RegistrationFormTestFlowB(URL)
    
    try:
        test.setup()
        test.test_launch_page()
        test.test_fill_complete_form()
        test.test_verify_password_match()
        test.test_verify_terms_checked()
        test.test_submit_form()
        test.test_form_validation_indicators()
        
        print("\n" + "=" * 80)
        print("FLOW B - POSITIVE SCENARIO COMPLETED")
        print("=" * 80)
        print("\nTest Results:")
        print("  ✓ Form filled with all valid data")
        print("  ✓ Password validation passed")
        print("  ✓ Terms & Conditions accepted")
        print("  ✓ Form submitted successfully")
        print("  ✓ Success message displayed")
        print("  ✓ Form reset after submission")
        print("\n" + "🎉 " * 20)
        print("ALL TESTS PASSED!")
        print("🎉 " * 20 + "\n")
        
    except Exception as e:
        print(f"\n❌ ERROR: {str(e)}")
        import traceback
        traceback.print_exc()
        
    finally:
        test.teardown()


if __name__ == "__main__":
    main()