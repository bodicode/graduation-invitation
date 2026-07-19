<template>
  <section class="rsvp-section">

    <!-- ── Script quote ── -->
    <div class="chapter-block animate-blur-in delay-100">
      <p class="chapter-text text-script">Một chương mới bắt đầu...</p>
    </div>

    <!-- ── Carousel ── -->
    <div
      class="carousel animate-scale-in delay-200"
      @mousedown="onDragStart"
      @touchstart.passive="onDragStart"
      @mousemove="onDragMove"
      @touchmove.passive="onDragMove"
      @mouseup="onDragEnd"
      @mouseleave="onDragEnd"
      @touchend="onDragEnd"
    >
      <!-- Floating icons around carousel -->
      <span class="float-icon fi-1">🌸</span>
      <span class="float-icon fi-2">🌸</span>
      <span class="float-icon fi-3">🌺</span>
      <span class="float-icon fi-4">🌹</span>
      <span class="float-icon fi-5">🌸</span>
      <span class="float-icon fi-6">🪷</span>
      <span class="float-icon fi-7">🌼</span>
      <span class="float-icon fi-8">🌸</span>
      <div class="carousel-track" :style="trackStyle">
        <div
          v-for="(slide, i) in slides"
          :key="i"
          class="carousel-slide"
          :class="{ 'is-active': i === current, 'is-prev': i === prevIndex, 'is-next': i === nextIndex }"
        >
          <div class="pol">
            <img :src="slide.src" :alt="slide.alt" class="pol-img" />
            <span v-if="i === current" class="sparkle sp-1">✦</span>
            <span v-if="i === current" class="sparkle sp-2">✦</span>
            <span v-if="i === current" class="sparkle sp-3">✧</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Lời nhắn ── -->
    <div class="message-block animate-fade-in-up delay-150">
      <p class="message-text text-serif">Và mình mong bạn có mặt để cùng mình lưu giữ những khoảnh khắc đáng nhớ của hành trình thanh xuân này. Bởi sau này, khi nhìn lại những bức ảnh của ngày hôm ấy, điều khiến mình mỉm cười không chỉ là tấm bằng trên tay, mà còn là những gương mặt thân thương đã cùng mình đi qua một quãng đời đẹp nhất.</p>
    </div>

    <div class="section-divider animate-scale-in delay-300"></div>

    <!-- ── Lưu bút block ── -->
    <div class="rsvp-block animate-fade-in-down delay-200">
      <p class="note-text text-serif">Lưu bút ngày tốt nghiệp</p>
      <button class="refresh-btn" @click="loadMessages" :class="{ 'is-spinning': loadingMsg }" aria-label="Tải lại lời chúc">
        ↻
      </button>
    </div>

    <!-- ── Form lưu bút ── -->
    <div class="guestbook animate-fade-in-up delay-300">
      <div class="gb-input-wrap">
        <input
          v-model="guestName"
          class="gb-name text-serif"
          placeholder="Tên bạn"
          maxlength="40"
        />
        <textarea
          v-model="guestMsg"
          class="gb-textarea text-serif"
          placeholder="Gửi mình vài lời nhé..."
          rows="3"
          maxlength="300"
        />
        <button class="gb-submit text-serif" @click="submitMsg" :disabled="!guestMsg.trim() || submitting">
          {{ submitting ? 'Đang gửi...' : submitDone ? 'Đã gửi 🌸' : 'Gửi ✉' }}
        </button>
      </div>

      <!-- Danh sách lời chúc -->
      <transition-group name="gb-list" tag="div" class="gb-list">
        <div v-for="entry in pagedMessages" :key="entry.id" class="gb-entry">
          <p class="gb-entry-name text-script">{{ entry.name || 'Ẩn danh' }}</p>
          <p class="gb-entry-msg text-serif">{{ entry.msg }}</p>
          <p class="gb-entry-time text-serif">{{ entry.time }}</p>
        </div>
      </transition-group>

      <p v-if="messages.length === 0" class="gb-empty text-serif">
        Hãy là người đầu tiên gửi lời chúc 🌸
      </p>

      <!-- Phân trang -->
      <div class="gb-pagination" v-if="totalPages > 1">
        <button class="pg-btn text-serif" @click="goPage(currentPage - 1)" :disabled="currentPage === 1">‹</button>
        <span class="pg-info text-serif">{{ currentPage }} / {{ totalPages }}</span>
        <button class="pg-btn text-serif" @click="goPage(currentPage + 1)" :disabled="currentPage === totalPages">›</button>
      </div>
    </div>
    
    <div class="section-divider animate-fade-in delay-300"></div>

    <!-- ── Trang phục ── -->
    <div class="attire-block animate-slide-right delay-400">
      <p class="note-text text-serif">TRANG PHỤC</p>
      <p class="attire-note text-serif">Freestyle (độc lạ càng thích nhaaa)</p>
    </div>

    <div class="section-divider animate-fade-in delay-300"></div>
    <!-- ── Liên hệ redesign ── -->
    <div class="contact-section animate-fade-in-up delay-500">

      <!-- Deco flowers -->
      <span class="ct-flower f1">🌸</span>
      <span class="ct-flower f2">🌺</span>
      <span class="ct-flower f4">✦</span>
      <span class="ct-flower f3">🌸</span>
      <span class="ct-flower f5">🌸</span>
      <span class="ct-flower f4">🌸</span>

      <!-- Layout: ảnh trái + card phải -->
      <div class="ct-layout">

        <!-- Video -->
        <div class="ct-photo-wrap">
          <video
            class="ct-photo"
            src="/video/contact.mp4"
            autoplay
            loop
            muted
            playsinline
          ></video>
          <!-- Note nhỏ -->
          <div class="ct-note text-serif">
            <p>Cảm ơn bạn đã ghé thăm thiệp của mình 🌸</p>
          </div>
        </div>

        <!-- Contact card -->
        <div class="ct-card">
          <p class="ct-title text-script">Liên hệ mình</p>

          <div class="ct-divider"></div>

          <div class="ct-items">
            <a
              href="https://www.facebook.com/linhthuyngocnguyen04"
              class="ct-item text-serif"
              target="_blank" rel="noopener noreferrer"
            >
              <span class="ct-icon">💬</span>
              <div class="ct-item-info">
                <span class="ct-item-label">Nguyễn Ngọc Thùy Linh</span>
                <span class="ct-item-val">Messenger</span>
              </div>
            </a>

            <a href="tel:0773997188" class="ct-item text-serif">
              <span class="ct-icon">📞</span>
              <div class="ct-item-info">
                <span class="ct-item-label">Chị Như</span>
                <span class="ct-item-val">0773 997 188</span>
              </div>
            </a>

            <a href="tel:0939023883" class="ct-item text-serif">
              <span class="ct-icon">📞</span>
              <div class="ct-item-info">
                <span class="ct-item-label">Nhật Hoàng</span>
                <span class="ct-item-val">0939 023 883</span>
              </div>
            </a>
          </div>
        </div>

      </div>
    </div>

    <!-- ── Graduation banner ── -->
    <div class="grad-banner animate-fade-in-up">
      <p class="grad-banner-text text-serif">Graduation Ceremony</p>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// ── Carousel ──────────────────────────────────────────────────
