import React, { useContext } from 'react'
import './Main.scss'

import DataContext from "../Context/Context";
import Products from '../Products/Products'
import emptyFolderImg from '../../images/empty-folder.svg'

const Main = () => {

  const {currentID, 
        currentInvoice, 
        invoices, 
        updateInvoice,
        removeInvoice } = useContext(DataContext)

  const updateCurrentInvoice = (e) => {
    const { name, value } = e.target
    updateInvoice(name, value)
  }

  const setInputFields = (labelArr) => {
    return labelArr.map((label, id) => {
      return (
        <span key={id} className="inputField">
          <p>{label}</p>
          <input type="text"
            name={label}
            value={currentInvoice[label]}
            onChange={updateCurrentInvoice} />
        </span>
      )
    })
  }

  if (!invoices.length) {
    return (
      <img src={emptyFolderImg} alt="Empty Folder" />
    )
  }

  return (
    <div className="Main">
      <span id="generalData">
        <p>Allgemeine Daten</p>
        {
          setInputFields(["Kundennr.", "Name", "Ansprechpartner", "Anschrift", "PLZ", "Ort"])
        }
      </span>
      <span id="paymentInfo">
        <p>Zahlungsinformation</p>
        {
          setInputFields(["IBAN", "BIC", "Kontoinhaber", "Mandatsreferenz", "Mandat Ort", "Mandat Datum", "Mandat Person"])
        }
      </span>
      <span id="invoiceData1" className="invoiceData">
        <p>Rechnungsdaten</p>
        {
          setInputFields(["Rechnungsnr.", "Zeitraum"])
        }
      </span>
      <span id="invoiceData2" className="invoiceData">
        {
          setInputFields(["Rechnungsdatum", "Fälligkeitsdatum"])
        }
      </span>
      <Products />
      <button id="removeInvoice"
        className={currentInvoice.Produkte.length ? "topbottomMargin" : ""}
        onClick={() => { removeInvoice(currentID) }}>
        Diese Rechnung entfernen
      </button>
    </div>
  )
}

export default Main