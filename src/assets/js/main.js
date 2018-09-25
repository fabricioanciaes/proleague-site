var spreadsheet = 'https://docs.google.com/spreadsheets/d/19YV_KQfezbI3voISid-3dAqHlPHTYttXo-eUs30Ln4U/pubhtml';

var selectors = {
  eventos: document.querySelector("#eventosArea")
};

function clearHTML(target) {
  target.innerHTML = '';
}

function renderEvent(target, data, index) {
  target.innerHTML += `
  <div class="col s12 m4 evento" style="animation-delay: ${0.1 * index}s">
    <div class="card">
      <div class="card-content white-text">
        <span class="card-title black-text">${data.nome}</span>
        <p class="grey-text text-darken-1">${data.local}</p>
        <h6 class="grey-text">${data.data}</h6>
      </div>
      <div class="card-action">
        <a href="${data.url}">Ver Mais</a>
      </div>
    </div>
  </div>
  `;
};

document.addEventListener("DOMContentLoaded", function () {
  Tabletop.init({
    key: spreadsheet,
    callback: function (data, tabletop) {
      clearHTML(selectors.eventos);
      data.map( (item, index) => {
        renderEvent(selectors.eventos, item, index);
      });
    },
    simpleSheet: true
  })
});
document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {

                // Get the target from the "data-target" attribute
                const target = el.dataset.target;
                const $target = document.getElementById(target);

                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');

            });
        });
    }

});
//# sourceMappingURL=main.js.map
