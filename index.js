const axios = require('axios');
const cheerio = require('cheerio');

// Set your token value here
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiMDkzMzUwNDYzNTIiLCJpc3MiOiJhdXRoIiwidmVyaWZpZWRfdGltZSI6MTY5MTU4MDg2MywiaWF0IjoxNjkxNTgwODYzLCJleHAiOjE2OTI4NzY4NjMsInVzZXItdHlwZSI6InBlcnNvbmFsIiwidXNlci10eXBlLWZhIjoiXHUwNjdlXHUwNjQ2XHUwNjQ0IFx1MDYzNFx1MDYyZVx1MDYzNVx1MDZjYyIsInNpZCI6ImM3NmU5ODIxLWZkMGQtNDM3YS1hOGJiLTRlNzE5YTI5Y2E2ZiJ9.y2CertlwVCfiM-dSTMAAo4XRO5uERCJxsQeDfdVA31M';

// Set the URL
const url = 'https://divar.ir/services/craftsmen/AhSkX';

// Set the CSS selector for the button
const buttonSelector = '.post-actions__get-contact.kt-button--primary.kt-button';

async function main() {
  try {
    // Make a GET request with the token in the cookie header
    const response = await axios.get(url, {
      headers: {
        Cookie: `token=${token}`,
      },
    });

    // Load the HTML content into cheerio for parsing
    const $ = cheerio.load(response.data);

    // Find the button and extract its URL
    const buttonUrl = $(buttonSelector).attr('href');

    if (buttonUrl) {
      // Make a GET request to the button URL
      const contactResponse = await axios.get(buttonUrl);

      // Print the response data as text
      console.log(contactResponse.data);
    } else {
      console.log('Button not found.');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
