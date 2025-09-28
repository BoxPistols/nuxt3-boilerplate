import type { GoogleReview } from '~/types/google-reviews'

export interface MockReview extends GoogleReview {
  job_title: string
  age: string
  monthly_income: string
}

export const mockReviews: MockReview[] = [
  {
    author_name: 'S.Nさん',
    job_title: 'インフラエンジニア',
    age: '43歳 男性',
    monthly_income: '80万',
    rating: 5,
    text: 'これまでWindowsやLinuxなどサーバー構築・運用を主な業務としてきたがAWSやAzureなど経験の浅いクラウド領域に参画する機会を貰えたので非常に満足している',
    time: Math.floor(Date.now() / 1000),
    profile_photo_url: '',
    relative_time_description: '',
    language: 'ja',
  },
  {
    author_name: 'Y.Kさん',
    job_title: '開発エンジニア',
    age: '35歳 男性',
    monthly_income: '70万',
    rating: 5,
    text: '登録から案件紹介をしてくれるまでのスピードが早い。カウンセリング時に案件の紹介があって驚いた。参画後も定期的にコミュニケーションを取ってくれるので信頼出来る印象。',
    time: Math.floor(Date.now() / 1000),
    profile_photo_url: '',
    relative_time_description: '',
    language: 'ja',
  },
  {
    author_name: 'T.Kさん',
    job_title: 'PM',
    age: '37歳 男性',
    monthly_income: '90万',
    rating: 5,
    text: '自社開発でPMを経験後、フリーランスとして初めて利用させて頂きました。PMや複数プロジェクトをマネジメントする案件など正社員時代には想像していなかた規模の案件を紹介いただき、選択肢を多く頂けたことで無事参画案件が決まりました。',
    time: Math.floor(Date.now() / 1000),
    profile_photo_url: '',
    relative_time_description: '',
    language: 'ja',
  },
]

export const mockBusinessInfo = {
  name: 'お客様サービス',
  rating: 5.0,
  user_ratings_total: 3,
} as const
