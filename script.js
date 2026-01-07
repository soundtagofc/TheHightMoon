// Server links storage
let serverLinks = {
    winter: 'https://www.roblox.com/games/your-winter-server-id',
    summer: 'https://www.roblox.com/games/your-summer-server-id'
};

// Social links storage
let socialLinks = {
    discord: 'https://discord.gg/your-discord-server',
    telegram: 'https://t.me/your-telegram-channel'
};

// Server status storage
let serverStatus = {
    winter: 'online',
    summer: 'online'
};

// Custom status text storage
let customStatusText = {
    winter: '',
    summer: ''
};

// Statistics for admin
let stats = {
    winterClicks: 0,
    summerClicks: 0,
    totalJoins: 0,
    lastUpdate: 'Никогда'
};

// Load server links from localStorage
function loadServerLinks() {
    const saved = localStorage.getItem('serverLinks');
    if (saved) {
        serverLinks = JSON.parse(saved);
    }
    
    const savedSocial = localStorage.getItem('socialLinks');
    if (savedSocial) {
        socialLinks = JSON.parse(savedSocial);
    }
    
    const savedStatus = localStorage.getItem('serverStatus');
    if (savedStatus) {
        serverStatus = JSON.parse(savedStatus);
    }
    
    const savedCustomText = localStorage.getItem('customStatusText');
    if (savedCustomText) {
        customStatusText = JSON.parse(savedCustomText);
    }
    
    const savedStats = localStorage.getItem('adminStats');
    if (savedStats) {
        stats = JSON.parse(savedStats);
    }
    
    // Update server status display
    updateMainServerStatus();
    
    // Update total joins display
    updateTotalJoinsDisplay();
}

// Update total joins display
function updateTotalJoinsDisplay() {
    const counter = document.getElementById('total-joins');
    if (counter) {
        counter.textContent = stats.totalJoins.toLocaleString();
    }
}

// Update server status on main site
function updateMainServerStatus() {
    updateMainServerStatusDisplay('winter');
    updateMainServerStatusDisplay('summer');
}

function updateMainServerStatusDisplay(serverType) {
    const statusElement = document.getElementById(`main-${serverType}-status`);
    if (!statusElement) return;
    
    const statusDot = statusElement.querySelector('.status-dot');
    const status = serverStatus[serverType];
    
    // Remove all status classes
    statusDot.className = 'status-dot';
    
    switch (status) {
        case 'online':
            statusDot.classList.add('online');
            statusElement.textContent = '';
            statusElement.appendChild(statusDot);
            statusElement.appendChild(document.createTextNode('Онлайн'));
            break;
        case 'offline':
            statusDot.classList.add('offline');
            statusElement.textContent = '';
            statusElement.appendChild(statusDot);
            statusElement.appendChild(document.createTextNode('Оффлайн'));
            break;
        case 'maintenance':
            statusDot.classList.add('maintenance');
            statusElement.textContent = '';
            statusElement.appendChild(statusDot);
            statusElement.appendChild(document.createTextNode('Техработы'));
            break;
        case 'custom':
            statusDot.classList.add('online');
            statusElement.textContent = '';
            statusElement.appendChild(statusDot);
            statusElement.appendChild(document.createTextNode(customStatusText[serverType] || 'Кастомный статус'));
            break;
    }
}

// Save server links to localStorage
function saveServerLinks() {
    localStorage.setItem('serverLinks', JSON.stringify(serverLinks));
    localStorage.setItem('socialLinks', JSON.stringify(socialLinks));
    localStorage.setItem('serverStatus', JSON.stringify(serverStatus));
    localStorage.setItem('customStatusText', JSON.stringify(customStatusText));
    localStorage.setItem('adminStats', JSON.stringify(stats));
}

// Smooth scrolling
function scrollToServers() {
    document.getElementById('servers').scrollIntoView({
        behavior: 'smooth'
    });
}

// Open Discord
function openDiscord() {
    const link = socialLinks.discord;
    if (link && link !== 'https://discord.gg/your-discord-server') {
        window.open(link, '_blank');
    } else {
        showNotification('Ссылка на Discord еще не настроена!', 'warning');
    }
}

// Open Telegram
function openTelegram() {
    const link = socialLinks.telegram;
    if (link && link !== 'https://t.me/your-telegram-channel') {
        window.open(link, '_blank');
    } else {
        showNotification('Ссылка на Telegram еще не настроена!', 'warning');
    }
}

