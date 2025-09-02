import { createMenu, getAllMenu, getMenu, menuValidation } from "../Controllers/menu";
import { useEffect } from "react";
import { useState } from "react";


export function useAllMenus() {
  const [data, setMenu] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await getAllMenu();
      setMenu(data);
    };
    getData();
  }, []);
  const isLoading = data === null;
  return { data, isLoading };
}

export function useMenuAvailable(id) {
  const [data, setMenu] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await getMenu(id);
      setMenu(data.available);
    };
    getData();
  }, []);
  const isLoading = data === null;
  return { data, isLoading };
}

export function validateName(name) {
  let valid = false;
  if (!(name === "") && isNaN(name)) {
    valid = true;
  }
  return valid;
}

export function validateNumber(number) {
  let valid = false;
  let num = parseInt(number);

  if (num > 0) {
    valid = true;
  }
  return valid;
}

export async function validateMenu(data) {
  let register = false;
  const bName = validateName(data.name);
  const bPrice = validateNumber(data.price);
  const bDesc = validateName(data.description);
  const bMenuValidation = await menuValidation(data);

  if (
    bName &&
    bPrice &&
    bDesc &&
    bMenuValidation
  ) {
    await createMenu(data);
    register = true;
  } else {
    register = false;
  }
  const registerReturn = [
    register,
    bName,
    bPrice,
    bDesc,
    bMenuValidation,
  ];
  return registerReturn;
}
