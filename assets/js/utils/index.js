import { Notification } from 'element-react';


export const showNotification = (type, payload) => {
    Notification[type](payload);
};

