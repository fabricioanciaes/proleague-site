var spreadsheetKey = 'https://docs.google.com/spreadsheets/d/1CqIkr9NMotVVL85A4gMympUZGeg5tjy_v21fACOQm_c/pubhtml';

//Fazendo caching dos seletores pra não ter que perguntar toda vez
var selectors = {
    ranking: document.querySelector(".ranking")
};

//Templatezinho pra renderizar o card dos jogadores
function renderPlayer(player, index) {

    var charArray = player.Personagens.split(",");

    return `<div class="player" style="animation-delay:${0.1 * index % 10}s">
              <div class="avatar" style="background-image:url('${player.Avatar}')"></div>
              <div class="player-content">
                  <span class="name">${player.Nome}</span>
                  <ul class="chars">
                      ${charArray.map(item => {
            return `<li>${item.trim()}</li>`
        })}
                  </ul>
                  <span class="points">${player.Pontos}</span>
              </div>
              <span class="position">${index}</span>
          </div>`
}

//Função que insere os dados no .ranking
function renderRanking(data, tabletop) {
    selectors.ranking.innerHTML = " ";
    data.map((player, index) => {
        selectors.ranking.innerHTML += renderPlayer(player, index + 1);
        //Index+1 porque começa contando de zero
    })
}

function init() {
    Tabletop.init({
        key: spreadsheetKey,
        callback: function (data, tabletop) {
            renderRanking(data, tabletop)
        },
        simpleSheet: true,
        orderby: "Pontos",
        reverse: true
    })
}

window.addEventListener('DOMContentLoaded', function () {
    init();
})