async function loadStrainLibrary() {
  const baseUrl = '';

  try {
    const response = await fetch('strains.json');
    const strains = await response.json();

    const vaultGrid = document.querySelector('#vault-strains');
    const featuredScroller = document.querySelector('#featured-strains');

    if (!vaultGrid) return;

    let featuredItems = [];
    let vaultHTMLBlocks = [];

    strains.forEach(strain => {
      const cleanImage = strain.image ? encodeURI(strain.image.trim()) : ''; 
      const imageUrl = cleanImage ? `${baseUrl}${cleanImage}` : `${baseUrl}assets/img/logo/dtg-logo-orange.png`;
      const imageClass = cleanImage ? 'strain-image' : 'strain-image fallback-logo';

      let badgeText = '';
      if (strain.award) badgeText = 'AWARD WINNER';
      else if (strain.favorite) badgeText = 'FAN FAVORITE';

      const highlightClass = badgeText ? 'is-award-winner' : '';
      const cornerBadgeHTML = badgeText ? `<span class="corner-award-badge">${badgeText}</span>` : '';

      // ==========================================
      // 1. TOP SCROLLER (FIXED PADDING)
      // ==========================================
      if (badgeText !== '' && featuredScroller) {
        featuredItems.push({
          isAward: strain.award ? true : false,
          name: strain.name,
          html: `
            <div class="strain-card trophy-card ${highlightClass}">
              <div class="strain-card-inner">
                <div class="strain-image" data-bg="${imageUrl}">
                  ${cornerBadgeHTML}
                </div>
                <div class="strain-content">
                  <div class="strain-top">
                    <h3 class="strain-name">${strain.name}</h3>
                  </div>
                  <p class="strain-meta">${strain.type.toUpperCase()} | Genetics by ${strain.breeder}</p>
                  <p class="strain-notes teaser-text">${strain.description}</p>
                  <div class="card-action">Tap for Full Details <span>→</span></div>
                </div>
              </div>
            </div>
          `
        });
      }

     // ==========================================
      // 2. MAIN VAULT LIBRARY
      // ==========================================
      vaultHTMLBlocks.push(`
        <article class="strain-card library-card ${highlightClass}">
          <div class="strain-card-inner">
            <div class="${imageClass} desktop-img" data-bg="${imageUrl}">
              ${cornerBadgeHTML}
            </div>
            <div class="strain-content">
              <div class="strain-top">
                <h3 class="strain-name">${strain.name}</h3>
              </div>
              <p class="strain-meta">${strain.type.toUpperCase()} | Genetics by ${strain.breeder}</p>
              <p class="strain-meta lineage-text">${strain.lineage}</p>
              <p class="strain-notes teaser-text">${strain.description}</p>
              <div class="card-action">Tap for Full Details <span>→</span></div>
            </div>
          </div>
        </article>
      `);
    });

    // ==========================================
    // 3. SORT & INJECT
    // ==========================================
    if (featuredScroller) {
      featuredItems.sort((a, b) => {
        if (a.isAward && !b.isAward) return -1; 
        if (!a.isAward && b.isAward) return 1;  
        return a.name.localeCompare(b.name);    
      });
      featuredScroller.innerHTML = featuredItems.map(item => item.html).join('');
    }
    vaultGrid.innerHTML = vaultHTMLBlocks.join('');

    // ==========================================
    // 4. LAZY LOAD & FADE-IN ANIMATION ENGINE
    // ==========================================
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const card = entry.target;
          
          // Trigger the CSS fade-in
          card.classList.add('is-visible');
          
          // Only download the image if the user actually scrolls to it
          const imgDiv = card.querySelector('[data-bg]');
          if (imgDiv) {
            imgDiv.style.backgroundImage = `url('${imgDiv.dataset.bg}')`;
            imgDiv.removeAttribute('data-bg');
          }
          
          obs.unobserve(card); // Stop watching once it's loaded
        }
      });
    }, { rootMargin: '0px 0px 200px 0px' }); // Starts loading 200px before the card hits the screen

    document.querySelectorAll('.strain-card').forEach(card => observer.observe(card));

  } catch (error) {
    console.error('Failed to load Strain Library:', error);
  }
}

document.addEventListener('DOMContentLoaded', loadStrainLibrary);
