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
            a: "電気、水まわり、家具の組み立て、住まいの確認、不動産や家計の初歩相談まで対応しています。ページ上の「できること」もご参照ください。"
        },
        {
            q: "料金の目安を教えてください",
            a: "小さなお手伝いは、お気持ち代からご相談ください。材料費や部品代が必要な場合は、事前にお伝えします。"
        },
        {
            q: "対応エリアはどこまでですか？",
            a: "市川市・行徳・妙典を中心に、火曜・水曜に伺える範囲で対応します。周辺地域も内容によってご相談ください。"
        },
        {
            q: "依頼方法を教えてください",
            a: "お電話（090-4827-8442）または、ページ下部のLINEボタン・QRコードからお気軽にご連絡ください。"
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
