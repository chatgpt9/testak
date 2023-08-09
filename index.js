const axios = require('axios');
const { JSDOM } = require('jsdom');

const tokenValue = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiMDkzMzUwNDYzNTIiLCJpc3MiOiJhdXRoIiwidmVyaWZpZWRfdGltZSI6MTY5MTU4MDg2MywiaWF0IjoxNjkxNTgwODYzLCJleHAiOjE2OTI4NzY4NjMsInVzZXItdHlwZSI6InBlcnNvbmFsIiwidXNlci10eXBlLWZhIjoiXHUwNjdlXHUwNjQ2XHUwNjQ0IFx1MDYzNFx1MDYyZVx1MDYzNVx1MDZjYyIsInNpZCI6ImM3NmU5ODIxLWZkMGQtNDM3YS1hOGJiLTRlNzE5YTI5Y2E2ZiJ9.y2CertlwVCfiM-dSTMAAo4XRO5uERCJxsQeDfdVA31M';

// Set the request headers including the "token" cookie
const headers = {
  'Cookie': `token=${tokenValue}`,
};

// URL to fetch content from
const url = 'https://divar.ir/services/craftsmen/AhSkX';

// Make the HTTP GET request
axios.get(url, { headers })
  .then(response => {
    const html = response.data;

    // Use JSDOM to parse the HTML and interact with it
    const dom = new JSDOM(html);
    const { document } = dom.window;

    // Find and click the button using XPath
    const buttonXPath = '//*[@id="app"]/div[2]/div/div/div[1]/div[2]/button[1]';
    const button = document.evaluate(buttonXPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    if (button) {
      button.click();

      // Display the response text after clicking the button
      console.log(dom.window.document.body.textContent);
    } else {
      console.log('Button not found');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
