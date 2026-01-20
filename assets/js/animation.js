// fadeIn アニメーション
document.addEventListener('DOMContentLoaded', () => {
    const fadeInTargets = document.querySelectorAll('.u-fadeIn');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-show');
            }
        });
    }, {
        threshold: 0.1 // 10%見えたら
    });

    fadeInTargets.forEach(target => observer.observe(target));
});


document.addEventListener('DOMContentLoaded', () => {
    const fadeInTargets = document.querySelectorAll('.u-fadeOut');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-hide');
            }
        });
    }, {
        threshold: 0.1 // 10%見えたら
    });

    fadeInTargets.forEach(target => observer.observe(target));
});