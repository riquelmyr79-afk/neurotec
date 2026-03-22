let slideAtual = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function mudarSlide(direcao) {
    slideAtual += direcao;
    
    // Loop infinito nos dois lados
    if (slideAtual >= totalSlides) {
        slideAtual = 0;  // Quando passa do último, volta ao primeiro
    } else if (slideAtual < 0) {
        slideAtual = totalSlides - 1;  // Quando volta do primeiro, vai ao último
    }
    
    atualizarCarrossel();
}

function irParaSlide(indice) {
    slideAtual = indice;
    atualizarCarrossel();
}

function atualizarCarrossel() {
    const track = document.querySelector('.carrossel-track');
    const percentual = -slideAtual * (100 / totalSlides);
    track.style.transform = `translateX(${percentual}%)`;
    
    // Atualizar indicadores (pontinhos)
    document.querySelectorAll('.ponto').forEach((ponto, indice) => {
        ponto.classList.remove('ativo');
        if (indice === slideAtual) {
            ponto.classList.add('ativo');
        }
    });
}

// Função para filtrar downloads
function filtrarDownloads(categoria) {
    const cards = document.querySelectorAll('.card-download');
    const botoes = document.querySelectorAll('.btn-filtro');
    
    botoes.forEach(btn => btn.classList.remove('ativo'));
    event.target.classList.add('ativo');
    
    cards.forEach(card => {
        if (categoria === 'todos') {
            card.style.display = 'block';
        } else {
            card.style.display = card.dataset.categoria === categoria ? 'block' : 'none';
        }
    });
}

// Inicializar carrossel
atualizarCarrossel();

// Evento de clique nas setas
document.addEventListener('DOMContentLoaded', function() {
    const setaAnterior = document.querySelector('.seta.anterior');
    const setaProxima = document.querySelector('.seta.proximo');
    
    if (setaAnterior) {
        setaAnterior.addEventListener('click', function() {
            mudarSlide(-1);  // Seta ESQUERDA vai para TRÁS (volta)
        });
    }
    
    if (setaProxima) {
        setaProxima.addEventListener('click', function() {
            mudarSlide(1);  // Seta DIREITA vai para FRENTE (avança)
        });
    }
    
    // Clique nos pontinhos
    const pontos = document.querySelectorAll('.ponto');
    pontos.forEach((ponto, indice) => {
        ponto.addEventListener('click', function() {
            irParaSlide(indice);
        });
    });
});