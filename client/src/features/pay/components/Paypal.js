import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useEffect } from "react";

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
}) => {
  const [{ isPending, options }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency,
      },
    });
  }, [currency, showSpinner]);
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
                    value: amount / payload.payType,
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
                userCreateOrder(values, 1);
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
      >
        <ButtonWrapper
          currency={"USD"}
          amount={Math.round(amount / 24770)}
          showSpinner={false}
          payload={payload}
          accessToken={accessToken}
          guestCreateOrder={guestCreateOrder}
          userCreateOrder={userCreateOrder}
        />
      </PayPalScriptProvider>
    </div>
  );
}
