// STATE VARIABLES
let showSplash = true;
let isMenuOpen = false;
let scrolled = false;
let isChatOpen = false;
let activeChatService = null;

// SERVICES DATA
const services = [
    { 
        id: 1, 
        title: 'Single page websites', 
        icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>`, 
        desc: 'High-performance landing pages built for conversion.', 
        points: ['Responsive', 'SEO Ready', 'Fast'],
        phone: "+91 80862 97571" 
    },
    { 
        id: 2, 
        title: 'Event Websites', 
        icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`, 
        desc: 'Custom portals for weddings, corporate meets & festivals.', 
        points: ['RSVP Flow', 'Updates', 'Gallery'],
        phone: "+91 80862 97571" 
    },
    { 
        id: 3, 
        title: 'Logo design', 
        icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`, 
        desc: 'Unique visual identities defining your brand character.', 
        points: ['Vector Files', 'Brand Guide', 'Originals'],
        phone: "+91 90725 17478" 
    },
    { 
        id: 4, 
        title: 'Posters & Event Creatives', 
        icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`, 
        desc: 'Stunning digital and print assets for your campaigns.', 
        points: ['Print Ready', 'Social Media', 'Custom'],
        phone: "+91 90725 17478" 
    },
    { 
        id: 5, 
        title: 'Google Business Profile Setup', 
        icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`, 
        desc: 'Optimization for local discoverability and map ranking.', 
        points: ['Profile Setup', 'Map SEO', 'Reviews'],
        phone: "+91 80862 97571" 
    },
    { 
        id: 6, 
        title: 'Brochure & Business Cards', 
        icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>`, 
        desc: 'Professional print materials for your brand identity.', 
        points: ['Custom Design', 'Print Ready', 'Brand Aligned'],
        phone: "+91 90725 17478" 
    }
];

// INITIALIZE
document.addEventListener('DOMContentLoaded', () => {
    // Hide floating UI during splash
    const floatingInstagram = document.querySelector('.floating-instagram');
    const floatingButtons = document.querySelector('.floating-buttons');
    const floatingWhatsapp = document.querySelector('.floating-whatsapp');
    if (floatingInstagram) floatingInstagram.style.display = 'none';
    if (floatingButtons) floatingButtons.style.display = 'none';
    if (floatingWhatsapp) floatingWhatsapp.style.display = 'none';
    
    renderServices();
    populateServiceSelect();
    setupEventListeners();
    closeSplashAfterDelay();
});

// SPLASH SCREEN
function closeSplashAfterDelay() {
    setTimeout(() => {
        closeSplash();
    }, 2800);
}

function closeSplash() {
    showSplash = false;
    const splashScreen = document.getElementById('splashScreen');
    const mainContent = document.getElementById('mainContent');
    
    splashScreen.classList.add('hidden');
    mainContent.classList.remove('hidden');
    
    // Show floating UI after splash closes
    const floatingInstagram = document.querySelector('.floating-instagram');
    const floatingButtons = document.querySelector('.floating-buttons');
    const floatingWhatsapp = document.querySelector('.floating-whatsapp');
    if (floatingInstagram) floatingInstagram.style.display = '';
    if (floatingButtons) floatingButtons.style.display = '';
    if (floatingWhatsapp) floatingWhatsapp.style.display = '';
}

// NAVIGATION
function setupEventListeners() {
    // Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navbarLinks = document.getElementById('navbarLinks');
    
    menuToggle.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        menuToggle.classList.toggle('open');
        navbarLinks.classList.toggle('open');
    });

    // Scroll Detection
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        scrolled = window.scrollY > 50;
        
        if (scrolled) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Close menu on link click
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                isMenuOpen = false;
                menuToggle.classList.remove('open');
                navbarLinks.classList.remove('open');
            }
        });
    });

    // Chat Toggle
    const chatToggle = document.getElementById('chatToggle');
    chatToggle.addEventListener('click', () => {
        isChatOpen = !isChatOpen;
        const chatPopup = document.getElementById('chatPopup');
        
        if (isChatOpen) {
            chatPopup.classList.add('open');
            closeChatService();
        } else {
            chatPopup.classList.remove('open');
        }
    });
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// SERVICES
function renderServices() {
    const grid = document.getElementById('servicesGrid');
    grid.innerHTML = '';

    services.forEach((service, index) => {
        const isDark = index % 2 !== 0;
        const card = document.createElement('div');
        card.className = `service-card ${isDark ? 'dark' : 'light'}`;
        
        const pointsHTML = service.points.map(point => `
            <span class="point">
                <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
                ${point}
            </span>
        `).join('');

        card.innerHTML = `
            <div class="service-icon">
                <span style="font-size: 1.5rem;">${service.icon}</span>
            </div>
            <h3 class="service-title">${service.title}</h3>
            <p class="service-description">${service.desc}</p>
            <div class="service-points">
                ${pointsHTML}
            </div>
        `;

        grid.appendChild(card);
    });
}

function populateServiceSelect() {
    const select = document.getElementById('serviceSelect');
    services.forEach(service => {
        const option = document.createElement('option');
        option.value = service.title;
        option.textContent = service.title;
        select.appendChild(option);
    });
}



