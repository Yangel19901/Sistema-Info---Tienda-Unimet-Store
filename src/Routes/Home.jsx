import { logOut } from "../Controllers/users";

export default function Home() {

  const handleSubmit = async () => {
    logOut()
  };

  return (
    <>
      <h1>Home</h1>
      <button
        type="button"
        onClick={handleSubmit}
      >Cerrar sesion</button>
    </>
  );
}
