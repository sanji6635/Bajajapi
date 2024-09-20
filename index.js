const express = require("express");
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

let Numb = [];
let Alph = [];
//for the post endpoint
app.post("/bajaj", (req, res) => {
  //req.body will hold the data sent in the request body
  const { data, file_b64 } = req.body;
  const len = data.length;

  //seperating letters and numbers
  for (var i = 0; i < len; i++) {
    if (isNaN(data[i])) {
      Alph.push(data[i]);
    } else {
      Numb.push(data[i]);
    }
  }

  let smallAplh = null;

  // Find the highest lowercase alphabet
  const lowerAlph = Alph.filter((c) => c >= "a" && c <= "z");
  if (lowerAlph.length > 0) {
    smallAplh = lowerAlph.sort().pop();
  }

  //finding the mime type

  let pattern;
  let vaild;

  const MPattern = /^data:(.+?);base64,/;
  const match = file_b64.match(MPattern);

  if (match) {
    vaild = true;
    pattern = match[1];
  } else {
    pattern = null;
    vaild = false;
  }

  //calculate thej file size
  // Calculate file size (in KB) from base64 string
  const fileSizeKB = (Buffer.from(file_b64, "base64").length / 1024).toFixed(2);

  const responce = {
    is_success: true,
    user_id: "john_doe_17091999",
    email: "john@xyz.com",
    roll_number: "ABCD123",
    numbers: Numb,
    alphabets: Alph,
    highest_lowercase_alphabet: [smallAplh],
    file_valid: vaild,
    file_mime_type: pattern,
    file_size_kb: fileSizeKB,
  };

  res.json(responce);
  //---------------------------------
});

//for the get method
app.get("/bajaj", (req, res) => {
  res.status(200).json({ operation_code: "1" });
});

app.listen(4200, () => {
  console.log(`server is isten on port 4200`);
});
