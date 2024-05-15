
const express = require("express");
const cors = require("cors");
const app = express(); // create express app

const path = require("path");

var bodyParser = require('body-parser')
const multer = require("multer")
const crypto = require('crypto')
const sharp = require('sharp')

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

// get driver connection
require("dotenv").config({ path: "./config.env" });

//conn object
const dbo = require("./db/conn");

const bucketName = "assignemnt2images"
const region2 = process.env.AWS_BUCKET_REGION
const accessKeyId = 'AKIA5WBRXX4MMGAWKB4L'
const secretAccessKey = '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'
const s3Client = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId,
    x
  }
})


// parse application/json
app.use(bodyParser.json())

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

//allows the api request from the different origins
app.use(cors())

//for pre-flight options
app.options('*', cors())

// the api is public or you can specify the origins you wanted to allow
app.use(cors({
  origin: '*'
}));


//static is a middleware that informs express to execute all the files from the mentioned directory
// app.use(express.static(path.join(__dirname, "..", "client/build")));


const randomName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

app.post('/addImage', upload.single("image"), async (req, res) => {
  console.log("image buffer ", req.file);
  req.file.buffer
  const afterResize = await sharp(req.file.buffer).resize({ height: 1920, width: 1080, fit: "contain" }).toBuffer()

  const uploadParams = {
    Bucket: bucketName,
    Body: afterResize,
    Key: randomName(),
    ContentType: req.file.mimetype
  }
  var x;
  await s3Client.send(new PutObjectCommand(uploadParams)).then((data) => x = data)

  console.log("x from server", x.ETag)


  res.send(x.ETag)
});


//api call for the addition of 2 numbers 
app.get('/add/:firstNumber/:secondNumber', (req, res) => {
  console.log("port called", req.params.firstNumber + req.params.secondNumber);
  //Checkout console to see why parseInt is essential in this case.
  let firstNo = parseInt(req.params.firstNumber),
    secondNo = parseInt(req.params.secondNumber);
  res.send({ "Addition": firstNo + secondNo });
});

// api call to write the documents to the collection
app.post('/addInventory/addRecord', async (req, res) => {
  console.log("add Record from server", req.body);
  const x = await dbo.addRecord(req.body)
  res.send({ data: x });
});

app.post('/addInventory/deleteRecord', async (req, res) => {
  console.log("add Record from server", req.body);
  const x = await dbo.deleteRecord(req.body)
  res.send({ data: x });
});


//update the record
app.post('/addInventory/updateRecord', async (req, res) => {
  console.log("update Record from server", req.body);
  const x = await dbo.updateRecord(req.body)
  res.send({ data: x });
});

//api call to get the records 
app.get('/addInventory/getRecord', async (req, res) => {
  console.log("get record from server");
  const x = await dbo.getRecord({ name: "xyz" })
  // console.log("x res from server", x);
  res.send({ data: x });
});

app.get('/addInventory/getUsers', async (req, res) => {
  console.log("get record from server");
  const x = await dbo.getUsers({})
  console.log("x res from server users", x);
  res.send({ data: x });
});

app.get('/addInventory/getInventoryData', async (req, res) => {
  console.log("get record from server");
  const x = await dbo.getInventoryData()
  // for (const i of x) {
  //   const getObjectParams = {
  //     Bucket: bucketName,
  //     Key: i.image,
  //   }

  //     const command2 = new GetObjectCommand(getObjectParams);
  //    const url = await getSignedUrl(s3Client, command2, { expiresIn: 3600 });
  //    i.image = url
  // }
  console.log("getInventoryData", x);
  res.send({ data: x });
});

app.post('/addInventory/addUser', async (req, res) => {
  console.log("add User from server", req.body);
  const x = await dbo.addUser(req.body)
  res.send({ data: x });
});

// start express server on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log("port 5000",PORT);
  await dbo.connectToServer(function (err) {
    console.log("server database");
    if (err) console.error(err);

  });
  await dbo.listDatabases(function (err) {
    console.log("server database");
    if (err) console.error(err);

  });
});
app.use(express.static(path.join(__dirname, './build')));
app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, "public", "index.html"));  
   res.sendFile(path.join(__dirname, '../client/build/index.html'));
  // res.sendFile(path.join(__dirname, './build/index.html'));
  console.log("path from server ",path.join(__dirname, './build/index.html'))
});