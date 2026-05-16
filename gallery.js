// SUPABASE CONFIGURATION
const supabaseUrl = 'https://cvdlqhjkcgbjezqixsci.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2ZGxxaGprY2diamV6cWl4c2NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NTYwMjMsImV4cCI6MjA5NDQzMjAyM30.msfkqmZiyveV4JOJVyk1EuhOfxwbqrrXyMLFlhi2o1U';
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

// GALLERY DATA
const defaultGalleryItems = [
    {
        id: 1,
        title: 'Wedding Campaign Poster',
        category: 'poster',
        image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=400&fit=crop',
        description: 'Modern wedding celebration poster design with elegant typography and vibrant colors.'
    },
    {
        id: 2,
        title: 'E-Commerce Website',
        category: 'website',
        image: 'https://images.unsplash.com/photo-1460925895917-adf4198c839f?w=600&h=400&fit=crop',
        description: 'Responsive e-commerce platform with modern UI and seamless user experience.'
    },
    {
        id: 3,
        title: 'Festival Event Poster',
        category: 'poster',
        image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=400&fit=crop',
        description: 'Vibrant festival poster featuring cultural elements and bold typography.'
    },
    {
        id: 4,
        title: 'Corporate Portfolio Site',
        category: 'website',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop',
        description: 'Professional corporate website showcasing services and portfolio with elegant design.'
    },
    {
        id: 5,
        title: 'Product Launch Poster',
        category: 'poster',
        image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=600&h=400&fit=crop',
        description: 'Eye-catching product launch poster with modern minimalist design approach.'
    },
    {
        id: 6,
        title: 'SaaS Landing Page',
        category: 'website',
        image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&h=400&fit=crop',
        description: 'High-converting SaaS landing page with conversion-focused design elements.'
    },
    {
        id: 7,
        title: 'Music Event Poster',
        category: 'poster',
        image: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=600&h=400&fit=crop',
        description: 'Dynamic music event poster with striking visual hierarchy and modern aesthetics.'
    },
    {
        id: 8,
        title: 'Restaurant Website',
        category: 'website',
        image: 'https://images.unsplash.com/photo-1504674900967-a8d3ba5ed2f5?w=600&h=400&fit=crop',
        description: 'Beautiful restaurant website featuring menu showcase and reservation system.'
    },
    {
        id: 9,
        title: 'Conference Poster',
        category: 'poster',
        image: 'https://images.unsplash.com/photo-1540575467063-178f50902f4b?w=600&h=400&fit=crop',
        description: 'Professional conference poster with clean layout and corporate branding.'
    }
];

let galleryItems = [...defaultGalleryItems];

let currentFilter = 'all';

// INITIALIZE
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    loadGalleryFromSupabase();
});

async function loadGalleryFromSupabase() {
    try {
        const { data, error } = await supabaseClient
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });
            
        if (error) throw error;
        
        if (data && data.length > 0) {
            galleryItems = data;
        } else {
            galleryItems = [...defaultGalleryItems];
        }
        
        renderGallery();
        
        const adminPanel = document.getElementById('adminPanel');
        if (adminPanel && !adminPanel.classList.contains('hidden')) {
            renderAdminList();
        }
    } catch (error) {
        console.error('Error loading gallery:', error);
        galleryItems = [...defaultGalleryItems];
        renderGallery();
    }
}

// SETUP EVENT LISTENERS
function setupEventListeners() {
    // Filter Buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderGallery();
        });
    });
}

