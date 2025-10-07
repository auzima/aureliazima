<template>
  <section class="container">
    <h1>Aurélia Zima</h1>
    <p>Étudiante en troisième année de Bachelor en ingénierie des médias</p>

    <!-- Message de construction avec icône animée -->
    <div class="construction">
      <p class="message">
        Portfolio en construction
        <span class="icon">⚙️</span>
      </p>
      <p class="sub-message">
        En attendant, vous pouvez consulter mon CV ci-dessous
      </p>
    </div>

    <!-- CV intégré -->
    <div class="cv-card">
      <iframe
        src="/CV_Aurelia_Zima.pdf"
        class="cv-frame"
        title="CV Aurelia Zima"
      ></iframe>

      <!-- Bouton de téléchargement -->
      <p>
        <a href="/CV_Aurelia_Zima.pdf" target="_blank" download class="btn">
          📄 Télécharger le CV
        </a>
      </p>
    </div>

    <footer>
      <p>&copy; 2025 Aurélia Zima – aureliazima.ch</p>
    </footer>
  </section>
</template>

<style>
body {
  font-family: "Inter", sans-serif;
  background: #fafafa;
  color: #222;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin: 0;
  padding: 0;
}

/* Conteneur principal */
.container {
  text-align: center;
  width: 90%;
  max-width: 800px;
  padding: 2rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  margin: 2rem auto;
}

/* --- Espacement réduit entre le nom et le sous-titre --- */
h1 {
  margin-bottom: 0.2rem;
  line-height: 1.1;
  font-size: 2rem;
  word-break: keep-all;
  overflow-wrap: normal;
}

.container p:first-of-type {
  margin-top: 0.2rem;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  line-height: 1.4;
}

/* --- Message en construction --- */
.construction {
  margin: 2rem 0;
}

.message {
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

/* --- Roue animée --- */
.icon {
  font-size: 1.6rem;
  display: inline-block;
  animation: spin 1.5s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* --- Texte sous-message --- */
.sub-message {
  font-size: 1rem;
  color: #555;
  animation: fade 2s ease-in-out infinite alternate;
}

@keyframes fade {
  from {
    opacity: 0.5;
  }
  to {
    opacity: 1;
  }
}

/* --- CV intégré --- */
.cv-card {
  margin-top: 2rem;
}

.cv-frame {
  width: 100%;
  height: 80vh;
  min-height: 500px;
  border: none;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* --- Bouton --- */
.btn {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background: #222;
  color: white;
  text-decoration: none;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: background 0.3s, transform 0.2s;
}

.btn:hover {
  background: #555;
  transform: scale(1.03);
}

/* --- Footer --- */
footer {
  margin-top: 2rem;
  font-size: 0.8rem;
  color: #777;
}
</style>
