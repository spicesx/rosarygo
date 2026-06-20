document.addEventListener('DOMContentLoaded', () => {
    const blob = document.getElementById('mouse-blob');
    if (!blob) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let blobX = mouseX;
    let blobY = mouseY;

    let hasMouse = false;
    let interactionTimeout;

    function resetInteraction() {
        hasMouse = true;
        clearTimeout(interactionTimeout);
        interactionTimeout = setTimeout(() => {
            hasMouse = false;
        }, 3000);
    }

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        resetInteraction();
    });

    window.addEventListener('touchstart', (e) => {
        if (e.touches.length > 0) {
            mouseX = e.touches[0].clientX;
            mouseY = e.touches[0].clientY;
            resetInteraction();
        }
    });

    window.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            mouseX = e.touches[0].clientX;
            mouseY = e.touches[0].clientY;
            resetInteraction();
        }
    });

    document.addEventListener('mouseleave', () => {
        hasMouse = false;
    });

    let time = 0;

    function animate() {
        if (!hasMouse) {
            time += 0.01;
            let cx = window.innerWidth / 2;
            let cy = window.innerHeight / 2;
            mouseX = cx + Math.sin(time) * (window.innerWidth * 0.3);
            mouseY = cy + Math.cos(time * 0.8) * (window.innerHeight * 0.3);
        }

        let dx = mouseX - blobX;
        let dy = mouseY - blobY;

        blobX += dx * 0.1;
        blobY += dy * 0.1;

        let speed = Math.sqrt(dx * dx + dy * dy);

        let stretch = Math.min(speed * 0.003, 0.6);
        let scaleX = 1 + stretch;
        let scaleY = 1 - stretch * 0.5;

        let angle = Math.atan2(dy, dx);

        blob.style.transform = `translate(${blobX}px, ${blobY}px) translate(-50%, -50%) rotate(${angle}rad) scale(${scaleX}, ${scaleY})`;

        requestAnimationFrame(animate);
    }

    animate();
});