const slides = [
  { src: '/images/IMG_1930.jpg',  alt: 'Ký ức tốt nghiệp' },
  { src: '/images/IMG_5744.JPG',  alt: 'Ảnh tốt nghiệp'   },
  { src: '/images/IMG_5745.PNG',  alt: 'Chúc mừng'         },
  { src: '/images/IMG_5745.JPG',  alt: 'Chúc mừng'         },
]

const current    = ref(0)
const dragging   = ref(false)
const dragStartX = ref(0)
const dragDeltaX = ref(0)

const prevIndex = computed(() => (current.value - 1 + slides.length) % slides.length)
const nextIndex = computed(() => (current.value + 1) % slides.length)

const trackStyle = computed(() => ({
  transform:  dragging.value ? `translateX(${dragDeltaX.value * 0.3}px)` : 'translateX(0)',
  transition: dragging.value ? 'none' : 'transform 0.35s ease',
}))

const next = () => { current.value = nextIndex.value }
const prev = () => { current.value = prevIndex.value }

let timer = null
const startAuto = () => { timer = setInterval(next, 3000) }
const stopAuto  = () => { clearInterval(timer) }

const onDragStart = (e) => {
  dragging.value   = true
  dragDeltaX.value = 0
  dragStartX.value = e.touches ? e.touches[0].clientX : e.clientX
  stopAuto()
}
const onDragMove = (e) => {
  if (!dragging.value) return
  const x = e.touches ? e.touches[0].clientX : e.clientX
  dragDeltaX.value = x - dragStartX.value
}
const onDragEnd = () => {
  if (!dragging.value) return
  dragging.value = false
  if (dragDeltaX.value < -40)     next()
  else if (dragDeltaX.value > 40) prev()
  dragDeltaX.value = 0
  startAuto()
}

