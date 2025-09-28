<template>
  <div class="google-reviews-container">
    <header class="reviews-header">
      <h1 class="reviews-title">お客様の声</h1>
      <p class="reviews-subtitle">お客様レビューをご紹介します</p>
    </header>

    <div class="stats-card">
      <div
        v-if="businessInfo || (error && mockBusinessInfo)"
        class="stats-grid"
      >
        <div class="stat-item">
          <span class="stat-number">{{
            businessInfo?.user_ratings_total ||
            mockBusinessInfo.user_ratings_total
          }}</span>
          <div class="stat-label">総レビュー数</div>
        </div>
        <div class="stat-item">
          <div class="overall-rating">
            <span class="stat-number">{{
              (businessInfo?.rating || mockBusinessInfo.rating || 0).toFixed(1)
            }}</span>
            <div class="rating-stars">
              {{
                generateStars(
                  Math.round(businessInfo?.rating || mockBusinessInfo.rating)
                )
              }}
            </div>
          </div>
          <div class="stat-label">平均評価</div>
        </div>
        <div class="stat-item">
          <span class="stat-number">{{
            error ? mockReviews.length : filteredReviews.length
          }}</span>
          <div class="stat-label">直近の評価数</div>
        </div>
      </div>
    </div>

    <div class="reviews-container">
      <div ref="reviewsScrollWrapper" class="reviews-scroll-wrapper">
        <div v-if="!isLoading && !error" class="reviews-display">
          <div
            v-for="(review, index) in filteredReviews"
            :key="review.time"
            class="review-card"
            :class="[
              review.rating === 5 ? 'perfect-rating' : 'high-rating',
              'fade-in',
            ]"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="review-header">
              <div class="avatar-container">
                <img
                  v-show="!imageLoadError[review.time]"
                  class="author-avatar"
                  :src="
                    review.profile_photo_url ||
                    getDefaultAvatar(review.author_name)
                  "
                  :alt="review.author_name"
                  :data-review-time="review.time"
                  loading="lazy"
                  @error="handleImageError"
                  @load="handleImageLoad"
                />
                <div v-if="imageLoadError[review.time]" class="avatar-fallback">
                  {{ getInitials(review.author_name) }}
                </div>
                <div v-if="imageLoading[review.time]" class="avatar-loading">
                  <div class="loading-spinner-small"></div>
                </div>
              </div>
              <div class="author-info">
                <div class="author-name">
                  {{ review.author_name }}
                </div>
                <div class="review-rating">
                  <span class="rating-stars">{{
                    generateStars(review.rating)
                  }}</span>
                </div>
                <div class="review-date">
                  {{ calculateRelativeTime(review.time) }}
                </div>
              </div>
            </div>

            <div class="review-content">
              <div
                class="review-text"
                :class="{
                  truncated:
                    isLongText(review.text) && !expandedReviews[review.time],
                }"
              >
                {{
                  expandedReviews[review.time]
                    ? review.text
                    : truncateText(review.text)
                }}
              </div>
              <button
                v-if="isLongText(review.text)"
                class="read-more-btn"
                @click="toggleExpanded(review.time)"
              >
                {{ expandedReviews[review.time] ? '折りたたむ' : 'もっと見る' }}
              </button>
            </div>
          </div>
        </div>

        <!-- ローディング状態 -->
        <div v-if="isLoading" class="loading">
          <div class="loading-spinner"></div>
          <p>高評価レビューを読み込んでいます...</p>
        </div>

        <!-- フォールバック表示（エラー時はモックレビューを表示） -->
        <div v-if="error && mockReviews.length > 0">
          <div class="fallback-notice">
            <p>おかげさまでお客様にご好評いただいております</p>
          </div>
          <div class="reviews-display">
            <div
              v-for="(review, index) in mockReviews"
              :key="`mock-${index}`"
              class="review-card"
              :class="[
                review.rating === 5 ? 'perfect-rating' : 'high-rating',
                'fade-in',
              ]"
              :style="{ animationDelay: `${index * 0.1}s` }"
            >
              <div class="review-header">
                <div class="avatar-container">
                  <div class="avatar-fallback">
                    {{ getInitials(review.author_name) }}
                  </div>
                </div>
                <div class="author-info">
                  <div class="author-name">
                    {{ review.author_name }}
                    <span class="job-title">{{ review.job_title }}</span>
                  </div>
                  <div class="review-rating">
                    <span class="rating-stars">{{
                      generateStars(review.rating)
                    }}</span>
                  </div>
                  <div class="professional-info">
                    <div class="age-info">年代：{{ review.age }}</div>
                    <div class="income-info">
                      月収：{{ review.monthly_income }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="review-content">
                <div
                  class="review-text"
                  :class="{
                    truncated:
                      isLongText(review.text) && !expandedReviews[review.time],
                  }"
                >
                  {{
                    expandedReviews[review.time]
                      ? review.text
                      : truncateText(review.text)
                  }}
                </div>
                <button
                  v-if="isLongText(review.text)"
                  class="read-more-btn"
                  @click="toggleExpanded(review.time)"
                >
                  {{
                    expandedReviews[review.time] ? '折りたたむ' : 'もっと見る'
                  }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- レビューなし状態 -->
        <div
          v-if="!isLoading && !error && filteredReviews.length === 0"
          class="no-reviews-state"
        >
          <div class="no-reviews-icon">
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                stroke="#1a73e8"
                stroke-width="2"
                fill="none"
              />
            </svg>
          </div>
          <h3>初めてのレビューをお待ちしています</h3>
          <p>現在、表示するレビューがありません。</p>
          <p class="text-sm">
            サービスをご利用いただいたお客様の声をお待ちしております。
          </p>
        </div>
      </div>

      <!-- Googleレビューリンク -->
      <div v-if="props.showMoreReviewsLink" class="google-reviews-link">
        <a
          :href="props.googleReviewsUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="view-more-reviews-btn"
        >
          もっと口コミを見る
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type {
  GoogleReview,
  BusinessInfo,
  GooglePlacesResponse,
} from '~/types/google-reviews'
import { mockReviews, mockBusinessInfo } from '~/data/mock-reviews'

// Props
interface Props {
  placeId: string
  apiKey: string
  /**
   * CORSプロキシのURL（オプション）
   * 本番環境では自己ホスト型のCORSプロキシまたは堅牢なサービスを使用することを推奨
   * 開発環境では環境変数 NUXT_PUBLIC_CORS_PROXY で設定可能
   */
  corsProxy?: string
  minRating?: number
  language?: string
  googleReviewsUrl?: string
  showMoreReviewsLink?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  corsProxy: '', // 環境変数で設定してください
  minRating: 4,
  language: 'ja',
  googleReviewsUrl: 'https://share.google/o0NUxpGtlW8mg9N3r',
  showMoreReviewsLink: true,
})

