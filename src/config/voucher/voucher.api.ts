import {
  filterVoucher,
  UpdateVoucherRequest,
  voucherPayload,
  voucherPayloadCreate,
} from "@/types/voucher.type";
import axiosInstance from "../axios";

/* Check voucher of tour */
export async function checkVoucherTour(payload: voucherPayload) {
  const { data } = await axiosInstance.post(`/vouchers/check`, payload);
  return data;
}

/* Thống kê voucher */
export async function getVoucherStatistics() {
  const { data } = await axiosInstance.get(`/vouchers/stats`);
  return data;
}

/* Voucher list */
export async function getVoucherList(param: filterVoucher) {
  const { data } = await axiosInstance.get(`/vouchers`, { params: param });
  return data;
}

/* Detail voucher */
export async function getVoucherDetail(id: string) {
  const { data } = await axiosInstance.get(`/vouchers/${id}`);
  return data;
}

/* Check voucher đang được sử dụng những tour nào */
export async function getVoucherUsedTours(id: string) {
  const { data } = await axiosInstance.get(`/vouchers/${id}/usage`);
  return data;
}

/* Create voucher */
export async function createVoucher(payload: voucherPayloadCreate) {
  const { data } = await axiosInstance.post(`/vouchers`, payload);
  return data;
}

/* Duplicate voucher */
export async function duplicateVoucher(
  id: string,
  payload: { new_code: string; valid_from: string; valid_to: string }
) {
  const { data } = await axiosInstance.post(`/vouchers/${id}/duplicate`, payload);
  return data;
}

/* Update voucher */
export async function updateVoucher(id: string, payload: UpdateVoucherRequest) {
  const { data } = await axiosInstance.put(`/vouchers/${id}`, payload);
  return data;
}

/* Update voucher status */
export async function updateVoucherStatus(id: string, is_active: boolean) {
  const { data } = await axiosInstance.patch(`/vouchers/${id}/status`, { is_active });
  return data;
}

/* Delete voucher */
export async function deleteVoucher(id: string) {
  const { data } = await axiosInstance.delete(`/vouchers/${id}`);
  return data;
}
