import fs from 'fs';
import path from 'path';
import https from 'https';

const url = 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1400&q=85';
const dest = path.join(process.cwd(), 'public', 'images', 'hero-patient.jpg');

const file = fs.createWriteStream(dest);
https.get(url, (response) => {
  if (response.statusCode === 301 || response.statusCode === 302) {
    https.get(response.headers.location, (res) => {
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log('Downloaded fresh hero patient image');
      });
    });
  } else {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log('Downloaded fresh hero patient image');
    });
  }
});
