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
  
  const button = $('button[class="kt-button kt-button--primary"]');
  
  if (button.length === 0) {
    console.log('Button not found.');
    return;
  }
  
  const buttonContent = button.text().trim();
  console.log('Button Content:', buttonContent);
})
.catch(error => {
  console.error('Error:', error.message);
});
