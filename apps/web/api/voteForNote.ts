import { urlSite } from "@/constants";

const voteForNote = async ({
  email,
  name,
  message = "yes i want to vote for this note",
}: {
  email: string;
  name?: string;
  message?: string;
}) => {
  const data = {
    email,
    name,
    message,
  };
  try {
    const res = await fetch(urlSite + "/api/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("-- Error sending email --", error);
  }
};

export default voteForNote;
