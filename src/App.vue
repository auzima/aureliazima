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
        width="100%"
        height="600px"
        style="border: none; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);"
      ></iframe>
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
  height: 100vh;
  margin: 0;
}

.container {
  text-align: center;
  max-width: 800px;
  padding: 2rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
}

/* --- Espacement réduit entre le nom et le sous-titre --- */
h1 {
  margin-bottom: 0.2rem; /* Réduit l'espace sous le nom */
  line-height: 1.1; /* Compacte la hauteur du texte */
}

.container p:first-of-type {
  margin-top: 0.2rem; /* Réduit l'espace au-dessus du sous-titre */
  margin-bottom: 1rem; /* Garde un peu d’air avant la suite */
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

/* --- CV --- */
.cv-card {
  margin-top: 2rem;
}

/* --- Footer --- */
footer {
  margin-top: 2rem;
  font-size: 0.8rem;
  color: #777;
}
</style>
