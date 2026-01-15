// Abrir e Fechar Menus
function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    const active = sidebar.classList.toggle("active");
    overlay.style.display = active ? "block" : "none";
}

function toggleCart() {
    const cart = document.getElementById("cart-sidebar");
    const overlay = document.getElementById("overlay-cart");
    const active = cart.classList.toggle("active");
    overlay.style.display = active ? "block" : "none";
}

// Carrossel Automático
let current = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    if(slides[index]) slides[index].classList.add('active');
    if(dots[index]) dots[index].classList.add('active');
}

setInterval(() => {
    if(slides.length > 0) {
        current = (current + 1) % slides.length;
        showSlide(current);
    }
}, 5000);

// Filtro de Categorias (Atualizado para esconder seções da Home)
function filtrar(categoria) {
    // Esconde todas as seções da página inicial
    document.getElementById('hero-carousel').style.display = 'none';
    document.getElementById('info-bar').style.display = 'none';
    document.getElementById('quem-somos').style.display = 'none';
    document.getElementById('queridinhos').style.display = 'none';
    document.getElementById('categorias').style.display = 'none';
    
    // Mostra a seção de produtos filtrados
    document.getElementById('produtos').style.display = 'block';
    document.getElementById('titulo-categoria').innerText = categoria.toUpperCase();

    const cards = document.querySelectorAll('.produto-card');
    cards.forEach(card => {
        card.style.display = card.dataset.category === categoria ? 'block' : 'none';
    });
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Voltar para Home (Atualizado para mostrar as seções novamente)
function voltar() {
    document.getElementById('hero-carousel').style.display = 'block';
    document.getElementById('info-bar').style.display = 'block';
    document.getElementById('quem-somos').style.display = 'block';
    document.getElementById('queridinhos').style.display = 'block';
    document.getElementById('categorias').style.display = 'grid';
    
    document.getElementById('produtos').style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Lógica do Carrinho
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
    const count = document.getElementById('cart-count');
    const container = document.getElementById('cart-items');
    count.innerText = sacola.length;
    container.innerHTML = '';

    if (sacola.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:#999; margin-top:20px;">Sua sacola está vazia.</p>';
        return;
    }

    sacola.forEach((item, index) => {
        container.innerHTML += `
            <div class="cart-item">
                <span>${item}</span>
                <span class="btn-remove" onclick="removerDaSacola(${index})">Excluir</span>
            </div>`;
    });
}

function enviarConsulta() {
    if (sacola.length === 0) return alert("Adicione itens primeiro!");
    const meuNumero = "5511999999999"; 
    let texto = "Olá Talita! Gostaria de consultar a disponibilidade de:\n\n";
    sacola.forEach(item => texto += `- ${item}\n`);
    window.open(`https://api.whatsapp.com/send?phone=${meuNumero}&text=${encodeURIComponent(texto)}`, '_blank');
}