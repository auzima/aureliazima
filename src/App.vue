<template>
  <section class="container">
    <!-- Header Section -->
    <header class="header">
      <h1 class="header__title">Aurélia Zima</h1>
      <p class="header__subtitle">
        Étudiante en troisième année de Bachelor en ingénierie des médias
      </p>
    </header>

    <!-- Countdown Section -->
    <div class="construction">
      <div class="countdown">
        <p class="countdown__message">Mon portfolio sera disponible dans :</p>
        <div class="countdown__boxes">
          <div 
            v-for="unit in timeUnits" 
            :key="unit.key" 
            class="countdown__box"
          >
            <span class="countdown__value">{{ countdown[unit.key] }}</span>
            <small class="countdown__label">{{ unit.label }}</small>
          </div>
        </div>
      </div>

      <p class="sub-message">
        En attendant, vous pouvez consulter mon
        <a 
          href="https://www.linkedin.com/in/aurélia-zima" 
          target="_blank" 
          rel="noopener noreferrer"
          class="sub-message__link"
        >
          LinkedIn
        </a>
        ainsi que mon CV ci-dessous.
      </p>
    </div>

    <!-- CV Section -->
    <div class="cv-section">
      <iframe
        src="/CV_Aurelia_Zima.pdf"
        class="cv-section__frame"
        title="CV Aurelia Zima"
        loading="lazy"
      />

      <!-- Mobile Download Button -->
      <div class="cv-section__button-container cv-section__button-container--mobile">
        <a 
          href="/CV_Aurelia_Zima.pdf" 
          target="_blank" 
          download 
          class="btn"
        >
          📄 Télécharger le CV
        </a>
      </div>
    </div>

    <!-- Footer -->
    <footer class="footer">
      <p class="footer__text">
        &copy; {{ currentYear }} Aurélia Zima – aureliazima.ch
      </p>
    </footer>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

// Constants
const TARGET_DATE = new Date('2025-10-25T00:00:00');
const UPDATE_INTERVAL = 1000;

const TIME_UNITS = [
  { key: 'days', label: 'jours' },
  { key: 'hours', label: 'heures' },
  { key: 'minutes', label: 'minutes' },
  { key: 'seconds', label: 'secondes' }
];

// State
const countdown = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
});

let timerId = null;

// Computed
const currentYear = computed(() => new Date().getFullYear());
const timeUnits = computed(() => TIME_UNITS);

// Methods
const calculateTimeDifference = (targetDate, currentDate) => {
  return targetDate - currentDate;
};

const convertMillisecondsToTimeUnits = (milliseconds) => {
  const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
  const hours = Math.floor((milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
};

const updateCountdown = () => {
  const now = new Date();
  const diff = calculateTimeDifference(TARGET_DATE, now);

  if (diff <= 0) {
    countdown.value = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    clearInterval(timerId);
    return;
  }

  countdown.value = convertMillisecondsToTimeUnits(diff);
};

// Lifecycle Hooks
onMounted(() => {
  updateCountdown();
  timerId = setInterval(updateCountdown, UPDATE_INTERVAL);
});

onUnmounted(() => {
  if (timerId) {
    clearInterval(timerId);
  }
});
</script>

<style scoped>
/* ========================================
   Body global (fond blanc plein écran)
   ======================================== */
html, body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: #ffffff; /* ✅ fond blanc pur */
  color: var(--color-text-primary);
  font-family: var(--font-family-base);
}

/* ========================================
   Global Styles
   ======================================== */
:root {
  --color-text-primary: #222;
  --color-text-secondary: #555;
  --color-text-tertiary: #777;
  --color-background: #fff;
  --color-accent: #000;
  --color-accent-hover: #333;
  --spacing-xs: 0.2rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --border-radius-sm: 0.5rem;
  --border-radius-md: 0.6rem;
  --border-radius-lg: 0.8rem;
  --font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --transition-base: 0.3s ease;
}

/* ========================================
   Container
   ======================================== */
.container {
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  padding: var(--spacing-xl);
  overflow-y: auto;
  background: var(--color-background);
  color: var(--color-text-primary);
  font-family: var(--font-family-base);
  text-align: center;
}

/* ========================================
   Header
   ======================================== */
.header__title {
  margin: 0 0 var(--spacing-xs);
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.1;
}

.header__subtitle {
  margin: var(--spacing-xs) 0 var(--spacing-md);
  font-size: 1.1rem;
  line-height: 1.4;
  color: var(--color-text-secondary);
}

/* ========================================
   Construction Section
   ======================================== */
.construction {
  margin: var(--spacing-xl) 0;
}

/* ========================================
   Countdown
   ======================================== */
.countdown {
  margin: var(--spacing-lg) 0;
}

.countdown__message {
  margin: 0 0 var(--spacing-md);
  font-size: 1rem;
  color: var(--color-text-secondary);
}

.countdown__boxes {
  display: flex;
  justify-content: center;
  gap: var(--spacing-md);
  flex-wrap: wrap;
  margin-top: var(--spacing-md);
}

.countdown__box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 70px;
  padding: 0.8rem 1rem;
  /* background: var(--color-accent);
  border-radius: var(--border-radius-md); */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  animation: pulse 2s infinite;
}

.countdown__value {
  display: block;
  font-size: 1.4rem;
  font-weight: 700;
  color: #fff;
}

.countdown__label {
  font-size: 0.75rem;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* ========================================
   Sub Message
   ======================================== */
.sub-message {
  margin-top: var(--spacing-md);
  font-size: 1rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.sub-message__link {
  color: var(--color-accent);
  text-decoration: underline;
  transition: color var(--transition-base);
}

.sub-message__link:hover {
  color: var(--color-accent-hover);
}

.sub-message__link:focus {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

/* ========================================
   CV Section
   ======================================== */
.cv-section {
  margin-top: var(--spacing-xl);
}

.cv-section__frame {
  width: 100%;
  height: 80vh;
  min-height: 500px;
  border: none;
  border-radius: var(--border-radius-lg);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.cv-section__button-container {
  margin-top: var(--spacing-lg);
  text-align: center;
}

.cv-section__button-container--mobile {
  display: block;
}

/* ========================================
   Button
   ======================================== */
.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: var(--color-accent);
  color: #fff;
  font-weight: 500;
  text-decoration: none;
  border-radius: var(--border-radius-sm);
  transition: background var(--transition-base), transform 0.2s ease;
  cursor: pointer;
}

.btn:hover {
  background: var(--color-accent-hover);
  transform: scale(1.03);
}

.btn:focus {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.btn:active {
  transform: scale(0.98);
}

/* ========================================
   Footer
   ======================================== */
.footer {
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-md);
}

.footer__text {
  margin: 0;
  font-size: 0.8rem;
  color: var(--color-text-tertiary);
}

/* ========================================
   Media Queries
   ======================================== */
@media (min-width: 769px) {
  .cv-section__button-container--mobile {
    display: none;
  }
}

@media (max-width: 768px) {
  .container {
    padding: var(--spacing-md);
  }

  .header__title {
    font-size: 1.5rem;
  }

  .header__subtitle {
    font-size: 1rem;
  }

  .countdown__boxes {
    gap: var(--spacing-sm);
  }

  .countdown__box {
    min-width: 60px;
    padding: 0.6rem 0.8rem;
  }

  .countdown__value {
    font-size: 1.2rem;
  }

  .cv-section__frame {
    height: 100vh;
    min-height: 400px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .countdown__box {
    animation: none;
  }

  .btn {
    transition: none;
  }
}
</style>
