export interface TourImage {
  image_url: string;
  caption: string;
  sort_order: number;
}

export interface TourItinerary {
  session: string;
  title: string;
  description: string;
  sort_order: number;
}

export interface TourInclusion {
  title: string;
  description: string;
  sort_order: number;
}

export interface TourVideo {
  url: string;
  title: string;
  description: string;
  sort_order: number;
}

export interface TourHighlight {
  icon: string;
  title: string;
  description: string;
  sort_order: number;
}

export interface TourDetail {
  title: string;
  slug: string;
  description: string;
  card_description: string;
  location: string;
  meeting_point: string;
  tour_booking_process: string;
  tour_cancellation_policy: string;
  age_requirement: string;
  cover: string;
  image_in_menu: string;
  tour_days: string;
  tour_nights: string;
  original_price: number;
  sale_price: number;
  participant_min: number;
  participant_max: number;
  product_code: string;
  image_header: string;
  tour_category_id: string;
  campsites: string;
  food: string;
  kitlist: string;
  languages_code: string;
  logistics: string;
  map_title: string;
  optional_extra: string;
  the_area: string;
  title_kitlist: string;
  transfers: string;
  weather_condition: string;
  sort: number;
  show_in_footer: boolean;
  is_top: boolean;
  label_hot: string;
  is_featured: boolean;
  label_discount: string;
  status: string;
  meta_description: string;
  meta_image: string;
  meta_keyword: string;
  meta_robot: string[];
  meta_title: string;
  tour_images: TourImage[];
  tour_intenerary: TourItinerary[];
  tour_inclusions: TourInclusion[];
  videos: TourVideo[];
  tour_highlights: TourHighlight[];
}

export interface BookingData {
  date: string;
  participants: number;
  total_price: number;
}
