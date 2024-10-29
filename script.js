document.addEventListener('DOMContentLoaded', () => {
    const introText = document.getElementById('introText');
    const buttonContainer = document.getElementById('buttonContainer');
    const glideMusic = document.getElementById('glideMusic');
    const wingsMusic = document.getElementById('wingsMusic');
    const infoPopup = document.getElementById('infoPopup');
    const infoBtn = document.getElementById('infoBtn');
    const imageContainer = document.getElementById('imageContainer');
    const canvas = document.getElementById('scoreCanvas');
    const ctx = canvas.getContext('2d');

    const glideImages = [
        'images/green.jpg', 
        'images/steal.gif', 
        'images/kuno.gif', 
        'images/girls.jpg', 
        'images/run.gif',
        'images/grass.jpg',
        'images/boys.gif'
    ];
    const tobenaiImages = [
        'images/sky.jpg', 
        'images/you.gif', 
        'images/wings.gif', 
        'images/chou.gif', 
        'images/sony.gif',
        'images/call.gif',
        'images/apple.jpg'
    ];

    let loadedImages = [];
    let currentImages = [];
    let currentCaptions = [];
    let currentImageIndex = 0;

    
    const glideCaptions = [
        '26:01 호시노가 유이치를 괴롭힌다.',
        '6:13 유이치와 친구들이 도둑질을 한다.',
        '41:48 유이치가 짝사랑하는 쿠노.',
        '1:00:02 오키나와 여행의 회상.',
        '1:43:42 시오리와 유이치',
        '2:20 유이치의 독백.',
        '51:19 유이치의 과거 회상.'
    ];

    
    const tobenaiCaptions = [
        '1:56:26 시오리가 하늘을 바라본다.',
        '1:17:48 시오리의 등장.',
        '1:57:11 시오리가 자살한다.',
        '2:09:40 릴리 슈슈의 콘서트.',
        '1:47:24 시오리의 CD플레이어',
        '1:36:03 시오리에게서 걸려온 전화.',
        '2:05:56 호시노의 아이디@blue-cat'
    ];

    const textDisplay = document.createElement('div'); 
    textDisplay.style.position = 'absolute';
    textDisplay.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    textDisplay.style.border = '1px solid black';
    textDisplay.style.padding = '5px';
    textDisplay.style.display = 'none'; 
    document.body.appendChild(textDisplay); 

    // 이미지 로드 함수
    function loadImages(imageArray, captionArray) {
        loadedImages = [];
        currentCaptions = captionArray; 
        imageContainer.innerHTML = ''; 

        imageArray.forEach((src, index) => {
            const img = new Image();
            img.src = src;
            img.classList.add('image');
            img.style.display = 'block';
            img.style.opacity = 0; 
            img.style.transition = 'opacity 0.5s ease-in';

            
            const imgWidth = 500;
            const imgHeight = 500; 
            const randomX = Math.random() * (window.innerWidth - imgWidth);
            const randomY = Math.random() * (window.innerHeight - imgHeight);

            img.style.position = 'absolute';
            img.style.left = `${randomX}px`;
            img.style.top = `${randomY}px`;

            imageContainer.appendChild(img); 
            loadedImages.push(img);
        });
    }

    introText.addEventListener('click', () => {
        introText.style.display = 'none'; 
        buttonContainer.style.display = 'flex'; 
    });

   
    document.getElementById('glideBtn').addEventListener('click', () => {
        introText.style.display = 'none'; 
        if (glideMusic.paused) {
            if (!wingsMusic.paused) {
                wingsMusic.pause(); 
            }
            glideMusic.play();
            currentImages = glideImages; 
            loadImages(currentImages, glideCaptions); 
            currentImageIndex = 0; 
        } else {
            glideMusic.pause(); 
        }
    });

 
    document.getElementById('tobenaiBtn').addEventListener('click', () => {
        introText.style.display = 'none'; 
        if (wingsMusic.paused) {
            if (!glideMusic.paused) {
                glideMusic.pause();
            }
            wingsMusic.play();
            currentImages = tobenaiImages; 
            loadImages(currentImages, tobenaiCaptions); 
            currentImageIndex = 0; 
        } else {
            wingsMusic.pause(); 
        }
    });

    document.getElementById('plusBtn').addEventListener('click', () => {
        window.location.href = 'cam.html'; 
    });

    
    document.addEventListener('mousemove', (event) => {
        const mouseY = event.clientY / window.innerHeight; 
        const index = Math.floor(mouseY * loadedImages.length); 

        
        if (index !== currentImageIndex && index < loadedImages.length) {
            if (currentImageIndex < loadedImages.length) {
                const prevImg = loadedImages[currentImageIndex];
                prevImg.style.opacity = 0; 
            }

            const img = loadedImages[index];
            img.style.display = 'block'; 
            img.style.opacity = 1; 
            currentImageIndex = index; 

        
            const currentCaption = currentCaptions[index];
            textDisplay.innerText = currentCaption; 
            textDisplay.style.left = `${event.clientX + 10}px`; 
            textDisplay.style.top = `${event.clientY + 10}px`; 
            textDisplay.style.display = 'block'; 
        }

      
        loadedImages.forEach((img) => {
            const offsetX = (event.clientX / window.innerWidth - 0.5) * 50; 
            const offsetY = (event.clientY / window.innerHeight - 0.5) * 50; 
            img.style.transform = `translate(${offsetX}px, ${offsetY}px)`; 
        });
    });

    document.addEventListener('mousemove', (event) => {
        if (textDisplay.style.display === 'block') {
            textDisplay.style.left = `${event.clientX + 10}px`; 
            textDisplay.style.top = `${event.clientY + 10}px`;
        }
    });


    document.addEventListener('mouseleave', () => {
        textDisplay.style.display = 'none'; 
    });

  
    infoBtn.addEventListener('click', () => {
        infoPopup.style.display = 'flex';
    });

 
    infoPopup.addEventListener('click', (event) => {
        if (event.target === infoPopup) {
            infoPopup.style.display = 'none';
        }
    });

   
    const popupContent = document.querySelector('.popup-content');
    popupContent.addEventListener('click', (event) => {
        event.stopPropagation(); 
    });


    document.addEventListener('keydown', (event) => {
        if (event.key === 's' || event.key === 'S') {
            try {
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/png');
                link.download = 'screenshot.png';
                link.click();
            } catch (error) {
                console.error('스크린샷 저장 실패:', error);
            }
        }
    });

    function drawImages() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        loadedImages.forEach(img => {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        });
    }
});
