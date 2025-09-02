import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { getUser } from "../Controllers/users";

export const Context = createContext();

export function AuthContext({ children }) {
  const auth = getAuth();

  const [user, setUser] = useState();
  const [admin, setAdmin] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() =>{
    let unsubscribe;
    unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(false);
      if (currentUser) {
        setUser(currentUser);
        const a = await getUser(currentUser.email);
        setAdmin(a.admin);
      } else {
        setUser(null);
        setAdmin(null);
      }
    });
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const values = {
    user: user,
    setUser: setUser,
    admin: admin,
    setAdmin: setAdmin,
  };

  return (
    <Context.Provider value={values}>{!loading && children}</Context.Provider>
  );
}
