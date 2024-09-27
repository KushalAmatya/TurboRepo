import * as Dialog from "@radix-ui/react-dialog";
import { NavLink } from "react-router-dom";

const Routepick = () => (
  <Dialog.Root open={true}>
    {/* <Dialog.Trigger asChild>
      <button className="text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
        Edit profile
      </button>
    </Dialog.Trigger> */}
    <Dialog.Portal>
      <Dialog.Overlay className=" data-[state=open]:animate-overlayShow fixed inset-0" />
      <Dialog.Content className="data-[state=open]:animate-contentShow rounded-xl fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%]  bg-slate-800 p-[25px] border border-dotted border-white shadow-lg shadow-black">
        <Dialog.Title className="text-mauve-1 m-0 text-[17px] font-medium">
          Route as
        </Dialog.Title>
        <Dialog.Description className="text-gray-1 text-[15px] mt-[10px] mb-[20px]">
          Choose a route to continue
        </Dialog.Description>
        <div className="flex flex-col gap-[10px]">
          <button className="w-full h-[50px] bg-mauve-10 text-white rounded-[6px] flex items-center justify-center">
            <NavLink to="/admin">
              <span>Admin Dashboard</span>
            </NavLink>
          </button>
          <button className="w-full h-[50px] bg-mauve-10 text-white rounded-[6px] flex items-center justify-center">
            <NavLink to="/home">
              <span>User Dashboard</span>
            </NavLink>
          </button>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default Routepick;
