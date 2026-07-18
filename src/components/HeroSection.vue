<template>
  <section class="hero">

    <!-- ── GRADUATE watermark title ── -->
    <div class="watermark-wrap animate-blur-in">
      <h1 class="watermark text-serif">LỄ TỐT NGHIỆP</h1>
    </div>

    <!-- ── Photo ── -->
    <div class="photo-wrap animate-scale-in delay-150">
      <div class="photo-frame">
        <img src="/images/IMG_5425.JPG" alt="Graduation photo" class="photo-img" />
      </div>
    </div>

    <!-- ── Name block ── -->
    <div class="name-block animate-fade-in-up delay-200">
      <p class="name-script text-script">Nguyễn Ngọc Thùy Linh</p>
    </div>

    <!-- ── Join us line ── -->
    <div class="join-block animate-fade-in-up delay-300">
      <p class="join-text text-serif">Thân mời bạn đến dự</p>
      <p class="join-sub text-serif">Lễ Tốt Nghiệp</p>
      <div class="divider animate-scale-in delay-400"></div>
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
  color: #e8b0b8;
  text-transform: uppercase;
  line-height: 1;
  white-space: nowrap;
}

/* ── Photo ─────────────────────────────────────────────────── */
.photo-wrap {
  position: relative;
  z-index: 1;
}

.photo-frame {
  width: 200px;
  height: 264px;
  border-radius: 3px;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(80,0,20,0.18), 0 4px 12px rgba(80,0,20,0.10);
}
.photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
}

/* ── Name block ────────────────────────────────────────────── */
.name-block {
  text-align: center;
  margin-top: 1.6rem;
}
.name-script {
  font-size: clamp(1.7rem, 9vw, 2.8rem);
  color: var(--c-text);
  line-height: 1;
  letter-spacing: 0.5px;
  white-space: nowrap;
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
