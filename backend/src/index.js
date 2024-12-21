const app = require('./app');
const db = require('./db/connect')
const port = process.env.PORT || 3000;

db().then(()=>{
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

}).catch(()=>{
  console
})