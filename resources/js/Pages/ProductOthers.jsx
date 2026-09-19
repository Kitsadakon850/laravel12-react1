import React, { useState, useEffect } from "react";
import BootstrapLayout from "@/layouts/BootstrapLayout";
const ProductOthers = () => {
    const [products, setProducts] = useState([]);

    const loadData = () => {
        fetch( "https://raw.githubusercontent.com/arc6828/laravel-react/refs/heads/main/public/json/products.json" )
            .then((response) =>  response.json() )
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => { console.error( "There was an error fetching the products!", error ); });
    };

    const loadData2 = async () => {
        try {
            const response = await fetch( "https://raw.githubusercontent.com/arc6828/laravel-react/refs/heads/main/public/json/products.json" );            
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error( "There was an error fetching the products!", error );
        }
    };

    useEffect(() => {
        // loadData();
        loadData2();
    }, []);

    return (
        <BootstrapLayout>
            ...
        </BootstrapLayout>
    );
};

export default ProductOthers;
