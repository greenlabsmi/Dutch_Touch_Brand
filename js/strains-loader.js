async function loadStrainLibrary() {
  // If this script is running anywhere OTHER than the master Dutch Touch site, use the master URL
  const isExternalSite = !window.location.href.includes('Dutch_Touch_Brand');
  const baseUrl = isExternalSite ? 'https://greenlabsmi.github.io/Dutch_Touch_Brand/' : '';

  try {
    const response = await fetch('https://greenlabsmi.github.io/Dutch_Touch_Brand/strains.json');
    const strains = await response.json();

    const vaultGrid = document.querySelector('#vault-strains');
    const featuredScroller = document.querySelector('#featured-strains');

    if (!vaultGrid) return;

    strains.forEach(strain => {
      strains.forEach(strain => {
      
      // 1. .trim() destroys invisible spaces and line-breaks
      // 2. encodeURI() ensures the path is perfectly formatted for CSS
      const cleanImage = strain.image ? encodeURI(strain.image.trim()) : ''; 
      
      const imageUrl = cleanImage ? `${baseUrl}${cleanImage}` : `${baseUrl}assets/img/logo/dtg-logo-orange.png`;
      const imageClass = cleanImage ? 'strain-image' : 'strain-image fallback-logo';

      // Smart Badge Logic
      let badgeText = '';
      if (strain.award) badgeText = 'AWARD WINNER';
      else if (strain.favorite) badgeText = 'FAN FAVORITE';

      const highlightClass = badgeText ? 'is-award-winner' : '';
      const cornerBadgeHTML = badgeText ? `<span class="corner-award-badge">${badgeText}</span>` : '';

      // ==========================================
      // 1. TOP SCROLLER (AWARDS & FAVORITES)
      // ==========================================
      if (badgeText !== '' && featuredScroller) {
        const trophyHTML = `
          <div class="strain-card trophy-card ${highlightClass}">
            <div class="strain-card-inner">
              <div class="strain-image" style="background-image: url('${imageUrl}');">
                ${cornerBadgeHTML}
              </div>
              <div class="strain-top">
                <h3 class="strain-name">${strain.name}</h3>
              </div>
              <p class="strain-meta">${strain.type.toUpperCase()} | Genetics by ${strain.breeder}</p>
              <div class="strain-content">
                <p class="strain-notes">${strain.description}</p>
              </div>
            </div>
          </div>
        `;
        featuredScroller.innerHTML += trophyHTML;
      }

     // ==========================================
      // 2. MAIN VAULT LIBRARY (CLEAN TEASER CARD)
      // ==========================================
      const vaultHTML = `
        <article class="strain-card library-card ${highlightClass}">
          <div class="strain-card-inner">
            
            <div class="${imageClass} desktop-img" style="background-image: url('${imageUrl}');">
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
      `;
      vaultGrid.innerHTML += vaultHTML;
    });

  } catch (error) {
    console.error('Failed to load Strain Library:', error);
  }
}

document.addEventListener('DOMContentLoaded', loadStrainLibrary);
