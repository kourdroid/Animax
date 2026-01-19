from playwright.sync_api import sync_playwright, expect
import time

def verify_accessibility():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Go to home page
        print("Navigating to home page...")
        try:
            page.goto("http://localhost:3000", timeout=60000)
        except Exception as e:
            print(f"Failed to load page: {e}")
            browser.close()
            return

        # Wait for content to load (anime cards)
        # The first anime card usually has a play button.
        # We need to wait for data fetching.
        print("Waiting for anime cards to load...")
        try:
            page.wait_for_selector("button[aria-label*='Play trailer']", timeout=30000)
            print("Found Play trailer button!")
        except:
            print("Timeout waiting for play button. taking screenshot for debug")

        # Verify Play Button ARIA label
        play_buttons = page.locator("button[aria-label*='Play trailer']")
        count = play_buttons.count()
        print(f"Found {count} play buttons.")
        if count > 0:
            label = play_buttons.first.get_attribute("aria-label")
            print(f"First play button aria-label: {label}")

        # Verify Scroll Button ARIA label
        scroll_btn = page.locator("button[aria-label='Scroll to top']")
        if scroll_btn.count() > 0:
            print("Found Scroll to top button with correct aria-label.")
        else:
            print("Scroll to top button NOT found or missing aria-label.")

        # Screenshot Home
        page.screenshot(path="verification_home.png")
        print("Saved verification_home.png")

        # Go to Search Page
        print("Navigating to search page...")
        page.goto("http://localhost:3000/search_anime")

        # Verify Search Input ARIA label
        try:
            search_input = page.locator("input[aria-label='Search for anime']")
            expect(search_input).to_be_visible()
            print("Found Search input with correct aria-label.")
        except:
             print("Search input not found")

        browser.close()

if __name__ == "__main__":
    verify_accessibility()
