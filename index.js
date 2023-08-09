const axios = require('axios');
const cheerio = require('cheerio');

const cookie = 'token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiMDkzMzUwNDYzNTIiLCJpc3MiOiJhdXRoIiwidmVyaWZpZWRfdGltZSI6MTY5MTU4MDg2MywiaWF0IjoxNjkxNTgwODYzLCJleHAiOjE2OTI4NzY4NjMsInVzZXItdHlwZSI6InBlcnNvbmFsIiwidXNlci10eXBlLWZhIjoiXHUwNjdlXHUwNjQ2XHUwNjQ0IFx1MDYzNFx1MDYyZVx1MDYzNVx1MDZjYyIsInNpZCI6ImM3NmU5ODIxLWZkMGQtNDM3YS1hOGJiLTRlNzE5YTI5Y2E2ZiJ9.y2CertlwVCfiM-dSTMAAo4XRO5uERCJxsQeDfdVA31M';

const url = 'https://divar.ir/services/craftsmen/AhSkX';

axios.get(url, {
  headers: {
    Cookie: cookie
  }
})
.then(response => {
  const html = response.data;
  const $ = cheerio.load(html);
  
  const button = $('button[class*="your-button-class"]');
  
  if (button.length === 0) {
    console.log('Button not found.');
    return;
  }
  
  const buttonContent = button.text().trim();
  console.log('Button Content:', buttonContent);
  
  button.click(); // Simulate click action
  
  setTimeout(() => {
    const aTag = $('a.kt-unexpandable-row__action.kt-text-truncate');
    
    if (aTag.length === 0) {
      console.log('Anchor tag not found.');
      return;
    }
    
    const hrefValue = aTag.attr('href');
    console.log('Href Value:', hrefValue);
  }, 5000); // Wait for 5 seconds before retrieving href value
})
.catch(error => {
  console.error('Error:', error.message);
});
