import React, { useEffect, useState } from "react";

const ProductQuantity = ({ stock, qunt }) => {
  const [quantity, setQuantity] = useState(1);

  function decrementQuantity() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }
  function incrementQuantity() {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  }


  useEffect(() => {
    qunt(quantity);
  }, [quantity]);

  function handleChange(e) {
    let value = e.target.value;
    if (value === "" || isOnlyDigits(value)) {
      if (Number(value) >= 1 && Number(value) <= stock) {
        setQuantity(Number(value));
      } else if (value === "") {
        setQuantity(value);
      }
    } else {
    }
  }
  function isOnlyDigits(value) {
    for (let i = 0; i < value.length; i++) {
      if (value[i] < "0" || value[i] > stock.toString()) {
        return false;
      }
    }
    return true;
  }

  function handleBlur() {
    if (quantity === "" || quantity < 1) {
      setQuantity(1);
    }
  }

  return (
    <>
      {stock >= 1 && (
        <div>
          <h3>Quantity</h3>
          <button
            type="button"
            className="p-1 mr-1"
            onClick={decrementQuantity}
          >
            -
          </button>
          <input
            className="border-2 w-10 outline-none text-center"
            value={quantity}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
          />
          <button
            type="button"
            onClick={incrementQuantity}
            className="p-1 ml-1"
          >
            +
          </button>
        </div>
      )}
    </>
  );
};

export default ProductQuantity;
