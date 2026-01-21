
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            print("Navigating...")
            page.goto("http://localhost:3000")

            # Wait for at least one Play icon (FaPlay) or just the button
            # The button has the click handler.
            # We can search for the button by part of the aria-label we expect
            print("Waiting for play button...")
            try:
                # Wait for any button with label starting with "Play trailer"
                play_btn = page.locator("button[aria-label^='Play trailer']")
                play_btn.first.wait_for(state="attached", timeout=15000)

                count = play_btn.count()
                print(f"✅ Found {count} buttons with 'Play trailer' label.")
                if count > 0:
                    print(f"First label: {play_btn.first.get_attribute('aria-label')}")
            except Exception as e:
                print(f"❌ Error waiting for play button: {e}")

                # Dump some HTML to debug
                print("Dumping first 500 chars of body:")
                print(page.inner_html("body")[:500])

            # Also check Loading spinner by role if we can
            # It might not be present if not loading.

        finally:
            browser.close()

if __name__ == "__main__":
    run()
