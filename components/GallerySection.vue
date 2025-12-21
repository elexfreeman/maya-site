<template>
    <section id="gallery" class="gallery">
        <div class="container">
            <div class="section-header">
                <h2>Магазин картин</h2>
                <div class="section-divider"></div>
                <p>
                    Оригиналы в наличии. Выберите картину и напишите мне для
                    покупки.
                </p>
            </div>
            <div class="gallery-grid">
                <NuxtLink
                    v-for="p in products"
                    :key="p.id"
                    class="gallery-item"
                    :to="`/product/${p.uri}`"
                >
                    <div
                        class="placeholder-image gallery-placeholder"
                        :style="{ backgroundImage: `url('${p.img}')` }"
                    ></div>
                    <div class="service-content">
                        <h3>{{ p.caption }}</h3>
                        <p>{{ p.description }}</p>
                        <div class="service-benefits"></div>
                        <div class="contact-actions">
                            <span class="cta-button">Смотреть</span>
                        </div>
                    </div>
                </NuxtLink>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
type Product = {
    id: number;
    caption: string;
    description: string;
    img: string;
    tagsList: string[];
    uri: string;
};
const { data } = await useAsyncData("products", () => $fetch("/api/products"));
const products = computed<Product[]>(() => data.value?.items || []);
</script>
