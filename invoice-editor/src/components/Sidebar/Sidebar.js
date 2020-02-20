import React, { useContext, useRef } from 'react';
import './Sidebar.scss'

import DataContext from '../Context/Context'
import TotalCalculation from '../TotalCalculation/TotalCalculation'
import { importInvoices, exportInvoices } from '../../api/http'
import { IoIosAdd, IoIosArrowForward } from 'react-icons/io'


const Sidebar = () => {
  const { currentID, invoices, setInvoices, addInvoice, showInvoice } = useContext(DataContext)
  const inputRef = useRef(null)
  const disableExport = invoices.length === 0 ? true : false

  const calcTotalCosts = () => {
    let costs = 0

    invoices.forEach(invoice => {
      costs += parseFloat(invoice.Betrag)
    })

    return costs.toFixed(2)
  }

  const onSelectJsonFile = async (e) => {
    const invoices = await importInvoices(e.target.files[0])
    console.log(invoices)
    setInvoices(invoices)
  }

  return (
    <div className="sidebarContainer">
      <div className="addContainer">
        <p>Rechnungen</p>
        <button className="ripple" onClick={addInvoice}>
          <IoIosAdd />
        </button>
      </div>
      <div className="invoicesList">
        {
          invoices.map((invoice, id) => {

            //sets the id, so active invoices have a different style
            const activeClass = currentID === id ? "active" : ""
            //if the invoice name is long, then show a short version of that name
            const invoiceName = invoice.Name
            const shortName = invoiceName.length > 11 ? invoiceName.substr(0, 11) + "..." : invoiceName

            return (
              <button id={activeClass} key={id} onClick={() => showInvoice(id)}>
                <span>{shortName}</span>
                <span>
                  <p>{invoice.Betrag} €</p>
                  <IoIosArrowForward />
                </span>
              </button>
            )
          })
        }
        {!disableExport && <TotalCalculation id={"invoicesSum"} nettoBetrag={calcTotalCosts()} />}
      </div>
      <div className="btnContainer">
        <input type="file"
          style={{ display: "none" }}
          accept=".json"
          ref={inputRef}
          onChange={onSelectJsonFile} />
        <button className="ripple"
          onClick={() => inputRef.current.click()}>
          Import
        </button>
        <button className="ripple"
          onClick={() => exportInvoices(invoices)}
          disabled={disableExport}>
          Export
        </button>
      </div>
    </div>
  )
}

export default Sidebar