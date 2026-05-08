// Wallpaper generator and download functionality
class WallpaperGenerator {
    constructor() {
        this.wallpapers = [];
        this.init();
    }

    init() {
        // Create sample wallpapers
        this.createSampleWallpapers();
        // Setup download handlers
        this.setupDownloadHandlers();
    }

    createSampleWallpapers() {
        const wallpaperTypes = [
            { name: 'purple-dream', gradient: ['#667eea', '#764ba2'], emoji: '🌙' },
            { name: 'pink-sunset', gradient: ['#f093fb', '#f5576c'], emoji: '🌸' },
            { name: 'ocean-blue', gradient: ['#4facfe', '#00f2fe'], emoji: '🌊' },
            { name: 'green-forest', gradient: ['#43e97b', '#38f9d7'], emoji: '🌲' },
            { name: 'golden-hour', gradient: ['#fa709a', '#fee140'], emoji: '🌅' },
            { name: 'night-sky', gradient: ['#30cfd0', '#330867'], emoji: '⭐' },
            { name: 'fire-power', gradient: ['#ff6b6b', '#feca57'], emoji: '🔥' },
            { name: 'crystal-magic', gradient: ['#a29bfe', '#6c5ce7'], emoji: '🔮' }
        ];

        wallpaperTypes.forEach(type => {
            this.wallpapers.push({
                id: type.name,
                name: type.name.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
                gradient: type.gradient,
                emoji: type.emoji,
                canvas: this.createWallpaperCanvas(type.gradient, type.emoji)
            });
        });
    }

    createWallpaperCanvas(gradient, emoji) {
        const canvas = document.createElement('canvas');
        canvas.width = 1920;
        canvas.height = 1080;
        const ctx = canvas.getContext('2d');

        // Create gradient background
        const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        grad.addColorStop(0, gradient[0]);
        grad.addColorStop(1, gradient[1]);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add emoji as decorative element
        ctx.font = '200px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fillText(emoji, canvas.width / 2, canvas.height / 2);

        // Add watermark
        ctx.font = 'bold 48px Arial';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.textAlign = 'right';
        ctx.fillText('Panther Wallpapers', canvas.width - 40, canvas.height - 40);

        return canvas;
    }

    setupDownloadHandlers() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupButtons());
        } else {
            this.setupButtons();
        }
    }

    setupButtons() {
        // Setup download buttons on all pages
        document.querySelectorAll('.download-btn, .download-overlay').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.handleDownload(btn);
            });
        });
    }

    handleDownload(button) {
        // Find the wallpaper name from the card
        const card = button.closest('.anime-card, .background-card, .gallery-item');
        let wallpaperName = 'wallpaper';

        if (card) {
            const titleElement = card.querySelector('.anime-title, h4, .overlay-title');
            if (titleElement) {
                wallpaperName = titleElement.textContent.toLowerCase().replace(/\s+/g, '-');
            }
        }

        // Find or create the wallpaper
        let wallpaper = this.wallpapers.find(w => w.name.toLowerCase().includes(wallpaperName));
        
        if (!wallpaper) {
            // Create a random wallpaper if no specific one found
            const randomType = this.wallpapers[Math.floor(Math.random() * this.wallpapers.length)];
            wallpaper = {
                ...randomType,
                name: wallpaperName,
                canvas: this.createWallpaperCanvas(randomType.gradient, randomType.emoji)
            };
        }

        // Download the wallpaper
        this.downloadWallpaper(wallpaper);
    }

    downloadWallpaper(wallpaper) {
        const canvas = wallpaper.canvas;
        const link = document.createElement('a');
        link.download = `${wallpaper.name}.png`;
        link.href = canvas.toDataURL();
        link.click();
        
        // Show success message
        this.showDownloadMessage(`Downloaded: ${wallpaper.name}`);
    }

    showDownloadMessage(message) {
        // Create a temporary notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            font-weight: bold;
            z-index: 10000;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
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
document.head.appendChild(style);

// Initialize the wallpaper generator
const wallpaperGen = new WallpaperGenerator();