// ── Guestbook (Google Sheets) ─────────────────────────────────
// Thay URL bên dưới bằng Web app URL sau khi deploy Apps Script
const SHEET_API = 'https://script.google.com/macros/s/AKfycbwARhRXtwtTLPYEeEVPP3R2Iytra1BZzS8ZnH8kW-XHQK2E4B-gP-a4it4ZvRLnHHHTVw/exec'

const guestName  = ref('')
const guestMsg   = ref('')
const messages   = ref([])
const submitting = ref(false)
const submitDone = ref(false)
const loadError  = ref(false)
const loadingMsg = ref(false)

// ── Phân trang ────────────────────────────────────────────────
const PAGE_SIZE   = 5
const currentPage = ref(1)
const totalPages  = computed(() => Math.max(1, Math.ceil(messages.value.length / PAGE_SIZE)))
const pagedMessages = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return messages.value.slice(start, start + PAGE_SIZE)
})
const goPage = (page) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
}

const loadMessages = async () => {
  loadingMsg.value = true
  loadError.value  = false
  try {
    // Dùng JSONP để bypass CORS cho GET (Apps Script hỗ trợ callback param)
    messages.value = await fetchJSONP(SHEET_API)
  } catch {
    loadError.value = true
  } finally {
    loadingMsg.value = false
  }
}

// JSONP helper — inject script tag, Apps Script trả về callback(data)
const fetchJSONP = (url) => new Promise((resolve, reject) => {
  const cbName = '__gb_cb_' + Date.now()
  const script  = document.createElement('script')
  const timeout = setTimeout(() => {
    cleanup()
    reject(new Error('timeout'))
  }, 10000)

  window[cbName] = (data) => {
    cleanup()
    resolve(data)
  }
  const cleanup = () => {
    clearTimeout(timeout)
    delete window[cbName]
    script.remove()
  }
  script.onerror = (err) => {
    cleanup()
    console.error('JSONP GET error:', err, script.src)
    reject(new Error('script error'))
  }
  script.src = `${url}?callback=${cbName}`
  console.log('JSONP GET src:', script.src)
  document.head.appendChild(script)
})

