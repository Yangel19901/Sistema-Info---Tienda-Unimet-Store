import { useEffect } from "react";
import { useState } from "react";
import {
    createUser,
    emailAndCarnetValidateQuery,
    getAllUsers,
    getUser,
    signUpUser,
    userSignedInAuth,
} from "../Controllers/users";

export function useAllUsers() {
    const { data, setUsers } = useState(null);

    useEffect(() => {
        const getData = async() => {
            const data = await getAllUsers();
            setUsers(data);
        };
        getData();
    }, []);
    const isLoading = data === null;
    return { data, isLoading };
}

export function useUser(id) {
    const { data, setUser } = useState(null);

    useEffect(() => {
        const getData = async() => {
            const data = await getUser(id);
            setUser(data);
        };
        getData();
    }, [id]);
    const isLoading = data === null;
    return { data, isLoading };
}

export function validateEmail(email) {
    const array = email.split("@");
    let valid = false;
    if (array[1] === "correo.unimet.edu.ve" || array[1] === "unimet.edu.ve") {
        valid = true;
    }
    return valid;
}

export function validateId(id) {
    let valid = false;
    try {
        const idInt = parseInt(id);
        if (idInt >= 10000000000) {
            valid = true;
        } else {
            valid = false;
        }
    } catch (error) {
        valid = false;
    }
    return valid;
}

export function validateName(name) {
    let valid = false;
    if (!(name === "") && isNaN(name)) {
        valid = true;
    }
    return valid;
}

export function validatePhone(phone) {
    let valid = false;
    let num = parseInt(phone);

    if (
        num > 99999999 &&
        (phone.substring(0, 4) === "0414" ||
            phone.substring(0, 4) === "0424" ||
            phone.substring(0, 4) === "0416" ||
            phone.substring(0, 4) === "0426" ||
            phone.substring(0, 4) === "0412")
    ) {
        valid = true;
    }
    return valid;
}

function hasNumbers(texto) {
    const numeros = "0123456789";
    for (let i = 0; i < texto.length; i++) {
        if (numeros.indexOf(texto.charAt(i), 0) != -1) {
            return true;
        }
    }
    return false;
}

function hasLowCase(texto) {
    const letras = "abcdefghyjklmnñopqrstuvwxyz";
    for (let i = 0; i < texto.length; i++) {
        if (letras.indexOf(texto.charAt(i), 0) != -1) {
            return true;
        }
    }
    return false;
}

function hasHighCase(texto) {
    const letras_mayusculas = "ABCDEFGHYJKLMNÑOPQRSTUVWXYZ";
    for (let i = 0; i < texto.length; i++) {
        if (letras_mayusculas.indexOf(texto.charAt(i), 0) != -1) {
            return true;
        }
    }
    return false;
}

function hasMinimunCaracters(texto) {
    for (let i = 0; i < texto.length; i++) {
        if (i >= 7) {
            return true;
        }
    }
    return false;
}

export function validatePw(p1) {
    if (
        hasNumbers(p1) &&
        hasLowCase(p1) &&
        hasHighCase(p1) &&
        hasMinimunCaracters(p1)
    ) {
        return true;
    }
    return false;
}

export async function validateUser(data, dataAuth) {
    let register = false;
    data.email = dataAuth.email;
    const bName = validateName(data.name);
    const bLastName = validateName(data.lastname);
    const bPhone = validatePhone(data.phone);
    const bEmailV = validateEmail(data.email);
    const bIdV = validateId(data.id);
    const bPw = validatePw(dataAuth.password);
    const bPwV = dataAuth.password === dataAuth.passwordvalidation;
    const bEmail = await emailAndCarnetValidateQuery("email", data.email);
    const bId = await emailAndCarnetValidateQuery("id", data.id);

    if (
        bEmail &&
        bId &&
        bEmailV &&
        bIdV &&
        bName &&
        bLastName &&
        bPhone &&
        bPw &&
        bPwV
    ) {
        await createUser(data);
        await signUpUser(dataAuth);
        register = true;
    } else {
        register = false;
    }
    const registerReturn = [
        register,
        bEmail,
        bEmailV,
        bId,
        bIdV,
        bName,
        bLastName,
        bPhone,
        bPw,
        bPwV,
    ];
    return registerReturn;
}

export async function userSignedIn() {
    return userSignedInAuth();
}

export async function dataBaseInfoLogInWithGoogle(data) {
    const a = await getUser(data);
    if (a.admin == undefined) {
        return false;
    } else {
        return true;
    }

}