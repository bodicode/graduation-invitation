<template>
  <section class="countdown-section">
    <p class="countdown-label text-serif animate-fade-in-up">Lễ tốt nghiệp diễn ra sau</p>

    <div class="countdown-blocks animate-fade-in-up delay-100">
      <div class="block" v-for="unit in units" :key="unit.label">
        <div class="block-value text-serif">
          <span class="digit" :key="unit.value">{{ String(unit.value).padStart(2, '0') }}</span>
        </div>
        <p class="block-label text-serif">{{ unit.label }}</p>
      </div>
    </div>

    <p v-if="isPast" class="countdown-done text-script animate-fade-in-up delay-200">
      Hôm nay là ngày trọng đại! 🎓
    </p>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Ngày lễ tốt nghiệp: 09/08/2026 lúc 11:30
const TARGET = new Date('2026-07-19T10:30:00')

const now    = ref(new Date())
const isPast = computed(() => now.value >= TARGET)

let timer = null

const diff = computed(() => {
  const ms = TARGET - now.value
  if (ms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days:    Math.floor(ms / 86400000),
    hours:   Math.floor((ms % 86400000) / 3600000),
    minutes: Math.floor((ms % 3600000)  / 60000),
    seconds: Math.floor((ms % 60000)    / 1000),
  }
})

const units = computed(() => [
  { value: diff.value.days,    label: 'Ngày'   },
  { value: diff.value.hours,   label: 'Giờ'    },
  { value: diff.value.minutes, label: 'Phút'   },
  { value: diff.value.seconds, label: 'Giây'   },
])

onMounted(() => { timer = setInterval(() => { now.value = new Date() }, 1000) })
onUnmounted(() => clearInterval(timer))
</script>

<style scoped>
.countdown-section {
  background: var(--c-card);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1.5rem 2.5rem;
  gap: 1rem;
  border-bottom: 1px solid rgba(163,28,46,0.08);
}

.countdown-label {
  font-size: 0.8rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--c-text-light);
  font-family: var(--f-serif);
}

/* ── Blocks ─────────────────────────────────────────────────── */
.countdown-blocks {
  display: flex;
  gap: 1rem;
  align-items: flex-end;
}

.block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
}

.block-value {
  width: clamp(56px, 16vw, 80px);
  height: clamp(56px, 16vw, 80px);
  background: linear-gradient(145deg, #fff 0%, #fdf0f0 100%);
  border: 1.5px solid rgba(163,28,46,0.18);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 4px 16px rgba(163,28,46,0.1),
    inset 0 1px 0 rgba(255,255,255,0.8);
  position: relative;
  overflow: hidden;
}

/* Đường kẻ giữa kiểu flip clock */
.block-value::after {
  content: '';
  position: absolute;
  left: 0; right: 0;
  top: 50%;
  height: 1px;
  background: rgba(163,28,46,0.12);
}

.digit {
  font-size: clamp(1.6rem, 5vw, 2.4rem);
  font-weight: 600;
  color: #a31c2e;
  font-family: var(--f-serif);
  line-height: 1;
  animation: flipIn 0.3s ease;
}

@keyframes flipIn {
  from { transform: translateY(-8px); opacity: 0.4; }
  to   { transform: translateY(0);    opacity: 1;   }
}

.block-label {
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--c-text-light);
  font-family: var(--f-serif);
}

/* Dấu : ngăn cách */
.block:not(:last-child) .block-value::before {
  content: ':';
  position: absolute;
  right: -0.7rem;
  font-size: 1.4rem;
  font-weight: 700;
  color: rgba(163,28,46,0.3);
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
}

.countdown-done {
  font-size: 1.8rem;
  color: #a31c2e;
}
</style>
