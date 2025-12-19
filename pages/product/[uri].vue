<template>
  <div>
    <NavBar />
    <section class="product-page">
      <div class="container" v-if="data && !error">
        <div class="section-header">
          <h2>{{ data.caption }}</h2>
          <div class="section-divider"></div>
          <p>{{ data.description }}</p>
        </div>
        <div class="product-layout">
          <div class="product-media" :style="{ backgroundImage: `url('${data.img}')` }" role="img" :aria-label="data.caption"></div>
          <div class="product-meta">
            <div class="service-benefits" v-if="data.tagsList?.length">
              <span v-for="t in data.tagsList" :key="t">• {{ t }}</span>
            </div>
            <div class="contact-actions">
              <a class="cta-button Telegram-button" :href="waLink" target="_blank" rel="noopener noreferrer">
                Купить в Telegram
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="container" v-else>
        <div class="section-header">
          <h2>Товар не найден</h2>
          <div class="section-divider"></div>
          <p>Проверьте ссылку или вернитесь в магазин.</p>
        </div>
      </div>
    </section>
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import NavBar from '~/components/NavBar.vue'
import SiteFooter from '~/components/SiteFooter.vue'

const route = useRoute()
const uri = route.params.uri as string

const { data, error } = await useAsyncData('product', () => $fetch(`/api/products/by-uri/${encodeURIComponent(uri)}`))

const waText = computed(() => `Здравствуйте! Интересует картина “${data.value?.caption || ''}” (${data.value?.description || ''})`)
const waLink = computed(() => `https://t.me/angeludachi_bot?text=${encodeURIComponent(waText.value)}`)

useHead({ title: () => (data.value ? `${data.value.caption} — Maya Art` : 'Товар — Maya Art') })
</script>

<style scoped>
.product-page { background: var(--white); padding-top: 80px; }
.product-layout { display: grid; gap: 40px; align-items: start; }
.product-media { width: 100%; aspect-ratio: 4/5; border-radius: 15px; background-size: cover; background-position: center; box-shadow: 0 10px 30px var(--shadow); }
.product-meta { display: flex; flex-direction: column; gap: 20px; }
@media (max-width: 768px) {
  .product-layout { grid-template-columns: 1fr; }
}
</style>

