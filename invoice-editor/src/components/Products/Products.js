import React, { useContext } from 'react'

import DataContext from "../Context/Context";
import Product from '../Product/Product'
import TotalCalculation from '../TotalCalculation/TotalCalculation'
import { IoIosAdd } from 'react-icons/io'

import './Products.scss'


const Products = () => {
    //destructuring the contextValues
    const { currentInvoice: { Produkte, Betrag }, addProductToInvoice } = useContext(DataContext)

    const addProduct = () => {
        const productNumber = Produkte.length + 1
        let newProduct = {
            "Position": productNumber,
            "Name": "",
            "Beschreibung": "",
            "Anzahl": "",
            "Einzelpreis": ""
        }
        addProductToInvoice(newProduct)
    }

    return (
        <span id="productContainer">
            <p>Rechnungsposten</p>
            <span id="products">
                {
                    Produkte.length > 0 &&
                    <span id="productInfo">
                        <p>Position</p>
                        <p>Name</p>
                        <p>Beschreibung</p>
                        <p>Anzahl</p>
                        <p>Einzelpreis</p>
                        <p>Summe</p>
                        <span></span>
                    </span>
                }
                {
                    Produkte.map((product, id) => {
                        return <Product key={id} product={Produkte[id]} />
                    })
                }
            </span>
            <span id="productFooter">
                <button id="addProduct"
                    className="ripple"
                    onClick={addProduct}>
                    <IoIosAdd />
                </button>
                {
                    Produkte.length > 0 &&
                    <TotalCalculation id={"totalSum"} nettoBetrag={Betrag} />
                }
            </span>
        </span>
    )
}

export default Products