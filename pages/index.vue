<template>
  <NavBar />
  <HeroSection />
  <AboutSection />
  <StyleSection />
  <ServicesSection />
  <GallerySection />
  <ContactSection />
  <SiteFooter />
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import NavBar from '~/components/NavBar.vue'
import HeroSection from '~/components/HeroSection.vue'
import AboutSection from '~/components/AboutSection.vue'
import StyleSection from '~/components/StyleSection.vue'
import ServicesSection from '~/components/ServicesSection.vue'
import GallerySection from '~/components/GallerySection.vue'
import ContactSection from '~/components/ContactSection.vue'
import SiteFooter from '~/components/SiteFooter.vue'

useHead({
  title: 'Maya Art — Акварельные картины, принты и заказы',
  meta: [
    { name: 'robots', content: 'index,follow' },
    { name: 'googlebot', content: 'index,follow' },
    {
      name: 'description',
      content:
        'Maya Art — акварельные картины и иллюстрации. Оригиналы и принты, портреты и ботанические сюжеты на заказ.'
    },
    { property: 'og:title', content: 'Maya Art — Акварельные картины и иллюстрации' },
    { property: 'og:description', content: 'Оригинальные акварели, принты и работы на заказ. Нежные оттенки, живые фактуры, ручная работа.' },
    { property: 'og:url', content: '/' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico?v=2', sizes: '16x16 32x32 48x48 64x64', type: 'image/x-icon' },
    { rel: 'icon', href: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    { rel: 'icon', href: '/favicon-192.png', sizes: '192x192', type: 'image/png' },
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;600&family=Lato:wght@300;400;500&display=swap'
    }
  ],
  script: [
    {
      children: `var _tmr = window._tmr || (window._tmr = []);_tmr.push({id: "3696479", type: "pageView", start: (new Date()).getTime()});(function (d, w, id) { if (d.getElementById(id)) return; var ts = d.createElement("script"); ts.type = "text/javascript"; ts.async = true; ts.id = id; ts.src = "https://top-fwz1.mail.ru/js/code.js"; var f = function () {var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ts, s);}; if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); } })(document, window, "tmr-code");`
    },
    {
      children: `(function(m,e,t,r,i,k,a){ m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)}; m[i].l=1*new Date(); for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }} k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=104189128', 'ym'); ym(104189128, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});`
    }
  ],
  noscript: [
    { children: '<div><img src="https://top-fwz1.mail.ru/counter?id=3696479;js=na" style="position:absolute;left:-9999px;" alt="Top.Mail.Ru" /></div>' },
    { children: '<div><img src="https://mc.yandex.ru/watch/104189128" style="position:absolute; left:-9999px;" alt="" /></div>' }
  ]
})

onMounted(() => {
  // Smooth scrolling for navigation links
  const clickHandler = (e: Event) => {
    e.preventDefault()
    const link = e.currentTarget as HTMLAnchorElement
    const target = document.querySelector(link.getAttribute('href') || '')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
  const anchors = Array.from(document.querySelectorAll('a[href^="#"]')) as HTMLAnchorElement[]
  anchors.forEach((a) => a.addEventListener('click', clickHandler))

  // Add scroll effect to navigation
  const nav = document.querySelector('.navbar')
  const onScroll = () => {
    if (!nav) return
    if (window.scrollY > 50) nav.classList.add('scrolled')
    else nav.classList.remove('scrolled')
  }
  window.addEventListener('scroll', onScroll)
  onScroll()

  onBeforeUnmount(() => {
    anchors.forEach((a) => a.removeEventListener('click', clickHandler))
    window.removeEventListener('scroll', onScroll)
  })
})
</script>
