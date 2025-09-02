import { useState, useEffect } from 'react';
import { db } from '../firebase';


const Carriage = () => {
    const [complete, setComplete] = useState(false);
    const [direction, setDirection] = useState(null);
    const [id, setId] = useState(null);
    const [orderNumber, setOrderNumber] = useState(null);
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // generate a random 11-digit id and order number
        const generateId = () => {
            const id = Math.floor(10000000000 + Math.random() * 90000000000);
            setId(id);
        };
        generateId();

        const generateOrderNumber = () => {
            const orderNumber = Math.floor(10000000000 + Math.random() * 90000000000);
            setOrderNumber(orderNumber);
        };
        generateOrderNumber();
    }, []);

    const createCart = () => {
        setDirection(null);
        setProducts([]);
        setTotal(0);
        setComplete(false);
    };

    const addProduct = (menuObject) => {
        if (!products.length) {
            setProducts([menuObject]);
            setTotal(menuObject.price);
        } else {
            const existingProduct = products.find((product) => product.id === menuObject.id);
            if (existingProduct) {
                existingProduct.quantity++;
                setTotal(total + menuObject.price);
            } else {
                setProducts([...products, {...menuObject, quantity: 1 }]);
                setTotal(total + menuObject.price);
            }
        }
    };

    const removeProduct = (menuObject) => {
        const existingProduct = products.find((product) => product.id === menuObject.id);
        if (existingProduct) {
            if (existingProduct.quantity > 1) {
                existingProduct.quantity--;
                setTotal(total - menuObject.price);
            } else {
                setProducts(products.filter((product) => product.id !== menuObject.id));
                setTotal(total - menuObject.price);
            }
        }
    };

    const addAddress = (address) => {
        setDirection(address);
    };

    const generateOrder = () => {
        const order = {
            id,
            orderNumber,
            products,
            total,
            user,
            creation: new Date(),
            delivery: null,
        };
        createOrder(order);
    };

    const createOrder = async(order) => {
        try {
            await setDoc(doc(db, 'Orders', order.id), order);
        } catch (error) {
            console.error(error);
        }
    };

    return {
        complete,
        direction,
        id,
        orderNumber,
        products,
        total,
        user,
        createCart,
        addProduct,
        removeProduct,
        addAddress,
        generateOrder,
    };
};

export default Carriage;