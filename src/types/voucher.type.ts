export interface voucherPayload {
  voucher_code: string;
  tour_id: string;
  order_amount: number;
}

export interface filterVoucher {
  page?: number;
  limit?: number;
  is_active?: boolean;
  discount_type?: string;
  search?: string;
  status?: string;
  sort_by?: string;
  sort_order?: "asc" | "desc";
}

export interface voucherPayloadCreate {
  code: string;
  description?: string;
  discount_type: "percentage" | "fixed_amount";
  discount_value: number;
  minimum_order_value?: number;
  maximum_discount_amount?: number;
  valid_from: string;
  valid_to: string;
  max_uses: number;
  is_active?: boolean;
  applicable_tour_ids?: string[];
}

export interface voucherResponse {
  id: string;
  code: string;
  description?: string;
  discount_type: "percentage" | "fixed_amount";
  discount_value: string;
  minimum_order_value?: string | null;
  maximum_discount_amount?: string | null;
  max_uses: number;
  uses_count: number;
  valid_from: string;
  valid_to: string;
  is_active: boolean;
  created_by: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
  applicable_tour_ids?: string[];
  creator: {
    id: string;
    name: string;
    email: string;
  };
  updater: {
    id: string;
    name: string;
    email: string;
  };
}

export interface UpdateVoucherRequest {
  code?: string;
  description?: string;
  discount_type?: "percentage" | "fixed_amount";
  discount_value?: number;
  minimum_order_value?: number;
  maximum_discount_amount?: number;
  valid_from?: string;
  valid_to?: string;
  max_uses?: number;
  is_active?: boolean;
  applicable_tour_ids?: string[];
}

export interface StatisticalVoucher {
  total_vouchers: number;
  active_vouchers: number;
  expired_vouchers: number;
  most_used_voucher: {
    code: string;
    uses_count: number;
  };
}