// Join server function
function joinServer(serverType) {
    const link = serverLinks[serverType];
    if (link && link !== `https://www.roblox.com/games/your-${serverType}-server-id`) {
        // Update click statistics
        if (serverType === 'winter') {
            stats.winterClicks++;
        } else {
            stats.summerClicks++;
        }
        stats.totalJoins++;
        saveServerLinks();
        
        // Update display immediately
        updateTotalJoinsDisplay();
        
        // Add glow effect to counter
        const counter = document.getElementById('total-joins');
        if (counter) {
            counter.style.textShadow = '0 0 20px rgba(0, 212, 255, 0.8)';
            setTimeout(() => {
                counter.style.textShadow = '0 0 10px rgba(0, 212, 255, 0.5)';
            }, 500);
        }
        
        window.open(link, '_blank');
        showNotification(`Переход на ${serverType === 'winter' ? 'Winter' : 'Summer'} сервер!`, 'success');
    } else {
        showNotification(`Ссылка на ${serverType === 'winter' ? 'Winter' : 'Summer'} сервер еще не настроена!`, 'warning');
    }
}

// Create falling stars
function createFallingStars() {
    const starsContainer = document.querySelector('.stars');
    
    function createFallingStar() {
        const star = document.createElement('div');
        star.className = 'falling-star';
        
        // Random starting position from right side
        star.style.left = (window.innerWidth + 10) + 'px';
        star.style.top = Math.random() * window.innerHeight * 0.8 + 'px';
        
        // Random animation duration (4-8 seconds)
        const duration = Math.random() * 4 + 4;
        star.style.animationDuration = duration + 's';
        
        // Random delay before starting
        star.style.animationDelay = Math.random() * 2 + 's';
        
        starsContainer.appendChild(star);
        
        // Remove star after animation
        setTimeout(() => {
            if (star.parentNode) {
                star.remove();
            }
        }, (duration + 2) * 1000);
    }
    
    // Create initial falling stars
    for (let i = 0; i < 3; i++) {
        setTimeout(() => createFallingStar(), i * 2000);
    }
    
    // Continue creating falling stars
    setInterval(() => {
        if (Math.random() < 0.3) { // 30% chance every interval
            createFallingStar();
        }
    }, 3000);
}

// Initialize total joins counter
function initializeTotalJoinsCounter() {
    // Calculate total joins from existing data
    if (stats.totalJoins === 0) {
        stats.totalJoins = stats.winterClicks + stats.summerClicks;
        saveServerLinks();
    }
    updateTotalJoinsDisplay();
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Styles for notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.background = 'linear-gradient(45deg, #00ff00, #00cc00)';
            break;
        case 'error':
            notification.style.background = 'linear-gradient(45deg, #ff4444, #cc0000)';
            break;
        case 'warning':
            notification.style.background = 'linear-gradient(45deg, #ffaa00, #cc8800)';
            break;
        default:
            notification.style.background = 'linear-gradient(45deg, #00d4ff, #0099cc)';
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 3000);
}

// Add CSS animations for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Load server links
    loadServerLinks();
    
    // Create falling stars
    createFallingStars();
    
    // Initialize total joins counter
    initializeTotalJoinsCounter();
    
    // Navigation smooth scrolling
    const navLinks = document.querySelectorAll('.nav-link:not(.admin-link)');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const moon = document.querySelector('.moon');
        
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        if (moon) {
            moon.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    });
    
    // Add hover effects to server cards
    const serverCards = document.querySelectorAll('.server-card');
    serverCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing effect after a delay
        setTimeout(typeWriter, 1000);
    }
    
    // Add glow effect on scroll
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 1s ease';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        observer.observe(section);
    });
});

// Add some fun easter eggs
let clickCount = 0;
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('moon')) {
        clickCount++;
        if (clickCount === 5) {
            showNotification('🌙 Секретная луна активирована! 💨', 'success');
            e.target.style.animation = 'moonFloat 1s ease infinite';
            clickCount = 0;
        }
    }
    
    // Add vape smoke effect on any click
    createVapeSmoke(e.clientX, e.clientY);
});

// Create vape smoke effect
function createVapeSmoke(x, y) {
    const smoke = document.createElement('div');
    smoke.className = 'click-smoke';
    smoke.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        animation: clickSmokeFloat 2s ease-out forwards;
    `;
    
    document.body.appendChild(smoke);
    
    setTimeout(() => {
        if (smoke.parentNode) {
            smoke.remove();
        }
    }, 2000);
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Escape to close notifications
    if (e.key === 'Escape') {
        const notification = document.querySelector('.notification');
        if (notification) {
            notification.remove();
        }
    }
});

// Add particle effect on button hover
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            createParticles(this);
        });
    });
});

function createParticles(element) {
    const rect = element.getBoundingClientRect();
    const particles = 5;
    
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${rect.left + Math.random() * rect.width}px;
            top: ${rect.top + Math.random() * rect.height}px;
            animation: particleFloat 1s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 1000);
    }
}

// Add particle animation
const particleAnimation = document.createElement('style');
particleAnimation.textContent = `
    @keyframes particleFloat {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-50px) scale(0);
        }
    }
`;
document.head.appendChild(particleAnimation);