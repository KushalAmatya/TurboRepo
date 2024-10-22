import * as Dialog from "@radix-ui/react-dialog";
import {
  ChatBubbleIcon,
  Cross2Icon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import { useEffect } from "react";
import * as Popover from "@radix-ui/react-popover";
import { useMessageStore } from "../../utils/useMessageStore";

export const Chatmessage = () => {
  const { messages, fetchMessages, deleteMessage } = useMessageStore();

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="inline-flex h-[35px] items-center justify-center rounded  px-[15px] font-medium leading-none text-violet11 ">
          <ChatBubbleIcon width={30} height={30} />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed bottom-0 right-0 max-h-[50dvh] w-[90dvw] max-w-[350px] -translate-x-4 -translate-y-2 rounded-md bg-slate-1 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[state=open]:animate-contentShow">
          <Dialog.Title className="m-0 text-[17px] font-medium text-mauve12 pb-3">
            Messages
          </Dialog.Title>
          <div className="overflow-auto h-[40dvh]">
            {messages.length > 0 ? (
              messages.map((msg) => (
                <div
                  key={msg._id}
                  className="flex flex-col gap-2  border-b border-black p-2"
                >
                  <div className="text-mauve-12 font-semibold flex justify-between">
                    <p className="first-letter:capitalize ">
                      {msg.name} - {msg.email}
                    </p>
                    <Popover.Root>
                      <Popover.Trigger asChild>
                        <button>
                          <DotsHorizontalIcon />
                        </button>
                      </Popover.Trigger>
                      <Popover.Content
                        className="rounded-lg bg-white p-4 shadow-lg will-change-[transform,opacity] focus:outline-none data-[state=open]:animate-fadeIn"
                        sideOffset={5}
                      >
                        <Popover.Arrow className="fill-white" />
                        <div className="flex flex-col gap-2">
                          <button
                            className="py-1 px-2 text-sm text-red-600 border-b border-gray-300 hover:bg-gray-100 focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                            onClick={() => deleteMessage(msg._id)}
                          >
                            Delete
                          </button>
                          <button className="py-1 px-2 text-sm text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                            Reply
                          </button>
                        </div>
                      </Popover.Content>
                    </Popover.Root>
                  </div>
                  <div className="text-mauve-12">{msg.message}</div>
                </div>
              ))
            ) : (
              <div className="text-mauve-12">No messages</div>
            )}
          </div>
          <Dialog.Close asChild>
            <button
              className="absolute right-2.5 top-2.5 inline-flex size-[25px] appearance-none items-center justify-center rounded-full text-violet11 hover:bg-violet-4 "
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
