<template>
  <div class="auth-page">
    <div class="card">
      <p class="eyebrow">Maya Art · Admin</p>
      <h1>Войти</h1>
      <p class="muted">Доступ только для администратора. Логин и пароль заданы в .env</p>
      <form class="form" @submit.prevent="onSubmit">
        <label>
          Логин
          <input v-model="login" type="text" autocomplete="username" required />
        </label>
        <label>
          Пароль
          <input v-model="password" type="password" autocomplete="current-password" required />
        </label>
        <button class="btn primary" type="submit" :disabled="pending">
          {{ pending ? 'Входим…' : 'Войти' }}
        </button>
        <p v-if="message" class="message">{{ message }}</p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const login = ref('')
const password = ref('')
const message = ref('')
const pending = ref(false)

useHead({ title: 'Вход в админку — Maya Art' })

async function onSubmit() {
  message.value = ''
  pending.value = true
  try {
    await $fetch('/api/admin/login', { method: 'POST', body: { login: login.value, password: password.value } })
    const target = (route.query.redirect as string) || '/admin'
    router.push(target)
  } catch (e: any) {
    message.value = e?.data?.error || e?.message || 'Не удалось войти'
  } finally {
    pending.value = false
  }
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #fff7fb 0%, #f1f2ff 50%, #fef6f3 100%);
  padding: 20px;
}

.card {
  width: min(420px, 100%);
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 20px 50px rgba(196, 133, 138, 0.18);
  border: 1px solid rgba(212, 164, 167, 0.2);
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.8rem;
  color: var(--deep-rose);
  margin-bottom: 6px;
}

.muted {
  color: var(--text-light);
  margin: 6px 0 16px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-weight: 600;
  color: var(--text-dark);
}

input {
  border: 1px solid #e6e0e5;
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 14px;
  background: #fdfdff;
}

input:focus {
  outline: none;
  border-color: var(--dusty-rose);
  box-shadow: 0 0 0 3px rgba(212, 164, 167, 0.2);
}

.btn.primary {
  border: none;
  border-radius: 12px;
  padding: 12px 18px;
  font-weight: 700;
  cursor: pointer;
  background: var(--dusty-rose);
  color: var(--white);
  box-shadow: 0 10px 30px rgba(196, 133, 138, 0.35);
}

.btn.primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  box-shadow: none;
}

.message {
  color: #b42318;
  font-weight: 600;
}
</style>
