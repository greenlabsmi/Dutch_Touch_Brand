document.addEventListener('DOMContentLoaded', async () => {
  // 1. Fetch the master database so we have all the rich details for the modal
  let strains = [];
  const isGreenLabs = window.location.hostname.includes('Green-Labs');
  const baseUrl = isGreenLabs ? 'https://greenlabsmi.github.io/Dutch_Touch_Brand/' : '';

  try {
    const response = await fetch('https://greenlabsmi.github.io/Dutch_Touch_Brand/strains.json');
    strains = await response.json();
  } catch (error) {
    console.error('Failed to load strains for modal/filtering:', error);
  }

  // 2. Dynamically create the Modal HTML and inject it into the page
  const modalHTML = `
    <div class="strain-modal" id="strainModal">
      <div class="strain-modal-dialog">
        <button class="strain-modal-close" id="closeModal">&times;</button>
        <div class="strain-modal-header">
          <h3 id="modalName"></h3>
          <p id="modalBreeder" style="color: #d4af37; font-weight: 600;"></p>
        </div>
        <div class="strain-modal-layout">
          <div class="strain-modal-media">
            <div class="strain-modal-image-frame">
              <img id="modalImage" src="" alt="" style="width: 100%; border-radius: 12px; border: 1px solid #222;">
            </div>
          </div>
          <div class="strain-modal-body">
            <div class="strain-modal-section">
              <h4>Genetics</h4>
              <p><span class="label">Type:</span> <span id="modalType"></span></p>
              <p><span class="label">Lineage:</span> <span id="modalLineage"></span></p>
              <p><span class="label">THC:</span> <span id="modalThc"></span></p>
            </div>
            <div class="strain-modal-section">
              <h4>About</h4>
              <p id="modalDesc"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  const modal = document.getElementById('strainModal');
  const closeModal = document.getElementById('closeModal');

  // 3. Setup Click Listeners for the Cards (Event Delegation)
  document.body.addEventListener('click', (e) => {
    const card = e.target.closest('.strain-card');
    if (card) {
      
      // --- NEW MOBILE ACCORDION CHECK ---
      // Check if we are on mobile. If yes, toggle accordion and stop.
      if (window.innerWidth <= 768) {
        card.classList.toggle('is-expanded');
        return; 
      }
      // ----------------------------------

      // --- EXISTING DESKTOP MODAL LOGIC ---
      const strainName = card.querySelector('.strain-name').innerText;
      const strainData = strains.find(s => s.name === strainName);
      
      if (strainData) {
        // Populate the Modal text
        document.getElementById('modalName').innerText = strainData.name;
        document.getElementById('modalBreeder').innerText = "Genetics by " + strainData.breeder;
        
        // Handle the image (Standard image vs Fallback Logo)
        const imgEl = document.getElementById('modalImage');
        if (strainData.image) {
            imgEl.src = baseUrl + strainData.image;
            imgEl.style.objectFit = 'cover';
            imgEl.style.padding = '0';
            imgEl.style.backgroundColor = 'transparent';
        } else {
            imgEl.src = baseUrl + 'assets/img/logo/dtg-logo-orange.png';
            imgEl.style.objectFit = 'contain';
            imgEl.style.padding = '3rem';
            imgEl.style.backgroundColor = '#0b0b0b';
        }
        
        document.getElementById('modalType').innerText = strainData.type.toUpperCase();
        document.getElementById('modalLineage').innerText = strainData.lineage;
        document.getElementById('modalThc').innerText = strainData.thc || "N/A";
        document.getElementById('modalDesc').innerText = strainData.description;

        // Open Modal & lock background scrolling
        modal.classList.add('open');
        document.body.style.overflow = 'hidden'; 
      }
    }
  });

  // Close Modal Listeners
  const closeDialog = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };
  closeModal.addEventListener('click', closeDialog);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeDialog();
  });

  // 4. Setup Filtering and Searching (Only on the DTG Strains page)
  const searchInput = document.getElementById('strainSearch');
  const filterBtns = document.querySelectorAll('.strain-filter');

  function filterCards() {
    if (!searchInput) return; // Stop if there's no search bar

    const query = searchInput.value.toLowerCase();
    const activeBtn = document.querySelector('.strain-filter.is-active');
    const filterType = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';

    const allCards = document.querySelectorAll('.strain-card');
    
    allCards.forEach(card => {
      const name = card.querySelector('.strain-name').innerText.toLowerCase();
      const desc = card.querySelector('.strain-notes').innerText.toLowerCase();
      const meta = card.querySelector('.strain-meta').innerText.toLowerCase();
      const hasAward = card.querySelector('.strain-badge') !== null;
      
      const matchesSearch = name.includes(query) || desc.includes(query) || meta.includes(query);
      
      let matchesFilter = false;
      if (filterType === 'all' || filterType === 'az') {
        matchesFilter = true;
      } else if (filterType === 'award') {
        matchesFilter = hasAward;
      } else {
        matchesFilter = meta.includes(filterType);
      }

      // Show or hide the card
      if (matchesSearch && matchesFilter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });

    // Handle A-Z Sort Visually
    if (filterType === 'az') {
      ['current-strains', 'vault-strains'].forEach(gridId => {
        const grid = document.getElementById(gridId);
        if(grid) {
          Array.from(grid.children)
            .sort((a, b) => {
              const nameA = a.querySelector('.strain-name').innerText.toLowerCase();
              const nameB = b.querySelector('.strain-name').innerText.toLowerCase();
              return nameA.localeCompare(nameB);
            })
            .forEach(node => grid.appendChild(node));
        }
      });
    }
  }

  // Attach search and filter events
  if (searchInput) {
    searchInput.addEventListener('input', filterCards);
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      filterCards();
    });
  });

  // Automatically attach filters as soon as the dynamic cards finish loading
  const observer = new MutationObserver(() => filterCards());
  const gridToWatch = document.getElementById('current-strains');
  if(gridToWatch) {
      observer.observe(gridToWatch, { childList: true });
  }

  // 5. Alpha Jump Bar Logic
  const alphaBtns = document.querySelectorAll('.alpha-btn');
  alphaBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const letter = e.target.innerText.toLowerCase();
      const allCards = document.querySelectorAll('.strain-card');
      
      for (let card of allCards) {
        const name = card.querySelector('.strain-name').innerText.toLowerCase();
        
        // Find the first visible card that starts with the clicked letter
        if (name.startsWith(letter) && card.style.display !== 'none') {
          // Calculate position accounting for the fixed nav bar and jump bar
          const y = card.getBoundingClientRect().top + window.scrollY - 140; 
          window.scrollTo({top: y, behavior: 'smooth'});
          break; // Stop looping once we found the first match
        }
      }
    });
  });

});
