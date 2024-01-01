import puppeteer from "puppeteer";

export default async function handler(req, res) {
  const { links } = req.body; // Assuming you send an array of links in the request body

  try {
    // Launch a headless browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Array to store scraped data
    const scrapedData = [];

    // Loop through each link and scrape data
    for (const link of links) {
      await page.goto(link, { waitUntil: "domcontentloaded" });

      // Example: Extracting title and content, adjust based on your HTML structure
      const title = await page.$eval("h1", (h1) => h1.innerText);
      const content = await page.$eval(
        ".content",
        (content) => content.innerText
      );

      scrapedData.push({ link, title, content });
    }

    // Close the browser
    await browser.close();

    // Send the scraped data in the response
    res.status(200).json({ data: scrapedData });
  } catch (error) {
    console.error("Error during scraping:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
