const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
let filesRouter = express.Router();

const upload = multer({
    dest: "./tempFiles"
});

filesRouter.get("/:filename", (req, res) => {
    let filename = req.params.filename;
    res.sendFile(filename, {root: '../../../uploads'});
});

filesRouter.post(
    "/upload",
    upload.single("file" ),
    (req, res) => {
        console.log(req.file)
        const tempPath = req.file.path;
        console.log(tempPath);

        let randomPostfix = (Math.floor(Math.random() * 1000000) + 1).toString();

        if (!fs.existsSync("../../../uploads")) {
            fs.mkdirSync("../../../uploads");            
        }

        let targetPathWithoutExt = path.join(`../../../uploads/${randomPostfix}`);
        let targetPath =  targetPathWithoutExt + path.extname(req.file.originalname);
        let fileName = `${randomPostfix}${path.extname(req.file.originalname)}`;
        fs.rename(tempPath, targetPath, err => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            }
            else{
                res
                    .status(200)
                    .contentType("text/plain")
                    .end(fileName);

                console.log("new uploaded file name: " + fileName);
            }
        });
    }
);

module.exports = filesRouter;
