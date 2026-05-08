// Real wallpaper management system
class RealWallpaperManager {
    constructor() {
        this.wallpapers = [
            // Car wallpapers
            {
                id: 'cars-4k',
                name: 'Cars 4K Collection',
                filename: 'Car\'s 4K wallpapers.jfif',
                category: 'city',
                resolution: '4K',
                description: 'High-performance car wallpapers in 4K resolution'
            },
            // Gemini AI generated
            {
                id: 'gemini-ai',
                name: 'AI Generated Art',
                filename: 'Gemini_Generated_Image_t1hvyxt1hvyxt1hv.png',
                category: 'abstract',
                resolution: 'HD',
                description: 'Beautiful AI-generated abstract artwork'
            },
            // Josiah Reed
            {
                id: 'josiah-reed',
                name: 'Josiah Reed Collection',
                filename: 'Josiah Reed_.jfif',
                category: 'abstract',
                resolution: 'HD',
                description: 'Artistic photography by Josiah Reed'
            },
            // Kevin wallpaper series
            {
                id: 'kevin-1',
                name: 'Kevin Collection 1',
                filename: 'kevin (1).jfif',
                category: 'nature',
                resolution: 'HD',
                description: 'Beautiful nature photography'
            },
            {
                id: 'kevin-2',
                name: 'Kevin Collection 2',
                filename: 'kevin (2).jfif',
                category: 'city',
                resolution: 'HD',
                description: 'Urban landscape photography'
            },
            {
                id: 'kevin-3',
                name: 'Kevin Collection 3',
                filename: 'kevin (3).jfif',
                category: 'nature',
                resolution: 'HD',
                description: 'Natural scenery and landscapes'
            },
            {
                id: 'kevin-4',
                name: 'Kevin Collection 4',
                filename: 'kevin (4).jfif',
                category: 'abstract',
                resolution: 'HD',
                description: 'Abstract artistic composition'
            },
            {
                id: 'kevin-5',
                name: 'Kevin Collection 5',
                filename: 'kevin (5).jfif',
                category: 'nature',
                resolution: 'HD',
                description: 'Serene natural environments'
            },
            {
                id: 'kevin-6',
                name: 'Kevin Collection 6',
                filename: 'kevin (6).jfif',
                category: 'city',
                resolution: 'HD',
                description: 'City life and architecture'
            },
            // JPG versions
            {
                id: 'kevin-1-jpg',
                name: 'Kevin Collection 1',
                filename: 'kevin (1).jpg',
                category: 'nature',
                resolution: 'HD',
                description: 'Nature photography in high quality'
            },
            {
                id: 'kevin-2-jpg',
                name: 'Kevin Collection 2',
                filename: 'kevin (2).jpg',
                category: 'city',
                resolution: 'HD',
                description: 'Urban photography collection'
            },
            {
                id: 'kevin-3-jpg',
                name: 'Kevin Collection 3',
                filename: 'kevin (3).jpg',
                category: 'nature',
                resolution: 'HD',
                description: 'Beautiful natural landscapes'
            },
            {
                id: 'kevin-4-jpg',
                name: 'Kevin Collection 4',
                filename: 'kevin (4).jpg',
                category: 'abstract',
                resolution: 'HD',
                description: 'Abstract art photography'
            },
            {
                id: 'kevin-5-jpg',
                name: 'Kevin Collection 5',
                filename: 'kevin (5).jpg',
                category: 'nature',
                resolution: 'HD',
                description: 'Nature and wildlife photography'
            },
            {
                id: 'kevin-6-jpg',
                name: 'Kevin Collection 6',
                filename: 'kevin (6).jpg',
                category: 'city',
                resolution: 'HD',
                description: 'Cityscape and architecture'
            },
            {
                id: 'kevin-7',
                name: 'Kevin Collection 7',
                filename: 'kevin (7).jpg',
                category: 'abstract',
                resolution: 'HD',
                description: 'Artistic abstract composition'
            },
            {
                id: 'kevin-8',
                name: 'Kevin Collection 8',
                filename: 'kevin (8).jpg',
                category: 'nature',
                resolution: 'HD',
                description: 'Peaceful natural scenery'
            },
            {
                id: 'kevin-9',
                name: 'Kevin Collection 9',
                filename: 'kevin (9).jpg',
                category: 'city',
                resolution: 'HD',
                description: 'Urban photography series'
            },
            {
                id: 'kevin-10',
                name: 'Kevin Collection 10',
                filename: 'kevin (10).jpg',
                category: 'nature',
                resolution: 'HD',
                description: 'Nature and landscape photography'
            },
            {
                id: 'kevin-11',
                name: 'Kevin Collection 11',
                filename: 'kevin (11).jpg',
                category: 'abstract',
                resolution: 'HD',
                description: 'Creative abstract photography'
            },
            {
                id: 'kevin5',
                name: 'Kevin Special Collection',
                filename: 'kevin5.jpg',
                category: 'nature',
                resolution: 'HD',
                description: 'Special nature photography collection'
            }
        ];
        this.init();
    }

