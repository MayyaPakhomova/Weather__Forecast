const weatherBtn = document.querySelector('.weather-btn'),
  selectSity = document.getElementById('select-sity');
document.body.style.backgroundImage = 'url(img/Moscow.jpg)';
let timeCity = document.querySelector('.time');
const wrapper = document.querySelector('.wrapper');
let EuropeMoscow = new Date().toLocaleString('ru-RU', {
  timeZone: 'Europe/Moscow',
});
function firstLetter(e) {
  if ('' == e) return e;
  let t = e.toLowerCase().trim();
  return t[0].toUpperCase() + t.slice(1);
}
function diff(e, t) {
  (e = e.split(':')), (t = t.split(':'));
  const n = new Date(0, 0, 0, e[0], e[1], 0);
  let r = new Date(0, 0, 0, t[0], t[1], 0).getTime() - n.getTime();
  const o = Math.floor(r / 1e3 / 60 / 60);
  r -= 1e3 * o * 60 * 60;
  const i = Math.floor(r / 1e3 / 60);
  return `  ${o < 9 ? '0' : ''}  ${o} ч. ${i < 9 ? '0' : ''} ${i} мин.`;
}
function wind(e) {
  return `rotate(${e + 80}deg)`;
}
function getTimeFromMins(e) {
  return Math.trunc(e / 60) + ':' + (e % 60);
}
function cityWeather() {
  let e = selectSity.options[selectSity.selectedIndex].text;
  (document.body.style.transition = '2s'),
    'Москва' == e &&
      ((document.body.style.backgroundImage = 'url(img/Moscow.jpg)'),
      (timeCity.innerHTML = EuropeMoscow)),
    'Казань' == e &&
      ((document.body.style.backgroundImage = 'url(img/Kazan.jpg)'),
      (timeCity.innerHTML = EuropeMoscow)),
    'Санкт-Петербург' == e &&
      ((document.body.style.backgroundImage = 'url(img/Saint-Petersburg.jpg)'),
      (timeCity.innerHTML = EuropeMoscow)),
    'Сочи' == e &&
      ((document.body.style.backgroundImage = 'url(img/Sochi.jpg)'),
      (timeCity.innerHTML = EuropeMoscow)),
    'Хабаровск' == e &&
      ((document.body.style.backgroundImage = 'url(img/Khabarovsk.jpg)'),
      (timeCity.innerHTML = new Date().toLocaleString('ru-RU', {
        timeZone: 'Asia/Vladivostok',
      })));
  const t = selectSity.value,
    n = document.querySelector('.temp'),
    r = document.querySelector('.clouds-img'),
    o = document.querySelector('.clouds-text'),
    i = document.querySelector('.wind'),
    a = document.querySelector('.wind-img'),
    u = document.querySelector('.feels'),
    c = document.querySelector('.sunset'),
    s = document.querySelector('.sunrise'),
    d = document.querySelector('.pressure'),
    m = document.querySelector('.humidity');
  let l = document.querySelector('.longitude');
  const g = new Date(Date.now());
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?id=${t}&appid=4694314980a45d0bb56cfa2d106bdfb7&lang=ru`
  )
    .then(function (e) {
      return e.json();
    })
    .then(function (e) {
      (n.innerHTML = Math.round(e.main.temp - 273) + '&deg;'),
        (o.textContent = firstLetter(e.weather[0].description)),
        (r.innerHTML = `<img src="https://openweathermap.org/img/wn/${e.weather[0].icon}@2x.png">`),
        (i.innerHTML = `Ветер ${Math.round(e.wind.speed)} м/с`),
        (a.style.transform = wind(e.wind.deg)),
        (u.innerHTML = `По ощущению ${Math.round(
          e.main.feels_like - 273
        )}&deg;`),
        (m.innerHTML = `Влажность ${e.main.humidity} %`),
        (d.innerHTML = `Давление ${Math.round(
          0.75 * e.main.pressure
        )} мм рт. ст.`);
      let t = new Date(
        1e3 * e.sys.sunrise +
          60 * g.getTimezoneOffset() * 1e3 +
          1e3 * e.timezone
      );
      s.textContent = `Восход ${t.getHours().toString().padStart(2, 0)}:${t
        .getMinutes()
        .toString()
        .padStart(2, 0)}`;
      let p = new Date(
        1e3 * e.sys.sunset + 60 * g.getTimezoneOffset() * 1e3 + 1e3 * e.timezone
      );
      (c.textContent = `Закат ${p.getHours().toString().padStart(2, 0)}:${p
        .getMinutes()
        .toString()
        .padStart(2, 0)}`),
        (l.innerHTML = `Световой день${diff(
          `${t.getHours().toString().padStart(2, 0)}:${t
            .getMinutes()
            .toString()
            .padStart(2, 0)}`,
          `${p.getHours().toString().padStart(2, 0)}: ${p
            .getMinutes()
            .toString()
            .padStart(2, 0)}`
        )}`);
    });
}
(timeCity.innerHTML = EuropeMoscow),
  selectSity.addEventListener('click', () => {
    wrapper.classList.add('wrapper-animation'),
      document.querySelector('.wind-img').classList.add('wind-img-animation');
  }),
  selectSity.addEventListener('change', () => {
    cityWeather(),
      wrapper.classList.remove('wrapper-animation'),
      document
        .querySelector('.wind-img')
        .classList.remove('wind-img-animation');
  }),
  cityWeather(selectSity);
