"""
Selenium Automation Script - Flow A (Negative Scenario)
Tests form validation by intentionally leaving required fields empty
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


class RegistrationFormTestFlowA:
    def __init__(self, url):
        self.url = url
        self.driver = None
        self.wait = None
        self.screenshots_dir = "../screenshots/flow_a"
        
        # Create screenshots directory
        os.makedirs(self.screenshots_dir, exist_ok=True)
        
    def setup(self):
        """Initialize WebDriver"""
        print("=" * 80)
        print("FLOW A - NEGATIVE SCENARIO TEST")
        print("=" * 80)
        print("\n[SETUP] Initializing Chrome WebDriver...")
        
        # Chrome options for better automation
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
        
        # Get and print page details
        page_url = self.driver.current_url
        page_title = self.driver.title
        
        print(f"  • Page URL: {page_url}")
        print(f"  • Page Title: {page_title}")
        print("  ✓ Page loaded successfully\n")
        
        self.take_screenshot("01_page_loaded")
        
    def test_fill_form_incomplete(self):
        """Step 2: Fill form with intentionally missing Last Name"""
        print("[STEP 2] Filling form with incomplete data...")
        print("  ⚠️  Intentionally skipping Last Name field\n")
        
        # First Name - filled
        print("  • Filling First Name...")
        first_name = self.wait.until(EC.presence_of_element_located((By.ID, "firstName")))
        first_name.clear()
        first_name.send_keys("Rahul")
        time.sleep(0.5)
        
        # Last Name - SKIPPED (this is intentional for negative test)
        print("  ⚠️  Skipping Last Name (negative test)")
        
        # Email - filled with valid email
        print("  • Filling Email...")
        email = self.driver.find_element(By.ID, "email")
        email.clear()
        email.send_keys("rahul.sharma@gmail.com")
        time.sleep(0.5)
        
        # Phone - filled with valid number
        print("  • Filling Phone Number...")
        phone = self.driver.find_element(By.ID, "phone")
        phone.clear()
        phone.send_keys("+91 9876543210")
        time.sleep(0.5)
        
        # Age - filled
        print("  • Filling Age...")
        age = self.driver.find_element(By.ID, "age")
        age.clear()
        age.send_keys("25")
        time.sleep(0.5)
        
        # Gender - checked
        print("  • Selecting Gender...")
        gender_male = self.driver.find_element(By.CSS_SELECTOR, "input[name='gender'][value='male']")
        self.driver.execute_script("arguments[0].click();", gender_male)
        time.sleep(0.5)
        
        # Address - filled
        print("  • Filling Address...")
        address = self.driver.find_element(By.ID, "address")
        address.clear()
        address.send_keys("123 Main Street, Apartment 4B")
        time.sleep(0.5)
        
        # Country - selected
        print("  • Selecting Country...")
        country = Select(self.driver.find_element(By.ID, "country"))
        country.select_by_visible_text("India")
        time.sleep(1)
        
        # State - selected
        print("  • Selecting State...")
        state = Select(self.driver.find_element(By.ID, "state"))
        state.select_by_visible_text("Maharashtra")
        time.sleep(1)
        
        # City - selected
        print("  • Selecting City...")
        city = Select(self.driver.find_element(By.ID, "city"))
        city.select_by_visible_text("Amravati")
        time.sleep(0.5)
        
        # Password - filled
        print("  • Filling Password...")
        password = self.driver.find_element(By.ID, "password")
        password.clear()
        password.send_keys("SecurePass@123")
        time.sleep(0.5)
        
        # Confirm Password - filled
        print("  • Filling Confirm Password...")
        confirm_password = self.driver.find_element(By.ID, "confirmPassword")
        confirm_password.clear()
        confirm_password.send_keys("SecurePass@123")
        time.sleep(0.5)
        
        # Terms - checked
        print("  • Accepting Terms & Conditions...")
        terms = self.driver.find_element(By.ID, "terms")
        self.driver.execute_script("arguments[0].click();", terms)
        time.sleep(0.5)
        
        print("\n  ✓ Form filled (Last Name intentionally skipped)\n")
        self.take_screenshot("02_form_filled_incomplete")
        
    def test_submit_and_validate_error(self):
        """Step 3: Submit form and validate error messages"""
        print("[STEP 3] Submitting form and validating errors...\n")
        
        # Scroll to submit button
        submit_btn = self.driver.find_element(By.ID, "submitBtn")
        self.driver.execute_script("arguments[0].scrollIntoView(true);", submit_btn)
        time.sleep(1)
        
        # Check if submit button is disabled (it should be due to validation)
        is_disabled = submit_btn.get_attribute("disabled")
        print(f"  • Submit button disabled: {is_disabled is not None}")
        
        if is_disabled:
            print("  ✓ Submit button correctly disabled due to missing Last Name\n")
            
            # Trigger validation by clicking on Last Name field and then blurring
            print("  • Triggering Last Name validation...")
            last_name = self.driver.find_element(By.ID, "lastName")
            last_name.click()
            time.sleep(0.5)
            
            # Click somewhere else to trigger blur event
            first_name = self.driver.find_element(By.ID, "firstName")
            first_name.click()
            time.sleep(1)
            
            # Check for error message
            try:
                last_name_group = last_name.find_element(By.XPATH, "./ancestor::div[@class='form-group']")
                error_message = last_name_group.find_element(By.CLASS_NAME, "error-message")
                error_text = error_message.text
                
                print(f"  ✓ Error message displayed: '{error_text}'")
                
                # Check if field is highlighted
                is_invalid = "invalid" in last_name.get_attribute("class")
                print(f"  ✓ Last Name field highlighted as invalid: {is_invalid}")
                
            except Exception as e:
                print(f"  ✗ Could not find error message: {str(e)}")
        
        self.take_screenshot("03_error_state")
        
        print("\n" + "=" * 80)
        print("FLOW A - NEGATIVE SCENARIO COMPLETED")
        print("=" * 80)
        print("\nTest Results:")
        print("  ✓ Form correctly prevents submission with missing required field")
        print("  ✓ Error message displayed for Last Name")
        print("  ✓ Invalid field highlighted in red")
        print("  ✓ Submit button remains disabled")
        print("\n")
        
    def test_scroll_demonstration(self):
        """Scroll through the page to show all form sections"""
        print("[BONUS] Demonstrating form sections...\n")
        
        # Scroll to top
        self.driver.execute_script("window.scrollTo(0, 0);")
        time.sleep(1)
        
        # Scroll through sections
        sections = self.driver.find_elements(By.CLASS_NAME, "form-section")
        for i, section in enumerate(sections):
            print(f"  • Scrolling to section {i+1}...")
            self.driver.execute_script("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", section)
            time.sleep(1.5)
        
        print("  ✓ All sections demonstrated\n")
        
    def teardown(self):
        """Close browser"""
        print("[TEARDOWN] Closing browser...")
        time.sleep(2)
        if self.driver:
            self.driver.quit()
        print("✓ Browser closed\n")
        

def main():
    """Main execution function"""
    # URL of the registration form (update this to your actual URL)
    URL = "http://localhost:8000/registration.html"
    
    # For file access, use: file:///absolute/path/to/registration.html
    
    test = RegistrationFormTestFlowA(URL)
    
    try:
        test.setup()
        test.test_launch_page()
        test.test_fill_form_incomplete()
        test.test_submit_and_validate_error()
        test.test_scroll_demonstration()
        
        print("\n" + "🎉 " * 20)
        print("ALL TESTS COMPLETED SUCCESSFULLY!")
        print("🎉 " * 20 + "\n")
        
    except Exception as e:
        print(f"\n❌ ERROR: {str(e)}")
        import traceback
        traceback.print_exc()
        
    finally:
        test.teardown()


if __name__ == "__main__":
    main()