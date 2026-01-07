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

// Statistics storage
let stats = {
    winterClicks: 0,
    summerClicks: 0,
    totalJoins: 0,
    lastUpdate: 'Никогда'
};

// Admin password
const ADMIN_PASSWORD = 'thehightmoon2024';

// Load data from localStorage
function loadData() {
    const savedLinks = localStorage.getItem('serverLinks');
    if (savedLinks) {
        serverLinks = JSON.parse(savedLinks);
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
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('serverLinks', JSON.stringify(serverLinks));
    localStorage.setItem('socialLinks', JSON.stringify(socialLinks));
    localStorage.setItem('serverStatus', JSON.stringify(serverStatus));
    localStorage.setItem('customStatusText', JSON.stringify(customStatusText));
    localStorage.setItem('adminStats', JSON.stringify(stats));
}

// Login function
function loginAdmin() {
    const password = document.getElementById('admin-password').value;
    if (password === ADMIN_PASSWORD) {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('admin-panel').style.display = 'block';
        loadAdminData();
        showNotification('Успешный вход в админ панель!', 'success');
    } else {
        showNotification('Неверный пароль!', 'error');
        // Add shake animation to login card
        const loginCard = document.querySelector('.login-card');
        loginCard.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            loginCard.style.animation = '';
        }, 500);
    }
}

// Logout function
function logout() {
    document.getElementById('login-section').style.display = 'flex';
    document.getElementById('admin-panel').style.display = 'none';
    document.getElementById('admin-password').value = '';
    showNotification('Вы вышли из системы', 'info');
}

// Load admin data
function loadAdminData() {
    document.getElementById('winter-link').value = serverLinks.winter;
    document.getElementById('summer-link').value = serverLinks.summer;
    document.getElementById('discord-link').value = socialLinks.discord;
    document.getElementById('telegram-link').value = socialLinks.telegram;
    document.getElementById('winter-status-select').value = serverStatus.winter;
    document.getElementById('summer-status-select').value = serverStatus.summer;
    document.getElementById('winter-custom-text').value = customStatusText.winter;
    document.getElementById('summer-custom-text').value = customStatusText.summer;
    
    // Show/hide custom status fields
    toggleCustomStatusField('winter');
    toggleCustomStatusField('summer');
    
    // Update stats display
    document.getElementById('winter-clicks').textContent = stats.winterClicks;
    document.getElementById('summer-clicks').textContent = stats.summerClicks;
    document.getElementById('total-joins-admin').textContent = stats.totalJoins;
    document.getElementById('last-update').textContent = stats.lastUpdate;
    
    // Update server status display
    updateServerStatusDisplay('winter');
    updateServerStatusDisplay('summer');
}

// Update server link
function updateServerLink(serverType) {
    const inputId = `${serverType}-link`;
    const newLink = document.getElementById(inputId).value;
    
    if (newLink && isValidRobloxLink(newLink)) {
        serverLinks[serverType] = newLink;
        stats.lastUpdate = new Date().toLocaleString('ru-RU');
        saveData();
        updateServerStatus(serverType);
        showNotification(`Ссылка на ${serverType === 'winter' ? 'Winter' : 'Summer'} сервер обновлена!`, 'success');
        
        // Update stats display
        document.getElementById('last-update').textContent = stats.lastUpdate;
        
        // Add success animation
        const serverControl = document.querySelector(`.${serverType}-control`);
        serverControl.style.animation = 'successPulse 0.5s ease';
        setTimeout(() => {
            serverControl.style.animation = '';
        }, 500);
    } else {
        showNotification('Введите корректную ссылку на Roblox игру!', 'error');
    }
}

// Test server link
function testServerLink(serverType) {
    const link = serverLinks[serverType];
    if (link && isValidRobloxLink(link)) {
        window.open(link, '_blank');
        showNotification(`Тестирование ${serverType === 'winter' ? 'Winter' : 'Summer'} сервера...`, 'info');
        
        // Increment click stats for testing
        if (serverType === 'winter') {
            stats.winterClicks++;
            document.getElementById('winter-clicks').textContent = stats.winterClicks;
        } else {
            stats.summerClicks++;
            document.getElementById('summer-clicks').textContent = stats.summerClicks;
        }
        stats.totalJoins++;
        document.getElementById('total-joins-admin').textContent = stats.totalJoins;
        saveData();
    } else {
        showNotification('Ссылка не настроена или некорректна!', 'warning');
    }
}

// Update server status
function updateServerStatus(serverType) {
    const selectElement = document.getElementById(`${serverType}-status-select`);
    const newStatus = selectElement.value;
    
    serverStatus[serverType] = newStatus;
    stats.lastUpdate = new Date().toLocaleString('ru-RU');
    saveData();
    
    toggleCustomStatusField(serverType);
    updateServerStatusDisplay(serverType);
    showNotification(`Статус ${serverType === 'winter' ? 'Winter' : 'Summer'} сервера обновлен!`, 'success');
    
    // Update stats display
    document.getElementById('last-update').textContent = stats.lastUpdate;
}

// Toggle custom status field
function toggleCustomStatusField(serverType) {
    const customField = document.getElementById(`${serverType}-custom-status`);
    const status = serverStatus[serverType];
    
    if (status === 'custom') {
        customField.style.display = 'block';
    } else {
        customField.style.display = 'none';
    }
}

// Update custom status text
function updateCustomStatus(serverType) {
    const customTextElement = document.getElementById(`${serverType}-custom-text`);
    customStatusText[serverType] = customTextElement.value;
    
    stats.lastUpdate = new Date().toLocaleString('ru-RU');
    saveData();
    
    updateServerStatusDisplay(serverType);
    showNotification(`Кастомный статус ${serverType === 'winter' ? 'Winter' : 'Summer'} сервера обновлен!`, 'success');
    
    // Update stats display
    document.getElementById('last-update').textContent = stats.lastUpdate;
}

