const serverPath = "http://localhost:3001/api"

const importInvoices = async (file) => {
    if(!file) {
        return
    }
    const fd = new FormData()
    fd.append('invoices-file', file)

    const options = {
        method: "POST",
        body: fd
    }
    try {
        const fetchResult = fetch(serverPath + "/importInvoices", options)
        const response = await fetchResult
        const jsonData = await response.json();

        console.log(jsonData.message)
        
        return jsonData.invoiceData
    } catch(e) {
        console.log("Error, with message: " + e)
    }
}

const exportInvoices = (invoices) => {
    const options = {
        method: "POST",
        body: JSON.stringify(invoices),
        headers: {
            "Content-Type": "application/json"
        }
    }

    fetch(serverPath + "/exportInvoices", options)
        .then(res => {
            return res.ok ? 
                res.json() : 
                Promise.reject({ status: res.status, statusText: res.statusText })
        })
        .then(res => {
            console.log(res.message)
        }
        )
        .catch(err => console.log("Error, with message: " + err.statusText))
}

export { importInvoices, exportInvoices }