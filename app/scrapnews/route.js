import puppeteer from "puppeteer";

import { NextResponse } from 'next/server';

export async function POST(req) {
  let browser;
  try {
    const { links } = await req.json();

    if (!links || !Array.isArray(links)) {
      return NextResponse.json({ error: "Links array is required" }, { status: 400 });
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const scrapedData = [];

    for (const link of links) {
      try {
        const url = new URL(link);
        if (!['http:', 'https:'].includes(url.protocol)) {
            continue; // Skip non-http/https links
        }

        // Basic SSRF protection: Don't allow local addresses (incomplete but a start)
        if (['localhost', '127.0.0.1', '::1'].includes(url.hostname)) {
             continue;
        }

        await page.goto(link, { waitUntil: "domcontentloaded", timeout: 10000 });

        const title = await page.$eval("h1", (h1) => h1.innerText).catch(() => null);
        const content = await page.$eval(".content", (content) => content.innerText).catch(() => null);

        scrapedData.push({ link, title, content });
      } catch (err) {
        console.error(`Error scraping ${link}:`, err.message);
        scrapedData.push({ link, error: "Failed to scrape" });
      }
    }

    await browser.close();
    return NextResponse.json({ data: scrapedData });
  } catch (error) {
    console.error("Error during scraping:", error);
    if (browser) await browser.close();
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
