<template>
  <div class="admin-page">
    <header class="admin-hero">
      <div class="container">
        <p class="eyebrow">Maya Art · Admin</p>
        <h1>Товары</h1>
        <p class="subtitle">Редактируйте карточки и добавляйте новые позиции в каталоге</p>
        <div class="hero-actions">
          <button class="btn ghost" type="button" @click="logout" :disabled="loggingOut">
            {{ loggingOut ? 'Выходим…' : 'Выйти' }}
          </button>
          <div v-if="bannerMessage" class="banner">{{ bannerMessage }}</div>
        </div>
      </div>
    </header>

    <main class="container admin-content">
      <section class="panel create-panel">
        <div class="panel-head">
          <div>
            <p class="eyebrow">Новый товар</p>
            <h3>Создать карточку</h3>
          </div>
        </div>
        <form class="form-grid" @submit.prevent="createProduct">
          <label>
            Название
            <input v-model="createForm.caption" type="text" placeholder="Например, Букет пионов" required />
          </label>
          <label>
            Описание
            <textarea v-model="createForm.description" rows="2" placeholder="Материалы, размеры, статус" required />
          </label>
          <label>
            URI
            <input v-model="createForm.uri" type="text" placeholder="buket-pionov" required />
            <small>Используется в ссылке: /product/&lt;uri&gt;</small>
          </label>
          <label>
            Обложка (путь)
            <input v-model="createForm.img" type="text" placeholder="/products/flowers/peony.jpg" required />
            <small>Можно вставить полный URL или путь из /public</small>
          </label>
          <label>
            Теги (через запятую)
            <input v-model="createForm.tags" type="text" placeholder="Оригинал, 2024, В наличии" />
          </label>
          <div class="actions">
            <button class="btn primary" type="submit" :disabled="creating">
              {{ creating ? 'Сохраняем…' : 'Создать' }}
            </button>
            <p v-if="createMessage" class="hint">{{ createMessage }}</p>
          </div>
        </form>
      </section>

      <section class="panel">
        <div class="panel-head">
          <div>
            <p class="eyebrow">Существующие</p>
            <h3>Карточки</h3>
          </div>
          <button class="btn ghost" type="button" @click="refreshProducts" :disabled="pending">Обновить</button>
        </div>
        <p v-if="loadError" class="error-text">Ошибка загрузки: {{ loadError }}</p>
        <p v-else-if="pending" class="muted">Загружаем список…</p>
        <p v-else-if="!editableProducts.length" class="muted">Пока нет товаров.</p>

        <div class="product-grid" v-if="editableProducts.length">
          <article v-for="product in editableProducts" :key="product.id" class="product-card">
            <header class="card-head">
              <div>
                <p class="eyebrow">#{{ product.id }}</p>
                <h4>{{ product.caption || 'Без названия' }}</h4>
              </div>
              <span class="chip">{{ product.uri || 'uri' }}</span>
            </header>
            <div class="card-body">
              <div class="cover" :style="{ backgroundImage: product.img ? `url('${product.img}')` : 'none' }">
                <span v-if="!product.img" class="cover-placeholder">Нет обложки</span>
              </div>
              <form class="form-grid" @submit.prevent="saveProduct(product)">
                <label>
                  Название
                  <input v-model="product.caption" type="text" required />
                </label>
                <label>
                  Описание
                  <textarea v-model="product.description" rows="2" required />
                </label>
                <label>
                  URI
                  <input v-model="product.uri" type="text" required />
                </label>
                <label>
                  Обложка (путь)
                  <input v-model="product.img" type="text" required />
                </label>
                <label>
                  Теги
                  <input v-model="product.tags" type="text" />
                </label>
                <div class="actions">
                  <button class="btn primary" type="submit" :disabled="isSaving(product.id)">
                    {{ isSaving(product.id) ? 'Сохраняем…' : 'Сохранить' }}
                  </button>
                </div>
              </form>
            </div>
          </article>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
definePageMeta({ middleware: 'admin-auth' })

type EditableProduct = {
  id: number
  caption: string
  description: string
  img: string
  uri: string
  tags: string
}

type CreateForm = Omit<EditableProduct, 'id'>

const bannerMessage = ref('')
const createMessage = ref('')
const creating = ref(false)
const savingMap = reactive<Record<number, boolean>>({})
const loggingOut = ref(false)

const createForm = ref<CreateForm>({
  caption: '',
  description: '',
  img: '',
  uri: '',
  tags: ''
})

const { data, pending, error, refresh } = await useFetch('/api/products')
const editableProducts = ref<EditableProduct[]>([])

useHead({ title: 'Админка — Maya Art' })

watch(
  () => data.value?.items,
  (items) => {
    if (!items || !Array.isArray(items)) {
      editableProducts.value = []
      return
    }
    editableProducts.value = items.map((item: any) => ({
      id: item.id,
      caption: item.caption || '',
      description: item.description || '',
      img: item.img || '',
      uri: item.uri || '',
      tags: item.tags || ''
    }))
  },
  { immediate: true }
)