const submitMsg = async () => {
  if (!guestMsg.value.trim() || submitting.value) return
  submitting.value = true
  try {
    // Dùng FormData để tránh CORS preflight
    const form = new FormData()
    form.append('name', guestName.value.trim() || 'Ẩn danh')
    form.append('msg',  guestMsg.value.trim())

    // Gửi qua JSONP (GET + params) để tránh hoàn toàn CORS
    const cbName = '__gb_post_' + Date.now()
    const params = new URLSearchParams({
      name:     guestName.value.trim() || 'Ẩn danh',
      msg:      guestMsg.value.trim(),
      callback: cbName,
    })
    await new Promise((resolve, reject) => {
      const script  = document.createElement('script')
      const timeout = setTimeout(() => { script.remove(); reject() }, 8000)
      window[cbName] = () => {
        clearTimeout(timeout)
        delete window[cbName]
        script.remove()
        resolve()
      }
      script.onerror = (err) => {
        clearTimeout(timeout)
        delete window[cbName]
        script.remove()
        console.error('JSONP script error:', err, script.src)
        reject(new Error('script error'))
      }
      script.src = `${SHEET_API}?${params.toString()}`
      console.log('JSONP POST src:', script.src)
      document.head.appendChild(script)
    })

    // Thêm vào danh sách local ngay
    messages.value.unshift({
      id:   Date.now(),
      name: guestName.value.trim() || 'Ẩn danh',
      msg:  guestMsg.value.trim(),
      time: new Date().toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' }),
    })
    guestMsg.value   = ''
    guestName.value  = ''
    submitDone.value = true
    currentPage.value = 1  // về trang đầu để thấy lời vừa gửi
    setTimeout(() => { submitDone.value = false }, 3000)
  } catch {
    alert('Gửi thất bại, thử lại nhé 🙏')
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  loadMessages()
  startAuto()
})
onUnmounted(stopAuto)
</script>

<style scoped>
/* ── Section ───────────────────────────────────────────────── */
.rsvp-section {
  background: 
    radial-gradient(ellipse at 20% 10%, rgba(163,28,46,0.04) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 90%, rgba(163,28,46,0.04) 0%, transparent 50%),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cg opacity='0.045' fill='%23a31c2e'%3E%3Ccircle cx='10' cy='10' r='1.2'/%3E%3Ccircle cx='50' cy='10' r='1.2'/%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3Ccircle cx='70' cy='30' r='1.2'/%3E%3Ccircle cx='10' cy='50' r='1.2'/%3E%3Ccircle cx='50' cy='50' r='1.5'/%3E%3Ccircle cx='30' cy='70' r='1.2'/%3E%3Ccircle cx='70' cy='70' r='1.2'/%3E%3Cpath d='M30 25 C31 23 33 23 34 25 C35 23 37 23 38 25 C37 27 34 29 34 29 C34 29 31 27 30 25Z' opacity='0.6'/%3E%3Cpath d='M70 65 C71 63 73 63 74 65 C75 63 77 63 78 65 C77 67 74 69 74 69 C74 69 71 67 70 65Z' opacity='0.6'/%3E%3C/g%3E%3C/svg%3E") repeat,
    #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1.5rem;
}

/* ── Carousel ──────────────────────────────────────────────── */
.carousel {
  width: 100%;
  position: relative;
  padding: 2rem 0 1rem;
  overflow: hidden;
  user-select: none;
  cursor: grab;
}
.carousel:active { cursor: grabbing; }

.carousel-track {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 260px;
  position: relative;
}

.carousel-slide {
  position: absolute;
  transition:
    transform 0.5s cubic-bezier(0.34, 1.2, 0.64, 1),
    opacity   0.5s ease,
    z-index   0s;
  /* prev / next — hidden on sides */
  opacity: 0;
  transform: translateX(90px) scale(0.78) rotate(5deg);
  z-index: 1;
  pointer-events: none;
}
.carousel-slide.is-prev {
  opacity: 0.45;
  transform: translateX(-130px) scale(0.82) rotate(-5deg);
  z-index: 2;
}
.carousel-slide.is-next {
  opacity: 0.45;
  transform: translateX(130px) scale(0.82) rotate(5deg);
  z-index: 2;
}
.carousel-slide.is-active {
  opacity: 1;
  transform: translateX(0) scale(1) rotate(0deg);
  z-index: 3;
  pointer-events: auto;
}

/* Polaroid card */
.pol {
  background: #fff;
  padding: 8px 8px 30px;
  box-shadow: 0 8px 28px rgba(0,0,0,0.16);
  position: relative;
  width: 210px;
}
.pol-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
  object-position: top center;
  display: block;
}

