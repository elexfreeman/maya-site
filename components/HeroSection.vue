<template>
  <section class="hero">
    <div class="hero-container">
      <div class="hero-content">
        <h1>Акварельные картины с душой</h1>
        <p>Нежные оттенки, живые фактуры и свет в каждом взмахе кистью. Оригиналы, принты и заказы.</p>
        <a href="#gallery" class="cta-button">Смотреть картины</a>
      </div>
      <div class="hero-image">
        <div
          class="hero-slider"
          role="region"
          aria-label="Слайдер работ"
          tabindex="0"
          ref="sliderRef"
          @mouseenter="stop"
          @mouseleave="start"
          @keydown.left.prevent="prev"
          @keydown.right.prevent="next"
          @touchstart="onTouchStart"
          @touchmove="onTouchMove"
          @touchend="onTouchEnd"
          @touchcancel="onTouchEnd"
        >
          <div class="hero-track" :class="{ 'is-dragging': isDragging }" :style="{ transform: trackTransform }">
            <div
              class="hero-slide"
              v-for="(s, i) in slides"
              :key="i"
              :style="{ backgroundImage: `url(${s.src})` }"
              role="img"
              :aria-label="s.alt"
            />
          </div>
          <button class="hero-nav hero-nav--prev" @click="prev" aria-label="Предыдущий слайд">‹</button>
          <button class="hero-nav hero-nav--next" @click="next" aria-label="Следующий слайд">›</button>
          <div class="hero-dots" role="tablist" aria-label="Пагинация слайдера">
            <button
              v-for="(s, i) in slides"
              :key="i"
              class="hero-dot"
              :class="{ 'is-active': i === currentIndex }"
              @click="goTo(i)"
              role="tab"
              :aria-selected="i === currentIndex"
              :aria-label="`Перейти к слайду ${i + 1}`"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

type Slide = { src: string; alt: string }

const slides = ref<Slide[]>([
  { src: '/img/IMG_8886.jpg', alt: 'Акварель: работа 1' },
  { src: '/img/IMG_8887.jpg', alt: 'Акварель: работа 2' },
  { src: '/img/IMG_8891.jpg', alt: 'Акварель: работа 3' }
])

const currentIndex = ref(0)
const sliderRef = ref<HTMLElement | null>(null)
const sliderWidth = ref(0)
const isDragging = ref(false)
const startX = ref(0)
const deltaX = ref(0)
const startTs = ref(0)

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % slides.value.length
}
const prev = () => {
  currentIndex.value = (currentIndex.value + slides.value.length - 1) % slides.value.length
}
const goTo = (i: number) => {
  if (i >= 0 && i < slides.value.length) currentIndex.value = i
}

let timer: number | undefined
const start = () => {
  stop()
  timer = window.setInterval(next, 5000)
}
const stop = () => {
  if (timer) {
    clearInterval(timer)
    timer = undefined
  }
}

onMounted(start)
onBeforeUnmount(stop)

const updateWidth = () => {
  sliderWidth.value = sliderRef.value?.clientWidth || 1
}
onMounted(() => {
  updateWidth()
  window.addEventListener('resize', updateWidth)
})
onBeforeUnmount(() => window.removeEventListener('resize', updateWidth))

const onTouchStart = (e: TouchEvent) => {
  if (e.touches.length !== 1) return
  isDragging.value = true
  startX.value = e.touches[0].clientX
  startTs.value = e.timeStamp
  deltaX.value = 0
  stop()
}

const onTouchMove = (e: TouchEvent) => {
  if (!isDragging.value) return
  const x = e.touches[0].clientX
  deltaX.value = x - startX.value
  // Edge resistance
  const atFirst = currentIndex.value === 0
  const atLast = currentIndex.value === slides.value.length - 1
  const limit = (sliderWidth.value || 1) * 0.35
  if ((atFirst && deltaX.value > 0) || (atLast && deltaX.value < 0)) {
    const sign = deltaX.value > 0 ? 1 : -1
    deltaX.value = sign * Math.min(Math.abs(deltaX.value) * 0.35, limit)
  }
}

const onTouchEnd = (e: TouchEvent) => {
  if (!isDragging.value) return
  const dx = deltaX.value
  const adx = Math.abs(dx)
  const duration = e.timeStamp - startTs.value
  const width = sliderWidth.value || 1
  const threshold = Math.max(40, width * 0.15)
  const isFlick = duration < 220 && adx > 28

  if (adx > threshold || isFlick) {
    if (dx < 0 && currentIndex.value < slides.value.length - 1) next()
    else if (dx > 0 && currentIndex.value > 0) prev()
  }

  isDragging.value = false
  deltaX.value = 0
  start()
}

const dragPercent = computed(() => {
  if (!isDragging.value || !sliderWidth.value) return 0
  return (deltaX.value / sliderWidth.value) * 100
})
const trackTransform = computed(() => `translateX(calc(-${currentIndex.value * 100}% + ${dragPercent.value}%))`)
</script>
