const fs = require('fs');
const {v4: uuid} = require('uuid');
const allowExtensions = ["png", "jpg", "jpeg", "webp", "png"];

const saveFile = (file, allowE, destFolder= `./public/images/`) => {
    try{
    //console.log(`file:`,file, `allowE:`,allowE, `destFolder:`,destFolder);
    const [type, extension] = file.mimetype.split("/");
    //console.log(`extension:`,extension);
    if(!allowE.includes(extension)) throw "Formato incorrecto";
    const uid = uuid();
    //console.log(`uid:`,uid);
    const fileName = `${uid}.${extension}`;
    const fileNameOut = `${destFolder}/${uid}.${extension}`;
    fs.createReadStream(file.path).pipe(fs.createWriteStream(fileNameOut));
    fs.unlink(file.path, (err) => console.log(err));
    return fileName;

    } catch(e){
        fs.unlink(file.path, (err) => console.log(err));
        console.log(e);
    }

}

const imgFile = (file) => saveFile(file, allowExtensions);

module.exports = {imgFile};