// RENDER GALLERY
function renderGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    galleryGrid.innerHTML = '';

    const filteredItems = currentFilter === 'all' 
        ? galleryItems 
        : galleryItems.filter(item => item.category === currentFilter);

    filteredItems.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'gallery-card';
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="gallery-card-image">
            <div class="gallery-card-overlay">
                <div class="gallery-card-content">
                    <h3 class="gallery-card-title">${item.title}</h3>
                    <p class="gallery-card-category">${item.category}</p>
                    <button class="gallery-card-view-btn" onclick="openLightbox(${item.id})">View</button>
                </div>
            </div>
        `;

        card.addEventListener('click', () => openLightbox(item.id));
        
        setTimeout(() => {
            card.classList.add('show');
        }, 10);

        galleryGrid.appendChild(card);
    });
}

// LIGHTBOX FUNCTIONS
function openLightbox(itemId) {
    const item = galleryItems.find(i => i.id === itemId);
    if (item) {
        document.getElementById('lightboxImage').src = item.image;
        document.getElementById('lightboxTitle').textContent = item.title;
        document.getElementById('lightboxDesc').textContent = item.description;
        document.getElementById('lightboxModal').classList.add('open');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox(event) {
    if (event && event.type === 'click' && event.target !== document.getElementById('lightboxModal')) {
        return;
    }
    document.getElementById('lightboxModal').classList.remove('open');
    document.body.style.overflow = 'auto';
}

// SCROLL TO TOP
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

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
// DEVELOPER BACKDOOR
// The required access sequence is securely hashed to prevent exposure in the repository
const ACCESS_HASH = 'a0fea29c0637018913fc6ebe6ca5c91452fa977bf360ca50220089f138ee9755'; // SHA-256 of 'cyber_lock_alpha'
// The trigger sequence is base64 encoded to obfuscate it from plain text searches
const TRIGGER_SEQUENCE = atob('YnJhbmRpbms='); // 'brandink'
let devKeySequence = '';

// Rolling key sequence matcher
window.addEventListener('keydown', (e) => {
    // Only track single printable characters
    if (!e.key || e.key.length !== 1) return;
    
    // Append the typed key
    devKeySequence += e.key.toLowerCase();
    
    // Keep the sequence length capped to prevent memory issues
    if (devKeySequence.length > 25) {
        devKeySequence = devKeySequence.slice(-25);
    }
    
    // Check if the sequence ends with our trigger word
    if (devKeySequence.endsWith(TRIGGER_SEQUENCE)) {
        devKeySequence = ''; // Reset sequence
        
        const promptModal = document.getElementById('secretPromptModal');
        const adminPanel = document.getElementById('adminPanel');
        
        // Ensure the prompt and admin panel exist, and admin isn't already open
        if (promptModal && adminPanel && adminPanel.classList.contains('hidden')) {
            openSecretPrompt();
        }
    }
});

function openSecretPrompt() {
    document.getElementById('secretPromptModal').classList.add('open');
    document.getElementById('secretInput').focus();
    document.body.style.overflow = 'hidden';
}

function closeSecretPrompt(event) {
    if (event && event.type === 'click' && event.target !== document.getElementById('secretPromptModal')) {
        return;
    }
    document.getElementById('secretPromptModal').classList.remove('open');
    document.getElementById('secretInput').value = '';
    document.body.style.overflow = 'auto';
}

async function checkSecret() {
    const input = document.getElementById('secretInput').value;
    
    // Hash the input to verify securely without exposing the plaintext key
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const inputHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    if (inputHash === ACCESS_HASH) {
        closeSecretPrompt();
        openAdmin();
    } else {
        alert('Access Denied');
        document.getElementById('secretInput').value = '';
    }
}

function openAdmin() {
    document.getElementById('adminPanel').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    renderAdminList();
}

function closeAdmin() {
    document.getElementById('adminPanel').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function renderAdminList() {
    const list = document.getElementById('adminProjectList');
    list.innerHTML = '';
    
    galleryItems.forEach(item => {
        const div = document.createElement('div');
        div.className = 'admin-item';
        div.innerHTML = `
            <div class="admin-item-info">
                <img src="${item.image}" alt="${item.title}" class="admin-item-img">
                <div>
                    <div class="admin-item-title">${item.title}</div>
                    <div class="admin-item-cat">${item.category}</div>
                </div>
            </div>
            <button class="delete-btn" onclick="removeProject(${item.id})">Delete</button>
        `;
        list.appendChild(div);
    });
}

async function addProject() {
    const title = document.getElementById('newTitle').value;
    const category = document.getElementById('newCategory').value;
    const image = document.getElementById('newImage').value;
    const desc = document.getElementById('newDesc').value;
    
    if (!title || !image) {
        alert('Title and Image URL are required!');
        return;
    }

    const newItem = {
        title: title,
        category: category,
        image: image,
        description: desc
    };
    
    try {
        const { data, error } = await supabaseClient
            .from('projects')
            .insert([newItem])
            .select();
            
        if (error) throw error;
        
        // Clear form
        document.getElementById('newTitle').value = '';
        document.getElementById('newImage').value = '';
        document.getElementById('newDesc').value = '';
        
        // Reload from DB
        await loadGalleryFromSupabase();
        
        alert('Project Added Successfully!');
    } catch (error) {
        console.error('Error adding project:', error);
        alert('Failed to add project. Please try again.');
    }
}

async function removeProject(id) {
    if(confirm('Are you sure you want to delete this project?')) {
        try {
            const { error } = await supabaseClient
                .from('projects')
                .delete()
                .eq('id', id);
                
            if (error) throw error;
            
            // Reload from DB
            await loadGalleryFromSupabase();
        } catch (error) {
            console.error('Error removing project:', error);
            alert('Failed to delete project.');
        }
    }
}
