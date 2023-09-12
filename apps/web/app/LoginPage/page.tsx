import Image from "next/image";
import TextField from "@mui/material/TextField";
import { Button } from "ui";
import ItemList from "../../components/ItemList";
import "@/styles/globals.scss";

const items = [
  <div className="space-x-5 flex iniline-flex">
    <div>📝 </div>
    <div> PRESENTATIONS</div>
    <div>📖 </div>
    <div> NOTES</div>
    <div>📖 </div>
    <div> QUESTION PAPERS</div>
  </div>,
];
export default function Page() {
  return (
    <>
      {/* Logo */}
      <div className="p-10 flex justify-center text-4xl font-gabriela">
        Cllgnotes.com
      </div>

      {/* Banner */}
      <div className="w-100% p-2 mb-20 md:mb-40 border border-solid border-black font-[900] text-xl ">
        <div className="justify-between flex whitespace-nowrap overflow-hidden">
          <div className="flex space-x-5 justify-between mr-5 animate-infinite-scroll">
            <ItemList items={items} />
            <ItemList items={items} />
            <ItemList items={items} />
          </div>
          <div className="flex space-x-5 justify-between mr-5 animate-infinite-scroll">
            <ItemList items={items} />
            <ItemList items={items} />
            <ItemList items={items} />
          </div>
        </div>
      </div>

      {/* Login  Box*/}
      <div className="flex flex-col md:flex-row justify-center items-center p-10">
        {/* Login photo */}
        <div className="md:justify-items-center mb-14 md:mb-0">
          <Image src="/images/login.png" alt="Login" width={533} height={438} />
        </div>
        {/* Login form */}
        <div className="bg-white flex flex-col items-center p-6 sm:ml-0 md:ml-32 border h-[384px] w-[382px] border-black border-solid rounded-md">
          <div className="font-[600] font-generalsans text-2xl text-[#141414] mb-3">
            Login to your one-stop store
          </div>
          {/* email field */}
          <div className="m-6">
            <TextField
              type="email"
              id="email"
              label="Email"

              // placeholder = "email"
              inputProps={{
                style: {
                  height: "37px",
                  width: "296px",
                },
              }}
            />
          </div>
          {/* Password field */}
          <div className="mb-6">
            <TextField
              type="password"
              id="pass"
              // label="Password"
              placeholder="password"
              variant="outlined"
              inputProps={{
                style: {
                  height: "37px",
                  width: "296px",
                },
              }}
            />
          </div>
          <div className="btn-click">
            <Button text="Login" height={70} width={322} />
          </div>
        </div>
      </div>
    </>
  );
}
