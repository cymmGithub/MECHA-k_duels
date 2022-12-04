export function alertMsgPositive(string) {
  const body = document.querySelector('body');
  const div = document.createElement('div');
  div.classList.add('alert');

  const txt = document.createElement('p');

  txt.classList.add('alert-text-positive', 'animate__fadeIn');
  txt.innerText = `✅ ${string}`;

  div.style.top = `${window.pageYOffset + 40}px`;
  div.style.right = '10px';

  div.appendChild(txt);
  body.appendChild(div);

  setTimeout(() => {
    txt.classList.add('animate__fadeOut');
  }, 4000);

  setTimeout(() => {
    body.removeChild(div);
  }, 6000);
}

export function alertMsgNegative(string) {
  const body = document.querySelector('body');
  const div = document.createElement('div');
  div.classList.add('alert');

  const txt = document.createElement('p');

  txt.classList.add('alert-text-negative', 'animate__fadeIn');
  txt.innerText = `❌ ${string}`;

  div.style.top = `${window.pageYOffset + 40}px`;
  div.style.right = '10px';

  div.appendChild(txt);
  body.appendChild(div);

  setTimeout(() => {
    txt.classList.add('animate__fadeOut');
  }, 4000);

  setTimeout(() => {
    body.removeChild(div);
  }, 6000);
}
