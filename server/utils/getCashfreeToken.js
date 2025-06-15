export const getCashfreeToken = async (orderId, orderAmount) => {
  const res = await fetch("https://sandbox.cashfree.com/api/v2/cftoken/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-client-id": process.env.CASHFREE_API_ID,
      "x-client-secret": process.env.CASHFREE_SECRET_KEY,
    },
    body: JSON.stringify({
      orderId,
      orderAmount: orderAmount.toString(),
      orderCurrency: "INR",
    }),
  });

  const text = await res.text();
  console.log("🎯 getCashfreeToken response:", res.status, text);

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("Invalid JSON from token endpoint");
  }

  if (!res.ok || data.status !== "OK") {
    throw new Error(data.message || `Token failed (HTTP ${res.status})`);
  }

  return data.cftoken;
};
