const ACCESS_TOKEN = "ACCESS_TOKEN";

export const setAccessToken = (token) =>
  localStorage.setItem(ACCESS_TOKEN, token); //กำหนดKeyใน localStorage เป็น ACCESS_TOKEN

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN);

export const removeAccessToken = () => localStorage.removeItem(ACCESS_TOKEN);
