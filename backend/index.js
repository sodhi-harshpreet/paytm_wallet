const express = require('express');
const cors = require('cors');

const app = express();
const mainRouter = require('./routes/index'); // Ensure this path is correct


app.use(cors());
app.use(express.json());

app.use('/api/v1', mainRouter); // Ensure mainRouter is a middleware function
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