    init() {
        this.updateGalleryPage();
        this.setupDownloadHandlers();
    }

    updateGalleryPage() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.populateGallery());
        } else {
            this.populateGallery();
        }
    }

    populateGallery() {
        const galleryGrid = document.querySelector('.gallery-grid');
        if (!galleryGrid) return;

        // Clear existing placeholder items
        galleryGrid.innerHTML = '';

        // Add real wallpapers
        this.wallpapers.forEach(wallpaper => {
            const galleryItem = this.createGalleryItem(wallpaper);
            galleryGrid.appendChild(galleryItem);
        });
    }

    createGalleryItem(wallpaper) {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.dataset.category = wallpaper.category;
        
        item.innerHTML = `
            <div class="gallery-image ${wallpaper.category}">
                <img src="${wallpaper.filename}" alt="${wallpaper.name}" 
                     style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;"
                     onerror="this.style.display='none'; this.parentElement.innerHTML='${this.getCategoryEmoji(wallpaper.category)}';">
            </div>
            <div class="gallery-overlay">
                <div class="overlay-title">${wallpaper.name}</div>
                <div class="overlay-info">${wallpaper.resolution} • ${wallpaper.category} • ${wallpaper.description.split(' ')[0]}</div>
            </div>
            <button class="download-overlay" onclick="realWallpaperManager.downloadWallpaper('${wallpaper.id}')">↓</button>
        `;
        
        return item;
    }

    getCategoryEmoji(category) {
        const emojis = {
            'nature': '🌿',
            'city': '🏙️',
            'abstract': '🎨',
            'cars': '🚗'
        };
        return emojis[category] || '🖼️';
    }

    setupDownloadHandlers() {
        // Override the existing download functionality
        setTimeout(() => {
            document.querySelectorAll('.download-btn, .download-overlay').forEach(btn => {
                btn.removeEventListener('click', this.handleDownload);
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.handleRealDownload(btn);
                });
            });
        }, 100);
    }

    handleRealDownload(button) {
        // Find the wallpaper ID from the button
        const wallpaperId = button.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
        if (wallpaperId) {
            this.downloadWallpaper(wallpaperId);
        } else {
            // Fallback to card-based detection
            const card = button.closest('.gallery-item, .anime-card, .background-card');
            if (card) {
                const titleElement = card.querySelector('.overlay-title, .anime-title, h4');
                if (titleElement) {
                    const wallpaper = this.wallpapers.find(w => 
                        w.name.toLowerCase().includes(titleElement.textContent.toLowerCase())
                    );
                    if (wallpaper) {
                        this.downloadWallpaperById(wallpaper.id);
                    }
                }
            }
        }
    }

    downloadWallpaper(wallpaperId) {
        const wallpaper = this.wallpapers.find(w => w.id === wallpaperId);
        if (wallpaper) {
            this.downloadWallpaperById(wallpaper.id);
        }
    }

    downloadWallpaperById(wallpaperId) {
        const wallpaper = this.wallpapers.find(w => w.id === wallpaperId);
        if (!wallpaper) {
            this.showDownloadMessage('Wallpaper not found');
            return;
        }

        // For local files, open in new tab instead of downloading
        // This works better with browser security restrictions
        const link = document.createElement('a');
        link.href = wallpaper.filename;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.showDownloadMessage(`Opened: ${wallpaper.name} - Right-click to save image`);
    }

    showDownloadMessage(message) {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.download-notification');
        existingNotifications.forEach(n => n.remove());
        
        // Create new notification
        const notification = document.createElement('div');
        notification.className = 'download-notification';
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
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Method to get wallpapers by category
    getWallpapersByCategory(category) {
        if (category === 'all') return this.wallpapers;
        return this.wallpapers.filter(w => w.category === category);
    }

    // Method to get all categories
    getCategories() {
        const categories = [...new Set(this.wallpapers.map(w => w.category))];
        return ['all', ...categories];
    }
}

// Initialize the real wallpaper manager
const realWallpaperManager = new RealWallpaperManager();
