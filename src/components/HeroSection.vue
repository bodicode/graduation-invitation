<template>
  <section class="hero">

    <!-- ── GRADUATE watermark title ── -->
    <div class="watermark-wrap animate-fade-in">
      <h1 class="watermark text-serif">LỄ TỐT NGHIỆP</h1>
    </div>

    <!-- ── Oval photo frame with ribbon bow ── -->
    <div class="oval-wrap animate-fade-in delay-100">
      <!-- Silver ribbon loops (pure CSS) -->
      <div class="ribbon ribbon--left"></div>
      <div class="ribbon ribbon--right"></div>

      <!-- Oval photo mask -->
      <div class="oval-frame">
        <img src="/images/IMG_1930.jpg" alt="Graduation photo" class="oval-img" />
        <!-- Oval border ring -->
        <div class="oval-ring"></div>
      </div>

      <!-- Bow at the bottom of ribbons -->
      <div class="bow">
        <div class="bow-left"></div>
        <div class="bow-knot"></div>
        <div class="bow-right"></div>
      </div>
    </div>

    <!-- ── Name block ── -->
    <div class="name-block animate-fade-in-up delay-200">
      <p class="name-script text-script">Nguyễn Ngọc Thùy Linh</p>
    </div>

    <!-- ── Join us line ── -->
    <div class="join-block animate-fade-in-up delay-300">
      <div class="divider"></div>
      <p class="join-text text-serif">Thân mời bạn đến dự</p>
      <p class="join-sub text-serif">Lễ Tốt Nghiệp</p>
      <div class="divider"></div>
    </div>

  </section>
</template>

<style scoped>
/* ── Section ───────────────────────────────────────────────── */
.hero {
  background: var(--c-card);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem 2.5rem;
  position: relative;
  overflow: hidden;
}

/* ── GRADUATE watermark ────────────────────────────────────── */
.watermark-wrap {
  width: 100%;
  text-align: center;
  overflow: hidden;
  padding-top: 2.2rem;
  margin-bottom: 0.8rem;
  position: relative;
  z-index: 0;
}
.watermark {
  font-size: clamp(1.8rem, 8.5vw, 5rem);
  font-weight: 300;
  letter-spacing: 0.08em;
  color: transparent;
  -webkit-text-stroke: 1px #e8b0b8;
  text-transform: uppercase;
  line-height: 1;
  white-space: nowrap;
}

/* ── Oval frame ────────────────────────────────────────────── */
.oval-wrap {
  position: relative;
  width: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
}

.oval-frame {
  position: relative;
  width: 200px;
  height: 256px;
  border-radius: 50% / 50%;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0,0,0,0.14);
}
.oval-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
}

/* Outer decorative ring overlay */
.oval-ring {
  position: absolute;
  inset: -3px;
  border-radius: 50% / 50%;
  border: 2.5px solid rgba(139,0,30,0.4);
  pointer-events: none;
}

/* ── Silver ribbon (two curved lines from top corners) ─────── */
.ribbon {
  position: absolute;
  top: 10px;
  width: 90px;
  height: 200px;
  border: 2px solid transparent;
  border-radius: 50%;
  pointer-events: none;
}
.ribbon--left {
  left: -60px;
  border-right-color: var(--c-silver-light);
  transform: rotate(-18deg);
}
.ribbon--right {
  right: -60px;
  border-left-color: var(--c-silver-light);
  transform: rotate(18deg);
}

/* ── Bow ───────────────────────────────────────────────────── */
.bow {
  display: flex;
  align-items: center;
  gap: 2px;
  margin-top: -2px;
  position: relative;
  z-index: 2;
}
.bow-left,
.bow-right {
  width: 28px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid var(--c-silver);
  background: rgba(139,0,30,0.08);
}
.bow-left  { transform: rotate(-30deg) translateX(4px);  }
.bow-right { transform: rotate(30deg)  translateX(-4px); }

.bow-knot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--c-silver);
  flex-shrink: 0;
  box-shadow: 0 1px 4px rgba(0,0,0,0.18);
}

/* ── Name block ────────────────────────────────────────────── */
.name-block {
  text-align: center;
  margin-top: 1.6rem;
}
.name-script {
  font-size: 2.8rem;
  color: var(--c-text);
  line-height: 1;
  letter-spacing: 0.5px;
}
.name-caps {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.3em;
  color: var(--c-text-mid);
  text-transform: uppercase;
  margin-top: 0.4rem;
}

/* ── Join us block ─────────────────────────────────────────── */
.join-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.8rem;
  width: 100%;
}
.join-text {
  font-size: 1.15rem;
  font-style: italic;
  font-weight: 400;
  color: var(--c-text-mid);
  letter-spacing: 0.05em;
  line-height: 1;
}
.join-sub {
  font-size: 1.15rem;
  font-style: italic;
  font-weight: 400;
  color: var(--c-text-mid);
  letter-spacing: 0.05em;
  line-height: 1;
}

.divider {
  width: 56px;
  height: 1px;
  background: var(--c-silver-light);
}
</style>
