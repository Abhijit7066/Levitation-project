import React, { useEffect, useState } from "react";
import UserService from "../services/UserService";
import { Link } from "react-router-dom";

const Welcome: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = () => {
    UserService.paginated()
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  const updateQuantity = async (id: string, quantity: number) => {
    try {
      const productToUpdate = products.find((product) => product._id === id);
      if (!productToUpdate) return;
      const updatedProduct = { ...productToUpdate, qty: productToUpdate.qty + quantity };
      await UserService.update(id, updatedProduct);
      getProduct(); // Refresh product list after update
    } catch (error) {
      console.error("Error updating product quantity:", error);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await UserService.delete(id);
      getProduct(); // Refresh product list after deletion
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <main className="container" style={{ marginTop: "20px" }}>
      <div
        className="card"
        style={{
          background: "#fefbffff",
          color: "#19747E",
          marginTop: "20px",
          border: "2px solid hsla(0, 0%, 100%, 0.55)",
          borderRadius: "10px",
        }}
      >
        <h2
          className="text-center"
          style={{ fontFamily: "Times New Roman", marginTop: "20px" }}
        >
          List of Product
        </h2>
        <Link to="/product" className="btn btn-primary mb-2">
          Add Product
        </Link>
        <table className="table table-bordered table-striped text-center">
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Rate</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.qty}</td>
                <td>{product.rate}</td>
                <td>{product.rate * product.qty}</td>
                <td >
                <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent:"center",
                      width: "150px",
                      backgroundColor: "var(--action-background-color)",
                      borderRadius: "40px",
                      height: "45px",
                      marginRight:"10px"
                    }}
                    
                  >
                  <button onClick={() => updateQuantity(product._id, 1)} style={{ margin:"10px"}}>+</button>
                  <button onClick={() => updateQuantity(product._id, -1)} disabled={product.qty === 0}style={{ margin:"10px"}}>-</button>
                  <button onClick={() => deleteProduct(product._id)}style={{ margin:"10px"}}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/invoice" className="btn btn-primary mb-2">
          Invoices
        </Link>
      </div>
    </main>
  );
};

export default Welcome;
