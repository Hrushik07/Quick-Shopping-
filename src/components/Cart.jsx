import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  clearCart,
} from "../features/cartSlice";

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total payable amount
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-4 md:p-5">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">
        Shopping Cart
      </h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-3">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="p-3 bg-gray-100 rounded-md flex flex-col sm:flex-row justify-between items-center gap-2 shadow-sm transition duration-200 hover:bg-gray-200"
              >
                <div className="text-center sm:text-left">
                  <span className="block font-medium text-sm sm:text-base">
                    {item.title}
                  </span>
                  <span className="text-gray-600 text-xs sm:text-sm">
                    Price: ${item.price.toFixed(2)} - Quantity: {item.quantity}
                  </span>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 flex-wrap justify-center">
                  <button
                    className="px-3 py-1 bg-green-500 text-white rounded-md text-sm transition hover:bg-green-600"
                    onClick={() => dispatch(increaseQuantity(item.id))}
                  >
                    +
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded-md text-sm transition hover:bg-red-600"
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                  >
                    -
                  </button>
                  <button
                    className="px-3 py-1 bg-gray-500 text-white rounded-md text-sm transition hover:bg-gray-600"
                    onClick={() => dispatch(removeItem(item.id))}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Total Amount */}
          <div className="mt-6 text-center">
            <h3 className="text-lg sm:text-xl font-semibold">
              Total Payable:{" "}
              <span className="text-blue-600">${totalAmount.toFixed(2)}</span>
            </h3>
          </div>

          {/* Clear Cart Button */}
          <div className="flex justify-center mt-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm sm:text-base transition hover:bg-blue-600"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
