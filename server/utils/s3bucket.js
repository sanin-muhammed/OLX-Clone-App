const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { fromIni } = require("@aws-sdk/credential-provider-node");

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
    region: "ap-south-1", // this is the region that you select in AWS account
});

const storage = multerS3({
    s3: s3,
    bucket: "sanins3bucket",
    acl: "public-read", // Set the ACL for the uploaded file
    metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
        cb(null, Date.now().toString() + "-" + file.originalname);
    },
});

// Initialize multer with disk storage
const upload = multer({ storage: storage });

module.exports = { upload };
