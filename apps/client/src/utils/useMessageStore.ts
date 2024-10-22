import { create } from "zustand";
import { API } from "./baseAxios";

type MessageTypes = {
  _id: string;
  name: string;
  email: string;
  message: string;
};
type MessageStore = {
  messages: MessageTypes[];
  setMessages: (messages: MessageTypes[]) => void;
  fetchMessages: () => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
};
export const useMessageStore = create<MessageStore>((set, get) => ({
  messages: [],
  setMessages: (messages) => set({ messages }),
  fetchMessages: async () => {
    try {
      const response = await API.get("/getmessage", {
        headers: {
          Authorization: localStorage.getItem("authToken"),
        },
      });
      get().setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  },
  deleteMessage: async (id: string) => {
    try {
      await API.delete(`/deletemessage/${id}`, {
        headers: {
          Authorization: localStorage.getItem("authToken"),
        },
      });
      get().fetchMessages();
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  },
}));
