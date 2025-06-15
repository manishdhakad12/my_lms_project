export const getCashfreeToken = async () => {
  const response = await fetch("https://sandbox.cashfree.com/pg/v1/authorize", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.CASHFREE_API_ID,
      client_secret: process.env.CASHFREE_SECRET_KEY,
    }),
  });

  const data = await response.json();
  return data.data.token; // access token
};