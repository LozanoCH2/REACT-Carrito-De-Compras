import Header from "./components/Header";
import Footer from "./components/Footer";
import Guitar from "./components/Guitar";
import { useState, useEffect } from "react";
import { db } from "./data/db";
function App() {
  const initialCarrito = () => {
    const localStorageCarrito = localStorage.getItem("carrito");
    return localStorageCarrito ? JSON.parse(localStorageCarrito) : [];
  };

  const [data] = useState(db);
  const [carrito, setCarrito] = useState(initialCarrito);
  //const [guitar, setGuitar] = useState({});

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  function addToCarrrito(item) {
    const itemExists = carrito.findIndex((guitar) => guitar.id === item.id);
    if (itemExists >= 0) {
      if (carrito[itemExists].quantity >= MAX_ITEMS) return;
      const updateCarrito = [...carrito];
      updateCarrito[itemExists].quantity++;
      setCarrito(updateCarrito);
    } else {
      item.quantity = 1;
      setCarrito((prevCarrito) => [...prevCarrito, item]);
    }
  }

  function removeFromCarrito(id) {
    setCarrito((prevCarrito) =>
      prevCarrito.filter((guitar) => guitar.id !== id)
    );
  }

  function increaseQuantity(id) {
    const updatedCarrito = carrito.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCarrito(updatedCarrito);
  }

  function decreaseQuantity(id) {
    const updatedCarrito = carrito.map((item) => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCarrito(updatedCarrito);
  }

  function clearCarrito() {
    setCarrito([]);
  }

  return (
    <>
      <Header
        carrito={carrito}
        removeFromCarrito={removeFromCarrito}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCarrito={clearCarrito}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              addToCarrrito={addToCarrrito}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              clearCarrito={clearCarrito}
            />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
