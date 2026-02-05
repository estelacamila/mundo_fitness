/* ===============================
   MENU LATERAL
================================ */

function toggleMenu() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");

  sidebar.classList.toggle("open");
  overlay.classList.toggle("show");
}

function toggleCart() {
  const cart = document.getElementById("cart-sidebar");
  const overlay = document.getElementById("overlay-cart");

  cart.classList.toggle("open");
  overlay.classList.toggle("show");
}

/* fechar ao clicar no overlay */
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("overlay");
  const overlayCart = document.getElementById("overlay-cart");

  if (overlay) {
    overlay.addEventListener("click", () => {
      document.getElementById("sidebar").classList.remove("open");
      overlay.classList.remove("show");
    });
  }

  if (overlayCart) {
    overlayCart.addEventListener("click", () => {
      document.getElementById("cart-sidebar").classList.remove("open");
      overlayCart.classList.remove("show");
    });
  }
});

/* ===============================
   CARROSSEL AUTOMÁTICO (HOME)
================================ */

let current = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove("active"));
  if (slides[index]) slides[index].classList.add("active");
}

if (slides.length > 0) {
  showSlide(0);
  setInterval(() => {
    current = (current + 1) % slides.length;
    showSlide(current);
  }, 5000);
}

/* ===============================
   FILTRO DE CATEGORIAS
================================ */

function filtrar(categoria) {

  const hero = document.querySelector(".hero-carousel");
  const info = document.querySelector(".info-bar");
  const promo = document.getElementById("promocao");
  const quem = document.getElementById("quem-somos");

  if (hero) hero.style.display = "none";
  if (info) info.style.display = "none";
  if (promo) promo.style.display = "none";
  if (quem) quem.style.display = "none";

  const titColecoes = document.getElementById("titulo-colecoes");
  const titPublico = document.getElementById("titulo-publico");

  if (titColecoes) titColecoes.style.display = "none";
  if (titPublico) titPublico.style.display = "none";

  document.querySelectorAll(".categories").forEach(sec => {
    sec.style.display = "none";
  });

  const produtos = document.getElementById("produtos");
  produtos.style.display = "block";

  const titulo = document.getElementById("titulo-categoria");
  titulo.innerText =
    categoria.charAt(0).toUpperCase() + categoria.slice(1);

  document.querySelectorAll(".produto-card").forEach(card => {
    card.style.display =
      card.dataset.category === categoria ? "block" : "none";
  });

  produtos.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

/* ===============================
   VOLTAR PARA HOME
================================ */

function voltar() {

  const hero = document.querySelector(".hero-carousel");
  const info = document.querySelector(".info-bar");
  const promo = document.getElementById("promocao");
  const quem = document.getElementById("quem-somos");

  if (hero) hero.style.display = "block";
  if (info) info.style.display = "block";
  if (promo) promo.style.display = "block";
  if (quem) quem.style.display = "block";

  const titColecoes = document.getElementById("titulo-colecoes");
  const titPublico = document.getElementById("titulo-publico");

  if (titColecoes) titColecoes.style.display = "block";
  if (titPublico) titPublico.style.display = "block";

  document.querySelectorAll(".categories").forEach(sec => {
    sec.style.display = "grid";
  });

  document.getElementById("produtos").style.display = "none";

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

/* ===============================
   CARRINHO / SACOLA
================================ */

let sacola = [];

function adicionarSacola(nome) {
  if (!sacola.includes(nome)) {
    sacola.push(nome);
    atualizarSacola();
  }
  toggleCart();
}

function removerDaSacola(index) {
  sacola.splice(index, 1);
  atualizarSacola();
}

function atualizarSacola() {

  const count = document.getElementById("cart-count");
  const container = document.getElementById("cart-items");

  count.innerText = sacola.length;
  container.innerHTML = "";

  if (sacola.length === 0) {
    container.innerHTML =
      '<p style="text-align:center;color:#999;margin-top:20px;">Sua sacola está vazia.</p>';
    return;
  }

  sacola.forEach((item, index) => {
    container.innerHTML += `
      <div class="cart-item">
        <span>${item}</span>
        <span class="btn-remove" onclick="removerDaSacola(${index})">
          Excluir
        </span>
      </div>
    `;
  });
}

/* ===============================
   ENVIAR CONSULTA WHATSAPP
================================ */

function enviarConsulta() {

  if (sacola.length === 0) {
    alert("Adicione itens primeiro!");
    return;
  }

  const numero = "5511999999999"; // 🔴 TROQUE PELO SEU NÚMERO

  let texto = "Olá! Gostaria de consultar disponibilidade de:\n\n";

  sacola.forEach(item => {
    texto += "• " + item + "\n";
  });

  const link =
    `https://api.whatsapp.com/send?phone=${numero}&text=${encodeURIComponent(texto)}`;

  window.open(link, "_blank");
}
