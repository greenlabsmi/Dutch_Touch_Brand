async function loadStrainLibrary() {
  // Check the full URL 'href' instead of 'hostname' so it sees "Green-Labs"
  const isGreenLabs = window.location.href.includes('Green-Labs');
  const baseUrl = isGreenLabs ? 'https://greenlabsmi.github.io/Dutch_Touch_Brand/' : '';

  try {
    const response = await fetch('https://greenlabsmi.github.io/Dutch_Touch_Brand/strains.json');
    const strains = await response.json();

    // Pointing everything directly to our consolidated library grid
    const vaultGrid = document.querySelector('#vault-strains');
    
    // Safety check just in case the grid hasn't loaded yet
    if (!vaultGrid) return; 

    strains.forEach(strain => {
      const imageUrl = strain.image ? `${baseUrl}${strain.image}` : `${baseUrl}assets/img/logo/dtg-logo-orange.png`;
      const imageClass = strain.image ? 'strain-image' : 'strain-image fallback-logo';

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

      // Just dump every card straight into the vault!
      vaultGrid.innerHTML += cardHTML;
    });

  } catch (error) {
    console.error('Failed to load Strain Library:', error);
  }
}

document.addEventListener('DOMContentLoaded', loadStrainLibrary);
