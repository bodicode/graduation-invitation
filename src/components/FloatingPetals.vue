<template>
  <div class="petals-container" :class="{ 'is-fading': fading }" aria-hidden="true">
    <span
      v-for="p in petals"
      :key="p.id"
      class="petal"
      :style="p.style"
    >{{ p.emoji }}</span>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const EMOJIS = ['🎓', '🎓', '🎓', '🎓', '🎓', '✦', '⭐', '🎓', '🎓', '✨']

const rand = (min, max) => Math.random() * (max - min) + min

const fading = ref(false)

const petals = ref(
  Array.from({ length: 22 }, (_, i) => {
    const duration = rand(2, 5)
    const delay    = rand(0, 8)      // tất cả xuất hiện trong 8s đầu
    const size     = rand(0.8, 1.6)
    const startX   = rand(0, 100)
    const swayX    = rand(30, 80)
    const swayDir  = Math.random() > 0.5 ? 1 : -1

    return {
      id: i,
      emoji: EMOJIS[i % EMOJIS.length],
      style: {
        left:                    `${startX}%`,
        top:                     `-${rand(2, 8)}%`,
        fontSize:                `${size}rem`,
        animationDuration:       `${duration}s`,
        animationDelay:          `${delay}s`,
        '--sway':                `${swayX * swayDir}px`,
        '--rot':                 `${rand(-360, 360)}deg`,
        animationTimingFunction: 'ease-in',
        animationIterationCount: '1',       // chỉ chạy 1 lần, không lặp
        animationFillMode:       'forwards',
      }
    }
  })
)

onMounted(() => {
  // Bắt đầu fade out container lúc 8s
  setTimeout(() => { fading.value = true }, 3000)
})
</script>

<style scoped>
.petals-container {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 999;
  overflow: hidden;
  transition: opacity 2s ease;   /* 2s fade out */
}
.petals-container.is-fading {
  opacity: 0;
}

.petal {
  position: absolute;
  display: inline-block;
  opacity: 0;
  animation-name: petalFall;
  will-change: transform, opacity;
  user-select: none;
}

@keyframes petalFall {
  0% {
    opacity: 0;
    transform: translateY(-20px) translateX(0) rotate(0deg) scale(1);
  }
  8% {
    opacity: 0.9;
  }
  50% {
    opacity: 0.7;
    transform:
      translateY(100vh)
      translateX(calc(var(--sway) * 0.5))
      rotate(calc(var(--rot) * 0.5))
      scale(0.85);
  }
  100% {
    opacity: 0;
    transform:
      translateY(55vh)
      translateX(var(--sway))
      rotate(var(--rot))
      scale(0.6);
  }
}
</style>
