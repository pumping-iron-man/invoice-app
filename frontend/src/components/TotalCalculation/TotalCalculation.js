import React from 'react'

import './TotalCalculation.scss'


/**
 * Shows the total calculation per invoice or for all invoices in the context of parent component
 */
const TotalCalculation = ({ id, nettoBetrag }) => {

    const taxBetrag = (parseFloat(nettoBetrag) * 0.19).toFixed(2)
    const bruttoBetrag = (parseFloat(nettoBetrag) + parseFloat(taxBetrag)).toFixed(2)

    return (
        <React.Fragment>
            { id==="invoicesSum" && <hr /> }
            <span id={id}>
                <span>
                    <p id="nettoBetrag">Netto</p>
                    <p>Um.-St.(19%)</p>
                    <p>Brutto</p>
                </span>
                <span>
                    <p id="nettoBetrag">{nettoBetrag} €</p>
                    <p>{taxBetrag} €</p>
                    <p>{bruttoBetrag} €</p>
                </span>
            </span>
        </React.Fragment>
    )
}

export default TotalCalculation