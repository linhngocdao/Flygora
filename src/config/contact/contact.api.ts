import { contactPayload, QueryGetContacts } from "@/types/contact.type";
import axiosInstance from "../axios";

export async function SendContact(payload: contactPayload) {
  const { data } = await axiosInstance.post("/contact", payload);
  return data;
}

export async function GetContact(params: QueryGetContacts) {
  const { data } = await axiosInstance.get("/contact", { params });
  return data;
}

export async function DeleteContact(id: string) {
  const { data } = await axiosInstance.delete(`/contact/${id}`);
  return data;
}
