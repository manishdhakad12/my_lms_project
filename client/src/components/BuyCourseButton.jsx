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
