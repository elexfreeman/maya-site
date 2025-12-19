<template>
  <section id="services" class="services">
    <div class="container">
      <div class="section-header">
        <h2>Услуги и форматы</h2>
        <div class="section-divider"></div>
      </div>
      <div class="services-grid">
        <div v-for="item in items" :key="item.id" class="service-card">
          <div class="service-image">
            <div
              class="placeholder-image service-placeholder"
              :style="{ backgroundImage: `url(${item.img || '/img/IMG_8886.jpg'})` }"
            >
              <span>{{ item.caption }}</span>
            </div>
          </div>
          <div class="service-content">
            <h3>{{ item.caption }}</h3>
            <p>{{ item.description }}</p>
            <div class="service-benefits">
              <span v-for="(tag, i) in (item.tagsList || [])" :key="i">• {{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
type Service = {
  id: number;
  caption: string;
  description: string;
  tags: string | null;
  tagsList: string[];
	img: string;
}

const placeholder: Service[] = [
  {
    id: 1,
    caption: 'Ботанические иллюстрации',
    description: 'Цветы, травы и веточки в акварели. Лёгкие композиции для интерьера и подарков.',
    img: '/services/botanic.jpg',
    tags: 'Оригиналы и принты, Натуральные оттенки, Индивидуальные сюжеты',
    tagsList: ['Оригиналы и принты', 'Натуральные оттенки', 'Индивидуальные сюжеты']
  },
  {
    id: 2,
    caption: 'Пейзажи',
    description: 'Спокойные акварельные виды: море, горы, закаты. Лёгкая цветовая гамма для домашнего уюта.',
    img: '/img/IMG_8886.jpg',
    tags: 'Бумага 100% хлопок, Паспарту по желанию, Доставка по всей России',
    tagsList: ['Бумага 100% хлопок', 'Паспарту по желанию', 'Доставка по всей России']
  },
  {
    id: 3,
    caption: 'Принты и открытки',
    description: 'Печать моих работ на плотной дизайнерской бумаге. Небольшие форматы — для приятных поводов.',
    img: '/img/IMG_8886.jpg',
    tags: 'Качественная печать, Подарочная упаковка, Доступные цены',
    tagsList: ['Качественная печать', 'Подарочная упаковка', 'Доступные цены']
  },
  {
    id: 4,
    caption: 'Пастель',
    description: 'Тёплые и мягкие пастельные работы: портреты, натюрморты и уютные сюжеты для интерьера.',
    img: '/img/IMG_8886.jpg',
    tags: 'Нежные оттенки, Эффект мягкости, Индивидуальные заказы',
    tagsList: ['Нежные оттенки', 'Эффект мягкости', 'Индивидуальные заказы']
  }
]

const { data, error } = await useFetch<{ items: Service[] }>('/api/services')
const pastel: Service = {
  id: 9999,
  caption: 'Пастель',
  description: 'Тёплые и мягкие пастельные работы: портреты, натюрморты и уютные сюжеты для интерьера.',
  img: '/img/IMG_8886.jpg',
  tags: 'Нежные оттенки, Эффект мягкости, Индивидуальные заказы',
  tagsList: ['Нежные оттенки', 'Эффект мягкости', 'Индивидуальные заказы']
}

const items = computed<Service[]>(() => {
  const base = (data.value?.items?.length ? data.value.items : placeholder) as Service[]
  const hasPastel = base.some(i => i.caption && i.caption.toLowerCase() === 'пастель')
  return hasPastel ? base : [...base, pastel]
})
</script>
