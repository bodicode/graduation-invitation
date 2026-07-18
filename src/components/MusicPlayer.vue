<template>
  <div class="music-card" :class="{ 'is-playing': isPlaying, 'is-collapsed': collapsed }">
    <!-- Pulse rings khi đang phát -->
    <div class="pulse-ring ring-1" v-show="isPlaying"></div>
    <div class="pulse-ring ring-2" v-show="isPlaying"></div>

    <!-- Card body -->
    <div class="card-body">
      <!-- Disk -->
      <button class="disk-btn" @click="toggle" :aria-label="isPlaying ? 'Tắt nhạc' : 'Bật nhạc'">
        <div class="disk" :class="{ 'is-spinning': isPlaying }">
          <div class="disk-hole"></div>
        </div>
      </button>

      <!-- Info — ẩn khi collapsed -->
      <div class="track-info">
        <p class="track-title text-script">Vỗ Tay</p>
        <div class="bars" v-show="isPlaying">
          <span class="b b1"></span>
          <span class="b b2"></span>
          <span class="b b3"></span>
          <span class="b b4"></span>
          <span class="b b5"></span>
        </div>
        <p class="track-status text-serif" v-show="!isPlaying">♪ nhấn để phát</p>
      </div>
    </div>

    <audio ref="audioEl" src="/music/VỖ TAY.mp3" loop preload="auto" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const audioEl   = ref(null)
const isPlaying = ref(false)
const collapsed = ref(false)

let collapseTimer = null

const play = async () => {
  try {
    await audioEl.value.play()
    isPlaying.value = true
  } catch {
    isPlaying.value = false
  }
}
const pause = () => {
  audioEl.value.pause()
  isPlaying.value = false
}
const toggle = () => { isPlaying.value ? pause() : play() }

defineExpose({ play })

onMounted(() => {
  audioEl.value.volume = 0.6
  // Thu vào sau 10s
  collapseTimer = setTimeout(() => { collapsed.value = true }, 10000)
})
</script>

<style scoped>
/* ── Card wrapper ───────────────────────────────────────────── */
.music-card {
  position: fixed;
  bottom: 5rem;
  right: 1.2rem;
  z-index: 500;
  animation: cardSlideIn 0.6s 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}
@keyframes cardSlideIn {
  from { opacity: 0; transform: translateX(80px) scale(0.8); }
  to   { opacity: 1; transform: translateX(0)    scale(1);   }
}

/* ── Pulse rings ────────────────────────────────────────────── */
.pulse-ring {
  position: absolute;
  inset: -6px;
  border-radius: 20px;
  border: 1.5px solid rgba(163, 28, 46, 0.4);
  animation: pulseRing 2s ease-out infinite;
  pointer-events: none;
}
.ring-2 {
  inset: -12px;
  border-radius: 24px;
  border-color: rgba(163, 28, 46, 0.2);
  animation-delay: 0.6s;
}
@keyframes pulseRing {
  0%   { opacity: 0.8; transform: scale(1);    }
  100% { opacity: 0;   transform: scale(1.06); }
}

/* ── Card body ──────────────────────────────────────────────── */
.card-body {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 248, 248, 0.92);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(163, 28, 46, 0.2);
  border-radius: 16px;
  padding: 8px 14px 8px 8px;
  box-shadow:
    0 4px 20px rgba(122, 0, 24, 0.15),
    0 1px 4px  rgba(0,0,0,0.08);
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1),
              padding 0.5s ease,
              box-shadow 0.3s;
  position: relative;
  z-index: 1;
  overflow: hidden;
  width: 180px;
}
.music-card.is-playing .card-body {
  box-shadow:
    0 6px 28px rgba(122, 0, 24, 0.25),
    0 1px 4px  rgba(0,0,0,0.08);
}

/* ── Disk button ────────────────────────────────────────────── */
.disk-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  padding: 0;
  cursor: pointer;
  background: none;
  flex-shrink: 0;
}

.disk {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: conic-gradient(
    #7a0018 0deg, #a31c2e 60deg, #c0404a 120deg,
    #7a0018 180deg, #a31c2e 240deg, #c0404a 300deg, #7a0018 360deg
  );
  box-shadow:
    0 3px 12px rgba(122,0,24,0.4),
    inset 0 0 0 3px rgba(0,0,0,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: box-shadow 0.3s;
}
.disk.is-spinning {
  animation: spinDisk 3s linear infinite;
}
@keyframes spinDisk {
  to { transform: rotate(360deg); }
}

.disk-hole {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #fff8f8;
  border: 1.5px solid rgba(122,0,24,0.3);
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.2);
}

/* ── Track info ─────────────────────────────────────────────── */
.track-info {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 80px;
  overflow: hidden;
  max-width: 120px;
  transition: max-width 0.5s cubic-bezier(0.4, 0, 0.2, 1),
              opacity    0.4s ease,
              margin     0.5s ease;
}
/* Thu vào sau 10s */
.is-collapsed .track-info {
  max-width: 0;
  opacity: 0;
  margin: 0;
  pointer-events: none;
}
/* Hover mở lại */
.is-collapsed:hover .track-info {
  max-width: 120px;
  opacity: 1;
  pointer-events: auto;
}
/* Card body thu nhỏ */
.is-collapsed .card-body {
  width: 56px;
  padding: 8px;
}
.is-collapsed:hover .card-body {
  width: 180px;
  padding: 8px 14px 8px 8px;
}
.track-title {
  font-size: 1rem;
  color: #7a0018;
  line-height: 1;
  white-space: nowrap;
}
.track-status {
  font-size: 0.6rem;
  color: #b06060;
  letter-spacing: 0.04em;
  line-height: 1;
}

/* ── Wave bars ──────────────────────────────────────────────── */
.bars {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 14px;
}
.b {
  width: 3px;
  border-radius: 2px;
  background: #a31c2e;
  animation: barWave 0.8s ease-in-out infinite alternate;
}
.b1 { height: 6px;  animation-duration: 0.65s; animation-delay: 0s;    }
.b2 { height: 12px; animation-duration: 0.85s; animation-delay: 0.1s;  }
.b3 { height: 8px;  animation-duration: 0.55s; animation-delay: 0.2s;  }
.b4 { height: 10px; animation-duration: 0.75s; animation-delay: 0.05s; }
.b5 { height: 5px;  animation-duration: 0.9s;  animation-delay: 0.15s; }

@keyframes barWave {
  from { transform: scaleY(0.25); opacity: 0.5; }
  to   { transform: scaleY(1);    opacity: 1;   }
}
</style>
