import React, { useContext } from 'react'

import DataContext from '../Context/Context'
import { IoIosTrash } from 'react-icons/io'
import './Product.scss'


const Product = ({ product: { Position, Name, Beschreibung, Anzahl, Einzelpreis } }) => {
    //destructuring the contextValues
    const { upgradeProductOfInvoice, deleteProductFromInvoice } = useContext(DataContext)

    const updateCurrentProductsItem = (e) => {
        const { name, value } = e.target
        const productID = Position - 1

        upgradeProductOfInvoice(productID, name, value)
    }

    /**
     * automatically called 
     * calculates costs of time in a invoice
     */
    const calcProductCosts = () => {
        return (Anzahl * Einzelpreis).toFixed(2) || parseFloat(0).toFixed(2)
    }

    return (
        <span id="product">
            <p>{Position}</p>
            <input type="text"
                name="Name"
                value={Name}
                onChange={updateCurrentProductsItem} />
            <textarea type="text"
                name="Beschreibung"
                value={Beschreibung}
                onChange={updateCurrentProductsItem} />
            <input id="amount"
                type="text"
                name="Anzahl"
                value={Anzahl}
                onChange={updateCurrentProductsItem} />
            <span id="priceField">
                <p>€</p>
                <input id="priceInput"
                    type="text"
                    name="Einzelpreis"
                    value={Einzelpreis}
                    onChange={updateCurrentProductsItem} />
            </span>
            <p id="sum">{calcProductCosts()}</p>
            <IoIosTrash id="trash-icon" onClick={() => deleteProductFromInvoice(Position)} />
        </span>
    )
}

export default Product