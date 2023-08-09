const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer'); // Add puppeteer for headless browser automation

const cookie = 'token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiMDkzMzUwNDYzNTIiLCJpc3MiOiJhdXRoIiwidmVyaWZpZWRfdGltZSI6MTY5MTU4MDg2MywiaWF0IjoxNjkxNTgwODYzLCJleHAiOjE2OTI4NzY4NjMsInVzZXItdHlwZSI6InBlcnNvbmFsIiwidXNlci10eXBlLWZhIjoiXHUwNjdlXHUwNjQ2XHUwNjQ0IFx1MDYzNFx1MDYyZVx1MDYzNVx1MDZjYyIsInNpZCI6ImM3NmU5ODIxLWZkMGQtNDM3YS1hOGJiLTRlNzE5YTI5Y2E2ZiJ9.y2CertlwVCfiM-dSTMAAo4XRO5uERCJxsQeDfdVA31M';

const url = 'https://divar.ir/services/craftsmen/AhSkX';
const buttonClass = 'your-button-class'; // Replace with the actual class name of the button
const linkClass = 'kt-unexpandable-row__action'; // Class of the link to retrieve

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setExtraHTTPHeaders({
      'Cookie': cookie
    });

    await page.goto(url);
    
    // Wait for the button to be available
    await page.waitForSelector(`button.${buttonClass}`);

    // Click the button
    await page.click(`button.${buttonClass}`);
    
    // Wait for 5 seconds
    await page.waitForTimeout(5000);

    // Get the href value of the specified link
    const linkHref = await page.evaluate(linkClass => {
      const linkElement = document.querySelector(`a.${linkClass}`);
      return linkElement ? linkElement.getAttribute('href') : null;
    }, linkClass);

    if (linkHref) {
      console.log('Link Href:', linkHref);
    } else {
      console.log('Link not found.');
    }

    await browser.close();
  } catch (error) {
    console.error('Error:', error);
  }
})();
