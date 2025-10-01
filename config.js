// Configuration loader and DOM updater
let CONFIG = null;

// Load configuration from config.json
async function loadConfig() {
    try {
        const response = await fetch('/config.json');
        CONFIG = await response.json();
        return CONFIG;
    } catch (error) {
        console.error('Failed to load configuration:', error);
        // Return default config if loading fails
        return getDefaultConfig();
    }
}

// Default configuration fallback
function getDefaultConfig() {
    return {
        site: {
            title: "TALOS mAInd - Intelligent AI Agents for Enterprise",
            description: "TALOS mAInd - Transform your team's expertise into intelligent AI agents",
            brandName: "TALOS mAInd",
            brandNamePart1: "TALOS",
            brandNamePart2: "mAInd",
            tagline: "Intelligent AI Agents for Enterprise",
            year: "2025"
        },
        urls: {
            loginUrl: "#",
            signupUrl: "#",
            contactFormApi: "/api/contact"
        }
    };
}

// Apply configuration to DOM
function applyConfig(config) {
    // Update page title and meta description
    if (config.site) {
        document.title = config.site.title || document.title;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && config.site.description) {
            metaDesc.setAttribute('content', config.site.description);
        }
    }

    // Update brand name in navigation
    if (config.site && config.site.brandNamePart1 && config.site.brandNamePart2) {
        const brandTalos = document.querySelector('.brand-talos');
        const brandMaind = document.querySelector('.brand-maind');
        if (brandTalos) brandTalos.textContent = config.site.brandNamePart1;
        if (brandMaind) brandMaind.textContent = config.site.brandNamePart2;
    }

    // Update logo if provided
    if (config.logo && config.logo.svgContent) {
        const logoContainer = document.querySelector('.logo');
        if (logoContainer) {
            const svgElement = logoContainer.querySelector('.logo-icon');
            if (svgElement) {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = config.logo.svgContent;
                const newSvg = tempDiv.querySelector('svg');
                if (newSvg) {
                    svgElement.parentNode.replaceChild(newSvg, svgElement);
                }
            }
        }
    }

    // Update all login URLs
    if (config.urls && config.urls.loginUrl) {
        document.querySelectorAll('a[href*="login"], .btn-login').forEach(link => {
            link.setAttribute('href', config.urls.loginUrl);
        });
    }

    // Update all signup URLs
    if (config.urls && config.urls.signupUrl) {
        document.querySelectorAll('a[href*="signup"]').forEach(link => {
            link.setAttribute('href', config.urls.signupUrl);
        });
    }

    // Update hero section
    if (config.hero) {
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroNote = document.querySelector('.hero-note');

        if (heroTitle && config.hero.title) heroTitle.textContent = config.hero.title;
        if (heroSubtitle && config.hero.subtitle) heroSubtitle.textContent = config.hero.subtitle;
        if (heroNote && config.hero.noteText) heroNote.textContent = config.hero.noteText;
    }

    // Update stats
    if (config.stats) {
        const statItems = document.querySelectorAll('.stat-item');
        const statsConfig = [config.stats.stat1, config.stats.stat2, config.stats.stat3, config.stats.stat4];

        statItems.forEach((item, index) => {
            if (statsConfig[index]) {
                const number = item.querySelector('.stat-number');
                const label = item.querySelector('.stat-label');
                if (number && statsConfig[index].number) number.textContent = statsConfig[index].number;
                if (label && statsConfig[index].label) label.textContent = statsConfig[index].label;
            }
        });
    }

    // Update features section
    if (config.features) {
        const featuresSection = document.querySelector('#features .section-header');
        if (featuresSection) {
            const h2 = featuresSection.querySelector('h2');
            const p = featuresSection.querySelector('p');
            if (h2 && config.features.sectionTitle) h2.textContent = config.features.sectionTitle;
            if (p && config.features.sectionSubtitle) p.textContent = config.features.sectionSubtitle;
        }
    }

    // Update use cases section
    if (config.useCases) {
        const useCasesSection = document.querySelector('#use-cases .section-header');
        if (useCasesSection) {
            const h2 = useCasesSection.querySelector('h2');
            const p = useCasesSection.querySelector('p');
            if (h2 && config.useCases.sectionTitle) h2.textContent = config.useCases.sectionTitle;
            if (p && config.useCases.sectionSubtitle) p.textContent = config.useCases.sectionSubtitle;
        }
    }

    // Update how it works section
    if (config.howItWorks) {
        const howItWorksSection = document.querySelector('.how-it-works .section-header');
        if (howItWorksSection) {
            const h2 = howItWorksSection.querySelector('h2');
            const p = howItWorksSection.querySelector('p');
            if (h2 && config.howItWorks.sectionTitle) h2.textContent = config.howItWorks.sectionTitle;
            if (p && config.howItWorks.sectionSubtitle) p.textContent = config.howItWorks.sectionSubtitle;
        }
    }

    // Update pricing section
    if (config.pricing) {
        const pricingSection = document.querySelector('#pricing .section-header');
        if (pricingSection) {
            const h2 = pricingSection.querySelector('h2');
            const p = pricingSection.querySelector('p');
            if (h2 && config.pricing.sectionTitle) h2.textContent = config.pricing.sectionTitle;
            if (p && config.pricing.sectionSubtitle) p.textContent = config.pricing.sectionSubtitle;
        }

        // Update pricing cards
        const pricingCards = document.querySelectorAll('.pricing-card');
        const pricingConfigs = [config.pricing.starter, config.pricing.professional, config.pricing.enterprise];

        pricingCards.forEach((card, index) => {
            if (pricingConfigs[index]) {
                const tier = card.querySelector('.pricing-tier');
                const currency = card.querySelector('.currency');
                const amount = card.querySelector('.amount');
                const period = card.querySelector('.period');

                if (tier && pricingConfigs[index].name) tier.textContent = pricingConfigs[index].name;
                if (currency && pricingConfigs[index].currency !== undefined) currency.textContent = pricingConfigs[index].currency;
                if (amount && pricingConfigs[index].price) amount.textContent = pricingConfigs[index].price;
                if (period && pricingConfigs[index].period !== undefined) period.textContent = pricingConfigs[index].period;
            }
        });
    }

    // Update CTA section
    if (config.cta) {
        const ctaSection = document.querySelector('.cta-content');
        if (ctaSection) {
            const h2 = ctaSection.querySelector('h2');
            const p = ctaSection.querySelector('p');
            if (h2 && config.cta.title) h2.textContent = config.cta.title;
            if (p && config.cta.subtitle) p.textContent = config.cta.subtitle;
        }
    }

    // Update contact section
    if (config.contact) {
        const contactSection = document.querySelector('#contact .section-header');
        if (contactSection) {
            const h2 = contactSection.querySelector('h2');
            const p = contactSection.querySelector('p');
            if (h2 && config.contact.sectionTitle) h2.textContent = config.contact.sectionTitle;
            if (p && config.contact.sectionSubtitle) p.textContent = config.contact.sectionSubtitle;
        }

        // Update contact info
        const contactItems = document.querySelectorAll('.contact-item p');
        if (contactItems.length >= 3) {
            if (config.contact.email) contactItems[0].textContent = config.contact.email;
            if (config.contact.supportEmail) contactItems[1].textContent = config.contact.supportEmail;
            if (config.contact.hours) contactItems[2].textContent = config.contact.hours;
        }
    }

    // Update footer
    if (config.footer) {
        const footerColumn = document.querySelector('.footer-column');
        if (footerColumn) {
            const h4 = footerColumn.querySelector('h4');
            const p = footerColumn.querySelector('p');
            if (h4 && config.footer.companyName) h4.textContent = config.footer.companyName;
            if (p && config.footer.companyTagline) p.textContent = config.footer.companyTagline;
        }

        const footerBottom = document.querySelector('.footer-bottom p');
        if (footerBottom && config.footer.copyrightText) {
            footerBottom.textContent = config.footer.copyrightText;
        }
    }

    // Update chat preview
    if (config.chatPreview) {
        const chatName = document.querySelector('.chat-name');
        const chatStatus = document.querySelector('.chat-status');
        if (chatName && config.chatPreview.name) chatName.textContent = config.chatPreview.name;
        if (chatStatus && config.chatPreview.status) chatStatus.textContent = config.chatPreview.status;
    }

    // Store config globally for use in other scripts
    window.SITE_CONFIG = config;
}

// Initialize configuration on page load
document.addEventListener('DOMContentLoaded', async () => {
    const config = await loadConfig();
    applyConfig(config);
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { loadConfig, applyConfig, getDefaultConfig };
}
