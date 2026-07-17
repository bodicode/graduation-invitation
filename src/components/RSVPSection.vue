<template>
  <section class="rsvp-section">

    <!-- ── Polaroid gallery – 3 ảnh căn giữa ── -->
    <div class="gallery">
      <div class="pol pol--left">
        <img src="/images/IMG_1930.jpg" alt="Ký ức tốt nghiệp" class="pol-img" />
      </div>
      <div class="pol pol--center">
        <img src="/images/IMG_5744.JPG" alt="Ảnh tốt nghiệp" class="pol-img pol-img--tall" />
        <!-- Sparkle decorations on centre photo -->
        <span class="sparkle sp-1">✦</span>
        <span class="sparkle sp-2">✦</span>
        <span class="sparkle sp-3">✧</span>
      </div>
      <div class="pol pol--right">
        <img src="/images/IMG_5745.PNG" alt="Chúc mừng" class="pol-img" />
      </div>

      <!-- Floating petals / confetti around gallery -->
      <span class="petal p-1">🌸</span>
      <span class="petal p-2">🌸</span>
      <span class="petal p-3">⭐</span>
      <span class="petal p-4">🌸</span>
      <span class="petal p-5">✨</span>
    </div>

    <!-- ── Script quote ── -->
    <div class="chapter-block animate-fade-in-up delay-100">
      <p class="chapter-text text-script">Một chương mới bắt đầu...</p>
    </div>

    <!-- ── Thin divider ── -->
    <div class="divider animate-fade-in delay-200"></div>

    <!-- ── XÁC NHẬN block ── -->
    <div class="rsvp-block animate-fade-in-up delay-200">
      <p class="rsvp-label text-serif">XÁC NHẬN THAM DỰ</p>
      <p class="rsvp-by text-script">trước Tháng 7, 2026</p>
    </div>

    <!-- ── Nút nhắn tin ── -->
    <a
      href="https://m.me/NguyenNgocThuyLinh"
      target="_blank"
      rel="noopener noreferrer"
      class="rsvp-btn text-serif animate-fade-in-up delay-300"
    >
      NHẮN TIN XÁC NHẬN
    </a>

    <!-- ── Trang phục ── -->
    <div class="attire-block animate-fade-in-up delay-400">
      <p class="attire-label text-serif">TRANG PHỤC</p>
      <p class="attire-note text-serif">Trang trọng</p>
    </div>

    <!-- ── Liên hệ ── -->
    <div class="contact-block animate-fade-in-up delay-500">
      <div class="divider"></div>
      <p class="contact-heading text-serif">LIÊN HỆ</p>
      <a href="tel:0773997188" class="contact-row text-serif">
        <span class="contact-name">Chị Như</span>
        <span class="contact-sep">·</span>
        <span class="contact-value">0773 997 188</span>
      </a>
      <a
        href="https://m.me/NguyenNgocThuyLinh"
        class="contact-row text-serif"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span class="contact-name">Nguyễn Ngọc Thùy Linh</span>
        <span class="contact-sep">·</span>
        <span class="contact-value">Messenger</span>
      </a>
    </div>

    <div class="bottom-pad"></div>
  </section>
</template>

<style scoped>
/* ── Section ───────────────────────────────────────────────── */
.rsvp-section {
  background: var(--c-card);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1.5rem;
}

/* ── Polaroid gallery ──────────────────────────────────────── */
.gallery {
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 0;
  padding: 2rem 0.5rem 1.2rem;
  position: relative;
  /* animate whole group in */
  animation: galleryReveal 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}
@keyframes galleryReveal {
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0);    }
}

