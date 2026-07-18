<template>
  <section class="hero">

    <!-- ── GRADUATE watermark title ── -->
    <div class="watermark-wrap animate-blur-in">
      <h1 class="watermark text-serif">LỄ TỐT NGHIỆP</h1>
    </div>

    <!-- ── Photo ── -->
    <div class="photo-wrap animate-scale-in delay-150">

      <!-- Floating deco icons -->
      <span class="deco d1">🌸</span>
      <span class="deco d2">🎓</span>
      <span class="deco d3">🌸</span>
      <span class="deco d4">⭐</span>
      <span class="deco d5">👩‍🎓</span>
      <span class="deco d6">🌸</span>

      <!-- Outer glow ring -->
      <div class="frame-glow"></div>

      <!-- Outer border -->
      <div class="frame-outer">
        <!-- Corner ornaments -->
        <div class="corner c-tl"></div>
        <div class="corner c-tr"></div>
        <div class="corner c-bl"></div>
        <div class="corner c-br"></div>

        <!-- Inner border -->
        <div class="frame-inner">
          <div class="photo-frame">
            <img src="/images/IMG_5425.JPG" alt="Graduation photo" class="photo-img" />
          </div>
        </div>
      </div>
    </div>

    <!-- ── Name block ── -->
    <div class="name-block animate-fade-in-up delay-200">
      <p class="name-script text-script">Nguyễn Ngọc Thùy Linh</p>
    </div>

    <!-- ── Join us line ── -->
    <div class="join-block animate-fade-in-up delay-300">
      <p class="join-text text-serif">Thân mời Anh/Chị/Bạn đến dự</p>
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
  border-radius: 4px 4px 0 0;
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
  font-weight: 500;
  letter-spacing: 0.08em;
  color: #a31c2e;
  text-transform: uppercase;
  line-height: 1;
  white-space: nowrap;
}

/* ── Photo ─────────────────────────────────────────────────── */
.photo-wrap {
  position: relative;
  z-index: 1;
  padding: 18px;
}

/* Glow ring phía sau khung */
.frame-glow {
  position: absolute;
  inset: 8px;
  border-radius: 6px;
  background: radial-gradient(ellipse at center, rgba(163,28,46,0.12) 0%, transparent 70%);
  animation: glowPulse 3s ease-in-out infinite;
  pointer-events: none;
  z-index: 0;
}
@keyframes glowPulse {
  0%,100% { opacity: 0.6; transform: scale(1);    }
  50%     { opacity: 1;   transform: scale(1.04); }
}

/* Viền ngoài */
.frame-outer {
  position: relative;
  padding: 8px;
  border: 1.5px solid rgba(163,28,46,0.35);
  border-radius: 6px;
  background: #fff;
  box-shadow:
    0 0 0 4px rgba(163,28,46,0.06),
    0 16px 48px rgba(80,0,20,0.18),
    0 4px 12px  rgba(80,0,20,0.10);
  animation: frameBob 4s ease-in-out infinite;
}
@keyframes frameBob {
  0%,100% { transform: translateY(0); }
  50%     { transform: translateY(-6px); }
}

/* Viền trong */
.frame-inner {
  border: 1px solid rgba(163,28,46,0.18);
  border-radius: 3px;
  padding: 3px;
}

.photo-frame {
  width: 200px;
  height: 264px;
  border-radius: 2px;
  overflow: hidden;
}
.photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
}

/* ── 4 góc hoa văn ─────────────────────────────────────────── */
.corner {
  position: absolute;
  width: 22px;
  height: 22px;
  z-index: 2;
}
.corner::before,
.corner::after {
  content: '';
  position: absolute;
  background: #a31c2e;
  border-radius: 1px;
}
.corner::before { width: 100%; height: 2px; top: 0; left: 0; }
.corner::after  { width: 2px; height: 100%; top: 0; left: 0; }

/* Chấm tròn nhỏ ở giao nhau */
.corner::before {
  box-shadow: 0 0 0 2px #fff, 0 0 0 3px rgba(163,28,46,0.3);
}

.c-tl { top: -1px;  left: -1px;  }
.c-tr { top: -1px;  right: -1px; transform: scaleX(-1); }
.c-bl { bottom: -1px; left: -1px;  transform: scaleY(-1); }
.c-br { bottom: -1px; right: -1px; transform: scale(-1);  }

/* ── Floating deco icons ───────────────────────────────────── */
.deco {
  position: absolute;
  pointer-events: none;
  z-index: 3;
  font-size: 1rem;
}
.d1 { top: 2px;  left: 2px;   font-size: 0.9rem;  animation: decoFloat 3.8s ease-in-out infinite;         animation-delay: 0s;    }
.d2 { top: 10px; right: 0px;  font-size: 0.75rem; animation: decoFloat 4.5s ease-in-out infinite;         animation-delay: 0.8s;  color: #c8961e; }
.d3 { top: 0px;  right: 4px;  font-size: 0.7rem;  animation: decoFloat 3.2s ease-in-out infinite;         animation-delay: 1.4s;  }
.d4 { bottom: 18px; left: 0px;  font-size: 0.65rem; animation: decoFloat 5s ease-in-out infinite;         animation-delay: 0.4s;  color: #c8961e; }
.d5 { bottom: 10px; right: 2px; font-size: 0.8rem;  animation: decoFloat 4.2s ease-in-out infinite;       animation-delay: 1.8s;  color: #a31c2e; }
.d6 { top: 50%;  left: -2px;  font-size: 0.6rem;  animation: decoFloat 3.6s ease-in-out infinite;         animation-delay: 2.2s;  }

@keyframes decoFloat {
  0%,100% { transform: translate(0, 0)      rotate(0deg);   opacity: 0.7; }
  30%     { transform: translate(3px, -8px) rotate(12deg);  opacity: 1;   }
  65%     { transform: translate(-2px,-5px) rotate(-8deg);  opacity: 0.8; }
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
