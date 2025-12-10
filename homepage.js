// js/homepage.js - Homepage Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Homepage Initialized');
    
    // Initialize Swiper
    if (typeof Swiper !== 'undefined') {
        const heroSwiper = new Swiper('.hero-slider', {
            direction: 'horizontal',
            loop: true,
            speed: 1000,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            on: {
                init: function() {
                    console.log('Swiper initialized');
                }
            }
        });
    }

    // Match Ticker
    const matchTicker = () => {
        const matches = [
            { home: 'KMC FC', away: 'Yanga SC', score: '3-1', status: 'FT' },
            { home: 'Simba SC', away: 'KMC FC', score: '2-2', status: 'FT' },
            { home: 'KMC FC', away: 'Azam FC', score: '1-0', status: 'FT' },
            { home: 'Kinondoni FC', away: 'KMC FC', score: '0-3', status: 'FT' },
            { home: 'KMC FC', away: 'Mtibwa Sugar', score: '2-1', status: 'FT' }
        ];

        const tickerContent = document.querySelector('.match-ticker-content');
        if (!tickerContent) return;

        let html = '';
        matches.forEach(match => {
            html += `
                <div class="match-ticker-item">
                    <span class="team">${match.home}</span>
                    <span class="score">${match.score}</span>
                    <span class="team">${match.away}</span>
                    <span class="status ${match.status.toLowerCase()}">${match.status}</span>
                </div>
            `;
        });

        // Duplicate content for seamless loop
        tickerContent.innerHTML = html + html;
        
        // Start animation
        const ticker = document.querySelector('.match-ticker');
        if (ticker) {
            ticker.style.animation = 'marquee 30s linear infinite';
        }
    };

    // Player Stats Chart (simplified)
    const initPlayerStats = () => {
        const statsContainers = document.querySelectorAll('.player-stats-chart');
        
        statsContainers.forEach(container => {
            const playerId = container.dataset.player;
            const stats = getPlayerStats(playerId);
            
            if (stats) {
                const chartHTML = createStatsChart(stats);
                container.innerHTML = chartHTML;
            }
        });
    };

    function getPlayerStats(playerId) {
        // Mock data - in real app, this would come from an API
        const players = {
            'player10': { goals: 15, assists: 8, tackles: 45, passes: 420 },
            'player1': { goals: 0, assists: 1, saves: 45, cleanSheets: 12 },
            'player8': { goals: 5, assists: 14, passes: 850, accuracy: 92 },
            'player4': { goals: 3, tackles: 120, interceptions: 45, clearances: 89 }
        };
        
        return players[playerId];
    }

    function createStatsChart(stats) {
        let html = '<div class="stats-bars">';
        
        Object.entries(stats).forEach(([key, value]) => {
            const max = Math.max(...Object.values(stats));
            const percentage = (value / max) * 100;
            
            html += `
                <div class="stat-bar">
                    <div class="stat-label">${key.replace(/([A-Z])/g, ' $1').toUpperCase()}</div>
                    <div class="stat-value">${value}</div>
                    <div class="stat-bar-bg">
                        <div class="stat-bar-fill" style="width: ${percentage}%"></div>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        return html;
    }

    // Featured News Carousel
    const initNewsCarousel = () => {
        const newsContainer = document.querySelector('.side-news');
        if (!newsContainer) return;

        const newsItems = newsContainer.querySelectorAll('.news-card.small');
        let currentIndex = 0;

        if (newsItems.length > 0) {
            setInterval(() => {
                newsItems[currentIndex].classList.remove('active');
                currentIndex = (currentIndex + 1) % newsItems.length;
                newsItems[currentIndex].classList.add('active');
            }, 5000);
        }
    };

    // League Standings Table
    const initStandingsTable = () => {
        const standingsTable = document.querySelector('.standings-table');
        if (!standingsTable) return;

        const standings = [
            { position: 1, team: 'Yanga SC', played: 24, won: 18, drawn: 4, lost: 2, points: 58 },
            { position: 2, team: 'Simba SC', played: 24, won: 17, drawn: 5, lost: 2, points: 56 },
            { position: 3, team: 'KMC FC', played: 24, won: 15, drawn: 6, lost: 3, points: 51 },
            { position: 4, team: 'Azam FC', played: 24, won: 13, drawn: 7, lost: 4, points: 46 },
            { position: 5, team: 'Kinondoni FC', played: 24, won: 10, drawn: 8, lost: 6, points: 38 }
        ];

        let html = `
            <table class="standings-table-content">
                <thead>
                    <tr>
                        <th>POS</th>
                        <th>TEAM</th>
                        <th>P</th>
                        <th>W</th>
                        <th>D</th>
                        <th>L</th>
                        <th>PTS</th>
                    </tr>
                </thead>
                <tbody>
        `;

        standings.forEach(team => {
            const isKMC = team.team === 'KMC FC';
            html += `
                <tr class="${isKMC ? 'kmc-row' : ''}">
                    <td class="position">${team.position}</td>
                    <td class="team">
                        <span class="team-name">${team.team}</span>
                        ${isKMC ? '<span class="current-team">(Current)</span>' : ''}
                    </td>
                    <td>${team.played}</td>
                    <td>${team.won}</td>
                    <td>${team.drawn}</td>
                    <td>${team.lost}</td>
                    <td class="points">${team.points}</td>
                </tr>
            `;
        });

        html += `
                </tbody>
            </table>
        `;

        standingsTable.innerHTML = html;
    };

    // Upcoming Fixtures
    const initUpcomingFixtures = () => {
        const upcomingTab = document.getElementById('upcoming');
        if (!upcomingTab) return;

        const fixtures = [
            { date: '2024-03-25', home: 'KMC FC', away: 'Yanga SC', time: '15:00', venue: 'National Stadium' },
            { date: '2024-04-01', home: 'Simba SC', away: 'KMC FC', time: '16:00', venue: 'Benjamin Mkapa Stadium' },
            { date: '2024-04-08', home: 'KMC FC', away: 'Azam FC', time: '14:00', venue: 'Kinondoni Grounds' },
            { date: '2024-04-15', home: 'Mtibwa Sugar', away: 'KMC FC', time: '15:30', venue: 'Manungu Stadium' }
        ];

        fixtures.forEach((fixture, index) => {
            if (index === 0) return; // Skip first as it's already in HTML
            
            const matchDate = new Date(fixture.date);
            const dateString = matchDate.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
            
            const matchCard = document.createElement('div');
            matchCard.className = 'match-card';
            matchCard.innerHTML = `
                <div class="match-date">
                    <div class="date-day">${dateString.split(' ')[0]}</div>
                    <div class="date-number">${matchDate.getDate()}</div>
                    <div class="date-month">${dateString.split(' ')[1]}</div>
                </div>
                <div class="match-teams">
                    <div class="team home">
                        <img src="images/teams/${fixture.home.toLowerCase().replace(/ /g, '-')}.png" alt="${fixture.home}">
                        <span>${fixture.home}</span>
                    </div>
                    <div class="match-info">
                        <div class="match-time">${fixture.time}</div>
                        <div class="match-venue">${fixture.venue}</div>
                        <div class="match-competition">Tanzanian Premier League</div>
                    </div>
                    <div class="team away">
                        <img src="images/teams/${fixture.away.toLowerCase().replace(/ /g, '-')}.png" alt="${fixture.away}">
                        <span>${fixture.away}</span>
                    </div>
                </div>
                <div class="match-actions">
                    <a href="fixtures.html#tickets" class="btn-ticket-small">TICKETS</a>
                    <a href="#" class="btn-reminder">SET REMINDER</a>
                </div>
            `;
            
            upcomingTab.appendChild(matchCard);
        });
    };

    // Results Tab
    const initResultsTab = () => {
        const resultsTab = document.getElementById('results');
        if (!resultsTab) return;

        const results = [
            { date: '2024-03-10', home: 'KMC FC', away: 'Simba SC', score: '3-1', competition: 'TPL' },
            { date: '2024-03-03', home: 'Azam FC', away: 'KMC FC', score: '0-2', competition: 'TPL' },
            { date: '2024-02-25', home: 'KMC FC', away: 'Kinondoni FC', score: '4-0', competition: 'TPL' },
            { date: '2024-02-18', home: 'Mtibwa Sugar', away: 'KMC FC', score: '1-1', competition: 'TPL' }
        ];

        results.forEach(result => {
            const matchDate = new Date(result.date);
            const dateString = matchDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            
            const resultCard = document.createElement('div');
            resultCard.className = 'match-card result';
            resultCard.innerHTML = `
                <div class="match-date">
                    <div class="date-day">${dateString}</div>
                </div>
                <div class="match-teams">
                    <div class="team home">
                        <span>${result.home}</span>
                    </div>
                    <div class="match-info">
                        <div class="match-score">${result.score}</div>
                        <div class="match-competition">${result.competition}</div>
                    </div>
                    <div class="team away">
                        <span>${result.away}</span>
                    </div>
                </div>
                <div class="match-actions">
                    <a href="news.html#match-report" class="btn-highlight-small">HIGHLIGHTS</a>
                </div>
            `;
            
            resultsTab.appendChild(resultCard);
        });
    };

    // Sponsor Animation
    const initSponsorAnimation = () => {
        const sponsors = document.querySelectorAll('.sponsor');
        
        sponsors.forEach((sponsor, index) => {
            sponsor.style.animationDelay = `${index * 0.2}s`;
            sponsor.classList.add('fade-in-up');
        });
    };

    // Initialize all homepage features
    const initHomepage = () => {
        matchTicker();
        initPlayerStats();
        initNewsCarousel();
        initStandingsTable();
        initUpcomingFixtures();
        initResultsTab();
        initSponsorAnimation();
        
        // Add match ticker styles
        const tickerStyles = document.createElement('style');
        tickerStyles.textContent = `
            .match-ticker {
                background: rgba(255, 107, 0, 0.1);
                border-top: 2px solid var(--primary);
                border-bottom: 2px solid var(--primary);
                overflow: hidden;
                padding: 10px 0;
                margin: 20px 0;
            }
            
            .match-ticker-content {
                display: inline-flex;
                white-space: nowrap;
                animation: marquee 30s linear infinite;
            }
            
            .match-ticker-item {
                display: inline-flex;
                align-items: center;
                gap: 15px;
                padding: 0 40px;
                border-right: 1px solid rgba(255,255,255,0.1);
            }
            
            .match-ticker-item .score {
                font-weight: bold;
                color: var(--primary);
                font-size: 1.2rem;
            }
            
            .match-ticker-item .status {
                padding: 2px 10px;
                border-radius: 3px;
                font-size: 0.8rem;
                font-weight: bold;
            }
            
            .match-ticker-item .status.ft {
                background: var(--success);
                color: white;
            }
            
            .stats-bars {
                margin-top: 15px;
            }
            
            .stat-bar {
                margin-bottom: 10px;
            }
            
            .stat-label {
                font-size: 0.8rem;
                color: var(--gray);
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-bottom: 5px;
            }
            
            .stat-value {
                font-weight: bold;
                color: var(--primary);
                margin-bottom: 5px;
            }
            
            .stat-bar-bg {
                height: 6px;
                background: rgba(255,255,255,0.1);
                border-radius: 3px;
                overflow: hidden;
            }
            
            .stat-bar-fill {
                height: 100%;
                background: linear-gradient(90deg, var(--primary), var(--secondary));
                border-radius: 3px;
            }
            
            .standings-table-content {
                width: 100%;
                border-collapse: collapse;
            }
            
            .standings-table-content th {
                text-align: left;
                padding: 15px;
                background: rgba(255,255,255,0.05);
                color: var(--gray);
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 1px;
                font-size: 0.9rem;
            }
            
            .standings-table-content td {
                padding: 15px;
                border-bottom: 1px solid rgba(255,255,255,0.05);
            }
            
            .standings-table-content tr:hover {
                background: rgba(255,107,0,0.05);
            }
            
            .standings-table-content .kmc-row {
                background: rgba(255,107,0,0.1);
                font-weight: 600;
            }
            
            .standings-table-content .kmc-row .position {
                color: var(--primary);
            }
            
            .standings-table-content .kmc-row .points {
                color: var(--primary);
                font-weight: 700;
            }
            
            .team-name {
                font-weight: 600;
            }
            
            .current-team {
                font-size: 0.8rem;
                background: var(--primary);
                color: white;
                padding: 2px 8px;
                border-radius: 3px;
                margin-left: 10px;
            }
            
            .match-card.result .match-score {
                font-size: 2rem;
                font-weight: 700;
                color: var(--primary);
                margin-bottom: 5px;
            }
            
            .btn-highlight-small {
                background: var(--secondary);
                color: white;
                padding: 0.5rem 1rem;
                border-radius: var(--radius-md);
                font-weight: 600;
                font-size: 0.8rem;
            }
            
            @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
            }
        `;
        document.head.appendChild(tickerStyles);
    };

    // Run initialization
    initHomepage();

    // Social Share
    const initSocialShare = () => {
        const shareBtns = document.querySelectorAll('.share-btn');
        
        shareBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                const url = window.location.href;
                const title = document.title;
                const platform = this.dataset.platform;
                
                let shareUrl = '';
                
                switch(platform) {
                    case 'facebook':
                        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                        break;
                    case 'twitter':
                        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
                        break;
                    case 'whatsapp':
                        shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`;
                        break;
                }
                
                if (shareUrl) {
                    window.open(shareUrl, '_blank', 'width=600,height=400');
                }
            });
        });
    };

    initSocialShare();
});
