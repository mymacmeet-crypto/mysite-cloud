document.addEventListener('click', function (e) {
    const btn = e.target.closest('.cmp-button');
    if (!btn || btn.disabled) return;
  
    const action = btn.dataset.action;
    const url = btn.dataset.url;
  
    switch (action) {
      case 'alert':
        alert(`Clicked: ${btn.textContent}`);
        break;
      case 'log':
        console.log('Button clicked:', btn.textContent);
        break;
      case 'navigate':
        if (url) window.location.href = url;
        break;
      case 'toggle':
        btn.classList.toggle('cmp-button--active');
        break;
      default:
        console.log('No action defined');
    }
  });
  