const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const fs = require('fs');
require('dotenv').config();
const path = require('path')
const multer = require('multer');
const app = express();
const upload = multer();

const PORT = process.env.PORT || 3000;
const imageBase64 = 'https://suvicharworld.com/wp-content/uploads/2024/03/english-suvichar-48_11zon-965x1024.jpg';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const USER_ID = process.env.USER_ID;
const INSTRGRAM_APP_ID = process.env.INSTRGRAM_APP_ID;
const imagePath = './testPost.jpg'; 




app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


app.get('/media', async (req, res) => {
  try {
    const response = await axios.get(`https://graph.facebook.com/v20.0/${INSTRGRAM_APP_ID}?`, {
      params: {
        fields: 'name,profile_picture_url,username,followers_count,follows_count,biography,tags',
        access_token: `${ACCESS_TOKEN}`
      }
    });
    res.json(response.data);
    console.log(response.data)
  } catch (error) {
    console.error('Error fetching media:', error.response.data);
    res.status(500).json({ error: 'Failed to fetch media' });
  }
});



app.post('/upload', upload.none(), async (req, res) => {
  const { imageUrl, caption } = req.body;

  try {
      const uploadResponse = await axios.post(
          `https://graph.facebook.com/v16.0/${INSTRGRAM_APP_ID}/media`,
          {
              image_url: imageUrl,
              caption: caption,
              access_token: ACCESS_TOKEN,
          }
      );

      const { id } = uploadResponse.data;
      const publishResponse = await axios.post(
          `https://graph.facebook.com/v16.0/${INSTRGRAM_APP_ID}/media_publish`,
          {
              creation_id: id,
              access_token: ACCESS_TOKEN,
          }
      );

      res.send(`Image published successfully: ${JSON.stringify(publishResponse.data)}`);
  } catch (error) {
      res.status(500).send(`Error posting image to Instagram: ${error.response ? JSON.stringify(error.response.data) : error.message}`);
  }
});






// facebook Starting Point  




 
// const axios = require('axios');

// const PAGE_ACCESS_TOKEN = '';
// const PAGE_ID = '';

// async function postTextStatus(message) {
//   try {
//     const response = await axios.post(
//       `https://graph.facebook.com/v16.0/${PAGE_ID}/feed`,
//       {
//         message: message
//       },
//       {
//         params: {
//           access_token: PAGE_ACCESS_TOKEN,
//         },
//       }
//     );

//     console.log('Post ID:', response.data.id);
//   } catch (error) {
//     console.error('Error posting text status:', error.response ? error.response.data : error.message);
//   }
// }

// // postTextStatus('Hello, Facebook!');



// async function postPhoto(imagePath, message) {
//   try {
//     const response = await axios.post(
//       `https://graph.facebook.com/v16.0/${PAGE_ID}/photos`,
//       {
//         message: message,
//         url: imagePath,
//         access_token: PAGE_ACCESS_TOKEN
//       }
//     );

//     console.log('Post ID:', response.data.post_id);
//   } catch (error) {
//     console.error('Error posting photo:', error.response ? error.response.data : error.message);
//   }
// }

// postPhoto('https://png.pngtree.com/png-clipart/20190611/original/pngtree-cute-cartoon-fish-vector-png-image_2628296.jpg', 'Check out this cool photo!');

// Facebook End point 



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
