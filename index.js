import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(__dirname));

// --- DATA ---
const myName = "Ezekiel Robin Codillo";
const mySection = "BSIT SM 4102";
const myBounty = "20,000,000";

// --- IMAGES ---
const myImage = "/kiel.png";
const quoteImage = "/whitebeard.jpg";
const myQuote = "As long as I am here, this land will not fall.";
const quoteAuthor = "Edward Newgate";

app.get('/', (req, res) => {
  const htmlResponse = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Wanted: Cloud Engineer</title>
        <link href="https://fonts.googleapis.com/css2?family=Rye&family=Cinzel:wght@700&family=Calistoga&family=Roboto:wght@400;700&display=swap" rel="stylesheet">
        <style>
            :root {
                --poster-bg: #fdf6e3;
                --poster-border: #bfa77a;
                --wb-card-bg: #3e2723;
                --gold: #ffd700;
            }

            * { box-sizing: border-box; }

            body {
                background-color: #1a1a1a;
                /* Dark Wood Texture Background */
                background-image: 
                    linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)),
                    url('https://www.transparenttextures.com/patterns/wood-pattern.png');
                font-family: 'Roboto', sans-serif;
                color: #333;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                margin: 0;
                padding: 20px;
                overflow-x: hidden;
                perspective: 1000px; /* Essential for 3D */
            }

            /* --- AMBIENT PARTICLES --- */
            .particles {
                position: fixed;
                top: 0; left: 0; width: 100%; height: 100%;
                pointer-events: none;
                z-index: 0;
            }
            .particle {
                position: absolute;
                background: rgba(255, 215, 0, 0.3);
                border-radius: 50%;
                animation: floatUp linear infinite;
            }

            @keyframes floatUp {
                from { transform: translateY(100vh) scale(0); opacity: 0; }
                50% { opacity: 0.5; }
                to { transform: translateY(-10vh) scale(1); opacity: 0; }
            }

            h1.main-title {
                font-family: 'Rye', serif;
                color: #fff;
                font-size: 4rem;
                text-shadow: 0 0 10px rgba(255, 215, 0, 0.5), 4px 4px 0 #000;
                margin-bottom: 60px;
                letter-spacing: 4px;
                z-index: 2;
                animation: slideDown 1s ease-out;
            }

            .container {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 80px;
                max-width: 1400px;
                align-items: center;
                z-index: 2;
            }

            /* --- 3D CARD WRAPPER --- */
            .card-wrapper {
                perspective: 1000px;
            }

            /* --- WANTED POSTER --- */
            .wanted-poster {
                background-color: var(--poster-bg);
                background-image: url('https://www.transparenttextures.com/patterns/paper.png');
                width: 340px;
                height: 560px;
                padding: 25px 20px;
                border: 1px solid var(--poster-border);
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
                
                /* 3D Properties */
                transform-style: preserve-3d;
                transition: transform 0.1s ease; /* Smooth movement */
                box-shadow: 
                    0 20px 50px rgba(0,0,0,0.5),
                    inset 0 0 60px rgba(0,0,0,0.1);
                animation: floatCard 6s ease-in-out infinite, fadeIn 1s ease-out 0.2s backwards;
            }

            /* Nail visual at top */
            .wanted-poster::before {
                content: '';
                position: absolute;
                top: -15px;
                width: 15px;
                height: 15px;
                background: #333;
                border-radius: 50%;
                box-shadow: 0 2px 5px rgba(0,0,0,0.5);
                z-index: 5;
            }

            .wanted-title {
                font-family: 'Rye', serif;
                font-size: 4rem;
                color: #4a3b2a;
                margin: 0 0 10px 0;
                line-height: 0.8;
                letter-spacing: 2px;
                text-align: center;
                width: 100%;
                text-shadow: 1px 1px 0 rgba(0,0,0,0.2);
            }

            .image-frame {
                width: 90%;
                height: 230px;
                background: #ddd;
                border: 5px solid #4a3b2a;
                margin-bottom: 10px;
                overflow: hidden;
                position: relative;
                box-shadow: inset 0 0 20px rgba(0,0,0,0.3);
            }

            .wanted-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
                filter: sepia(0.2) contrast(1.1); /* Slight vintage look */
            }

            .dead-or-alive {
                font-family: 'Calistoga', serif;
                font-size: 1.6rem;
                color: #4a3b2a;
                text-transform: uppercase;
                letter-spacing: 1px;
                margin: 10px 0;
            }

            .wanted-name {
                font-family: 'Calistoga', serif;
                font-size: 2.2rem; 
                color: #2c2c2c;
                text-transform: uppercase;
                margin: 0;
                line-height: 1;
                width: 100%;
                text-shadow: 1px 1px 0 rgba(255,255,255,0.5);
            }

            .section-stamp {
                margin: 10px 0;
                color: #c0392b;
                border: 3px solid #c0392b;
                padding: 2px 10px;
                transform: rotate(-8deg) translateZ(20px); /* Lifts off the paper in 3D */
                font-size: 1.2rem;
                font-weight: bold;
                font-family: 'Courier New', Courier, monospace;
                opacity: 0.9;
                box-shadow: 2px 2px 0 rgba(0,0,0,0.1);
            }

            .bounty-container {
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: 'Calistoga', serif;
                color: #2c2c2c;
                margin-top: auto;
                margin-bottom: 30px;
                width: 100%;
            }

            .berry-symbol { font-size: 1.4rem; margin-right: 8px; font-weight: bold; }
            .bounty-amount { font-size: 2rem; letter-spacing: 1px; }

            .marine-footer {
                position: absolute;
                bottom: 15px;
                width: 100%;
                text-align: center;
                font-family: 'Calistoga', serif;
                font-size: 2.2rem;
                color: #2c2c2c;
                text-transform: uppercase;
                letter-spacing: 4px;
                opacity: 0.15;
            }

            /* --- QUOTE CARD (PREMIUM) --- */
            .quote-card {
                background-color: var(--wb-card-bg);
                background-image: linear-gradient(135deg, #3e2723 0%, #2a1a15 100%);
                width: 340px;
                height: 560px;
                padding: 30px 20px;
                border-radius: 15px;
                color: #fff;
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
                
                /* 3D Properties */
                transform-style: preserve-3d;
                transition: transform 0.1s ease;
                box-shadow: 0 20px 50px rgba(0,0,0,0.6);
                border: 4px solid #8b4513;
                animation: floatCard 6s ease-in-out infinite reverse, fadeIn 1s ease-out 0.4s backwards;
            }

            /* Gold Border Inner */
            .quote-card::after {
                content: '';
                position: absolute;
                top: 10px; left: 10px; right: 10px; bottom: 10px;
                border: 2px solid var(--gold);
                border-radius: 10px;
                pointer-events: none;
                box-shadow: inset 0 0 20px rgba(255, 215, 0, 0.2);
            }

            /* Shiny Gloss Effect */
            .gloss {
                position: absolute;
                top: 0; left: 0; width: 100%; height: 100%;
                background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
                border-radius: 15px;
                pointer-events: none;
                z-index: 2;
            }

            .wb-profile-image {
                width: 180px;
                height: 180px;
                border-radius: 50%;
                border: 4px solid var(--gold);
                object-fit: cover;
                box-shadow: 0 0 20px rgba(255, 215, 0, 0.4);
                transform: translateZ(30px); /* Lifts image in 3D */
            }

            .wb-icons {
                font-size: 2.5rem;
                margin-top: 15px;
                text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
                transform: translateZ(20px);
            }

            blockquote {
                font-family: 'Cinzel', serif;
                font-size: 1.5rem;
                font-style: normal;
                line-height: 1.5;
                margin: 20px 0;
                padding: 0 10px;
                color: #f5deb3;
                text-align: center;
                text-shadow: 0 2px 4px rgba(0,0,0,0.5);
                transform: translateZ(40px); /* Lifts text significantly */
            }

            .quote-author {
                font-family: 'Cinzel', serif;
                font-size: 1.2rem;
                color: var(--gold);
                font-weight: bold;
                text-transform: uppercase;
                letter-spacing: 3px;
                border-top: 2px solid rgba(255, 215, 0, 0.3);
                padding-top: 15px;
                width: 80%;
                transform: translateZ(20px);
            }

            /* --- ANIMATIONS --- */
            @keyframes floatCard {
                0%, 100% { transform: translateY(0) rotate(0deg); }
                50% { transform: translateY(-15px) rotate(1deg); }
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes slideDown {
                from { opacity: 0; transform: translateY(-50px); }
                to { opacity: 1; transform: translateY(0); }
            }

            /* Mobile Responsiveness */
            @media (max-width: 800px) {
                .main-title { font-size: 2.5rem; margin-bottom: 30px; }
                .container { gap: 40px; }
            }

        </style>
    </head>
    <body>

        <div class="particles" id="particles"></div>

        <h1 class="main-title">THE NEW ERA</h1>

        <div class="container">
            
            <!-- Wrapper needed for 3D context -->
            <div class="card-wrapper">
                <div class="wanted-poster" id="card1">
                    <div class="wanted-title">WANTED</div>
                    
                    <div class="image-frame">
                        <img src="${myImage}" alt="Target" class="wanted-image">
                    </div>

                    <div class="dead-or-alive">DEAD OR ALIVE</div>
                    <div class="wanted-name">${myName}</div>
                    <div class="section-stamp">${mySection}</div>

                    <div class="bounty-container">
                        <span class="berry-symbol">฿</span>
                        <span class="bounty-amount">${myBounty}-</span>
                    </div>

                    <div class="marine-footer">MARINE</div>
                </div>
            </div>

            <div class="card-wrapper">
                <div class="quote-card" id="card2">
                    <div class="gloss"></div>
                    <img src="${quoteImage}" alt="${quoteAuthor}" class="wb-profile-image">
                    <div class="wb-icons">👊🏴‍☠️👑</div>
                    <blockquote>
                        "${myQuote}"
                    </blockquote>
                    <div class="quote-author">${quoteAuthor}</div>
                </div>
            </div>

        </div>

        <script>
            // --- PARTICLE GENERATOR ---
            const particleContainer = document.getElementById('particles');
            for(let i=0; i<20; i++){
                const p = document.createElement('div');
                p.classList.add('particle');
                p.style.left = Math.random() * 100 + 'vw';
                p.style.width = p.style.height = (Math.random() * 5 + 2) + 'px';
                p.style.animationDuration = (Math.random() * 5 + 5) + 's';
                p.style.animationDelay = (Math.random() * 5) + 's';
                particleContainer.appendChild(p);
            }

            // --- 3D TILT EFFECT LOGIC ---
            const cards = [document.getElementById('card1'), document.getElementById('card2')];

            document.addEventListener('mousemove', (e) => {
                const x = e.clientX;
                const y = e.clientY;
                const midX = window.innerWidth / 2;
                const midY = window.innerHeight / 2;

                // Calculate rotation based on mouse position relative to center
                // Max rotation is 15 degrees
                const rotateX = ((y - midY) / midY) * -15; 
                const rotateY = ((x - midX) / midX) * 15;

                cards.forEach(card => {
                    // Stop the floating animation when interacting for precise control
                    card.style.animation = 'none'; 
                    card.style.transform = \`rotateX(\${rotateX}deg) rotateY(\${rotateY}deg)\`;
                });
            });

            // Reset on mouse leave
            document.addEventListener('mouseleave', () => {
                cards.forEach((card, index) => {
                    card.style.transform = 'rotateX(0) rotateY(0)';
                    // Re-enable floating (alternating direction)
                    const direction = index === 0 ? 'normal' : 'reverse';
                    card.style.animation = \`floatCard 6s ease-in-out infinite \${direction}\`;
                });
            });
        </script>

    </body>
    </html>
  `;

  res.send(htmlResponse);
});

app.listen(port, () => {
  console.log(`🏴‍☠️ Setting sail on port ${port}`);
});
