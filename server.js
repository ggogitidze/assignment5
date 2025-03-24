const express = require('express');
const nedb = require('nedb-promises');
const app = express();
const port = 3000;


const db = nedb.create('hits.db');


app.use(express.static('public'));

app.get('/hits/:pageID', async (req, res) => {
  const { pageID } = req.params;
  let pageData = await db.findOne({ pageID });


  if (!pageData) {
    pageData = { pageID, hits: 0 };
    await db.insert(pageData);
  }


  pageData.hits += 1;

  await db.update({ pageID }, { $set: { hits: pageData.hits } });


  res.json({ pageID, hits: pageData.hits });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.use(express.static('public'));

