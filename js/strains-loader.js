async function loadStrainLibrary() {
  // Check which website we are currently on
  const isGreenLabs = window.location.hostname.includes('Green-Labs');
  const baseUrl = isGreenLabs ? 'https://greenlabsmi.github.io/Dutch_Touch_Brand/' : '';

  try {
    const response = await fetch('https://greenlabsmi.github.io/Dutch_Touch_Brand/strains.json');
    const strains = await response.json();

    const currentGrid = document.querySelector('#current-strains');
    const vaultGrid = document.querySelector('#vault-strains');

    strains.forEach(strain => {
      // FIX 1: Corrected fallback logo path to match your actual server files
      const imageUrl = strain.image ? `${baseUrl}${strain.image}` : `${baseUrl}assets/img/logo/dtg-logo-orange.png`;
      const imageClass = strain.image ? 'strain-image' : 'strain-image fallback-logo';

      // FIX 2: Changed "Bred by" to "Genetics by"
      const cardHTML = `
        <article class="strain-card">
          <div class="strain-card-inner">
            <div class="${imageClass}" style="background-image: url('${imageUrl}');"></div>
            <div class="strain-content">
              <div class="strain-top">
                <h3 class="strain-name">${strain.name}</h3>
                ${strain.award ? `<span class="strain-badge">Award Winner</span>` : ''}
              </div>
              <p class="strain-meta">${strain.type.toUpperCase()} | Genetics by ${strain.breeder}</p>
              <p class="strain-meta" style="color: #d4af37; font-size: 0.85rem;">${strain.lineage}</p>
              <p class="strain-notes">${strain.description}</p>
            </div>
          </div>
        </article>
      `;

      // 3. Sort into the correct grid based on "status"
      if (strain.status === 'current' && currentGrid) {
        currentGrid.innerHTML += cardHTML;
      } else if (strain.status === 'vault' && vaultGrid && !isGreenLabs) {
        vaultGrid.innerHTML += cardHTML;
      }
    });

  } catch (error) {
    console.error('Failed to load Strain Library:', error);
  }
}

document.addEventListener('DOMContentLoaded', loadStrainLibrary);
