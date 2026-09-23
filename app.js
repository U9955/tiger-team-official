/**
 * Cosmic Portal & Admin Dashboard App
 * Manages apps dock, links grid, local storage, full CRUD, and animations.
 */

// Initial Default Data (English & Clean)
const DEFAULT_DATA = {
    profile: {
        name: "TIGER TEAM",
        titlePrefix: "",
        bio: "Here you will find all the links and projects of Tiger Team.",
        avatar: "tiger-logo.jpg",
        status: "Online",
        pin: "2007"
    },
    programs: [
        {
            id: "prog-1",
            name: "Photoshop",
            url: "https://photoshop.adobe.com",
            icon: "fa-solid fa-palette",
            color: "#38bdf8",
            glow: "rgba(56, 189, 248, 0.4)",
            active: true
        },
        {
            id: "prog-2",
            name: "Telegram",
            url: "https://web.telegram.org",
            icon: "fa-brands fa-telegram",
            color: "#0284c7",
            glow: "rgba(2, 132, 199, 0.4)",
            active: true
        },
        {
            id: "prog-3",
            name: "ChatGPT",
            url: "https://chatgpt.com",
            icon: "fa-brands fa-openai",
            color: "#10a37f",
            glow: "rgba(16, 163, 127, 0.45)",
            active: true
        },
        {
            id: "prog-4",
            name: "VS Code",
            url: "https://vscode.dev",
            icon: "fa-solid fa-code",
            color: "#6366f1",
            glow: "rgba(99, 102, 241, 0.4)",
            active: true
        },
        {
            id: "prog-5",
            name: "Discord",
            url: "https://discord.com",
            icon: "fa-brands fa-discord",
            color: "#8b5cf6",
            glow: "rgba(139, 92, 246, 0.4)",
            active: true
        },
        {
            id: "prog-6",
            name: "YouTube",
            url: "https://youtube.com",
            icon: "fa-brands fa-youtube",
            color: "#ef4444",
            glow: "rgba(239, 68, 68, 0.4)",
            active: true
        },
        {
            id: "prog-7",
            name: "GitHub",
            url: "https://github.com",
            icon: "fa-brands fa-github",
            color: "#f8fafc",
            glow: "rgba(248, 250, 252, 0.35)",
            active: true
        },
        {
            id: "prog-8",
            name: "Figma",
            url: "https://figma.com",
            icon: "fa-brands fa-figma",
            color: "#ec4899",
            glow: "rgba(236, 72, 153, 0.4)",
            active: true
        }
    ],
    links: [] // Completely clean & empty as requested by user
};

// Official ChatGPT / OpenAI Vector SVG Icon
const CHATGPT_SVG = `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" style="display:inline-block; vertical-align:-0.125em;"><path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.5045 4.5045 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/></svg>`;

// Popular App Icon Presets
const PROGRAM_ICON_PRESETS = [
    { name: "Photoshop", icon: "fa-solid fa-palette" },
    { name: "Telegram", icon: "fa-brands fa-telegram" },
    { name: "ChatGPT", icon: "fa-brands fa-openai" },
    { name: "VS Code", icon: "fa-solid fa-code" },
    { name: "Discord", icon: "fa-brands fa-discord" },
    { name: "YouTube", icon: "fa-brands fa-youtube" },
    { name: "GitHub", icon: "fa-brands fa-github" },
    { name: "Figma", icon: "fa-brands fa-figma" },
    { name: "Spotify", icon: "fa-brands fa-spotify" },
    { name: "Steam", icon: "fa-brands fa-steam" },
    { name: "Chrome", icon: "fa-brands fa-chrome" },
    { name: "WhatsApp", icon: "fa-brands fa-whatsapp" },
    { name: "Terminal", icon: "fa-solid fa-terminal" },
    { name: "Illustrator", icon: "fa-solid fa-pen-nib" },
    { name: "Premiere", icon: "fa-solid fa-film" },
    { name: "Gaming", icon: "fa-solid fa-gamepad" },
    { name: "X / Twitter", icon: "fa-brands fa-x-twitter" },
    { name: "Instagram", icon: "fa-brands fa-instagram" },
    { name: "Music", icon: "fa-solid fa-music" },
    { name: "Camera", icon: "fa-solid fa-camera" },
    { name: "Cloud", icon: "fa-solid fa-cloud" },
    { name: "Rocket", icon: "fa-solid fa-rocket" }
];

