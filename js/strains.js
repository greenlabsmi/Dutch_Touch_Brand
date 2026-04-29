document.addEventListener('DOMContentLoaded', async () => {
  
  // ============================================================
  // 1. MASTER HUB DATA FETCH
  // ============================================================
  let strains = [];
  const baseUrl = '';

  try {
    const response = await fetch('strains.json');
    strains = await response.json();
  } catch (error) {
    console.error('Failed to load strains for modal/filtering:', error);
  }

  // ============================================================
  // 2. GLOBAL NAV & HAMBURGER MENU LOGIC
  // ============================================================
  const nav = document.querySelector('.dt-nav');
  const hamburger = document.querySelector('.dt-nav-hamburger');
  const overlay = document.querySelector('.dt-menu-overlay');
  const closeMenu = document.querySelector('.dt-menu-close');
  const menuLinks = document.querySelectorAll('.dt-menu-links a');

  // Sticky Glass Scroll Effect
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    });
  }

  // Slide-Out Menu Activation
  if (hamburger && overlay) {
    hamburger.addEventListener('click', () => {
      overlay.classList.add('active');
      menuLinks.forEach((link, index) => {
        setTimeout(() => link.classList.add('revealed'), 100 + (index * 50));
      });
    });
  }
  if (closeMenu && overlay) {
    closeMenu.addEventListener('click', () => {
      overlay.classList.remove('active');
      menuLinks.forEach(link => link.classList.remove('revealed'));
    });
  }

  // ============================================================
  // 3. DYNAMIC CINEMATIC MODAL
  // ============================================================
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

  // ============================================================
  // 4. CARD CLICK EVENT DELEGATION
  // ============================================================
  document.body.addEventListener('click', (e) => {
    
    // Check if they clicked a strain card
    const card = e.target.closest('.strain-card');
    if (card) {
      // Use textContent instead of innerText to read text even if hidden on mobile
      const strainName = card.querySelector('.strain-name').textContent;
      const strainData = strains.find(s => s.name === strainName);

      if (strainData) {
        document.getElementById('modalName').textContent = strainData.name;
        document.getElementById('modalBreeder').textContent = "Genetics by " + strainData.breeder;
        
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
        
        document.getElementById('modalType').textContent = strainData.type.toUpperCase();
        document.getElementById('modalLineage').textContent = strainData.lineage;
        document.getElementById('modalDesc').textContent = strainData.description;

        modal.classList.add('open');
        document.body.style.overflow = 'hidden'; 
      }
    }

    // Check if they clicked the background blur to close
    if (e.target.classList.contains('strain-modal')) {
        closeDialog();
    }
  });

  const closeDialog = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };
  
  if (closeModal) closeModal.addEventListener('click', closeDialog);

  // ============================================================
  // 5. SEARCH & FILTERING ENGINE
  // ============================================================
  const searchInput = document.getElementById('strainSearch');
  const filterBtns = document.querySelectorAll('.strain-filter');

  function filterCards() {
    if (!searchInput) return;

    const query = searchInput.value.toLowerCase();
    const activeBtn = document.querySelector('.strain-filter.is-active');
    const filterType = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
    
    // Only apply filters to the main vault, letting the top scroller stay pristine
    const vaultCards = document.querySelectorAll('#vault-strains .strain-card');
    
    vaultCards.forEach(card => {
      const name = (card.querySelector('.strain-name')?.textContent || '').toLowerCase();
      const desc = (card.querySelector('.strain-notes')?.textContent || '').toLowerCase();
      const meta = (card.querySelector('.strain-meta')?.textContent || '').toLowerCase();
      
      // Look for the specific class added by our loader
      const hasAward = card.classList.contains('is-award-winner');
      
      const matchesSearch = name.includes(query) || desc.includes(query) || meta.includes(query);
      let matchesFilter = false;
      
      if (filterType === 'all' || filterType === 'az') matchesFilter = true;
      else if (filterType === 'award') matchesFilter = hasAward;
      else matchesFilter = meta.includes(filterType);

      // Must be 'flex' so the CSS grid styling doesn't break
      if (matchesSearch && matchesFilter) card.style.display = 'flex';
      else card.style.display = 'none';
    });

    // A-Z Layout Reordering
    if (filterType === 'az') {
      const grid = document.getElementById('vault-strains');
      if(grid) {
        Array.from(grid.children)
          .sort((a, b) => {
              const nameA = a.querySelector('.strain-name')?.textContent || '';
              const nameB = b.querySelector('.strain-name')?.textContent || '';
              return nameA.localeCompare(nameB);
          })
          .forEach(node => grid.appendChild(node));
      }
    }
  }

  if (searchInput) searchInput.addEventListener('input', filterCards);

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      filterCards();
    });
  });

  const observer = new MutationObserver(() => filterCards());
  const gridToWatch = document.getElementById('vault-strains');
  if(gridToWatch) observer.observe(gridToWatch, { childList: true });

  // ============================================================
  // 6. STICKY A-Z JUMP BAR LOGIC
  // ============================================================
  const jumpBar = document.querySelector('.alpha-jump-bar');
  if (jumpBar) {
    const alphabet = ["#", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")];
    jumpBar.innerHTML = ''; 
    alphabet.forEach(letter => {
      const btn = document.createElement('button');
      btn.className = 'alpha-btn';
      btn.textContent = letter;
      jumpBar.appendChild(btn);
    });

    jumpBar.addEventListener('click', (e) => {
      if (e.target.classList.contains('alpha-btn')) {
        const letter = e.target.textContent.toLowerCase();
        const allCards = document.querySelectorAll('#vault-strains .strain-card');
        
        for (let card of allCards) {
          const name = (card.querySelector('.strain-name')?.textContent || '').toLowerCase();
          const isMatch = letter === '#' ? name.match(/^\d/) : name.startsWith(letter);
          
          if (isMatch && card.style.display !== 'none') {
            const y = card.getBoundingClientRect().top + window.scrollY - 160; 
            window.scrollTo({top: y, behavior: 'smooth'});
            break; 
          }
        }
      }
    });
  }
});
