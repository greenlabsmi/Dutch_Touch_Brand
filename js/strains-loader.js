async function loadStrainLibrary() {
  const isGreenLabs = window.location.href.includes('Green-Labs');
  const baseUrl = isGreenLabs ? 'https://greenlabsmi.github.io/Dutch_Touch_Brand/' : '';

  try {
    const response = await fetch('https://greenlabsmi.github.io/Dutch_Touch_Brand/strains.json');
    const strains = await response.json();

    const vaultGrid = document.querySelector('#vault-strains');
    const featuredScroller = document.querySelector('#featured-strains');

    if (!vaultGrid) return;

    strains.forEach(strain => {
      const imageUrl = strain.image ? `${baseUrl}${strain.image}` : `${baseUrl}assets/img/logo/dtg-logo-orange.png`;
      const imageClass = strain.image ? 'strain-image' : 'strain-image fallback-logo';

      // Smart Badge Logic
      let badgeText = '';
      if (strain.award) badgeText = 'AWARD WINNER';
      else if (strain.favorite) badgeText = 'FAN FAVORITE';

      const highlightClass = badgeText ? 'is-award-winner' : '';
      const cornerBadgeHTML = badgeText ? `<span class="corner-award-badge">${badgeText}</span>` : '';
      const mobileBadgeHTML = badgeText ? `<div class="deli-badge-corner badge--fresh">${badgeText}</div>` : '';

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
      // 2. MAIN VAULT LIBRARY (DESKTOP NORMAL + MOBILE 3D FLIP)
      // ==========================================
      const vaultHTML = `
        <article class="strain-card library-card ${highlightClass}">
          <div class="strain-card-inner deli-card" onclick="if(window.innerWidth <= 768) this.classList.toggle('is-flipped');">
            
            <div class="deli-card__front" style="background-image: url('${imageUrl}');">
              ${mobileBadgeHTML}
              <div class="deli-card__hint">Tap for Info 🔄</div>
            </div>

            <div class="deli-card__back">
              <div class="${imageClass} desktop-img" style="background-image: url('${imageUrl}');">
                ${cornerBadgeHTML}
              </div>
              <div class="strain-content">
                <div class="strain-top">
                  <h3 class="strain-name">${strain.name}</h3>
                </div>
                <p class="strain-meta">${strain.type.toUpperCase()} | Genetics by ${strain.breeder}</p>
                <p class="strain-meta" style="color: #d4af37; font-size: 0.85rem;">${strain.lineage}</p>
                <p class="strain-notes">${strain.description}</p>
              </div>
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
