
from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            print("Navigating to http://localhost:3000")
            page.goto("http://localhost:3000")

            # Wait for content to load
            print("Waiting for content...")
            try:
                page.wait_for_selector("text=Discover Your Next Anime Adventure", timeout=30000)
            except Exception as e:
                print(f"Timed out waiting for content: {e}")
                # Take screenshot even if timed out, to see what's there
                page.screenshot(path="verification/timeout.png")
                return

            print("Content loaded. Checking accessibility attributes...")

            # 1. Check Scroll to Top button
            # It might be visible only after scrolling, but the element should exist in DOM or appearing?
            # The code says: fixed bottom-8 right-8. It's always rendered but maybe z-index issues?
            # No, it's rendered unconditionally at the end of the component.
            scroll_btn = page.locator("button[aria-label='Scroll to top']")
            if scroll_btn.count() > 0:
                print("✅ Scroll to top button with aria-label found.")
            else:
                print("❌ Scroll to top button NOT found or missing aria-label.")
                # Let's inspect all buttons to see what we have
                buttons = page.locator("button").all()
                print(f"Found {len(buttons)} buttons:")
                for i, btn in enumerate(buttons):
                    try:
                        aria = btn.get_attribute("aria-label")
                        cls = btn.get_attribute("class")
                        print(f"Button {i}: aria-label='{aria}', class='{cls}'")
                    except:
                        pass

            # 2. Check Play Trailer button
            # We need to hover over an anime card to see the button?
            # The button is conditioned on `anime.trailer_url`.
            # Let's wait for anime items.
            page.wait_for_selector(".grid", timeout=10000)

            # Find an anime card
            cards = page.locator(".grid > div")
            count = cards.count()
            print(f"Found {count} anime cards.")

            if count > 0:
                # Hover over the first card
                first_card = cards.first
                first_card.hover()

                # Check for Play Trailer button
                # It has conditional aria-label.
                # aria-label starts with "Play trailer for"
                play_btn = first_card.locator("button[aria-label^='Play trailer for']")
                if play_btn.count() > 0:
                    label = play_btn.get_attribute("aria-label")
                    print(f"✅ Play trailer button found with label: '{label}'")
                else:
                    print("❌ Play trailer button NOT found or missing aria-label.")

                    # Debug: print what buttons are in the card
                    card_buttons = first_card.locator("button").all()
                    for btn in card_buttons:
                        print(f"Card button aria-label: {btn.get_attribute('aria-label')}")

            # 3. Check Loading Spinner
            # We need to trigger loading or mock it.
            # It's hard to catch the spinner in a static test unless we force the state.
            # But we can check if the code structure is correct if we could inspect source,
            # but Playwright interacts with rendered page.
            # We can try to scroll to bottom to trigger infinite scroll.
            print("Scrolling to trigger loading...")
            page.evaluate("window.scrollTo(0, document.body.scrollHeight)")

            try:
                # Wait for loading spinner
                spinner = page.locator("div[role='status']")
                spinner.wait_for(state="visible", timeout=5000)
                print("✅ Loading spinner with role='status' found.")

                # Check for sr-only text
                sr_text = spinner.locator(".sr-only")
                if sr_text.count() > 0:
                    text = sr_text.inner_text()
                    print(f"✅ Loading spinner has sr-only text: '{text}'")
                else:
                    print("❌ Loading spinner missing sr-only text.")

            except Exception as e:
                print(f"⚠️ Could not catch loading spinner (might load too fast or not trigger): {e}")

            # Take a screenshot
            page.screenshot(path="verification/accessibility_check.png")
            print("Screenshot saved to verification/accessibility_check.png")

        except Exception as e:
            print(f"An error occurred: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
