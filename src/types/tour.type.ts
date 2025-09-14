export interface Tour {
  id: string;
  title: string;
  slug: string;
  description: string;
  card_description?: string;
  location?: string;
  meeting_point?: string;
  tour_booking_process?: string;
  tour_cancellation_policy?: string;
  age_requirement: string;
  cover?: string;
  image_in_menu?: string;
  tour_days?: string;
  tour_nights?: string;
  original_price: number;
  sale_price: number;
  participant_min?: number;
  participant_max?: number;
  product_code: string;
  image_header?: string;
  tour_detail: TourDetail;
  meta_data: TourMeta;
  category: {
    id: string;
    name: string;
  };
  tour_detail_images?: TourImage[];
  tour_intenerary?: TourItinerary[];
  tour_include?: TourInclusion[];
  tour_highlights?: TourHighlight[];
  videos?: TourVideo[];
}

export interface TourDetail {
  campsites?: string;
  food?: string;
  kitlist?: string;
  languages_code?: string;
  logistics?: string;
  map_title?: string;
  optional_extra?: string;
  the_area?: string;
  title_kitlist?: string;
  tours_id: string;
  transfers?: string;
  weather_condition?: string;
}
export interface TourMeta {
  sort?: number;
  show_in_footer?: boolean;
  is_top?: boolean;
  label_hot?: string;
  is_featured?: boolean;
  label_discount?: string;
  status: "published" | "unpublished";
  meta_description?: string;
  meta_image?: string;
  meta_keyword?: string;
  meta_robot?: string[];
  meta_title?: string;
  user_created: string;
  user_updated?: string;
  date_created: string;
  date_updated?: string;
}

export interface TourImage {
  id: string;
  image_url: string;
  caption?: string;
  sort_order?: number;
}

export interface TourItinerary {
  id: string;
  session: string;
  title: string;
  description: string;
  sort_order?: number;
}

export interface TourInclusion {
  id: string;
  title: string;
  description: string;
  sort_order?: number;
}

export interface TourHighlight {
  id: string;
  icon: string;
  title: string;
  sort_order?: number;
}

export interface TourVideo {
  id: string;
  url: string;
  title?: string;
  sort_order?: number;
}

// Query params for filtering tours
export interface QueryGetTours {
  page?: number;
  limit?: number;
  query?: string;
  price_min?: number;
  price_max?: number;
  duration_min?: number;
  duration_max?: number;
  category_id?: string;
  status?: "published" | "unpublished";
  is_featured?: boolean;
  is_top?: boolean;
}

// Request types cho tạo và cập nhật tour
export interface TourPayload {
  title: string;
  description: string;
  card_description?: string;
  location?: string;
  meeting_point?: string;
  tour_booking_process?: string;
  tour_cancellation_policy?: string;
  age_requirement: string;
  cover?: string;
  image_in_menu?: string;
  tour_days?: string;
  tour_nights?: string;
  original_price: number;
  sale_price: number;
  participant_min?: number;
  participant_max?: number;
  product_code: string;
  image_header?: string;
  tour_category_id: string;

  // Tour detail fields
  campsites?: string;
  food?: string;
  kitlist?: string;
  languages_code?: string;
  logistics?: string;
  map_title?: string;
  optional_extra?: string;
  the_area?: string;
  title_kitlist?: string;
  transfers?: string;
  weather_condition?: string;

  // Meta data fields
  sort?: number;
  show_in_footer?: boolean;
  is_top?: boolean;
  label_hot?: string;
  is_featured?: boolean;
  label_discount?: string;
  status?: "published" | "unpublished";
  meta_description?: string;
  meta_image?: string;
  meta_keyword?: string;
  meta_robot?: string[];
  meta_title?: string;

  // Related data arrays
  tour_images?: {
    image_url: string;
    caption?: string;
    sort_order?: number;
  }[];

  tour_intenerary?: {
    session: string;
    title: string;
    description: string;
    sort_order?: number;
  }[];

  tour_inclusions?: {
    title: string;
    description: string;
    sort_order?: number;
  }[];

  videos?: {
    url: string;
    title?: string;
    sort_order?: number;
  }[];

  tour_highlights?: {
    icon: string;
    title: string;
    sort_order?: number;
  }[];
}

// Response types
export interface TourListResponse {
  tours?: Tour[]; // Làm cho trường này tùy chọn
}

export interface TourResponse {
  tour: Tour;
}
