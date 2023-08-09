const puppeteer = require('puppeteer');

const cookie = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiMDkzMzUwNDYzNTIiLCJpc3MiOiJhdXRoIiwidmVyaWZpZWRfdGltZSI6MTY5MTU4MDg2MywiaWF0IjoxNjkxNTgwODYzLCJleHAiOjE2OTI4NzY4NjMsInVzZXItdHlwZSI6InBlcnNvbmFsIiwidXNlci10eXBlLWZhIjoiXHUwNjdlXHUwNjQ2XHUwNjQ0IFx1MDYzNFx1MDYyZVx1MDYzNVx1MDZjYyIsInNpZCI6ImM3NmU5ODIxLWZkMGQtNDM3YS1hOGJiLTRlNzE5YTI5Y2E2ZiJ9.y2CertlwVCfiM-dSTMAAo4XRO5uERCJxsQeDfdVA31M';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set the cookie
  await page.setCookie({
    name: 'token',
    value: cookie,
    domain: 'divar.ir'
  });

  // Navigate to the URL
  await page.goto('https://divar.ir/services/craftsmen/AhSkX');

  // Click the button
  const buttonSelector = 'button[class*="your-button-class"]';
  await page.waitForSelector(buttonSelector);
  await page.click(buttonSelector);

  // Wait for 5 seconds
  await page.waitForTimeout(5000);

  // Retrieve the href value
  const hrefValue = await page.evaluate(() => {
    const anchor = document.querySelector('a.kt-unexpandable-row__action.kt-text-truncate');
    return anchor ? anchor.href : null;
  });

  console.log('Href Value:', hrefValue);

  await browser.close();
})();