// Update server status display
function updateServerStatusDisplay(serverType) {
    const statusElement = document.getElementById(`${serverType}-status`);
    const statusDot = statusElement.querySelector('.status-dot');
    const statusText = statusElement.querySelector('span:last-child');
    const status = serverStatus[serverType];
    
    // Remove all status classes
    statusDot.className = 'status-dot';
    
    switch (status) {
        case 'online':
            statusDot.classList.add('online');
            statusText.textContent = 'Онлайн';
            statusElement.style.color = '#00ff88';
            break;
        case 'offline':
            statusDot.classList.add('offline');
            statusText.textContent = 'Оффлайн';
            statusElement.style.color = '#ff4444';
            break;
        case 'maintenance':
            statusDot.classList.add('maintenance');
            statusText.textContent = 'Техработы';
            statusElement.style.color = '#ffaa00';
            break;
        case 'custom':
            statusDot.classList.add('online');
            statusText.textContent = customStatusText[serverType] || 'Кастомный статус';
            statusElement.style.color = '#00d4ff';
            break;
    }
}

// Update social link
function updateSocialLink(socialType) {
    const inputId = `${socialType}-link`;
    const newLink = document.getElementById(inputId).value;
    
    if (newLink && isValidSocialLink(newLink, socialType)) {
        socialLinks[socialType] = newLink;
        stats.lastUpdate = new Date().toLocaleString('ru-RU');
        saveData();
        showNotification(`Ссылка на ${socialType === 'discord' ? 'Discord' : 'Telegram'} обновлена!`, 'success');
        
        // Update stats display
        document.getElementById('last-update').textContent = stats.lastUpdate;
        
        // Add success animation
        const socialControl = document.querySelector(`#${inputId}`).closest('.social-control');
        socialControl.style.animation = 'successPulse 0.5s ease';
        setTimeout(() => {
            socialControl.style.animation = '';
        }, 500);
    } else {
        showNotification(`Введите корректную ссылку на ${socialType === 'discord' ? 'Discord сервер' : 'Telegram канал'}!`, 'error');
    }
}

// Validate social link
function isValidSocialLink(link, type) {
    if (type === 'discord') {
        return link.includes('discord.gg/') || link.includes('discord.com/invite/');
    } else if (type === 'telegram') {
        return link.includes('t.me/');
    }
    return false;
}

// Validate Roblox link
function isValidRobloxLink(link) {
    return link.includes('roblox.com/games/') || link.includes('roblox.com/experiences/');
}

// Clear statistics
function clearStats() {
    if (confirm('Вы уверены, что хотите очистить всю статистику?')) {
        stats.winterClicks = 0;
        stats.summerClicks = 0;
        stats.totalJoins = 0;
        stats.lastUpdate = 'Никогда';
        saveData();
        
        document.getElementById('winter-clicks').textContent = '0';
        document.getElementById('summer-clicks').textContent = '0';
        document.getElementById('total-joins-admin').textContent = '0';
        document.getElementById('last-update').textContent = 'Никогда';
        
        showNotification('Статистика очищена!', 'success');
    }
}

// Export data
function exportData() {
    const data = {
        serverLinks: serverLinks,
        socialLinks: socialLinks,
        stats: stats,
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `the-hight-moon-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    showNotification('Данные экспортированы!', 'success');
}

// Reset links
function resetLinks() {
    if (confirm('Вы уверены, что хотите сбросить все ссылки на серверы?')) {
        serverLinks.winter = 'https://www.roblox.com/games/your-winter-server-id';
        serverLinks.summer = 'https://www.roblox.com/games/your-summer-server-id';
        stats.lastUpdate = new Date().toLocaleString('ru-RU');
        saveData();
        
        document.getElementById('winter-link').value = serverLinks.winter;
        document.getElementById('summer-link').value = serverLinks.summer;
        document.getElementById('last-update').textContent = stats.lastUpdate;
        
        updateServerStatus('winter');
        updateServerStatus('summer');
        
        showNotification('Ссылки сброшены!', 'warning');
    }
}

// Open main site
function openMainSite() {
    window.open('index.html', '_blank');
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

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    
    // Create falling stars
    createFallingStars();
    
    // Enter key login
    document.getElementById('admin-password').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            loginAdmin();
        }
    });
    
    // Auto-focus password field
    document.getElementById('admin-password').focus();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Escape to logout
        if (e.key === 'Escape' && document.getElementById('admin-panel').style.display !== 'none') {
            logout();
        }
        
        // Ctrl + S to save (prevent default and show notification)
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            saveData();
            showNotification('Данные сохранены!', 'success');
        }
    });
    
    // Add auto-save on input change
    const inputs = document.querySelectorAll('input[type="url"]');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            // Auto-save after 2 seconds of no typing
            clearTimeout(this.saveTimeout);
            this.saveTimeout = setTimeout(() => {
                saveData();
            }, 2000);
        });
    });
});

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
    for (let i = 0; i < 2; i++) {
        setTimeout(() => createFallingStar(), i * 3000);
    }
    
    // Continue creating falling stars
    setInterval(() => {
        if (Math.random() < 0.2) { // 20% chance every interval
            createFallingStar();
        }
    }, 4000);
}

// Add CSS animations
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
    
    @keyframes successPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); box-shadow: 0 0 20px rgba(0, 255, 136, 0.3); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(additionalStyles);