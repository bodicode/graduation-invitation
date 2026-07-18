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
      <p class="message-text text-serif">Và mình mong bạn có mặt để cùng mình lưu giữ những khoảnh khắc đáng nhớ của hành trình thanh xuân này</p>
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
        <div v-for="entry in messages" :key="entry.id" class="gb-entry">
          <p class="gb-entry-name text-script">{{ entry.name || 'Ẩn danh' }}</p>
          <p class="gb-entry-msg text-serif">{{ entry.msg }}</p>
          <p class="gb-entry-time text-serif">{{ entry.time }}</p>
        </div>
      </transition-group>

      <p v-if="messages.length === 0" class="gb-empty text-serif">
        Hãy là người đầu tiên gửi lời chúc 🌸
      </p>
    </div>
    
    <div class="section-divider animate-fade-in delay-300"></div>

    <!-- ── Trang phục ── -->
    <div class="attire-block animate-slide-right delay-400">
      <p class="note-text text-serif">TRANG PHỤC</p>
      <p class="attire-note text-serif">Freestyle (độc lạ càng thích)</p>
    </div>

    <!-- ── Liên hệ ── -->
    <div class="contact-block animate-slide-left delay-500">
      <div class="divider"></div>
      <p class="note-text text-serif">LIÊN HỆ</p>
      <a
        href="https://www.facebook.com/linhthuyngocnguyen04"
        class="contact-row text-serif"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span class="contact-name">Nguyễn Ngọc Thùy Linh</span>
        <span class="contact-sep">·</span>
        <span class="contact-value">Messenger</span>
      </a>
      <a href="tel:0773997188" class="contact-row text-serif">
        <span class="contact-name">Chị Như</span>
        <span class="contact-sep">·</span>
        <span class="contact-value">0773 997 188</span>
      </a>
       <a href="tel:0773997188" class="contact-row text-serif">
        <span class="contact-name">Nhật Hoàng</span>
        <span class="contact-sep">·</span>
        <span class="contact-value">0939023883</span>
       </a>
    </div>

    <div class="bottom-pad"></div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// ── Carousel ──────────────────────────────────────────────────
const slides = [
  { src: '/images/IMG_1930.jpg',  alt: 'Ký ức tốt nghiệp' },
  { src: '/images/IMG_5744.JPG',  alt: 'Ảnh tốt nghiệp'   },
  { src: '/images/IMG_5745.PNG',  alt: 'Chúc mừng'         },
  { src: '/images/IMG_5425.JPG',  alt: 'Chúc mừng'         },
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
  background: var(--c-card);
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

/* Dot indicators */

/* ── Script quote ──────────────────────────────────────────── */
.chapter-block {
  text-align: center;
  margin-top: 0;
  margin-bottom: 0.5rem;
  padding: 0 1rem 0;
}
.chapter-text {
  font-size: 1.2rem;
  color: #e8b0b8;
  line-height: 1.3;
  font-family: var(--f-serif);
  font-weight: 300;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.note-text {
  font-size: 2rem;
  color: #e8b0b8;
  line-height: 1.3;
  font-family: var(--f-serif);
  font-weight: 300;
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
  color: #e8b0b8;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: border-color 0.2s, color 0.2s, transform 0.2s;
  flex-shrink: 0;
}
.refresh-btn:hover {
  border-color: #e8b0b8;
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
  font-weight: 300;
  color: #e8b0b8;
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
  font-weight: 300;
  color: #e8b0b8;
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

/* ── Bottom pad ────────────────────────────────────────────── */
.bottom-pad { height: 4rem; }

/* ── Section divider ───────────────────────────────────────── */
.section-divider {
  width: 40px;
  height: 1px;
  background: var(--c-silver-light);
  margin: 0 auto 2.5rem;
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
.gb-textarea:focus { border-color: #e8b0b8; }
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
  border-left: 2px solid #e8b0b8;
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

/* Transition animation for new entries */
.gb-list-enter-active { transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
.gb-list-enter-from   { opacity: 0; transform: translateY(-12px) scale(0.97); }
</style>
