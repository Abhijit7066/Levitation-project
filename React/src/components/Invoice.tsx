import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserService from "../services/UserService";
import { useNavigate } from 'react-router-dom';
import "./Invoice.css"; // Import CSS styles

const Invoice: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    const total = products.reduce(
      (acc, product) => acc + product.rate * product.qty,
      0
    );
    setSubtotal(total);
  }, [products]);

  const getProduct = () => {
    UserService.paginated()
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };
  const download = () => {
    UserService.download()
      .then((response) => {
        console.log(response);
        
        navigate('/welcome');
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  return (
    <div className="wrapper">
      <div className="invoice_wrapper">
        <div className="header">
          <div className="logo_invoice_wrap">
            <div className="logo_sec">
              <div className="title_wrap">
                <p className="title bold">Levitation</p>
                <p className="sub_title">Privite Limited</p>
              </div>
            </div>
            <div className="invoice_sec"></div>
          </div>
          <div className="bill_total_wrap">
            <div className="bill_sec"></div>
            <div className="total_wrap"></div>
          </div>
        </div>
        <div className="body">
          <div className="main_table">
            <div className="table_header">
              <div className="row">
                <div className="col col_des">ITEM DESCRIPTION</div>
                <div className="col col_price">PRICE</div>
                <div className="col col_qty">QTY</div>
                <div className="col col_total">TOTAL</div>
              </div>
            </div>
            {products.map((product) => (
              <div className="table_body" key={product.id}>
                <div className="row">
                  <div className="col col_des">{product.name}</div>
                  <div className="col col_price">{product.rate}</div>
                  <div className="col col_qty">{product.qty}</div>
                  <div className="col col_total">
                    {product.rate * product.qty}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="paymethod_grandtotal_wrap">
            <div className="paymethod_sec">
              <p className="bold">Payment Method</p>
              <p>Visa, master Card and We accept Cheque</p>
            </div>
            <div className="grandtotal_sec">
              <p className="bold">
                <span>SUB TOTAL</span>
                <span>{subtotal}</span>
              </p>
              <p>
                <span>Discount 18%</span>
                <span>{(subtotal * 0.18).toFixed(2)}</span>
              </p>
              <p className="bold">
                <span>Grand Total</span>
                <span>{(subtotal - subtotal * 0.18).toFixed(2)}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="footer">
          <p>Thank you and Best Wishes</p>
          <div className="terms">
            <p className="tc bold">Terms & Coditions</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit non
              praesentium doloribus. Quaerat vero iure itaque odio numquam,
              debitis illo quasi consequuntur velit, explicabo esse nesciunt
              error aliquid quis eius!
            </p>
          </div>
        </div>
        <div className="footer_buttons">
        <button onClick={download}>Print</button>
        <Link to="/welcome">
            <button>Back</button>
          </Link>
      </div>
      </div>
      
    </div>
  );
};

export default Invoice;
