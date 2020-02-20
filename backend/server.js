const express = require('express')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const logger = require('morgan')
var cors = require('cors')
var fs = require('fs')
const TextDecoder = require('util').TextDecoder


const port = 3001
const server = express()
const router = express.Router()

// enable cross site scripting since different frontend and backend listening on different ports
server.use(cors())
// middleware for uploading files
server.use(fileUpload())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
// logs server requests
server.use(logger('dev'))


/**
 * store invoice in a json file on desktop
 */
const storeData = (fileContent) => {
    const path = "C:\\Users\\shan\\Desktop\\invoices.json"
    try {
        fs.writeFileSync(path, JSON.stringify(fileContent))
    } catch (err) {
        console.error(err)
    }
}

const prepareData = (importedFile) => {
    const bufferedData = importedFile["invoices-file"]["data"]
    const buf = Buffer.from(bufferedData, "7bit")
    const enc = new TextDecoder("utf-8");
    const decodedBufferString = enc.decode(buf)

    return JSON.parse(decodedBufferString)
}

/**
 * get invoice list file
 * check if its content fits to the invoices content
 * prepare and send as response
*/
router.post("/importInvoices", (req, res) => {

    const data = prepareData(req.files)

    return res.json({
        success: true,
        message: "import successfully",
        invoiceData: data
    })
})

/**
 * get invoices
 */
router.post("/exportInvoices", (req, res) => {
    const invoices = req.body

    if (!invoices) {
        return res.json({ success: false })
    }

    storeData(invoices)

    return res.json({
        success: true,
        message: "stored invoices successfully"
    })
})

// append /api for the http requests
server.use("/api", router)

// launch backend into PORT 
server.listen(port, () => console.log(`listening on port ${port}`))