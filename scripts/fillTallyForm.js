import puppeteer from 'puppeteer';
import fs from 'fs/promises';

const TALLY_FORM_URL = 'https://tally.so/r/wo1eOb'; // Replace with your Tally form URL

async function fillTallyForm(profiles) {
  const browser = await puppeteer.launch({ headless: false }); // Set to true for production
  const page = await browser.newPage();

  try {
    await page.goto(TALLY_FORM_URL, { waitUntil: 'networkidle0' });

    // Wait for the form to load
    await page.waitForSelector('input[type="text"]');

    // Fill each Instagram profile URL
    for (let i = 0; i < profiles.length; i++) {
      const inputSelector = `input[type="text"]:nth-of-type(${i + 1})`;
      await page.waitForSelector(inputSelector);
      await page.type(inputSelector, profiles[i]);
      
      // If there are more profiles than input fields, break
      const nextInput = await page.$(inputSelector);
      if (!nextInput) break;
    }

    // Optional: Submit the form
    // const submitButton = await page.waitForSelector('button[type="submit"]');
    // await submitButton.click();

    console.log('Form filled successfully!');
  } catch (error) {
    console.error('Error filling form:', error);
  } finally {
    // Keep the browser open for review
    // await browser.close();
  }
}

// Read profiles from our search results
async function getProfiles() {
  try {
    const data = await fs.readFile('profiles.json', 'utf8');
    const profiles = JSON.parse(data);
    return profiles.map(p => p.link);
  } catch (error) {
    console.error('Error reading profiles:', error);
    return [];
  }
}

// Main execution
(async () => {
  const profiles = await getProfiles();
  if (profiles.length > 0) {
    await fillTallyForm(profiles);
  } else {
    console.log('No profiles found to fill the form with.');
  }
})();