
function updateHitCount() {

    fetch('/hits/page1')
      .then(response => response.json())
      .then(data => {

        document.querySelector('p').textContent = 'Hit count: ' + data.hits;
      });
  }

  window.onload = updateHitCount;
  

  document.querySelector('button').addEventListener('click', () => {

    updateHitCount();
  });
  