// Website Link Icon Presets (Steam, Popular Apps, Software, and Web Icons)
const LINK_ICON_PRESETS = [
    // Gaming & Major Platforms
    { name: "Steam", icon: "fa-brands fa-steam" },
    { name: "ChatGPT", icon: "fa-brands fa-openai" },
    { name: "Telegram", icon: "fa-brands fa-telegram" },
    { name: "Discord", icon: "fa-brands fa-discord" },
    { name: "YouTube", icon: "fa-brands fa-youtube" },
    { name: "GitHub", icon: "fa-brands fa-github" },
    { name: "VS Code", icon: "fa-solid fa-code" },
    { name: "Photoshop", icon: "fa-solid fa-palette" },
    { name: "Figma", icon: "fa-brands fa-figma" },
    { name: "Spotify", icon: "fa-brands fa-spotify" },
    { name: "Chrome", icon: "fa-brands fa-chrome" },
    { name: "WhatsApp", icon: "fa-brands fa-whatsapp" },
    { name: "Twitch", icon: "fa-brands fa-twitch" },
    { name: "Gaming", icon: "fa-solid fa-gamepad" },
    { name: "Terminal", icon: "fa-solid fa-terminal" },
    { name: "X / Twitter", icon: "fa-brands fa-x-twitter" },
    { name: "Instagram", icon: "fa-brands fa-instagram" },
    { name: "TikTok", icon: "fa-brands fa-tiktok" },
    { name: "Reddit", icon: "fa-brands fa-reddit" },
    { name: "Illustrator", icon: "fa-solid fa-pen-nib" },
    { name: "Premiere", icon: "fa-solid fa-film" },
    // General Websites & Navigation
    { name: "Website", icon: "fa-solid fa-globe" },
    { name: "Direct Link", icon: "fa-solid fa-link" },
    { name: "Portfolio", icon: "fa-solid fa-briefcase" },
    { name: "Store", icon: "fa-solid fa-store" },
    { name: "Shopping", icon: "fa-solid fa-bag-shopping" },
    { name: "Docs / Blog", icon: "fa-solid fa-book-open" },
    { name: "AI / Magic", icon: "fa-solid fa-wand-magic-sparkles" },
    { name: "Coding Project", icon: "fa-solid fa-laptop-code" },
    { name: "Rocket / Launch", icon: "fa-solid fa-rocket" },
    { name: "Server / Cloud", icon: "fa-solid fa-server" },
    { name: "Security", icon: "fa-solid fa-shield-halved" },
    { name: "Star / Favorite", icon: "fa-solid fa-star" },
    { name: "Lightning", icon: "fa-solid fa-bolt" },
    { name: "Email / Contact", icon: "fa-solid fa-envelope" }
];

// Color & Glow Presets
const COLOR_PRESETS = [
    { color: "#38bdf8", glow: "rgba(56, 189, 248, 0.4)" },
    { color: "#a855f7", glow: "rgba(168, 85, 247, 0.4)" },
    { color: "#6366f1", glow: "rgba(99, 102, 241, 0.4)" },
    { color: "#ec4899", glow: "rgba(236, 72, 153, 0.4)" },
    { color: "#10b981", glow: "rgba(16, 185, 129, 0.4)" },
    { color: "#f59e0b", glow: "rgba(245, 158, 11, 0.4)" },
    { color: "#0284c7", glow: "rgba(2, 132, 199, 0.4)" },
    { color: "#ef4444", glow: "rgba(239, 68, 68, 0.4)" },
    { color: "#f8fafc", glow: "rgba(248, 250, 252, 0.35)" }
];

// Main Application Controller
class CosmicApp {
    constructor() {
        this.STORAGE_KEY = 'COSMIC_PORTAL_EN_V9';
        this.data = this.loadData();

        // State variables
        this.editingProgramId = null;
        this.selectedProgramIcon = "fa-brands fa-openai";
        this.selectedProgramColor = COLOR_PRESETS[0];

        this.editingLinkId = null;
        this.selectedLinkIcon = "fa-solid fa-globe";
        this.selectedLinkColor = COLOR_PRESETS[0];

        this.initElements();
        this.bindEvents();
        this.renderAll();
    }

    // Load Data from LocalStorage with auto-migration
    loadData() {
        try {
            const saved = localStorage.getItem(this.STORAGE_KEY) || localStorage.getItem('COSMIC_PORTAL_EN_V8') || localStorage.getItem('COSMIC_PORTAL_EN_V7') || localStorage.getItem('COSMIC_PORTAL_EN_V6') || localStorage.getItem('COSMIC_PORTAL_EN_V5') || localStorage.getItem('COSMIC_PORTAL_EN_V4');
            if (saved) {
                const parsed = JSON.parse(saved);
                // Ensure PIN is updated to user requested PIN
                if (parsed.profile) {
                    parsed.profile.pin = "2007";
                    parsed.profile.titlePrefix = "";
                    if (parsed.profile.name) {
                        parsed.profile.name = parsed.profile.name.replace(/✦/g, '').trim();
                    }
                    if (!parsed.profile.bio || parsed.profile.bio.includes('sanctuary') || parsed.profile.bio.includes('software, tools') || parsed.profile.bio.includes('digital spaces')) {
                        parsed.profile.bio = "Here you will find all the links and projects of Tiger Team.";
                    }
                    if (!parsed.profile.avatar || parsed.profile.avatar.includes('unsplash.com')) {
                        parsed.profile.avatar = "tiger-logo.jpg";
                        parsed.profile.name = "TIGER TEAM";
                    }
                    if (!parsed.profile.status || parsed.profile.status.includes('Space') || parsed.profile.status.includes('Projects')) {
                        parsed.profile.status = "Online";
                    }
                }
                // Ensure ChatGPT has the official logo and emerald color
                if (parsed.programs && Array.isArray(parsed.programs)) {
                    parsed.programs.forEach(p => {
                        if (p.name && (p.name.toLowerCase().includes('chat') || p.id === 'prog-3')) {
                            p.icon = 'fa-brands fa-openai';
                            p.color = '#10a37f';
                            p.glow = 'rgba(16, 163, 127, 0.45)';
                        }
                    });
                }
                return {
                    profile: { ...DEFAULT_DATA.profile, ...(parsed.profile || {}) },
                    programs: parsed.programs || DEFAULT_DATA.programs,
                    links: parsed.links || []
                };
            }
        } catch (e) {
            console.error("Failed to parse saved data, reverting to defaults:", e);
        }
        return JSON.parse(JSON.stringify(DEFAULT_DATA));
    }

