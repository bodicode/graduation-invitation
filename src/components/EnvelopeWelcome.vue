<template>
  <!-- Fullscreen overlay — fixed on top until animation completes -->
  <div class="overlay" :class="{ 'is-opened': isOpened, 'is-exiting': isExiting, 'is-gone': isGone }">
    <div class="scene-bg"></div>

    <!-- Envelope + click zone -->
    <div class="env-wrap" :class="{ 'is-opened': isOpened }" @click="openEnvelope">
      <div class="envelope">

        <!-- Base back panel -->
        <div class="env-back"></div>

        <!-- Side / bottom flaps (static) -->
        <div class="flap flap--left"></div>
        <div class="flap flap--right"></div>
        <div class="flap flap--bottom"></div>

        <!-- Inner cards — slide up on open -->
        <div class="inner" :class="{ 'is-revealed': isOpened }">
          <div class="card card--invite">
            <div class="invite-frame">
              <p class="invite-line1 text-script">Thư mời cho những con người siêu đáng yêu</p>
            </div>
          </div>
        </div>

        <!-- Wax seal -->
        <div class="seal" :class="{ 'is-gone': isOpened }">
          <div class="seal-ring">🎓</div>
        </div>

        <div class="env-shadow"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isOpened  = ref(false)   // lid flips + cards slide up
const isExiting = ref(false)   // overlay zooms + fades
const isGone    = ref(false)   // display:none after exit
const showMusic = ref(false)
const isPlaying = ref(false)
const audioEl   = ref(null)

const emit = defineEmits(['opened'])

const openEnvelope = () => {
  if (isOpened.value) return
  isOpened.value = true

  // Music button appears after cards rise
  setTimeout(() => { showMusic.value = true }, 950)

  // Start zoom-out / fade transition — content below becomes visible
  setTimeout(() => {
    emit('opened')      // parent fades in the main content
    isExiting.value = true
  }, 1500)

  // Fully remove from stacking context
  setTimeout(() => { isGone.value = true }, 2600)
}

</script>

<style scoped>
/* ── Fullscreen overlay ───────────────────────────────────────── */
.overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 300;
  /* exit: scale up & fade — the illusion that the card "becomes" the page */
  transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1),
              opacity   0.9s 0.1s ease;
}
.overlay.is-exiting {
  transform: scale(2.4);
  opacity: 0;
  pointer-events: none;
}
.overlay.is-gone {
  display: none;
}

.scene-bg {
  position: absolute;
  inset: 0;
  background:
    url('/images/background.jpg') center/cover no-repeat,
    linear-gradient(135deg, #2a0a0a 0%, #4a0010 50%, #1a0505 100%);
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
}

/* Lớp phủ mờ để envelope nổi */
.scene-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
}

/* ── Envelope wrapper ─────────────────────────────────────────── */
.env-wrap {
  position: relative;
  cursor: pointer;
  z-index: 2;
  animation: float 3.2s ease-in-out infinite;
  perspective: 900px;
}
.env-wrap.is-opened {
  animation: none;
  cursor: default;
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-9px); }
}

/* ── Envelope body ────────────────────────────────────────────── */
.envelope {
  position: relative;
  width: 340px;
  height: 236px;
}
.env-back {
  position: absolute;
  inset: 0;
  background: #7a0018;
  border-radius: 3px;
  box-shadow: 0 24px 64px rgba(100,0,20,0.45), 0 6px 20px rgba(80,0,10,0.3);
}

/* ── Flaps ────────────────────────────────────────────────────── */
.flap { position: absolute; width: 0; height: 0; border-style: solid; }

.flap--left {
  border-width: 118px 0 118px 170px;
  border-color: transparent transparent transparent #8a0020;
  left: 0; top: 0; z-index: 2;
}
.flap--right {
  border-width: 118px 170px 118px 0;
  border-color: transparent #8a0020 transparent transparent;
  right: 0; top: 0; z-index: 2;
}
.flap--bottom {
  border-width: 0 170px 118px 170px;
  border-color: transparent transparent #6b0015 transparent;
  bottom: 0; left: 0; z-index: 3;
}
.flap--top {
  border-width: 124px 170px 0 170px;
  border-color: #960020 transparent transparent transparent;
  top: 0; left: 0;
  transform-origin: top center;
  transition: transform 0.72s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 5;
}
.flap--top.is-open {
  transform: rotateX(-180deg);
  z-index: 1;
}

