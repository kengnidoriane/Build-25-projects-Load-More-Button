import { useState, useEffect } from "react";
import './style.css'

export default function LoadMoreData() {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);
    const [disableButton, setDisableButton] = useState(false);


    async function fetchProducts() {
        try {
            const response = await fetch(
                `https://dummyjson.com/products?limit=20&skip=${
                 count === 0 ? 0 : count * 20}`);

            const result = await response.json();
            if (result && result.products && result.products.length) {
                setProducts((prevData) => [...prevData, ...result.products]);
                setLoading(false);
            }
            console.log(result);
            console.log(count);
            

        } catch (e) {
            console.log(e);
            setLoading(false)
            
        }
    }
    useEffect(() => {
        fetchProducts();
    }, [count]);

    useEffect(() => {

        if (products && products.length === 100) {
            setDisableButton(true);
        }
    }, [products])

    if (loading) {
        return <div>Loading data ! Please</div>
    }

    return <div className="load-more-container">
        <h1>Products</h1>
        <div className="product-container">
            {
                products && products.length ? 
                products.map(item => <div key={item.id} className="product">
                    <img src={item.thumbnail} alt={item.title} />
                    <p>{item.title}</p>
                    <p>{item.price}$</p>
                </div>) 
                : null
            }
        </div>
        <div className="button-container">
            <button disabled={disableButton} onClick={() => setCount(count + 1)}>Load More Container</button>
            {
                disableButton ? <p>You have reachesd to 100 products</p> : null
            }
        </div>
    </div>
}
