import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";

// This value is from the props in the UI
const style = { layout: "vertical" };

// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({
  showSpinner,
  currency,
  amount,
  payload,
  accessToken,
  userCreateOrder,
  guestCreateOrder,
  updateOrder,
}) => {
  const [{ isPending, options }, dispatch] = usePayPalScriptReducer();
  const [amountValue, setAmountValue] = useState(amount / payload.payType);

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency,
      },
    });
    setAmountValue(amount / payload.payType);
  }, [currency, showSpinner, payload]);
  return (
    <>
      {showSpinner && isPending && <div className='spinner' />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[style]}
        fundingSource={undefined}
        createOrder={(data, actions) =>
          actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: amountValue,
                  },
                },
              ],
            })
            .then((orderId) => orderId)
        }
        onApprove={(data, actions) =>
          actions.order.capture().then(async (response) => {
            if (response.status === "COMPLETED") {
              const values = payload.form.getFieldsValue(true);
              if (accessToken) {
                if (updateOrder) updateOrder(values, 1);
                else userCreateOrder(values, 1);
              } else {
                guestCreateOrder(values, 1);
              }
            }
          })
        }
      />
    </>
  );
};

export default function Paypal({
  amount,
  payload,
  accessToken,
  userCreateOrder,
  guestCreateOrder,
  updateOrder = null,
}) {
  return (
    <div
      style={{
        maxWidth: "750px",
        zIndex: 1,
        position: "relative",
      }}
    >
      <PayPalScriptProvider
        options={{ clientId: "test", components: "buttons", currency: "USD" }}
        deferLoading={true}
      >
        <ButtonWrapper
          currency={"USD"}
          amount={Math.round(amount / 24770)}
          showSpinner={false}
          payload={payload}
          accessToken={accessToken}
          guestCreateOrder={guestCreateOrder}
          userCreateOrder={userCreateOrder}
          updateOrder={updateOrder}
        />
      </PayPalScriptProvider>
    </div>
  );
}