/* Sparkles */
.sparkle {
  position: absolute;
  font-size: 0.75rem;
  color: #c8961e;
  pointer-events: none;
  animation: twinkle 2s ease-in-out infinite;
}
.sp-1 { top: -10px; right: -10px; animation-delay: 0s;   font-size: 1rem;   }
.sp-2 { top:   6px; right: -14px; animation-delay: 0.6s; font-size: 0.6rem; }
.sp-3 { top: -14px; right:  10px; animation-delay: 1.1s; font-size: 0.55rem;}
@keyframes twinkle {
  0%, 100% { opacity: 1;   transform: scale(1)   rotate(0deg);  }
  50%       { opacity: 0.3; transform: scale(0.6) rotate(30deg); }
}

/* ── Floating icons around carousel ───────────────────────── */
.float-icon {
  position: absolute;
  pointer-events: none;
  z-index: 10;
}

.fi-1 { top: 8px;    left:  5%;  font-size: 1rem;    animation: fi-drift-1 4.8s ease-in-out infinite; animation-delay: 0s;   }
.fi-2 { top: 48px;   left:  2%;  font-size: 0.7rem;  animation: fi-drift-2 6.1s ease-in-out infinite; animation-delay: 1.2s; }
.fi-3 { top: 12px;   right: 5%;  font-size: 1.05rem; animation: fi-drift-3 5.3s ease-in-out infinite; animation-delay: 0.4s; }
.fi-4 { top: 52px;   right: 2%;  font-size: 0.72rem; animation: fi-drift-4 7.0s ease-in-out infinite; animation-delay: 2.0s; }
.fi-5 { bottom: 58px; left:  7%; font-size: 0.88rem; animation: fi-drift-5 5.7s ease-in-out infinite; animation-delay: 0.8s; }
.fi-6 { top: 18px;   left: 36%;  font-size: 0.6rem;  animation: fi-drift-6 3.9s ease-in-out infinite; animation-delay: 1.6s; }
.fi-7 { bottom: 52px; right: 7%; font-size: 0.8rem;  animation: fi-drift-7 6.5s ease-in-out infinite; animation-delay: 0.2s; }
.fi-8 { top: 24px;   right: 20%; font-size: 0.58rem; animation: fi-drift-8 4.4s ease-in-out infinite; animation-delay: 2.4s; }

/* Mỗi icon có quỹ đạo riêng — lắc nhẹ, xoay chậm, độ mờ khác nhau */
@keyframes fi-drift-1 {
  0%,100% { transform: translate(0, 0)      rotate(-5deg);  opacity: 0.75; }
  40%     { transform: translate(4px, -9px) rotate(10deg);  opacity: 1;    }
  70%     { transform: translate(-3px,-5px) rotate(-2deg);  opacity: 0.85; }
}
@keyframes fi-drift-2 {
  0%,100% { transform: translate(0, 0)       rotate(8deg);  opacity: 0.6; }
  30%     { transform: translate(-5px,-7px)  rotate(-4deg); opacity: 0.9; }
  65%     { transform: translate(3px, -12px) rotate(14deg); opacity: 0.7; }
}
@keyframes fi-drift-3 {
  0%,100% { transform: translate(0, 0)      rotate(3deg);   opacity: 0.8; }
  35%     { transform: translate(-4px,-8px) rotate(-10deg); opacity: 1;   }
  60%     { transform: translate(2px, -4px) rotate(6deg);   opacity: 0.7; }
}
@keyframes fi-drift-4 {
  0%,100% { transform: translate(0, 0)      rotate(-6deg);  opacity: 0.55; }
  45%     { transform: translate(6px,-10px) rotate(8deg);   opacity: 0.85; }
  75%     { transform: translate(-2px,-6px) rotate(-12deg); opacity: 0.65; }
}
@keyframes fi-drift-5 {
  0%,100% { transform: translate(0, 0)      rotate(4deg);  opacity: 0.7; }
  25%     { transform: translate(5px,-6px)  rotate(-6deg); opacity: 0.95; }
  60%     { transform: translate(-3px,-9px) rotate(10deg); opacity: 0.75; }
}
@keyframes fi-drift-6 {
  0%,100% { transform: translate(0, 0)      rotate(0deg);   opacity: 0.5; }
  50%     { transform: translate(-4px,-8px) rotate(-15deg); opacity: 0.8; }
}
@keyframes fi-drift-7 {
  0%,100% { transform: translate(0, 0)      rotate(-3deg);  opacity: 0.65; }
  40%     { transform: translate(-5px,-7px) rotate(9deg);   opacity: 0.9; }
  80%     { transform: translate(3px, -4px) rotate(-6deg);  opacity: 0.7; }
}
@keyframes fi-drift-8 {
  0%,100% { transform: translate(0, 0)      rotate(7deg);  opacity: 0.45; }
  55%     { transform: translate(4px,-10px) rotate(-8deg); opacity: 0.75; }
}