/* "tap to open" */
.tap-label {
  position: absolute;
  top: -94px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.5rem;
  color: rgba(255,255,255,0.78);
  white-space: nowrap;
  pointer-events: none;
  transition: opacity 0.25s;
  letter-spacing: 0.5px;
}
.flap--top.is-open .tap-label { opacity: 0; }

/* ── Wax seal ─────────────────────────────────────────────────── */
.seal {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 70px; height: 70px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #f5d06a, #c8901e 55%, #9a6a0a);
  box-shadow: 0 5px 18px rgba(0,0,0,0.4),
              inset 0 -3px 8px rgba(0,0,0,0.28),
              inset 0 3px 8px rgba(255,220,100,0.5);
  z-index: 6;
  display: flex; align-items: center; justify-content: center;
  transition: transform 0.4s ease, opacity 0.4s ease;
}
.seal.is-gone {
  transform: translate(-50%, -50%) scale(0.5);
  opacity: 0;
}
.seal-ring {
  width: 54px; height: 54px;
  border-radius: 50%;
  border: 2px solid rgba(139,94,0,0.5);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.6rem;
  filter: drop-shadow(0 1px 2px rgba(0,0,0,0.4));
}

/* ── Inner cards ──────────────────────────────────────────────── */
.inner {
  position: absolute;
  bottom: 12px;
  left: 50%;
  width: 258px;
  height: 200px;
  display: flex;
  gap: 10px;
  align-items: flex-end;
  z-index: 2;
  clip-path: inset(100% 0 0 0);
  transform: translateX(-50%) translateY(0);
  transition:
    clip-path 0.72s 0.52s cubic-bezier(0.34, 1.56, 0.64, 1),
    transform  0.72s 0.52s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.inner.is-revealed {
  clip-path: inset(0% 0 0 0);
  transform: translateX(-50%) translateY(-108px);
}

.card { border-radius: 3px; overflow: hidden; box-shadow: 0 8px 22px rgba(0,0,0,0.32); }
.card--invite {
  width: 100%; height: 178px; background: #fff;
  display: flex; align-items: center; justify-content: center; padding: 10px;
}
.invite-frame {
  border: 1.5px solid #e8c0c0; width: 100%; height: 100%;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px;
}
.invite-line1 { font-size: 1.6rem; color: #7a0018; line-height: 1.1; text-align: center}

/* ── Drop shadow ──────────────────────────────────────────────── */
.env-shadow {
  position: absolute;
  bottom: -22px; left: 10%;
  width: 80%; height: 22px;
  background: radial-gradient(ellipse, rgba(0,0,0,0.22) 0%, transparent 72%);
  pointer-events: none;
}

/* ── Music disk ───────────────────────────────────────────────── */
.disk-btn {
  position: absolute;
  right: calc(50% - 238px);
  top:  calc(50% + 18px);
  width: 84px; height: 84px;
  border-radius: 50%;
  border: none; padding: 0; cursor: pointer;
  background: #6b0015;
  box-shadow: 0 4px 20px rgba(0,0,0,0.35);
  z-index: 10;
  display: flex; align-items: center; justify-content: center;
  opacity: 0;
  transform: scale(0.3) rotate(-45deg);
  pointer-events: none;
  transition: opacity 0.45s ease, transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.disk-btn.is-visible {
  opacity: 1;
  transform: scale(1) rotate(0deg);
  pointer-events: auto;
  animation: spin-disk 9s linear infinite;
}
.disk-btn.is-playing { box-shadow: 0 4px 20px rgba(0,0,0,0.4), 0 0 0 3px #c8901e; }
@keyframes spin-disk { to { transform: rotate(360deg); } }

.disk-face {
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px;
  animation: counter-spin 9s linear infinite;
}
.disk-btn:not(.is-visible) .disk-face { animation: none; }
@keyframes counter-spin { to { transform: rotate(-360deg); } }
.disk-label { font-size: 0.44rem; color: rgba(255,255,255,0.78); white-space: nowrap; letter-spacing: 0.5px; }
.disk-icon  { font-size: 1.1rem; line-height: 1; }
</style>
