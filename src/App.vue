<script setup>
import { ref, nextTick } from 'vue'
import confetti from 'canvas-confetti'
import EnvelopeWelcome from './components/EnvelopeWelcome.vue'
import HeroSection     from './components/HeroSection.vue'
import EventDetails    from './components/EventDetails.vue'
import RSVPSection     from './components/RSVPSection.vue'
import FloatingPetals  from './components/FloatingPetals.vue'
import MusicPlayer     from './components/MusicPlayer.vue'

const contentVisible = ref(false)
const musicPlayer    = ref(null)

const onEnvelopeOpened = async () => {
  contentVisible.value = true
  window.scrollTo({ top: 0 })

  await nextTick()
  setupScrollObserver()

  // Auto-play nhạc khi thiệp mở
  setTimeout(() => musicPlayer.value?.play(), 400)

  // Pháo rơi ngay khi vào thiệp
  startContinuousConfetti()
}

const setupScrollObserver = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.12 })

  document.querySelectorAll(
    '.animate-fade-in, .animate-fade-in-up, .animate-fade-in-down, ' +
    '.animate-slide-left, .animate-slide-right, .animate-scale-in, .animate-blur-in'
  ).forEach((el) => observer.observe(el))
}

// Pháo rớt liên tục khi lướt
const startContinuousConfetti = () => {
  // Burst nhẹ lúc đầu trong 3s
  const burstEnd = Date.now() + 3000
  const burstFrame = () => {
    confetti({
      particleCount: 4,
      angle: 90,
      spread: 160,
      origin: { x: Math.random(), y: -0.05 },
      colors: ['#a31c2e', '#7a0018', '#c8961e', '#ffffff', '#ff6b8a', '#ffd700'],
      gravity: 0.4,
      scalar: 1.0,
      drift: (Math.random() - 0.5) * 0.6,
      ticks: 600,
    })
    if (Date.now() < burstEnd) setTimeout(burstFrame, 400)
    else startSlowConfetti()
  }
  burstFrame()
}

// Rơi thưa liên tục sau burst
const startSlowConfetti = () => {
  setInterval(() => {
    if (document.hidden) return
    confetti({
      particleCount: 2,
      angle: 90,
      spread: 130,
      origin: { x: Math.random(), y: -0.05 },
      colors: ['#a31c2e', '#7a0018', '#c8961e', '#ffffff', '#ff6b8a', '#ffd700'],
      gravity: 0.4,
      scalar: 1.0,
      drift: (Math.random() - 0.5) * 0.6,
      ticks: 600,
    })
  }, 1200)
}
</script>

<template>
  <!-- Bông hoa rơi liên tục toàn trang -->
  <FloatingPetals />

  <!-- Music player cố định góc phải -->
  <MusicPlayer ref="musicPlayer" />

  <!-- Overlay sits on top via position:fixed inside the component -->
  <EnvelopeWelcome @opened="onEnvelopeOpened" />

  <!-- Main content — fades in underneath while overlay zooms out -->
  <main class="page" :class="{ 'is-visible': contentVisible }">
    <div class="card-stack">
      <HeroSection     v-if="contentVisible" />
      <EventDetails    v-if="contentVisible" />
      <RSVPSection  v-if="contentVisible" />
    </div>
  </main>
</template>

<style scoped>
/* ── Page ─────────────────────────────────────────────────── */
.page {
  min-height: 100vh;
  background: var(--c-bg);
  display: flex;
  justify-content: center;
  padding: 2rem 1rem 0;
  /* start invisible — overlay zooms out while this fades in */
  opacity: 0;
  transition: opacity 0.8s 0.6s ease-in;
}
.page.is-visible { opacity: 1; }

/* ── Card column ──────────────────────────────────────────── */
.card-stack {
  width: 100%;
  max-width: 740px;
  display: flex;
  flex-direction: column;
  box-shadow:
    0 2px 8px  rgba(0,0,0,0.06),
    0 8px 32px rgba(0,0,0,0.10);
  border-radius: 4px;
}
</style>