/* ── Script quote ──────────────────────────────────────────── */
.chapter-block {
  text-align: center;
  margin-top: 0;
  margin-bottom: 0.5rem;
  padding: 1rem 0;
}
.chapter-text {
  font-size: clamp(1.6rem, 7vw, 2.8rem);
  color: #a31c2e;
  line-height: 1.3;
  font-family: var(--f-script);
  font-weight: 400;
  letter-spacing: 0.02em;
}

.note-text {
  font-size: 1.4rem;
  color: #a31c2e;
  line-height: 1.3;
  font-family: var(--f-serif);
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
/* ── Lời nhắn ──────────────────────────────────────────────── */
.message-block {
  text-align: center;
  padding: 0 1rem;
  margin-bottom: 0.5rem;
}
.message-text {
  font-size: 0.96rem;
  font-style: italic;
  color: var(--c-text-mid);
  line-height: 1.8;
  letter-spacing: 0.02em;
  margin-top: 1rem;
}

/* ── Divider ───────────────────────────────────────────────── */
.divider {
  width: 44px;
  height: 1px;
  background: var(--c-silver-light);
  margin: 1rem auto;
}

/* ── XÁC NHẬN ─────────────────────────────────────────────── */
.rsvp-block {
  text-align: center;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
}

.refresh-btn {
  background: none;
  border: 1px solid var(--c-silver-light);
  border-radius: 50%;
  width: 26px;
  height: 26px;
  font-size: 1rem;
  line-height: 1;
  color: #a31c2e;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: border-color 0.2s, color 0.2s, transform 0.2s;
  flex-shrink: 0;
}
.refresh-btn:hover {
  border-color: #a31c2e;
  color: var(--c-silver);
}
.refresh-btn.is-spinning {
  animation: spin 0.7s linear infinite;
  pointer-events: none;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
.rsvp-label {
  font-size: 0.9rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-family: var(--f-serif);
  font-weight: 500;
  color: #a31c2e;
  margin-bottom: 0.3rem;
}
.rsvp-by {
  font-size: 1.8rem;
  color: var(--c-text-mid);
  line-height: 1.2;
}

/* ── Nút ───────────────────────────────────────────────────── */
.rsvp-btn {
  display: inline-block;
  border: 1px solid var(--c-silver-light);
  border-radius: 30px;
  padding: 0.6rem 2.2rem;
  font-size: 0.9rem;
  letter-spacing: 0.05em;
  color: var(--c-text-mid);
  text-decoration: none;
  margin-bottom: 2rem;
  transition: background 0.22s, color 0.22s, border-color 0.22s;
}
.rsvp-btn:hover {
  background: var(--c-silver);
  color: #fff;
  border-color: var(--c-silver);
}

/* ── Trang phục ────────────────────────────────────────────── */
.attire-block {
  text-align: center;
  margin-bottom: 1.8rem;
}
.attire-label {
  font-size: 0.68rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--c-text-light);
  margin-bottom: 0.25rem;
}
.attire-note {
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: var(--c-text-mid);
}

/* ── Liên hệ ───────────────────────────────────────────────── */
.contact-block {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  text-align: center;
}
.contact-heading {
  font-size: 0.9rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-family: var(--f-serif);
  font-weight: 500;
  color: #a31c2e;
  margin-bottom: 0.1rem;
}
.contact-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  transition: opacity 0.2s;
}
.contact-row:hover { opacity: 0.7; }
.contact-name {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--c-text);
  font-family: var(--f-serif);
}
.contact-sep {
  color: var(--c-silver-light);
  font-size: 0.8rem;
}
.contact-value {
  font-size: 0.88rem;
  color: var(--c-silver);
  font-family: var(--f-serif);
}