    // Get Icon HTML (with official SVG fallback for OpenAI / ChatGPT)
    getIconHtml(iconClass) {
        if (!iconClass) return '<i class="fa-solid fa-shapes"></i>';
        if (iconClass.includes('openai') || iconClass.includes('chatgpt')) {
            return CHATGPT_SVG;
        }
        return `<i class="${this.escapeHtml(iconClass)}"></i>`;
    }

    // Save Data to LocalStorage
    saveData() {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
        } catch (e) {
            console.error("Failed to save data:", e);
            this.showToast("Failed to save data to local storage", "error");
        }
    }

    // Initialize DOM Elements
    initElements() {
        // Public Display Elements
        this.profileAvatar = document.getElementById('profileAvatar');
        this.profileTitle = document.getElementById('profileTitle');
        this.footerAdminTrigger = document.getElementById('footerAdminTrigger');
        this.profileBio = document.getElementById('profileBio');
        this.statusBadgeText = document.getElementById('statusBadgeText');
        this.appsDock = document.getElementById('appsDock');
        this.linksGrid = document.getElementById('linksGrid');

        // Admin Overlay & Controls
        this.adminFab = document.getElementById('adminFab');
        this.adminOverlay = document.getElementById('adminOverlay');
        this.adminCloseBtn = document.getElementById('adminCloseBtn');
        this.adminTabs = document.querySelectorAll('.admin-tab');
        this.tabPanes = document.querySelectorAll('.tab-pane');

        // Apps Form
        this.programForm = document.getElementById('programForm');
        this.formProgramId = document.getElementById('formProgramId');
        this.formProgramName = document.getElementById('formProgramName');
        this.formProgramUrl = document.getElementById('formProgramUrl');
        this.formProgramCustomIcon = document.getElementById('formProgramCustomIcon');
        this.programIconPresetsContainer = document.getElementById('programIconPresetsContainer');
        this.programColorPresetsContainer = document.getElementById('programColorPresetsContainer');
        this.adminProgramsList = document.getElementById('adminProgramsList');
        this.cancelProgramEditBtn = document.getElementById('cancelProgramEditBtn');
        this.formProgramSubmitBtn = document.getElementById('formProgramSubmitBtn');

        // Links Form
        this.linkForm = document.getElementById('linkForm');
        this.formLinkId = document.getElementById('formLinkId');
        this.formTitle = document.getElementById('formTitle');
        this.formUrl = document.getElementById('formUrl');
        this.formDesc = document.getElementById('formDesc');
        this.formCustomIcon = document.getElementById('formCustomIcon');
        this.iconPresetsContainer = document.getElementById('iconPresetsContainer');
        this.colorPresetsContainer = document.getElementById('colorPresetsContainer');
        this.adminLinksList = document.getElementById('adminLinksList');
        this.cancelEditBtn = document.getElementById('cancelEditBtn');
        this.formSubmitBtn = document.getElementById('formSubmitBtn');

        // Profile Form
        this.profileForm = document.getElementById('profileForm');
        this.inputProfileName = document.getElementById('inputProfileName');
        this.inputProfileBio = document.getElementById('inputProfileBio');
        this.inputProfileAvatar = document.getElementById('inputProfileAvatar');
        this.inputProfileStatus = document.getElementById('inputProfileStatus');
        this.inputProfilePin = document.getElementById('inputProfilePin');

        // Backup Tools
        this.exportDataBtn = document.getElementById('exportDataBtn');
        this.importDataInput = document.getElementById('importDataInput');
        this.resetDataBtn = document.getElementById('resetDataBtn');

        // Security PIN Modal
        this.pinOverlay = document.getElementById('pinOverlay');
        this.pinInput = document.getElementById('pinInput');
        this.pinSubmitBtn = document.getElementById('pinSubmitBtn');
        this.pinCloseBtn = document.getElementById('pinCloseBtn');

        // Starfield Toggle in Footer
        this.footerStarsToggle = document.getElementById('footerStarsToggle');
        this.starsEnabled = true;

        // Cosmic Background Music Elements
        this.bgMusic = document.getElementById('bgMusic');
        this.footerMusicToggle = document.getElementById('footerMusicToggle');
        this.footerMusicIcon = document.getElementById('footerMusicIcon');
    }

    // Bind User Interactions
    bindEvents() {
        // Open Admin Panel ONLY from footer "Tiger Team"
        const openAdmin = (e) => {
            if (e) e.preventDefault();
            this.requestAdminAccess();
        };

        if (this.footerAdminTrigger) {
            this.footerAdminTrigger.addEventListener('click', openAdmin);
        }

        // Global trigger for the footer onclick
        window.triggerAdminAccess = openAdmin;
        window.openCosmicAdmin = openAdmin;

        // Close Admin Panel
        this.adminCloseBtn.addEventListener('click', () => {
            this.adminOverlay.classList.remove('active');
        });

        this.adminOverlay.addEventListener('click', (e) => {
            if (e.target === this.adminOverlay) {
                this.adminOverlay.classList.remove('active');
            }
        });

        // Close PIN Modal
        this.pinCloseBtn.addEventListener('click', () => {
            this.pinOverlay.classList.remove('active');
        });

        this.pinSubmitBtn.addEventListener('click', () => {
            this.verifyPin();
        });

        this.pinInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') this.verifyPin();
        });

        // Tab Switching
        this.adminTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetId = tab.dataset.tab;
                this.adminTabs.forEach(t => t.classList.remove('active'));
                this.tabPanes.forEach(p => p.classList.remove('active'));
                tab.classList.add('active');
                document.getElementById(targetId)?.classList.add('active');
            });
        });

        // App Form Submit & Cancel
        this.programForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleProgramSubmit();
        });

        this.cancelProgramEditBtn.addEventListener('click', () => {
            this.resetProgramForm();
        });

        // Link Form Submit & Cancel
        this.linkForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLinkSubmit();
        });

        this.cancelEditBtn.addEventListener('click', () => {
            this.resetLinkForm();
        });

        // Profile Form Submit
        this.profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleProfileSubmit();
        });

        // Backup Export & Import
        this.exportDataBtn.addEventListener('click', () => {
            this.exportToJson();
        });

        this.importDataInput.addEventListener('change', (e) => {
            this.importFromJson(e);
        });

        this.resetDataBtn.addEventListener('click', () => {
            if (confirm("Are you sure you want to reset to default settings? Any unexported changes will be cleared.")) {
                this.data = JSON.parse(JSON.stringify(DEFAULT_DATA));
                this.saveData();
                this.renderAll();
                this.showToast("Defaults restored successfully ✦");
            }
        });

        // Toggle Starfield Animation
        this.footerStarsToggle.addEventListener('click', () => {
            if (window.toggleCosmicStars) {
                this.starsEnabled = window.toggleCosmicStars();
                this.footerStarsToggle.textContent = this.starsEnabled ? "✦ Pause Starfield" : "✦ Resume Starfield";
                this.showToast(this.starsEnabled ? "Starfield animation resumed" : "Starfield animation paused");
            }
        });

        // Mute / Unmute Toggle Event
        if (this.footerMusicToggle) {
            this.footerMusicToggle.addEventListener('click', () => this.toggleMute());
        }

        window.toggleCosmicMusic = () => this.toggleMute();

        // Autoplay on site entry
        this.initAutoplay();
    }

    // Autoplay on site entry (Immediate attempt + first interaction fallback)
    initAutoplay() {
        if (!this.bgMusic) return;
        this.bgMusic.volume = 0.38;
        this.bgMusic.muted = false;

        const attemptPlay = () => {
            if (!this.bgMusic) return;
            const playPromise = this.bgMusic.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    this.isAudioMuted = false;
                    this.updateAudioUI(false);
                }).catch(() => {
                    // Browser policy blocked unmuted autoplay without user gesture.
                    // Automatically start upon first user touch/click/scroll anywhere on the page.
                    const onFirstGesture = () => {
                        if (this.bgMusic && !this.isAudioMuted) {
                            this.bgMusic.muted = false;
                            this.bgMusic.play().then(() => {
                                this.updateAudioUI(false);
                            }).catch(() => {});
                        }
                        window.removeEventListener('click', onFirstGesture);
                        window.removeEventListener('keydown', onFirstGesture);
                        window.removeEventListener('touchstart', onFirstGesture);
                        window.removeEventListener('scroll', onFirstGesture);
                    };
                    window.addEventListener('click', onFirstGesture, { once: true });
                    window.addEventListener('keydown', onFirstGesture, { once: true });
                    window.addEventListener('touchstart', onFirstGesture, { once: true });
                    window.addEventListener('scroll', onFirstGesture, { once: true });
                });
            }
        };

        attemptPlay();
    }

    // Toggle Mute / Sound ON (Icon only, no text)
    toggleMute() {
        if (!this.bgMusic) return;

        if (this.bgMusic.paused) {
            this.bgMusic.muted = false;
            this.isAudioMuted = false;
            this.bgMusic.play().then(() => {
                this.updateAudioUI(false);
            }).catch(() => {});
            return;
        }

        this.isAudioMuted = !this.isAudioMuted;
        this.bgMusic.muted = this.isAudioMuted;
        this.updateAudioUI(this.isAudioMuted);
    }

    updateAudioUI(isMuted) {
        if (this.footerMusicIcon) {
            this.footerMusicIcon.className = isMuted ? "fa-solid fa-volume-xmark" : "fa-solid fa-volume-high";
        }
        if (this.footerMusicToggle) {
            this.footerMusicToggle.classList.toggle('muted', isMuted);
            this.footerMusicToggle.setAttribute('title', isMuted ? "Unmute Sound" : "Mute Sound");
        }
    }

    // Security PIN Verification
    requestAdminAccess() {
        if (!this.data.profile.pin) {
            this.openAdminPanel();
            return;
        }
        if (!this.pinOverlay) this.pinOverlay = document.getElementById('pinOverlay');
        if (!this.pinInput) this.pinInput = document.getElementById('pinInput');

        if (this.pinInput) this.pinInput.value = "";
        if (this.pinOverlay) {
            this.pinOverlay.classList.add('active');
        } else {
            this.openAdminPanel();
            return;
        }
        setTimeout(() => {
            if (this.pinInput) this.pinInput.focus();
        }, 100);
    }

    verifyPin() {
        const entered = this.pinInput.value.trim();
        if (entered === this.data.profile.pin) {
            this.pinOverlay.classList.remove('active');
            this.openAdminPanel();
        } else {
            this.showToast("Incorrect PIN code!", "error");
            this.pinInput.value = "";
            this.pinInput.focus();
        }
    }

    openAdminPanel() {
        this.renderAdminProgramsList();
        this.renderAdminLinksList();
        this.populateProfileForm();
        this.renderProgramIconPresets();
        this.renderProgramColorPresets();
        this.renderLinkIconPresets();
        this.renderLinkColorPresets();
        this.adminOverlay.classList.add('active');
    }

    // ========================================================
    // Rendering Functions
    // ========================================================
    renderAll() {
        this.renderProfile();
        this.renderPrograms();
        this.renderLinks();
    }

    // Render Profile Header
    renderProfile() {
        const p = this.data.profile;
        this.profileAvatar.src = p.avatar || DEFAULT_DATA.profile.avatar;
        const cleanName = (p.name || 'TIGER TEAM').replace(/✦/g, '').trim();
        this.profileTitle.textContent = cleanName;
        this.profileBio.textContent = p.bio || 'Here you will find all the links and projects of Tiger Team.';
        this.statusBadgeText.textContent = p.status || 'Online';
        document.title = `${cleanName} | Space Hub`;
    }

    // Render Cosmic Apps Dock
    renderPrograms() {
        this.appsDock.innerHTML = "";
        if (!this.data.programs || this.data.programs.length === 0) {
            this.appsDock.innerHTML = `<p style="color: var(--text-muted); font-size: 0.9rem;">No apps configured yet. Click "Admin Panel" to add your apps.</p>`;
            return;
        }

        this.data.programs.forEach(prog => {
            if (prog.active === false) return;
            const item = document.createElement('a');
            item.href = prog.url;
            item.target = "_blank";
            item.rel = "noopener noreferrer";
            item.className = "app-item";
            item.title = prog.name;
            item.style.setProperty('--app-glow', prog.glow || 'rgba(56, 189, 248, 0.4)');

            item.innerHTML = `
                <div class="app-icon-wrap" style="color: ${prog.color || '#38bdf8'}; box-shadow: 0 4px 15px ${prog.glow || 'rgba(56,189,248,0.2)'};">
                    ${this.getIconHtml(prog.icon)}
                </div>
                <span class="app-title">${this.escapeHtml(prog.name)}</span>
            `;

            this.appsDock.appendChild(item);
        });
    }

    // Render Website Links Grid (Hidden if empty)
    renderLinks() {
        this.linksGrid.innerHTML = "";
        const activeLinks = (this.data.links || []).filter(l => l.active !== false);

        if (activeLinks.length === 0) {
            this.linksGrid.style.display = 'none';
            return;
        }

        this.linksGrid.style.display = 'flex';

        activeLinks.forEach(link => {
            const card = document.createElement('div');
            card.className = 'link-card';
            card.style.setProperty('--hover-glow', link.glow || 'rgba(168, 85, 247, 0.35)');

            card.innerHTML = `
                <div class="link-info-side" onclick="window.open('${this.escapeHtml(link.url)}', '_blank', 'noopener,noreferrer')" style="cursor: pointer;">
                    <div class="link-icon-box" style="color: ${link.color || '#38bdf8'}; box-shadow: 0 0 15px ${link.glow || 'transparent'};">
                        ${this.getIconHtml(link.icon)}
                    </div>
                    <div class="link-text">
                        <div class="link-title-row">
                            <span class="link-title">${this.escapeHtml(link.title)}</span>
                        </div>
                        ${link.desc ? `<p class="link-desc">${this.escapeHtml(link.desc)}</p>` : ''}
                    </div>
                </div>
                <div class="link-actions-side">
                    <button class="btn-copy-link" title="Copy Link" onclick="event.stopPropagation(); window.cosmicApp.copyLink('${this.escapeHtml(link.url)}')">
                        <i class="fa-regular fa-copy"></i>
                    </button>
                    <a href="${this.escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer" class="link-arrow" title="Visit Website">
                        <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                </div>
            `;

            this.linksGrid.appendChild(card);
        });
    }

    // Copy URL to Clipboard
    copyLink(url) {
        navigator.clipboard.writeText(url).then(() => {
            this.showToast("Link copied to clipboard! ✦");
        }).catch(() => {
            this.showToast("Could not copy link automatically", "error");
        });
    }

    // ========================================================
    // Apps Management (CRUD)
    // ========================================================
    renderProgramIconPresets() {
        this.programIconPresetsContainer.innerHTML = "";
        PROGRAM_ICON_PRESETS.forEach(item => {
            const chip = document.createElement('div');
            chip.className = `icon-chip ${this.selectedProgramIcon === item.icon ? 'selected' : ''}`;
            chip.innerHTML = this.getIconHtml(item.icon);
            chip.title = item.name;
            chip.addEventListener('click', () => {
                this.selectedProgramIcon = item.icon;
                this.formProgramCustomIcon.value = item.icon;
                if (!this.formProgramName.value) {
                    this.formProgramName.value = item.name;
                }
                this.renderProgramIconPresets();
            });
            this.programIconPresetsContainer.appendChild(chip);
        });

        this.formProgramCustomIcon.oninput = (e) => {
            this.selectedProgramIcon = e.target.value.trim() || "fa-solid fa-shapes";
            this.renderProgramIconPresets();
        };
    }

    renderProgramColorPresets() {
        this.programColorPresetsContainer.innerHTML = "";
        COLOR_PRESETS.forEach(preset => {
            const dot = document.createElement('div');
            dot.className = `color-dot ${this.selectedProgramColor.color === preset.color ? 'selected' : ''}`;
            dot.style.backgroundColor = preset.color;
            dot.style.color = preset.glow;
            dot.addEventListener('click', () => {
                this.selectedProgramColor = preset;
                this.renderProgramColorPresets();
            });
            this.programColorPresetsContainer.appendChild(dot);
        });
    }

    renderAdminProgramsList() {
        this.adminProgramsList.innerHTML = "";
        if (!this.data.programs || this.data.programs.length === 0) {
            this.adminProgramsList.innerHTML = `<p style="color: var(--text-muted); text-align: center;">No apps configured yet.</p>`;
            return;
        }

        this.data.programs.forEach((prog, index) => {
            const item = document.createElement('div');
            item.className = 'admin-link-item';
            item.innerHTML = `
                <div class="admin-link-item-info">
                    <div class="admin-link-item-icon" style="color: ${prog.color || '#38bdf8'};">
                        ${this.getIconHtml(prog.icon)}
                    </div>
                    <div style="min-width: 0;">
                        <div class="admin-link-item-title">${this.escapeHtml(prog.name)}</div>
                        <div class="admin-link-item-url">${this.escapeHtml(prog.url)}</div>
                    </div>
                </div>
                <div class="admin-link-item-actions">
                    <button class="btn-icon-action" title="Move Up" ${index === 0 ? 'disabled style="opacity:0.3;"' : ''} onclick="window.cosmicApp.moveProgram(${index}, -1)">
                        <i class="fa-solid fa-arrow-up"></i>
                    </button>
                    <button class="btn-icon-action" title="Move Down" ${index === this.data.programs.length - 1 ? 'disabled style="opacity:0.3;"' : ''} onclick="window.cosmicApp.moveProgram(${index}, 1)">
                        <i class="fa-solid fa-arrow-down"></i>
                    </button>
                    <button class="btn-icon-action" title="Edit App" onclick="window.cosmicApp.editProgram('${prog.id}')">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button class="btn-icon-action delete" title="Delete App" onclick="window.cosmicApp.deleteProgram('${prog.id}')">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            `;
            this.adminProgramsList.appendChild(item);
        });
    }

    handleProgramSubmit() {
        const name = this.formProgramName.value.trim();
        const url = this.formProgramUrl.value.trim();
        const icon = this.selectedProgramIcon || "fa-solid fa-shapes";
        const { color, glow } = this.selectedProgramColor;

        if (!name || !url) {
            this.showToast("Please enter an app name and URL!", "error");
            return;
        }

        if (this.editingProgramId) {
            const index = this.data.programs.findIndex(p => p.id === this.editingProgramId);
            if (index !== -1) {
                this.data.programs[index] = {
                    ...this.data.programs[index],
                    name,
                    url,
                    icon,
                    color,
                    glow
                };
                this.showToast("App updated successfully! ✦");
            }
        } else {
            const newProg = {
                id: "prog-" + Date.now(),
                name,
                url,
                icon,
                color,
                glow,
                active: true
            };
            this.data.programs.push(newProg);
            this.showToast("App added successfully! ✦");
        }

        this.saveData();
        this.resetProgramForm();
        this.renderAdminProgramsList();
        this.renderPrograms();
    }

    editProgram(id) {
        const prog = this.data.programs.find(p => p.id === id);
        if (!prog) return;

        this.editingProgramId = id;
        this.formProgramId.value = id;
        this.formProgramName.value = prog.name;
        this.formProgramUrl.value = prog.url;
        this.formProgramCustomIcon.value = prog.icon || 'fa-solid fa-shapes';
        this.selectedProgramIcon = prog.icon || 'fa-solid fa-shapes';

        const matchedColor = COLOR_PRESETS.find(c => c.color === prog.color) || { color: prog.color, glow: prog.glow };
        this.selectedProgramColor = matchedColor;

        this.renderProgramIconPresets();
        this.renderProgramColorPresets();

        this.formProgramSubmitBtn.innerHTML = `<i class="fa-solid fa-check"></i> Save Changes`;
        this.cancelProgramEditBtn.style.display = 'inline-flex';

        this.programForm.scrollIntoView({ behavior: 'smooth' });
    }

    resetProgramForm() {
        this.editingProgramId = null;
        this.programForm.reset();
        this.formProgramId.value = '';
        this.selectedProgramIcon = "fa-brands fa-telegram";
        this.selectedProgramColor = COLOR_PRESETS[0];
        this.renderProgramIconPresets();
        this.renderProgramColorPresets();
        this.formProgramSubmitBtn.innerHTML = `<i class="fa-solid fa-plus"></i> Add App Now`;
        this.cancelProgramEditBtn.style.display = 'none';
    }

    deleteProgram(id) {
        if (confirm("Are you sure you want to delete this app?")) {
            this.data.programs = this.data.programs.filter(p => p.id !== id);
            this.saveData();
            this.renderAdminProgramsList();
            this.renderPrograms();
            this.showToast("App deleted successfully");
        }
    }

    moveProgram(index, direction) {
        const targetIndex = index + direction;
        if (targetIndex < 0 || targetIndex >= this.data.programs.length) return;
        const temp = this.data.programs[index];
        this.data.programs[index] = this.data.programs[targetIndex];
        this.data.programs[targetIndex] = temp;
        this.saveData();
        this.renderAdminProgramsList();
        this.renderPrograms();
    }

    // ========================================================
    // Website Links Management (CRUD)
    // ========================================================
    renderLinkIconPresets() {
        this.iconPresetsContainer.innerHTML = "";
        LINK_ICON_PRESETS.forEach(item => {
            const iconClass = typeof item === 'string' ? item : item.icon;
            const iconName = typeof item === 'string' ? item : item.name;
            const chip = document.createElement('div');
            chip.className = `icon-chip ${this.selectedLinkIcon === iconClass ? 'selected' : ''}`;
            chip.innerHTML = this.getIconHtml(iconClass);
            chip.title = iconName;
            chip.addEventListener('click', () => {
                this.selectedLinkIcon = iconClass;
                this.formCustomIcon.value = iconClass;
                if (!this.formTitle.value && typeof item === 'object' && item.name) {
                    this.formTitle.value = item.name.split(' / ')[0];
                }
                this.renderLinkIconPresets();
            });
            this.iconPresetsContainer.appendChild(chip);
        });

        this.formCustomIcon.oninput = (e) => {
            this.selectedLinkIcon = e.target.value.trim() || "fa-solid fa-globe";
            this.renderLinkIconPresets();
        };
    }

    renderLinkColorPresets() {
        this.colorPresetsContainer.innerHTML = "";
        COLOR_PRESETS.forEach(preset => {
            const dot = document.createElement('div');
            dot.className = `color-dot ${this.selectedLinkColor.color === preset.color ? 'selected' : ''}`;
            dot.style.backgroundColor = preset.color;
            dot.style.color = preset.glow;
            dot.addEventListener('click', () => {
                this.selectedLinkColor = preset;
                this.renderLinkColorPresets();
            });
            this.colorPresetsContainer.appendChild(dot);
        });
    }

    renderAdminLinksList() {
        this.adminLinksList.innerHTML = "";
        if (!this.data.links || this.data.links.length === 0) {
            this.adminLinksList.innerHTML = `<p style="color: var(--text-muted); text-align: center;">No website links added yet.</p>`;
            return;
        }

        this.data.links.forEach((link, index) => {
            const item = document.createElement('div');
            item.className = 'admin-link-item';
            item.innerHTML = `
                <div class="admin-link-item-info">
                    <div class="admin-link-item-icon" style="color: ${link.color || '#38bdf8'};">
                        ${this.getIconHtml(link.icon)}
                    </div>
                    <div style="min-width: 0;">
                        <div class="admin-link-item-title">${this.escapeHtml(link.title)}</div>
                        <div class="admin-link-item-url">${this.escapeHtml(link.url)}</div>
                    </div>
                </div>
                <div class="admin-link-item-actions">
                    <button class="btn-icon-action" title="Move Up" ${index === 0 ? 'disabled style="opacity:0.3;"' : ''} onclick="window.cosmicApp.moveLink(${index}, -1)">
                        <i class="fa-solid fa-arrow-up"></i>
                    </button>
                    <button class="btn-icon-action" title="Move Down" ${index === this.data.links.length - 1 ? 'disabled style="opacity:0.3;"' : ''} onclick="window.cosmicApp.moveLink(${index}, 1)">
                        <i class="fa-solid fa-arrow-down"></i>
                    </button>
                    <button class="btn-icon-action" title="Edit Link" onclick="window.cosmicApp.editLink('${link.id}')">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button class="btn-icon-action delete" title="Delete Link" onclick="window.cosmicApp.deleteLink('${link.id}')">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            `;
            this.adminLinksList.appendChild(item);
        });
    }

    handleLinkSubmit() {
        const title = this.formTitle.value.trim();
        const url = this.formUrl.value.trim();
        const desc = this.formDesc.value.trim();
        const icon = this.selectedLinkIcon || "fa-solid fa-globe";
        const { color, glow } = this.selectedLinkColor;

        if (!title || !url) {
            this.showToast("Please enter a website title and URL!", "error");
            return;
        }

        if (!this.data.links) this.data.links = [];

        if (this.editingLinkId) {
            const index = this.data.links.findIndex(l => l.id === this.editingLinkId);
            if (index !== -1) {
                this.data.links[index] = {
                    ...this.data.links[index],
                    title,
                    url,
                    desc,
                    icon,
                    color,
                    glow
                };
                this.showToast("Link updated successfully! ✦");
            }
        } else {
            const newLink = {
                id: "link-" + Date.now(),
                title,
                url,
                desc,
                icon,
                color,
                glow,
                active: true
            };
            this.data.links.push(newLink);
            this.showToast("Link added successfully! ✦");
        }

        this.saveData();
        this.resetLinkForm();
        this.renderAdminLinksList();
        this.renderLinks();
    }

    editLink(id) {
        const link = (this.data.links || []).find(l => l.id === id);
        if (!link) return;

        this.editingLinkId = id;
        this.formLinkId.value = id;
        this.formTitle.value = link.title;
        this.formUrl.value = link.url;
        this.formDesc.value = link.desc || '';
        this.formCustomIcon.value = link.icon || 'fa-solid fa-globe';
        this.selectedLinkIcon = link.icon || 'fa-solid fa-globe';

        const matchedColor = COLOR_PRESETS.find(c => c.color === link.color) || { color: link.color, glow: link.glow };
        this.selectedLinkColor = matchedColor;

        this.renderLinkIconPresets();
        this.renderLinkColorPresets();

        this.formSubmitBtn.innerHTML = `<i class="fa-solid fa-check"></i> Save Changes`;
        this.cancelEditBtn.style.display = 'inline-flex';

        this.linkForm.scrollIntoView({ behavior: 'smooth' });
    }

    resetLinkForm() {
        this.editingLinkId = null;
        this.linkForm.reset();
        this.formLinkId.value = '';
        this.selectedLinkIcon = "fa-solid fa-globe";
        this.selectedLinkColor = COLOR_PRESETS[0];
        this.renderLinkIconPresets();
        this.renderLinkColorPresets();
        this.formSubmitBtn.innerHTML = `<i class="fa-solid fa-plus"></i> Add Link`;
        this.cancelEditBtn.style.display = 'none';
    }

    deleteLink(id) {
        if (confirm("Are you sure you want to delete this link?")) {
            this.data.links = (this.data.links || []).filter(l => l.id !== id);
            this.saveData();
            this.renderAdminLinksList();
            this.renderLinks();
            this.showToast("Link deleted successfully");
        }
    }

    moveLink(index, direction) {
        const targetIndex = index + direction;
        if (targetIndex < 0 || targetIndex >= this.data.links.length) return;
        const temp = this.data.links[index];
        this.data.links[index] = this.data.links[targetIndex];
        this.data.links[targetIndex] = temp;
        this.saveData();
        this.renderAdminLinksList();
        this.renderLinks();
    }

    // ========================================================
    // Profile & Backup Management
    // ========================================================
    populateProfileForm() {
        const p = this.data.profile;
        this.inputProfileName.value = p.name || '';
        this.inputProfileBio.value = p.bio || '';
        this.inputProfileAvatar.value = p.avatar || '';
        this.inputProfileStatus.value = p.status || '';
        this.inputProfilePin.value = p.pin || '';
    }

    handleProfileSubmit() {
        this.data.profile.name = this.inputProfileName.value.trim() || "Cosmic Hub";
        this.data.profile.bio = this.inputProfileBio.value.trim();
        this.data.profile.avatar = this.inputProfileAvatar.value.trim() || DEFAULT_DATA.profile.avatar;
        this.data.profile.status = this.inputProfileStatus.value.trim() || "Online in Cyberspace";
        this.data.profile.pin = this.inputProfilePin.value.trim();

        this.saveData();
        this.renderProfile();
        this.showToast("Profile settings saved! ✦");
    }

    exportToJson() {
        const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.data, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", jsonStr);
        downloadAnchor.setAttribute("download", `cosmic-hub-backup-${new Date().toISOString().slice(0, 10)}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
        this.showToast("Backup file downloaded successfully! ✦");
    }

    importFromJson(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const imported = JSON.parse(e.target.result);
                if (imported.programs || imported.links || imported.profile) {
                    this.data = {
                        profile: { ...DEFAULT_DATA.profile, ...(imported.profile || {}) },
                        programs: imported.programs || DEFAULT_DATA.programs,
                        links: imported.links || []
                    };
                    this.saveData();
                    this.renderAll();
                    this.renderAdminProgramsList();
                    this.renderAdminLinksList();
                    this.populateProfileForm();
                    this.showToast("Backup restored successfully! ✦");
                } else {
                    this.showToast("Invalid backup file format!", "error");
                }
            } catch (err) {
                console.error(err);
                this.showToast("Failed to read JSON backup file!", "error");
            }
        };
        reader.readAsText(file);
    }

    // Toast Notification System
    showToast(message, type = "success") {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<i class="fa-solid fa-sparkles"></i> <span>${this.escapeHtml(message)}</span>`;

        if (type === "error") {
            toast.style.borderColor = "rgba(239, 68, 68, 0.5)";
            toast.style.boxShadow = "0 10px 30px rgba(0,0,0,0.7), 0 0 20px rgba(239,68,68,0.3)";
            toast.querySelector('i').className = "fa-solid fa-circle-exclamation";
            toast.querySelector('i').style.color = "#ef4444";
        }

        container.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = "toastOut 0.3s forwards";
            setTimeout(() => toast.remove(), 300);
        }, 3200);
    }

    // HTML Sanitization
    escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    window.cosmicApp = new CosmicApp();
});