const loadError = computed(() => {
  const val: any = error.value
  if (!val) return ''
  return val?.data?.error || val?.message || 'Не удалось загрузить товары'
})

function toPayload(product: CreateForm | EditableProduct) {
  return {
    caption: product.caption.trim(),
    description: product.description.trim(),
    img: product.img.trim(),
    uri: product.uri.trim(),
    tags: product.tags.trim() || null
  }
}

function resetCreateForm() {
  createForm.value = {
    caption: '',
    description: '',
    img: '',
    uri: '',
    tags: ''
  }
}

async function refreshProducts() {
  await refresh()
}

function isSaving(id: number) {
  return Boolean(savingMap[id])
}

async function createProduct() {
  bannerMessage.value = ''
  createMessage.value = ''
  creating.value = true
  try {
    const payload = toPayload(createForm.value)
    const res = await $fetch<{ id: number }>('/api/products', { method: 'POST', body: payload })
    createMessage.value = `Создано: #${res.id}`
    await refreshProducts()
    resetCreateForm()
  } catch (e: any) {
    createMessage.value = e?.data?.error || e?.message || 'Не удалось создать товар'
  } finally {
    creating.value = false
  }
}

async function saveProduct(product: EditableProduct) {
  bannerMessage.value = ''
  savingMap[product.id] = true
  try {
    const payload = toPayload(product)
    await $fetch(`/api/products/${product.id}`, { method: 'PUT', body: payload })
    bannerMessage.value = `Сохранено: #${product.id} ${product.caption || ''}`
    await refreshProducts()
  } catch (e: any) {
    bannerMessage.value = e?.data?.error || e?.message || 'Не удалось сохранить изменения'
  } finally {
    savingMap[product.id] = false
  }
}

async function logout() {
  loggingOut.value = true
  try {
    await $fetch('/api/admin/logout', { method: 'POST' })
    navigateTo('/admin-login')
  } catch {
    bannerMessage.value = 'Не удалось выйти'
  } finally {
    loggingOut.value = false
  }
}
</script>

<style scoped>
.admin-page {
  min-height: 100vh;
  background: linear-gradient(140deg, #fff8fb 0%, #f1f2ff 50%, #fef6f3 100%);
  color: var(--text-dark);
}

.admin-hero {
  padding: 80px 0 30px;
}

.admin-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-bottom: 48px;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.8rem;
  color: var(--deep-rose);
  margin-bottom: 6px;
}

.subtitle {
  max-width: 640px;
  color: var(--text-light);
  margin-top: 6px;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
}

.banner {
  margin-top: 14px;
  display: inline-block;
  padding: 10px 14px;
  background: #ffffff;
  border: 1px solid var(--soft-pink);
  border-radius: 10px;
  color: var(--deep-rose);
  box-shadow: 0 12px 30px var(--shadow);
}

.panel {
  background: #ffffff;
  border-radius: 18px;
  padding: 20px;
  box-shadow: 0 18px 50px rgba(196, 133, 138, 0.12);
  border: 1px solid rgba(212, 164, 167, 0.2);
}

.panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-weight: 600;
  color: var(--text-dark);
}

input,
textarea {
  width: 100%;
  border: 1px solid #e6e0e5;
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 14px;
  color: var(--text-dark);
  background: #fdfdff;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: var(--dusty-rose);
  box-shadow: 0 0 0 3px rgba(212, 164, 167, 0.2);
}

textarea {
  resize: vertical;
  min-height: 80px;
}

small {
  color: var(--text-light);
}

.btn {
  border: none;
  border-radius: 12px;
  padding: 12px 18px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
}

.btn.primary {
  background: var(--dusty-rose);
  color: var(--white);
  box-shadow: 0 10px 30px rgba(196, 133, 138, 0.35);
}

.btn.primary:hover {
  transform: translateY(-1px);
}

.btn.primary:disabled {
  opacity: 0.65;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.btn.ghost {
  background: #f7f4f7;
  color: var(--deep-rose);
  border: 1px solid rgba(212, 164, 167, 0.6);
}

.actions {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 4px;
}

.hint {
  color: var(--deep-rose);
  font-weight: 600;
}

.error-text {
  color: #b42318;
  font-weight: 600;
}

.muted {
  color: var(--text-light);
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 18px;
  margin-top: 10px;
}

.product-card {
  border: 1px solid #f0e7ec;
  border-radius: 16px;
  padding: 14px;
  background: linear-gradient(180deg, #ffffff 0%, #fff7fb 100%);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.chip {
  background: #f8e7ee;
  color: var(--deep-rose);
  border-radius: 999px;
  padding: 6px 12px;
  font-size: 12px;
  border: 1px solid rgba(212, 164, 167, 0.5);
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cover {
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 12px;
  background-size: cover;
  background-position: center;
  background-color: #f8f8fb;
  position: relative;
  overflow: hidden;
  border: 1px solid #f1e6ed;
  box-shadow: inset 0 0 0 1px rgba(212, 164, 167, 0.1);
}

.cover-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-light);
  font-weight: 600;
}

@media (max-width: 900px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .panel-head {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