/* ── Contact Section ────────────────────────────────────────── */
.contact-section {
  width: calc(100% + 3rem);
  margin-left: -1.5rem;
  margin-right: -1.5rem;
  margin-bottom: 0;
  position: relative;
  padding: 0;
}

/* Hoa trang trí */
.ct-flower {
  position: absolute;
  pointer-events: none;
  animation: floatDance 4s ease-in-out infinite;
  font-size: 1.4rem;
  z-index: 4;
}
.f1 { top: 10px;  left: 2%;  animation-delay: 0s;   font-size: 1.6rem; }
.f2 { top: 20px;  right: 4%; animation-delay: 0.8s; font-size: 1.3rem; }
.f3 { bottom: 60px; left: 4%;  animation-delay: 1.4s; font-size: 1.1rem; }
.f4 { top: 50%;  right: 2%; animation-delay: 0.4s; font-size: 0.9rem; color: #c8961e; }
.f5 { top: 80%;  right: 2%; animation-delay: 0.4s; font-size: 0.9rem; color: #c8961e; }

@keyframes floatDance {
  0%,100% { transform: translateY(0) rotate(-5deg); }
  50%      { transform: translateY(-8px) rotate(5deg); }
}

/* ── Layout: ảnh đè lên card ──────────────────────────────── */
.ct-layout {
  position: relative;
  min-height: 240px;
}

/* Card làm nền — full width */
.ct-card {
  background: #fff;
  border: 1.5px solid rgba(163,28,46,0.2);
  border-radius: 0;
  padding: 1.4rem 1.2rem 1.4rem calc(38% + 1rem);
  box-shadow: 0 4px 20px rgba(163,28,46,0.1);
  min-height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Ảnh đè lên từ bên trái */
.ct-photo-wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 38%;
  height: 100%;
  z-index: 2;
}
.ct-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 0;
  box-shadow: 4px 0 20px rgba(80,0,20,0.18);
  display: block;
}

/* Note nhỏ dưới ảnh — ẩn vì không còn chỗ */
.ct-note { display: none; }

.ct-title {
  font-size: 1.6rem;
  color: #a31c2e;
  line-height: 1.1;
  margin-bottom: 0.5rem;
}

.ct-divider {
  width: 36px;
  height: 1.5px;
  background: linear-gradient(90deg, transparent, #a31c2e, transparent);
  margin: 0 0 0.9rem;
}

/* Items */
.ct-items {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.ct-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  transition: opacity 0.2s;
}
.ct-item:hover { opacity: 0.7; }

.ct-icon {
  font-size: 0.85rem;
  flex-shrink: 0;
  width: 26px;
  height: 26px;
  background: rgba(163,28,46,0.08);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ct-item-info {
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.ct-item-label {
  font-size: 0.76rem;
  font-weight: 600;
  color: var(--c-text);
  font-family: var(--f-serif);
  line-height: 1;
}
.ct-item-val {
  font-size: 0.7rem;
  color: #a31c2e;
  font-family: var(--f-serif);
  letter-spacing: 0.03em;
  line-height: 1;
}

/* ── Graduation banner ─────────────────────────────────────── */
.grad-banner {
  width: calc(100% + 3rem);
  margin-left: -1.5rem;
  margin-right: -1.5rem;
  margin-top: 0;
  margin-bottom: -1.5rem;
  background: #a31c2e;
  padding: 1.2rem 1.5rem;
  text-align: center;
  border-radius: 0 0 4px 4px;
}
.grad-banner-text {
  font-size: clamp(1rem, 4vw, 1.5rem);
  font-weight: 500;
  color: #ffffff;
  letter-spacing: 0.18em;
  text-transform: uppercase;  
  line-height: 1;
}

/* ── Section divider ───────────────────────────────────────── */
.section-divider {
  width: 40px;
  height: 1px;
  background: var(--c-silver-light);
  margin: 0 auto 1.5rem;
}

/* ── Guestbook ─────────────────────────────────────────────── */
.guestbook {
  width: 100%;
  max-width: 480px;
  padding: 0 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.gb-input-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.gb-name {
  border: none;
  border-bottom: 1px solid var(--c-silver-light);
  padding: 0.4rem 0;
  font-size: 0.88rem;
  color: var(--c-text);
  background: transparent;
  outline: none;
  font-family: var(--f-serif);
  letter-spacing: 0.03em;
}
.gb-name::placeholder { color: var(--c-text-light); }

.gb-textarea {
  width: 100%;
  border: 1px solid var(--c-silver-light);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-size: 0.92rem;
  font-family: var(--f-serif);
  color: var(--c-text);
  background: #fdf8f8;
  outline: none;
  resize: none;
  line-height: 1.7;
  transition: border-color 0.2s;
}
.gb-textarea:focus { border-color: #a31c2e; }
.gb-textarea::placeholder { color: var(--c-text-light); font-style: italic; }

.gb-submit {
  align-self: flex-end;
  background: none;
  border: 1px solid var(--c-silver-light);
  border-radius: 20px;
  padding: 0.45rem 1.5rem;
  font-size: 0.82rem;
  letter-spacing: 0.06em;
  color: var(--c-text-mid);
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
  font-family: var(--f-serif);
}
.gb-submit:hover:not(:disabled) {
  background: var(--c-silver);
  color: #fff;
  border-color: var(--c-silver);
}
.gb-submit:disabled { opacity: 0.4; cursor: default; }

/* Entry list */
.gb-list {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}
.gb-entry {
  background: #fdf8f8;
  border-left: 2px solid #a31c2e;
  padding: 0.6rem 0.9rem;
  border-radius: 0 6px 6px 0;
}
.gb-entry-name {
  font-size: 1.1rem;
  color: var(--c-text);
  line-height: 1.2;
  margin-bottom: 0.2rem;
}
.gb-entry-msg {
  font-size: 0.88rem;
  color: var(--c-text-mid);
  line-height: 1.6;
  font-style: italic;
}
.gb-entry-time {
  font-size: 0.72rem;
  color: var(--c-text-light);
  margin-top: 0.3rem;
  letter-spacing: 0.03em;
}
.gb-empty {
  text-align: center;
  font-size: 0.88rem;
  color: var(--c-text-light);
  font-style: italic;
  padding: 1rem 0;
}

/* ── Pagination ─────────────────────────────────────────────── */
.gb-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 0.8rem;
}
.pg-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid var(--c-silver-light);
  background: none;
  font-size: 1.2rem;
  color: var(--c-text-mid);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}
.pg-btn:hover:not(:disabled) {
  background: #a31c2e;
  color: #fff;
  border-color: #a31c2e;
}
.pg-btn:disabled { opacity: 0.3; cursor: default; }
.pg-info {
  font-size: 0.82rem;
  color: var(--c-text-light);
  letter-spacing: 0.06em;
  font-family: var(--f-serif);
}
.gb-list-enter-active { transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
.gb-list-enter-from   { opacity: 0; transform: translateY(-12px) scale(0.97); }
</style>
