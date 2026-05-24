/**
 * main.js - Animations and Interactivity for Takizawa HP
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Set current year in footer
    const year = document.getElementById('year');
    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // Sticky header shadow
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Animate hamburger to X
        hamburger.classList.toggle('is-active');
        // Replace span animation here if desired, but clip-path handles nav
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('is-active');
        });
    });

    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            if (!targetId) return;
            
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for scroll animations (fade in)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in classes
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    animatedElements.forEach(el => observer.observe(el));

    // Chatbot Logic
    const chatToggleBtn = document.getElementById('chatToggleBtn');
    const chatCloseBtn = document.getElementById('chatCloseBtn');
    const chatWindow = document.getElementById('chatWindow');
    const chatBody = document.getElementById('chatBody');
    const chatOptionsContainer = document.getElementById('chatOptions');

    // Questions and Answers Tree
    const faqData = [
        {
            q: "どんな作業をお願いできますか？",
            a: "電球交換、照明・スイッチ・コンセントまわりの簡易確認、蛇口や排水まわりの初期確認、家具組立、賃貸・不動産・家計の初歩相談に対応しています。専門業者に頼む前の整理だけでも大丈夫です。"
        },
        {
            q: "料金の目安を教えてください",
            a: "LINE写真相談は0円、近所の現地確認は2,000円〜3,000円、30分以内の小作業は3,000円〜、1時間以内の作業は5,000円〜が目安です。作業前に金額を確認します。"
        },
        {
            q: "対応エリアはどこまでですか？",
            a: "市川市・行徳・妙典を中心に、火曜・水曜に伺える範囲で対応します。周辺地域も内容によってご相談ください。"
        },
        {
            q: "依頼方法を教えてください",
            a: "LINEで写真と状況を送るか、お電話（090-4827-8442）でご相談ください。写真だけでも、対応可否と概算料金を確認できます。"
        },
        {
            q: "対応できない作業はありますか？",
            a: "資格範囲外の電気工事、危険な高所作業、大規模な水道工事、緊急性の高い漏水、壁や床を壊す工事、法的・税務判断、金融商品の販売は対応できません。無理に受けず、必要に応じて専門業者への相談を案内します。"
        }
    ];

    function renderOptions() {
        chatOptionsContainer.innerHTML = '';
        faqData.forEach(item => {
            const btn = document.createElement('button');
            btn.className = 'chat-option-btn';
            btn.textContent = item.q;
            btn.addEventListener('click', () => handleOptionClick(item));
            chatOptionsContainer.appendChild(btn);
        });
    }

    function handleOptionClick(item) {
        // Remove options temporarily
        chatOptionsContainer.style.display = 'none';

        // Add User Message
        appendMessage(item.q, 'user-message');

        // Simulate typing delay
        setTimeout(() => {
            appendMessage(item.a, 'bot-message');
            // Show options again at the bottom
            chatBody.appendChild(chatOptionsContainer);
            chatOptionsContainer.style.display = 'flex';
            scrollToBottom();
        }, 600);
    }

    function appendMessage(text, className) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-message ${className}`;
        msgDiv.innerHTML = text;
        
        // Insert before options container
        chatBody.insertBefore(msgDiv, chatOptionsContainer);
        scrollToBottom();
    }

    function scrollToBottom() {
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // Toggle Chat Window
    if (chatToggleBtn && chatCloseBtn && chatWindow) {
        chatToggleBtn.addEventListener('click', () => {
            chatWindow.classList.add('active');
            if (chatOptionsContainer.children.length === 0) {
                renderOptions();
            }
        });

        chatCloseBtn.addEventListener('click', () => {
            chatWindow.classList.remove('active');
        });
    }
});
