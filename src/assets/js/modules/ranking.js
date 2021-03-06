var spreadsheetKey = 'https://docs.google.com/spreadsheets/d/1CqIkr9NMotVVL85A4gMympUZGeg5tjy_v21fACOQm_c/pubhtml';
https: var ranking;
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

function init(name) {
    ranking = Tabletop.init({
        key: spreadsheetKey,
        callback: function (data, tabletop) {
            renderRanking(data, tabletop)
        },
        simpleSheet: true,
        wanted:[name],
        orderby: "Pontos",
        reverse: true
    });
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}

function sheetNameMap(name) {
    var games = {
        "KPOP": "K-POP",
        "NARUTO": "Naruto Shippuden - Ultimate Ninja Storm 4 Road To Boruto",
        "FIFA": "FIFA 2019",
        "JUSTDANCE": "Just Dance"
    }

    return games[name.toUpperCase()];
}

window.addEventListener('DOMContentLoaded', function () {
    var game = {
        sheet: getQueryVariable("game").toUpperCase(),
        name: sheetNameMap(getQueryVariable("game")),
    };
    document.querySelector("#gamename").innerHTML = game.name;
    init(game.sheet);
    console.log(ranking);
})