// CHAT POPUP
let chatState = 'initial'; // states: initial, services, service_detail, success

function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
}

function renderChatContent() {
    const chatContent = document.getElementById('chatContent');
    const chatBack = document.getElementById('chatBack');

    if (chatState === 'initial') {
        chatBack.classList.remove('show');
        chatContent.innerHTML = `
            <div class="chat-services">
                <p class="chat-message">${getGreeting()}! How can I help you?</p>
                <a href="gallery.html" class="chat-service-btn" style="text-decoration:none">
                    <span>View our works</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </a>
                <a href="https://wa.me/919074242334?text=Hi,%20I%20would%20like%20to%20connect%20with%20BrandInk%20Studios." target="_blank" class="chat-service-btn" style="text-decoration:none">
                    <span>Reach us</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </a>
                <button class="chat-service-btn" onclick="chatState = 'services'; renderChatContent();">
                    <span>Others</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
            </div>
        `;
    } else if (chatState === 'services') {
        chatBack.classList.add('show');
        chatBack.onclick = () => { chatState = 'initial'; renderChatContent(); };
        
        const servicesHTML = services.map(s => `
            <button class="chat-service-btn" onclick="selectChatService(${s.id})">
                <span>${s.title}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
        `).join('');

        chatContent.innerHTML = `
            <div class="chat-services">
                <p class="chat-message">Please select a service:</p>
                ${servicesHTML}
            </div>
        `;
    } else if (chatState === 'service_detail' && activeChatService) {
        chatBack.classList.add('show');
        chatBack.onclick = () => { chatState = 'services'; renderChatContent(); };
        
        chatContent.innerHTML = `
            <div class="service-detail">
                <div class="service-detail-icon">
                    <span style="font-size: 2rem;">${activeChatService.icon}</span>
                </div>
                <h3 class="service-detail-title">${activeChatService.title}</h3>
                <div style="margin-top: 1rem; width: 100%;">
                    <input type="tel" id="requestPhone" placeholder="Enter your phone number" style="width: 100%; padding: 0.75rem; border-radius: 0.5rem; border: 1px solid rgba(91, 14, 20, 0.2); margin-bottom: 0.75rem; font-family: inherit;">
                    <button onclick="submitCallRequest()" class="service-call-btn" style="width: 100%; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        Request a Call
                    </button>
                </div>
            </div>
        `;
    } else if (chatState === 'success') {
        chatBack.classList.add('show');
        chatBack.onclick = () => { chatState = 'initial'; renderChatContent(); };
        
        chatContent.innerHTML = `
            <div class="chat-services" style="text-align: center; padding: 2rem 1rem;">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#5B0E14" stroke-width="2" style="margin-bottom: 1rem;">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <p class="chat-message" style="font-size: 1.1rem; color: #5B0E14; margin-bottom: 0;">Thank you for your interest, our team will get in touch with you soon...</p>
            </div>
        `;
    }
}

function selectChatService(serviceId) {
    activeChatService = services.find(s => s.id === serviceId);
    chatState = 'service_detail';
    renderChatContent();
}

function closeChatService() {
    chatState = 'initial';
    activeChatService = null;
    renderChatContent();
}

function submitCallRequest() {
    const phoneInput = document.getElementById('requestPhone').value;
    if (!phoneInput) {
        alert('Please enter your phone number.');
        return;
    }
    
    // Construct the message
    const message = encodeURIComponent(`Hi, ${phoneInput} is requesting a call regarding ${activeChatService.title}.`);
    // Send message to the specific phone associated with that service
    const targetPhone = activeChatService.phone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${targetPhone}?text=${message}`, '_blank');
    
    // Update state to success
    chatState = 'success';
    renderChatContent();
}

// Watch chat state to update UI
const chatToggle = document.getElementById('chatToggle');
if (chatToggle) {
    chatToggle.addEventListener('click', () => {
        const chatPopup = document.getElementById('chatPopup');
        if (chatPopup.classList.contains('open')) {
            renderChatContent();
        }
    });
}

// Initial chat render
renderChatContent();

// TERMS MODAL
function openTerms(event) {
    if (event) {
        event.preventDefault();
    }
    const termsModal = document.getElementById('termsModal');
    termsModal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeTerms(event) {
    if (event && event.type === 'click' && event.target !== document.getElementById('termsModal')) {
        return;
    }
    const termsModal = document.getElementById('termsModal');
    termsModal.classList.remove('open');
    document.body.style.overflow = 'auto';
}

// Close chat when menu opens
const menuToggle = document.getElementById('menuToggle');
const originalMenuClickHandler = menuToggle ? menuToggle.onclick : null;

// Override menu toggle to close chat
document.addEventListener('click', (e) => {
    if (isMenuOpen && !e.target.closest('.navbar') && !e.target.closest('.navbar-links')) {
        // Menu is open and clicked outside
        if (!e.target.closest('#floatingUI')) {
            isMenuOpen = false;
            const menuToggle = document.getElementById('menuToggle');
            const navbarLinks = document.getElementById('navbarLinks');
            menuToggle.classList.remove('open');
            navbarLinks.classList.remove('open');
        }
    }
});

// SMOOTH SCROLLING FOR ANCHOR LINKS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add a check to prevent multiple splash screen closures
let splashClosed = false;
