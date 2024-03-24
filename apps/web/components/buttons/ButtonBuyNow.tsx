"use client";
import { PURCHASE_DOC } from "@/db/graphql/gql";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { atomToast } from "@cllgnotes/lib";
import { useRecoilState } from "recoil";
import { Button } from "ui";
import { DocsQueryProps } from "@cllgnotes/types";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const ButtonBuyNow = ({
  amount,
  _id,
  buttonClass,
  text,
}: {
  text?: string;
  amount: number;
  _id: string;
  buttonClass?: string;
}) => {
  const router = useRouter();
  const [purchase, { loading }] = useMutation<DocsQueryProps>(PURCHASE_DOC);
  const [clicked, setClicked] = useState<boolean>(false);
  const { data, status } = useSession();
  const [, setToast] = useRecoilState(atomToast);

  const handleClick = () => {
    // router.push("/auth");
    signIn("google");
    return;
    if (clicked) {
      return;
    }
    setClicked(true);
    // CHECK IF USER LOGGED IN
    // purchase will be allowed if the role is user and user is logged in
    if (status !== "authenticated") {
      // console.log("tried to purchase", atomUserNme.role, atomUserNme.username);
      setToast({
        text: "Login with user account to continue!",
        type: "info",
        secs: 5000,
      });
      setClicked(false);
      return;
    }
    // MAKE THE PURCHASE
    console.log("making purchase", _id, amount);
    const conf = confirm("Do you want to purchase this document?");
    if (!conf) {
      console.log("purchase cancelled");
      return;
    }
    purchase({
      variables: {
        docId: _id,
        amt: amount,
        method: "UPI",
      },
      onCompleted: (data) => {
        console.log("completed purchase", data);
        setToast({
          text: data?.purchaseDoc?.msg || "Purchase failed, try again later!",
          type: data?.purchaseDoc?.status == "failed" ? "error" : "success",
          secs: 5000,
        });
        // router.push("/learnings");
        setClicked(false);
      },
      onError: (err) => {
        console.log("error purchase", err);
        setClicked(false);
      },
    });
  };
  return (
    <Button
      disabled={clicked}
      text={text || "buy now"}
      height={70}
      buttonClasses={`shadow-box5 ${buttonClass}`}
      onClick={handleClick}
    />
  );
};

export default ButtonBuyNow;
