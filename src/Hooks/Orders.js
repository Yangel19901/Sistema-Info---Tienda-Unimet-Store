import { useEffect, useState } from "react";
import { getAllOrder, getCompleteOrders } from "../Controllers/order";

export function useAllOrders() {
  const [data, setOrders] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await getAllOrder();
      setOrders(data);
    };
    getData();
  }, []);
  const isLoading = data === null;
  return { data, isLoading };
}

export function useCompleteOrders() {
  const [data, setOrders] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await getCompleteOrders("complete", true);
      setOrders(data);
    };
    getData();
  }, []);
  const isLoading = data === null;
  return { data, isLoading };
}

export function useUncompleteOrders() {
  const [data, setOrders] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await getCompleteOrders("complete", false);
      setOrders(data);
    };
    getData();
  }, []);
  const isLoading = data === null;
  return { data, isLoading};
}

export function getProducts() {
  const [data, setOrders] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await getCompleteOrders("complete", false);
      setOrders(data);
    };
    getData();
  }, []);
  const isLoading = data === null;
  return { data, isLoading};
}
