// Google Places API と GoogleReviews コンポーネントの型定義
export interface GoogleReview {
  author_name: string
  author_url?: string
  language: string
  profile_photo_url?: string
  rating: number
  relative_time_description: string
  text: string
  time: number
}

export interface BusinessInfo {
  name: string
  rating: number
  user_ratings_total: number
}

export interface GooglePlacesResponse {
  status: string
  result: {
    name: string
    rating: number
    user_ratings_total: number
    reviews: GoogleReview[]
  }
}

export interface MockReview extends GoogleReview {
  job_title: string
  age: string
  monthly_income: string
}
