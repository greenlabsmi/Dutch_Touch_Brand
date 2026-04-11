document.addEventListener('DOMContentLoaded', async () => {
  // 1. Fetch the master database
  let strains = [];
  const isGreenLabs = window.location.hostname.includes('Green-Labs');
  const baseUrl = isGreenLabs ? 'https://greenlabsmi.github.io/Dutch_Touch_Brand/' : '';

  try {
    const response = await fetch('https://greenlabsmi.github.io/Dutch_Touch_Brand/strains.json');
    strains = await response.json();
  } catch (error) {
    console.error('Failed to load strains for modal/filtering:', error);
  }

  // 2. Dynamically create the Modal HTML
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
      const strainName = card.querySelector('.strain-name').innerText;
      const strainData = strains.find(s => s.name === strainName);

      // --- MOBILE HYBRID CHECK ---
      if (window.innerWidth <= 768) {
        // If there is NO custom image, toggle accordion and STOP.
        if (!strainData || !strainData.image) {
          card.classList.toggle('is-expanded');
          return; 
        }
        // If it DOES have a custom image, bypass the accordion and let it open the pop-up modal!
      }

      // --- EXISTING MODAL LOGIC (Desktop, or Mobile with Photo) ---
      if (strainData) {
        document.getElementById('modalName').innerText = strainData.name;
        document.getElementById('modalBreeder').innerText = "Genetics by " + strainData.breeder;
        
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

        modal.classList.add('open');
        document.body.style.overflow = 'hidden'; 
      }
    }
  });

  const closeDialog = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };
  closeModal.addEventListener('click', closeDialog);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeDialog();
  });

  // 4. Setup Filtering and Searching
  const searchInput = document.getElementById('strainSearch');
  const filterBtns = document.querySelectorAll('.strain-filter');

  function filterCards() {
    if (!searchInput) return;

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
      
      if (filterType === 'all' || filterType === 'az') matchesFilter = true;
      else if (filterType === 'award') matchesFilter = hasAward;
      else matchesFilter = meta.includes(filterType);

      if (matchesSearch && matchesFilter) card.style.display = 'block';
      else card.style.display = 'none';
    });

    if (filterType === 'az') {
      ['current-strains', 'vault-strains'].forEach(gridId => {
        const grid = document.getElementById(gridId);
        if(grid) {
          Array.from(grid.children)
            .sort((a, b) => a.querySelector('.strain-name').innerText.localeCompare(b.querySelector('.strain-name').innerText))
            .forEach(node => grid.appendChild(node));
        }
      });
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
  const gridToWatch = document.getElementById('current-strains');
  if(gridToWatch) observer.observe(gridToWatch, { childList: true });

  // 5. SIDE BAR ALPHA JUMP LOGIC
  const jumpBar = document.querySelector('.alpha-jump-bar');
  if (jumpBar) {
    // Generate the alphabet dynamically (plus # for numbers)
    const alphabet = ["#", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")];
    jumpBar.innerHTML = ''; 
    alphabet.forEach(letter => {
      const btn = document.createElement('button');
      btn.className = 'alpha-btn';
      btn.innerText = letter;
      jumpBar.appendChild(btn);
    });

    jumpBar.addEventListener('click', (e) => {
      if (e.target.classList.contains('alpha-btn')) {
        const letter = e.target.innerText.toLowerCase();
        const allCards = document.querySelectorAll('.strain-card');
        
        for (let card of allCards) {
          const name = card.querySelector('.strain-name').innerText.toLowerCase();
          
          // Check if it starts with a number (for the # button) OR the specific letter
          const isMatch = letter === '#' ? name.match(/^\d/) : name.startsWith(letter);
          
          if (isMatch && card.style.display !== 'none') {
            // Calculate scroll position (offset by 100px so nav bar doesn't cover it)
            const y = card.getBoundingClientRect().top + window.scrollY - 100; 
            window.scrollTo({top: y, behavior: 'smooth'});
            break; 
          }
        }
      }
    });
  }
});
