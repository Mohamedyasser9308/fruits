document.addEventListener("DOMContentLoaded", function () {
    let currentIndex = 0;
    const items = document.querySelectorAll(".discount-item");
    const totalItems = items.length;
    
    document.getElementById("next").addEventListener("click", function () {
        items[currentIndex].classList.remove("active");
        currentIndex = (currentIndex + 1) % totalItems;
        items[currentIndex].classList.add("active");
    });
    
    document.getElementById("prev").addEventListener("click", function () {
        items[currentIndex].classList.remove("active");
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        items[currentIndex].classList.add("active");
    });
    
    function updateTimers() {
        document.querySelectorAll(".timer").forEach(timer => {
            let time = parseInt(timer.getAttribute("data-time"));
            if (time > 0) {
                let hours = Math.floor(time / 3600);
                let minutes = Math.floor((time % 3600) / 60);
                let seconds = time % 60;
                timer.textContent = `${hours}h ${minutes}m ${seconds}s`;
                timer.setAttribute("data-time", time - 1);
            } else {
                timer.textContent = "انتهى العرض";
            }
        });
    }
    setInterval(updateTimers, 1000);
});