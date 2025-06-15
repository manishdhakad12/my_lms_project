// import React, { useEffect } from "react";
// import { Button } from "./ui/button";
// import { useCreateCheckoutSessionMutation } from "@/features/api/purchaseApi";
// import { Loader2 } from "lucide-react";
// import { toast } from "sonner";

// const BuyCourseButton = ({ courseId }) => {
//   const [createCheckoutSession, {data, isLoading, isSuccess, isError, error }] =
//     useCreateCheckoutSessionMutation();

//   const purchaseCourseHandler = async () => {
//     await createCheckoutSession(courseId);
//   };

//   useEffect(()=>{
//     if(isSuccess){
//        if(data?.url){
//         window.location.href = data.url; // Redirect to stripe checkout url
//        }else{
//         toast.error("Invalid response from server.")
//        }
//     } 
//     if(isError){
//       toast.error(error?.data?.message || "Failed to create checkout session")
//     }
//   },[data, isSuccess, isError, error])

//   return (
//     <Button
//       disabled={isLoading}
//       onClick={purchaseCourseHandler}
//       className="w-full"
//     >
//       {isLoading ? (
//         <>
//           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//           Please wait
//         </>
//       ) : (
//         "Purchase Course"
//       )}
//     </Button>
//   );
// };

// export default BuyCourseButton;

// import React, { useEffect } from "react";
// import { Button } from "./ui/button";
// import { useCreateCheckoutSessionMutation } from "@/features/api/purchaseApi";
// import { Loader2 } from "lucide-react";
// import { toast } from "sonner";

// const BuyCourseButton = ({ courseId }) => {
//   const [createCheckoutSession, { data, isLoading, isSuccess, isError, error }] =
//     useCreateCheckoutSessionMutation();

//   const purchaseCourseHandler = () => createCheckoutSession(courseId);

//   useEffect(() => {
//     if (isSuccess) {
//       data?.paymentLink
//         ? (window.location.href = data.paymentLink)
//         : toast.error("Invalid response from server");
//     }
//     if (isError) toast.error(error?.data?.message || "Failed to create checkout session");
//   }, [data, isSuccess, isError, error]);

//   return (
//     <Button disabled={isLoading} onClick={purchaseCourseHandler} className="w-full">
//       {isLoading ? (
//         <>
//           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//           Please wait
//         </>
//       ) : (
//         "Purchase Course"
//       )}
//     </Button>
//   );
// };

// export default BuyCourseButton;

// client/src/components/BuyCourseButton.jsx
// import React, { useEffect } from "react";
// import { Button } from "./ui/button";
// import { useCreateCashfreeOrderMutation } from "@/features/api/purchaseApi";
// import { Loader2 } from "lucide-react";
// import { toast } from "sonner";

// This component receives courseId as prop
// const BuyCourseButton = ({ courseId }) => {
//   // Use Cashfree mutation hook instead of Stripe one

//   const [createCashfreeOrder, { data, isLoading, isSuccess, isError, error }] =
//   useCreateCashfreeOrderMutation();

// const purchaseCourseHandler = async () => {
//   await createCashfreeOrder({ courseId }).unwrap();
// };

// useEffect(() => {
//   if (isSuccess && data?.paymentLink) {
//     window.location.href = data.paymentLink;
//   }
//   if (isError) {
//     toast.error(error?.data?.message || "Failed to initiate payment");
//   }
// }, [data, isSuccess, isError, error]);
  // const [createCashfreeOrder, { data, isLoading, isSuccess, isError, error }] =
  //   useCreateCashfreeOrderMutation();

  // Function triggered on buy button click
  // const purchaseCourseHandler = async () => {
  //   try {
  //     // Call backend endpoint to create Cashfree order
  //     await createCashfreeOrder({ courseId }).unwrap();
  //   } catch (err) {
  //     console.error("Order creation error:", err);
  //     toast.error("Something went wrong. Please try again.");
  //   }
  // };

  // Monitor the mutation status and act on success/error
//   useEffect(() => {
//     if (isSuccess) {
//       if (data?.paymentLink) {
//         // Redirect user to Cashfree payment page
//         window.location.href = data.paymentLink;
//       } else {
//         toast.error("Invalid response from server.");
//       }
//     }

//     if (isError) {
//       toast.error(error?.data?.message || "Failed to create order");
//     }
//   }, [data, isSuccess, isError, error]);

//   return (
//     <Button disabled={isLoading} onClick={purchaseCourseHandler} className="w-full">
//       {isLoading ? (
//         <>
//           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//           Please wait
//         </>
//       ) : (
//         "Purchase Course"
//       )}
//     </Button>
//   );
// };

// export default BuyCourseButton;


import React, { useEffect } from "react";
import { load } from "@cashfreepayments/cashfree-js";
import { Button } from "./ui/button";
import { useCreateCashfreeOrderMutation } from "@/features/api/purchaseApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const BuyCourseButton = ({ courseId }) => {
  const [createCashfreeOrder, { data, isLoading, isSuccess, isError, error }] =
    useCreateCashfreeOrderMutation();

  const purchaseCourseHandler = async () => {
    try {
      await createCashfreeOrder({ courseId }).unwrap();
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      if (data?.paymentSessionId) {
        // This is where the Cashfree SDK is loaded and checkout triggered
        load({ mode: "sandbox" })
          .then(cashfree => {
            cashfree.checkout({ paymentSessionId: data.paymentSessionId });
          })
          .catch(err => {
            console.error("Cashfree SDK load error:", err);
            toast.error("Payment initialization failed");
          });
      } else {
        console.error("Unexpected response:", data);
        toast.error("Invalid response from server");
      }
    }

    if (isError) {
      toast.error(error?.data?.message || "Failed to initiate payment");
    }
  }, [data, isSuccess, isError, error]);

  return (
    <Button disabled={isLoading} onClick={purchaseCourseHandler} className="w-full">
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
        </>
      ) : (
        "Purchase Course"
      )}
    </Button>
  );
};

export default BuyCourseButton;
