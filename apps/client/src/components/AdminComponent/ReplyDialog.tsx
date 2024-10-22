import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useMemo, useState } from "react";
import { API } from "../../utils/baseAxios";

type ReplyProps = {
  _id: string;
};
export const ReplyDialog = ({ _id }: ReplyProps) => {
  console.log(_id);
  const [touser, setTouser] = useState("");
  useMemo(async () => {
    const data = await API.get(`/getselectedmessage/${_id}`, {
      headers: {
        Authorization: localStorage.getItem("authToken"),
      },
    });
    setTouser(data.data.email);
    console.log(data);
  }, []);
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="py-1 px-2 text-sm text-green-600 border-b border-gray-300 hover:bg-gray-100 focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
          Reply
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
          <Dialog.Title className="m-0 text-[17px] font-medium text-mauve12 flex gap-2">
            Reply to: <p>{touser}</p>
          </Dialog.Title>

          <fieldset>
            <textarea
              name=""
              id=""
              className="w-full h-[200px] text-lg text-slate-7 px-6 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-5 mt-2"
              placeholder="Enter your reply here"
            ></textarea>
          </fieldset>
          <button className="w-full bg-indigo-5 text-slate-12 text-lg py-3 rounded-lg hover:bg-indigo-6 transition duration-300 mt-4">
            Send
          </button>

          <Dialog.Close asChild>
            <button
              className="absolute right-2.5 top-2.5 inline-flex size-[25px] appearance-none items-center justify-center rounded-full text-violet11 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
