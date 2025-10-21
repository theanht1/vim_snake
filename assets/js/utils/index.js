import { toast } from "../components/ui/toast";

export const showNotification = (type, payload) => {
  toast({
    type,
    title: payload.title,
    message: payload.message,
  });
};