// Reactive data
const isLoading = ref(false)
const error = ref<string | null>(null)
const currentReviews = ref<GoogleReview[]>([])
const filteredReviews = ref<GoogleReview[]>([])
const businessInfo = ref<BusinessInfo | null>(null)

// モックデータは外部ファイルからインポート
const expandedReviews = ref<Record<number, boolean>>({})
const imageLoadError = ref<Record<number, boolean>>({})
const imageLoading = ref<Record<number, boolean>>({})

// DOM要素の参照
const reviewsScrollWrapper = ref<HTMLElement | null>(null)

// Methods
const fetchReviews = async (): Promise<void> => {
  isLoading.value = true
  error.value = null

  try {
    const targetUrl =
      `https://maps.googleapis.com/maps/api/place/details/json` +
      `?place_id=${props.placeId}` +
      `&key=${props.apiKey}` +
      `&fields=reviews,rating,user_ratings_total,name` +
      `&language=${props.language}` +
      `&reviews_sort=newest`

    // CORSプロキシが設定されている場合のみ使用
    // 本番環境では自己ホスト型のCORSプロキシまたは堅牢なサービスを使用することを推奨
    const proxyUrl = props.corsProxy ? props.corsProxy + targetUrl : targetUrl
    const response = await fetch(proxyUrl, {
      headers: {
        Origin: window.location.origin,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: GooglePlacesResponse = await response.json()

    if (data.status !== 'OK') {
      throw new Error(`Google API Error: ${data.status}`)
    }

    currentReviews.value = data.result.reviews || []
    businessInfo.value = {
      name: data.result.name,
      rating: data.result.rating,
      user_ratings_total: data.result.user_ratings_total,
    }

    filterAndDisplayReviews()
  } catch (err) {
    console.error('Error fetching reviews:', err)
    error.value =
      err instanceof Error ? err.message : '不明なエラーが発生しました'
  } finally {
    isLoading.value = false
  }
}

const filterAndDisplayReviews = (): void => {
  filteredReviews.value = currentReviews.value
    .filter(review => review.rating >= props.minRating)
    .sort((a, b) => b.time - a.time)
    .slice(0, 5)
}

const generateStars = (rating: number): string => {
  const fullStars = '★'.repeat(rating)
  const emptyStars = '☆'.repeat(5 - rating)
  return fullStars + emptyStars
}

const getDefaultAvatar = (name: string): string => {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=e3f2fd&color=1976d2&size=48`
}

const handleImageError = (event: Event): void => {
  const img = event.target as HTMLImageElement
  const reviewTime = parseInt(img.dataset.reviewTime || '0')
  imageLoadError.value[reviewTime] = true
  imageLoading.value[reviewTime] = false
}

const handleImageLoad = (event: Event): void => {
  const img = event.target as HTMLImageElement
  const reviewTime = parseInt(img.dataset.reviewTime || '0')
  imageLoading.value[reviewTime] = false
  imageLoadError.value[reviewTime] = false
}

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const isLongText = (text: string): boolean => {
  return text.length > 200
}

const truncateText = (text: string): string => {
  return isLongText(text) ? text.substring(0, 200) + '...' : text
}

const toggleExpanded = (reviewTime: number): void => {
  expandedReviews.value[reviewTime] = !expandedReviews.value[reviewTime]
}

const calculateRelativeTime = (timestamp: number): string => {
  const now = Math.floor(Date.now() / 1000)
  const diffSeconds = now - timestamp

  if (diffSeconds < 60) {
    return 'たった今'
  } else if (diffSeconds < 3600) {
    const minutes = Math.floor(diffSeconds / 60)
    return `${minutes}分前`
  } else if (diffSeconds < 86400) {
    const hours = Math.floor(diffSeconds / 3600)
    return `${hours}時間前`
  } else if (diffSeconds < 2592000) {
    const days = Math.floor(diffSeconds / 86400)
    return `${days}日前`
  } else if (diffSeconds < 31536000) {
    const months = Math.floor(diffSeconds / 2592000)
    return `${months}か月前`
  } else {
    const years = Math.floor(diffSeconds / 31536000)
    return `${years}年前`
  }
}

// Touch events for mobile
const setupTouchEvents = (): void => {
  if (typeof window === 'undefined') return

  let startX = 0
  let startY = 0
  let isScrolling = false

  // Vueのrefを使用してDOM要素を取得
  const scrollWrapper = reviewsScrollWrapper.value
  if (!scrollWrapper) return

  // スクロール可能な要素（.reviews-display）を取得
  const reviewsDisplay = scrollWrapper.querySelector('.reviews-display')
  if (!reviewsDisplay) return

  reviewsDisplay.addEventListener('touchstart', (e: TouchEvent) => {
    if (window.innerWidth > 768) return

    startX = e.touches[0].clientX
    startY = e.touches[0].clientY
    isScrolling = true
  })

  reviewsDisplay.addEventListener('touchmove', (e: TouchEvent) => {
    if (!isScrolling || window.innerWidth > 768) return

    const currentX = e.touches[0].clientX
    const currentY = e.touches[0].clientY
    const diffX = Math.abs(startX - currentX)
    const diffY = Math.abs(startY - currentY)

    if (diffX > diffY) {
      e.preventDefault()
    }
  })

  reviewsDisplay.addEventListener('touchend', () => {
    isScrolling = false
  })
}

// Lifecycle
onMounted(() => {
  fetchReviews()
  setupTouchEvents()
})
</script>

<style scoped>
/* CSS変数の定義 */
.google-reviews-container {
  /* CSS変数の定義 */
  --primary-color: #1a73e8;
  --primary-dark: #1557b0;
  --surface-color: #ffffff;
  --background-color: #f9fafb;
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --text-disabled: #9ca3af;
  --border-color: #e5e7eb;
  --shadow-light:
    0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15);
  --shadow-medium:
    0 1px 3px 0 rgba(60, 64, 67, 0.3), 0 4px 8px 3px rgba(60, 64, 67, 0.15);
  --shadow-heavy:
    0 2px 6px 2px rgba(60, 64, 67, 0.15), 0 8px 24px 4px rgba(60, 64, 67, 0.15);
  --star-color: #fbbc04;
  --star-empty: #e8eaed;

  /* コンポーネントのスタイル */
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 16px;
  font-family:
    'Roboto',
    'Noto Sans JP',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  background-color: var(--background-color);
  color: var(--text-primary);
  line-height: 1.6;
}

.reviews-header {
  text-align: center;
  margin-bottom: 32px;
}

.reviews-title {
  font-size: 2rem;
  font-weight: 400;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.reviews-subtitle {
  font-size: 1rem;
  color: var(--text-secondary);
  font-weight: 300;
}

.stats-card {
  /* background: #f9fafb; */
  padding: 12px;
  margin-bottom: 8px;
  /* border-radius: 12px; */
  /* box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.06); */
  /* border: 1px solid var(--border-color); */
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  align-items: center;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2.2rem;
  font-weight: 500;
  color: var(--text-primary);
  display: block;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-top: 4px;
}

.overall-rating {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.rating-stars {
  font-size: 1.4rem;
  color: #fbbc04;
}

.reviews-container {
  position: relative;
  overflow: visible;
}

/* デスクトップ（769px以上）：グリッドレイアウト */
.reviews-display {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  padding: 16px 0;
}

/* モバイル・タブレット（768px以下）：横スクロール */
@media (max-width: 768px) {
  .reviews-display {
    display: flex;
    gap: 20px;
    overflow-x: auto;
    padding: 16px 0 24px 0;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .reviews-display::-webkit-scrollbar {
    display: none;
  }

  .review-card {
    width: 320px;
    min-width: 320px;
    max-width: 320px;
    flex-shrink: 0;
  }
}

.review-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border: 1px solid var(--border-color);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  color: var(--text-primary);
}

.review-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--star-color), var(--primary-color));
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.review-card:hover {
  transform: translateY(-4px);
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border-color: rgba(26, 115, 232, 0.3);
}

.review-card:hover::before {
  transform: scaleX(1);
}

.review-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 16px;
}

.author-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--border-color);
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.review-card:hover .author-avatar {
  border-color: var(--primary-color);
  transform: scale(1.05);
}

.author-info {
  flex: 1;
  min-width: 0;
}

.author-name {
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.review-rating {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.review-rating .rating-stars {
  font-size: 1.1rem;
  color: #fbbc04;
}

.rating-number {
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.review-date {
  font-size: 0.85rem;
  color: var(--text-disabled);
}

.review-content {
  line-height: 1.6;
  color: var(--text-primary);
  position: relative;
}

.review-text {
  font-size: 0.95rem;
  margin-bottom: 16px;
}

.review-text.truncated {
  max-height: 4.8em;
  overflow: hidden;
  position: relative;
}

.review-text.truncated::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 40px;
  height: 1.2em;
  background: linear-gradient(to right, transparent, var(--surface-color));
}

.read-more-btn {
  background: none;
  border: none;
  color: #1a73e8;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  padding: 4px 0;
  transition: all 0.2s ease;
  text-decoration: underline;
}

.read-more-btn:hover {
  color: #1557b0;
  text-decoration: underline;
  transform: translateX(2px);
}

.review-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--border-color);
}

.action-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 0.8rem;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 4px;
}

.action-btn:hover {
  background: rgba(26, 115, 232, 0.1);
  color: var(--primary-color);
}

.loading {
  text-align: center;
  padding: 40px;
  color: var(--text-secondary);
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--border-color);
  border-top: 3px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.error-state {
  text-align: center;
  padding: 40px;
  background: var(--surface-color);
  border-radius: 12px;
  border: 1px solid #fce8e6;
  color: #d93025;
}

.error-icon {
  font-size: 3rem;
  margin-bottom: 16px;
}

.retry-btn {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 16px;
}

.retry-btn:hover {
  background: var(--primary-dark);
  transform: translateY(-1px);
  box-shadow: var(--shadow-light);
}

.rating-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: linear-gradient(135deg, var(--star-color), #ff9800);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  margin-left: 8px;
}

/* モバイル専用スタイル */
@media (max-width: 768px) {
  .google-reviews-container {
    padding: 16px 8px;
  }

  .reviews-title {
    font-size: 2rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  /* モバイルでのスクロール表示用のサイドフェード */
  .reviews-container::before,
  .reviews-container::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 24px;
    width: 20px;
    pointer-events: none;
    z-index: 10;
  }

  .reviews-container::before {
    left: 0;
    background: linear-gradient(to right, var(--background-color), transparent);
  }

  .reviews-container::after {
    right: 0;
    background: linear-gradient(to left, var(--background-color), transparent);
  }
}

/* 小さなスマートフォン用（480px以下） */
@media (max-width: 480px) {
  .review-card {
    width: 300px;
    min-width: 300px;
    max-width: 300px;
    padding: 18px;
  }

  .google-reviews-container {
    padding: 12px 6px;
  }
}

.fade-in {
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 高評価レビューへの特別な視覚効果 */
.review-card.high-rating {
  background: linear-gradient(135deg, #fff, #f8f9ff);
}

.review-card.perfect-rating {
  background: linear-gradient(135deg, #fff, #fffbf0);
}

.review-card.perfect-rating::before {
  background: linear-gradient(90deg, gold, var(--star-color));
}

@media (max-width: 768px) {
  .reviews-scroll-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    padding: 0 16px;
  }

  .reviews-display {
    display: flex;
    gap: 20px;
    flex-wrap: nowrap;
  }

  .review-card {
    flex: 0 0 320px;
  }
}

/* アバター関連のスタイル */
.avatar-container {
  position: relative;
  width: 48px;
  height: 48px;
  flex-shrink: 0;
}

.avatar-fallback {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1a73e8, #1557b0);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1rem;
  border: 2px solid #e8eaed;
}

.avatar-loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  border-radius: 50%;
  border: 2px solid #e8eaed;
}

.loading-spinner-small {
  width: 20px;
  height: 20px;
  border: 2px solid #e8eaed;
  border-top: 2px solid #1a73e8;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.fallback-notice {
  text-align: center;
  background: linear-gradient(135deg, #e8f5e8, #f0f8f0);
  border-radius: 12px;
  padding: 16px 24px;
  margin-bottom: 24px;
  border: 1px solid #c8e6c8;
  box-shadow: 0 1px 3px rgba(76, 175, 80, 0.1);
}

.fallback-notice p {
  color: #2e7d32;
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
  letter-spacing: 0.5px;
}

.job-title {
  display: inline-block;
  background: linear-gradient(135deg, #e3f2fd, #f1f8e9);
  color: #1565c0;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 12px;
  margin-left: 8px;
  border: 1px solid #bbdefb;
}

.professional-info {
  display: flex;
  gap: 12px;
  margin-top: 4px;
  font-size: 0.8rem;
}

.age-info,
.income-info {
  color: #5f6368;
  font-weight: 400;
}
</style>