.pol {
  background: #fff;
  padding: 6px 6px 26px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  position: relative;
  flex-shrink: 0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.pol:hover {
  box-shadow: 0 12px 32px rgba(0,0,0,0.22);
}

.pol-img {
  width: 100%;
  height: 140px;
  object-fit: cover;
  object-position: top center;
  display: block;
}
.pol-img--tall {
  height: 200px;
}

/* Left — rotate CCW, overlap */
.pol--left {
  width: 170px;
  transform: rotate(-5deg) translateX(12px);
  z-index: 1;
  animation: slideInLeft 0.7s 0.1s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}
.pol--left:hover { transform: rotate(-2deg) translateX(12px) scale(1.04); }

/* Centre — upright, largest, comes up last */
.pol--center {
  width: 195px;
  transform: rotate(0deg);
  z-index: 3;
  box-shadow: 0 8px 24px rgba(0,0,0,0.18);
  animation: slideInUp 0.7s 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}
.pol--center:hover { transform: scale(1.06); }

/* Right — rotate CW, overlap */
.pol--right {
  width: 170px;
  transform: rotate(5deg) translateX(-12px);
  z-index: 1;
  animation: slideInRight 0.7s 0.1s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}
.pol--right:hover { transform: rotate(2deg) translateX(-12px) scale(1.04); }

@keyframes slideInLeft {
  from { opacity: 0; transform: rotate(-12deg) translateX(-30px); }
  to   { opacity: 1; transform: rotate(-5deg) translateX(12px);   }
}
@keyframes slideInRight {
  from { opacity: 0; transform: rotate(12deg) translateX(30px);  }
  to   { opacity: 1; transform: rotate(5deg) translateX(-12px);  }
}
@keyframes slideInUp {
  from { opacity: 0; transform: translateY(40px) scale(0.9); }
  to   { opacity: 1; transform: translateY(0)    scale(1);   }
}

/* ── Sparkles on centre photo ──────────────────────────────── */
.sparkle {
  position: absolute;
  font-size: 0.75rem;
  color: #c8961e;
  pointer-events: none;
  animation: twinkle 2s ease-in-out infinite;
}
.sp-1 { top: -10px; right: -10px; animation-delay: 0s;    font-size: 1rem; }
.sp-2 { top:   6px; right: -14px; animation-delay: 0.6s;  font-size: 0.6rem; }
.sp-3 { top: -14px; right:  10px; animation-delay: 1.1s;  font-size: 0.55rem; }
@keyframes twinkle {
  0%, 100% { opacity: 1; transform: scale(1)   rotate(0deg);   }
  50%       { opacity: 0.3; transform: scale(0.6) rotate(30deg); }
}

/* ── Floating petals around gallery ────────────────────────── */
.petal {
  position: absolute;
  pointer-events: none;
  font-size: 1rem;
  opacity: 0.75;
  animation: floatPetal 4s ease-in-out infinite;
}
.p-1 { top: 8px;  left: 4%;  font-size: 0.9rem; animation-delay: 0s;    animation-duration: 3.8s; }
.p-2 { top: 40px; left: 8%;  font-size: 0.7rem; animation-delay: 1.2s;  animation-duration: 4.5s; }
.p-3 { top: 10px; right: 5%; font-size: 0.85rem; animation-delay: 0.5s; animation-duration: 3.5s; }
.p-4 { top: 55px; right: 6%; font-size: 0.65rem; animation-delay: 2s;   animation-duration: 5s;   }
.p-5 { top: 25px; left: 50%; font-size: 0.7rem;  animation-delay: 1.8s; animation-duration: 4.2s; }
@keyframes floatPetal {
  0%, 100% { transform: translateY(0)   rotate(0deg);   opacity: 0.75; }
  33%       { transform: translateY(-8px) rotate(15deg);  opacity: 0.9;  }
  66%       { transform: translateY(4px)  rotate(-10deg); opacity: 0.6;  }
}

/* ── Script quote ──────────────────────────────────────────── */
.chapter-block {
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
}
.chapter-text {
  font-size: 2rem;
  color: var(--c-text);
  line-height: 1.3;
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
}
.rsvp-label {
  font-size: 0.72rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--c-text-light);
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
  font-size: 0.74rem;
  letter-spacing: 0.2em;
  color: var(--c-text-mid);
  text-decoration: none;
  text-transform: uppercase;
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
  letter-spacing: 0.12em;
  color: var(--c-text-mid);
  text-transform: uppercase;
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
  font-size: 0.68rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--c-text-light);
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
.bottom-pad { height: 3rem; }
</style>
