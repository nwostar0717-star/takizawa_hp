/**
 * main.js - Animations and Interactivity for Takizawa HP
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

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
            a: "電球交換、水漏れ修理、家具の組み立てから、不動産や住宅ローンのご相談まで幅広く対応しています！ページ上の「頼めることを見る」もご参照ください。"
        },
        {
            q: "料金の目安を教えてください",
            a: "基本的には「コーヒー1杯分程度の気持ち代」から承っております。材料費が必要な場合のみ、実費をご負担いただいております。"
        },
        {
            q: "対応エリアはどこまでですか？",
            a: "ご近所（自転車や車ですぐ伺える範囲）を想定しております。詳細なご住所をお伺いしてご相談乗らせていただきます！"
        },
        {
            q: "依頼方法を教えてください",
            a: "お電話（090-4827-8442）または、ページ下部のLINEのQRコードからお気軽にご連絡ください。"
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
