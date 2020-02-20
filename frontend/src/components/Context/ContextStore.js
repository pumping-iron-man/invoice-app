import React, { Component } from 'react'

import DataContext from './Context'


class ContextStore extends Component {

    /**
   * invoiceID : gives the newly created an ID
   * invoices : list storing all invoices
   * currentID : stores the position of active invoice in invoices
   * currentInvoice : stores the current active invoice for display
   */
    constructor(props) {
        super(props)
        this.state = {
            invoiceID: 1,
            invoices: [],
            currentID: null,
            currentInvoice: null
        }
    }

    /**
     * sets invoices state with the imported invoices
     */
    setInvoices = (invoices) => {
        this.setState({
            invoiceID : invoices.length,
            currentID : 0,
            currentInvoice : invoices[0],
            invoices,
        })
    }

    /**
     * adds new invoice to the invoices list
     */
    addInvoice = () => {
        let newInvoice = {
            "Kundennr.": "",
            "Name": "Rechnung " + this.state.invoiceID,
            "Ansprechpartner": "",
            "Anschrift": "",
            "PLZ": "",
            "Ort": "",
            "IBAN": "",
            "BIC": "",
            "Kontoinhaber": "",
            "Mandatsreferenz": "",
            "Mandat Ort": "",
            "Mandat Datum": "",
            "Mandat Person": "",
            "Rechnungsnr.": "",
            "Zeitraum": "",
            "Rechnungsdatum": "",
            "Fälligkeitsdatum": "",
            "Betrag": parseFloat(0).toFixed(2),
            "Produkte": []
        }

        this.setState({
            invoiceID: this.state.invoiceID + 1,
            invoices: [...this.state.invoices, newInvoice],
            currentID: this.state.invoices.length,
            currentInvoice: newInvoice
        })
    }

    /**
     * sets the currentInvoice and the currentID, so that the clicked invoice is shown in the Main View
     */
    showInvoice = (currentID) => {
        const currentInvoice = this.state.invoices[currentID]

        this.setState({
            currentID,
            currentInvoice
        })
    }

    /**
     * update currentInvoice with the entered value 
     * and update invoices with the updated currentInvoice on the specific position
     */
    updateInvoice = (label, value) => {
        let { currentID, currentInvoice, invoices } = this.state
        if (label === "Name") {
            currentInvoice[label] = (value.length > 0) ? value : "Rechnung " + (currentID + 1)
        }
        else {
            currentInvoice[label] = value
        }

        this.upgradeState(currentInvoice, invoices)
    }

    /**
     * removes the active invoice with the currentID and causes rerendering
     */
    removeInvoice = (currentID) => {
        this.setState(state => {

            // set invoiceID to 1 if there are no invoices, so that new invoices start with id 1 again
            // otherwise dont change the ID
            const invoiceID = state.invoices.length - 1 === 0 ? 1 : state.invoiceID
            // return filtered invoices without the deleted invoice
            const invoices = state.invoices.filter((invoice, id) => currentID !== id)

            return {
                invoiceID,
                invoices,
                currentID: 0
            }
        }, () => {
            this.setState({
                //set currentInvoice to the first invoice in list, so that it is shown active and in the Main View
                currentInvoice: this.state.invoices[0]
            })
        })
    }

    /**
     * a new product item is added to the current invoice
     */
    addProductToInvoice = (product) => {
        let { currentInvoice, invoices } = this.state

        currentInvoice.Produkte.push(product)

        this.upgradeState(currentInvoice, invoices)
    }

    /**
     * a specific product is upgraded from the current invoice
     */
    upgradeProductOfInvoice = (productID, label, value) => {
        let { currentInvoice, invoices } = this.state

        currentInvoice.Produkte[productID][label] = value

        // every time the price or amount change, the invoice costs get also updated
        if ((["Anzahl", "Einzelpreis"]).includes(label)) {
            currentInvoice = this.upgradeCostsOfInvoice(currentInvoice)
        }

        this.upgradeState(currentInvoice, invoices)
    }

    /**
     * a specific product with id is deleted from the current invoice
     */
    deleteProductFromInvoice = (productPos) => {
        let { currentInvoice, invoices } = this.state

        currentInvoice.Produkte = currentInvoice.Produkte.filter((product, id) => {
            return product.Position !== productPos
        })

        currentInvoice.Produkte.map((product, id) => {
            return product.Position = id + 1
        })

        currentInvoice = this.upgradeCostsOfInvoice(currentInvoice)

        this.upgradeState(currentInvoice, invoices)
    }

    /**
     * upgrades costs per invoice
     */
    upgradeCostsOfInvoice = (currentInvoice) => {
        let costs = 0

        currentInvoice.Produkte.forEach(product => {
            costs += (product.Anzahl * product.Einzelpreis) || parseFloat(0)
        })

        currentInvoice.Betrag = parseFloat(costs).toFixed(2)

        return currentInvoice
    }

    /**
     * helper function to upgrade the state with the upgraded invoices list and current invoice
     */
    upgradeState = (currentInvoice, invoices) => {
        invoices[this.state.currentID] = currentInvoice

        this.setState({
            invoices,
            currentInvoice
        })
    }

    render() {
        return (
            <DataContext.Provider
                value={{
                    currentID: this.state.currentID,
                    currentInvoice: this.state.currentInvoice,
                    invoices: this.state.invoices,
                    setInvoices: this.setInvoices,
                    addInvoice: this.addInvoice,
                    showInvoice: this.showInvoice,
                    updateInvoice: this.updateInvoice,
                    removeInvoice: this.removeInvoice,
                    addProductToInvoice: this.addProductToInvoice,
                    upgradeProductOfInvoice: this.upgradeProductOfInvoice,
                    deleteProductFromInvoice: this.deleteProductFromInvoice,
                    upgradeCostsOfInvoice: this.upgradeCostsOfInvoice
                }}>
                {this.props.children}
            </DataContext.Provider>
        )
    }
}

export default ContextStore