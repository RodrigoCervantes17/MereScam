/* ==========================================================================
   SafeGuard Interactive & Accessibility Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. Accessibility Panel: Text Size Scale & High Contrast Theme
    // ==========================================================================
    const body = document.body;
    const btnTextDecrease = document.getElementById('btn-text-decrease');
    const btnTextReset = document.getElementById('btn-text-reset');
    const btnTextIncrease = document.getElementById('btn-text-increase');
    const btnContrastToggle = document.getElementById('btn-contrast-toggle');

    // Font scaling options
    let currentScale = parseFloat(localStorage.getItem('safeguard-font-scale')) || 1.0;
    const minScale = 0.85;
    const maxScale = 1.45;
    const scaleStep = 0.15;

    // Apply saved font scale
    const applyFontScale = (scale) => {
        currentScale = Math.max(minScale, Math.min(maxScale, scale));
        document.documentElement.style.setProperty('--font-scale', currentScale);
        localStorage.setItem('safeguard-font-scale', currentScale);
        
        // Highlight active scale button or update state indicators if needed
        btnTextDecrease.disabled = (currentScale <= minScale);
        btnTextIncrease.disabled = (currentScale >= maxScale);
    };

    btnTextDecrease.addEventListener('click', () => applyFontScale(currentScale - scaleStep));
    btnTextReset.addEventListener('click', () => applyFontScale(1.0));
    btnTextIncrease.addEventListener('click', () => applyFontScale(currentScale + scaleStep));

    // Contrast Toggle state
    let isHighContrast = localStorage.getItem('safeguard-contrast') === 'true';
    
    const applyContrast = (state) => {
        if (state) {
            body.classList.add('high-contrast');
            btnContrastToggle.setAttribute('aria-pressed', 'true');
        } else {
            body.classList.remove('high-contrast');
            btnContrastToggle.setAttribute('aria-pressed', 'false');
        }
        localStorage.setItem('safeguard-contrast', state);
    };

    btnContrastToggle.addEventListener('click', () => {
        isHighContrast = !isHighContrast;
        applyContrast(isHighContrast);
    });

    // Initialize accessibility settings
    applyFontScale(currentScale);
    applyContrast(isHighContrast);


    // ==========================================================================
    // 2. Interactive Scam Spotter Explainer Panel
    // ==========================================================================
    const scamCards = document.querySelectorAll('.scam-card');
    const explainerPanel = document.getElementById('explainer-panel');

    const scamDetails = {
        'tab-tech': {
            title: 'The "Tech Support" Alert Scam',
            pill: 'Fake Antivirus Popup',
            icon: 'fa-laptop-medical',
            iconColor: 'tech-icon',
            example: '*** MICROSOFT ALERT ***\nSYSTEM DAMAGE DETECTED!\nWe found malware on your network! Do not close this page or turn off your computer.\n\nCall Microsoft Security at 1-888-555-0199 immediately to secure your bank credentials.',
            explanation: 'Scammers display scary fake alerts on your computer screen or call you directly pretending to be tech agents from Microsoft, Apple, or Google. They want to scare you into believing your files are being deleted so you will give them remote access to your computer or pay them thousands of dollars.',
            steps: [
                '<strong>Never Call the Number:</strong> Real tech support agencies will NEVER block your screen and demand that you call a random number.',
                '<strong>Close the Page Instantly:</strong> The alert is just a scary website popup. Simply close your internet browser tab, or restart your computer.',
                '<strong>Never Give Remote Access:</strong> Never let a stranger who calls you download software or log into your computer. Hang up instantly.'
            ]
        },
        'tab-family': {
            title: 'The "Grandchild in Trouble" Scam',
            pill: 'Urgent Family Emergency',
            icon: 'fa-person-military-to-person',
            iconColor: 'family-icon',
            example: '"Hey Grandpa... it\'s me. I\'m in severe trouble. I was in a car accident overseas, and the police have me locked up. I need $2,000 for bail right now. Please don\'t tell mom and dad, they will be so mad at me. Can you wire the money quickly?"',
            explanation: 'A caller pretends to be your grandchild, niece, nephew, or an officer/attorney on their behalf. They use a panicked, crying, or muffled voice (sometimes using realistic AI voice cloning) and claim to be in jail, hospitalized, or stuck in a foreign country. They beg you to wire money or buy gift cards immediately and keep it a secret.',
            steps: [
                '<strong>Hang Up and Call Directly:</strong> Don\'t act in fear. Hang up immediately and call that grandchild or their parent on their normal, verified mobile number to check.',
                '<strong>Ask a Secret Question:</strong> If you stay on the line, ask them a question only your real family member would know (e.g., "What is the name of your first school?" or "What is our pet dog\'s name?").',
                '<strong>Never Send Untraceable Money:</strong> Legitimate agencies will never demand wire transfers, gift cards, or cryptocurrency payments.'
            ]
        },
        'tab-gov': {
            title: 'The "Government Imposter" Scam',
            pill: 'SSN / IRS Impersonation',
            icon: 'fa-building-columns',
            iconColor: 'gov-icon',
            example: 'SOCIAL SECURITY ADMINISTRATION NOTICE:\n\nYour Social Security Number has been suspended due to suspicious banking activities. A legal arrest warrant is being prepared. Call our senior investigator immediately at 1-800-404-5992.',
            explanation: 'Scammers call, email, or message pretending to be from the Social Security Administration (SSA), the IRS, Medicare, or local police. They claim you owe back-taxes, your benefits are frozen, or your SSN is linked to a crime. They threaten arrest, lawsuits, or asset suspension unless you pay immediately.',
            steps: [
                '<strong>Your SSN Cannot Be Suspended:</strong> The federal government can never suspend or freeze your Social Security Number. If they say this, it is 100% a scam.',
                '<strong>The Government Uses Official Mail:</strong> Real government agencies will almost always contact you via physical letters delivered by the USPS, not phone calls or texts.',
                '<strong>No Immediate Demands:</strong> The government will never demand immediate payment over the phone, and will never ask you to pay via Gift Cards or Wire transfers.'
            ]
        },
        'tab-prize': {
            title: 'The "Surprise Sweepstakes" Scam',
            pill: 'Fake Lottery / Sweepstakes',
            icon: 'fa-trophy',
            iconColor: 'prize-icon',
            example: 'CONGRATULATIONS! You have been selected as the 1st prize winner of the Publishers Clearing House Sweepstakes!\n\nYou won $1,500,000.00 cash. To claim your millions, contact claims agent Mr. Davis at 1-866-991-0022. A small processing fee of $250 is required before delivery.',
            explanation: 'You receive an exciting call, letter, or email saying you have won a massive lottery, sweepstakes, or a free vacation. However, they tell you that to release your cash prize, you must first pay an upfront "processing fee", "insurance tax", or "handling charge". Once you pay, they disappear, and you never get any prize.',
            steps: [
                '<strong>Never Pay to Win:</strong> If you must pay any money (fees, taxes, buying gift cards) to receive a prize, it is a scam. Genuine lotteries deduct taxes AFTER you receive the money, never before.',
                '<strong>Did You Buy a Ticket?:</strong> If you did not enter a sweepstakes or buy a ticket, you cannot win. Period.',
                '<strong>Keep Your Money Safe:</strong> Never share your bank details, credit card numbers, or address to claim free prizes.'
            ]
        },
        'tab-romance': {
            title: 'The "Online Sweetheart" Scam',
            pill: 'Romance & Friendship Trust',
            icon: 'fa-heart',
            iconColor: 'romance-icon',
            example: '"My dear, meeting you has changed my life. I want nothing more than to fly over and hold your hand. But the airport customs office froze my business account. I need just $500 for a temporary release fee. Can you help your future sweetheart?"',
            explanation: 'A scammer creates a fake profile on Facebook or a dating site, using photos of attractive, trustworthy people (often soldiers, doctors, or business people). They sweet-talk you, profess love very quickly, and build an emotional bond. Then, they start manufacturing emergency scenarios (travel fees, medical crises, frozen bank assets) and beg for money.',
            steps: [
                '<strong>Never Send Money to Online-Only Friends:</strong> No matter how close you feel, never wire money, buy gift cards, or give banking info to someone you have never met face-to-face.',
                '<strong>Use Reverse Image Search:</strong> Scammers steal photos. Search their profile picture on Google to see if it belongs to someone else entirely.',
                '<strong>Talk to Your Family:</strong> If a new online friend starts talking about money or asking for financial favors, immediately consult a family member or trusted friend.'
            ]
        }
    };

    scamCards.forEach(card => {
        card.addEventListener('click', () => {
            const cardId = card.id;
            const data = scamDetails[cardId];
            
            if (!data) return;

            // Update Tab Selection States
            scamCards.forEach(c => {
                c.setAttribute('aria-selected', 'false');
                c.blur();
            });
            card.setAttribute('aria-selected', 'true');

            // Render Explainer content
            let stepsHtml = '';
            data.steps.forEach(step => {
                stepsHtml += `<li>${step}</li>`;
            });

            explainerPanel.innerHTML = `
                <div class="explainer-header">
                    <div style="display: flex; align-items: center; gap: 16px;">
                        <div class="card-icon ${data.iconColor}" style="margin:0; width:50px; height:50px; font-size:1.3rem;">
                            <i class="fa-solid ${data.icon}"></i>
                        </div>
                        <div>
                            <h3>${data.title}</h3>
                        </div>
                    </div>
                    <span class="scam-pill">${data.pill}</span>
                </div>
                <div class="explainer-columns">
                    <div class="example-showcase">
                        <span class="example-label"><i class="fa-solid fa-triangle-exclamation"></i> What the Scam Looks/Sounds Like</span>
                        <div class="example-device-box">${data.example}</div>
                    </div>
                    <div class="response-guide">
                        <h4><i class="fa-solid fa-circle-check"></i> Safe Steps to Take</h4>
                        <p style="margin-top:8px; font-size: 0.95rem; line-height: 1.4;">${data.explanation}</p>
                        <ul class="safety-steps">
                            ${stepsHtml}
                        </ul>
                    </div>
                </div>
            `;
            
            explainerPanel.classList.remove('hidden');
            
            // Accessible scroll & focus
            explainerPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            explainerPanel.setAttribute('tabindex', '-1');
            explainerPanel.focus();
        });

        // Accessibility: Support Enter / Space on role="tab" card
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });


    // ==========================================================================
    // 3. Interactive Scam Simulator / Quiz Engine
    // ==========================================================================
    const quizScenarios = [
        {
            channel: 'fa-comment-sms',
            sender: 'From: Bank Security Alert',
            text: 'ALERT: Suspicious card activity detected on your Chase debit card. A transaction of $430 at Walmart is pending. To secure your account immediately, click here to log in: chase-verification-portal.com',
            isScam: true,
            feedbackTitle: 'Spot On! That is a SCAM.',
            feedbackDesc: 'Awesome job! Real banks will never send you security alerts with generic web links like "chase-verification-portal.com". If you ever receive a text like this, ignore the link and call the phone number printed directly on the back of your physical bank card.'
        },
        {
            channel: 'fa-envelope',
            sender: 'From: Sarah (Your Granddaughter)',
            text: 'Hey Grandma! Hope you\'re having a beautiful week. I got an A+ on my history exam today and wanted to share the happy news! I\'ll call you on Sunday afternoon to chat. Hugs and kisses!',
            isScam: false,
            feedbackTitle: 'Correct! This is SAFE.',
            feedbackDesc: 'Well done! This is a typical, safe email. Notice how there are no panic prompts, no urgent requests for passwords, and absolutely no demands to wire money or buy gift cards. It is just your granddaughter sharing nice news!'
        },
        {
            channel: 'fa-phone-volume',
            sender: 'From: Social Security Administration Agent',
            text: 'Caller: "Your Social Security number has been suspended due to suspected tax fraud. To clear your name and prevent an immediate legal arrest warrant from being issued, you must purchase two $250 Target gift cards and read the numbers on the back to me right now."',
            isScam: true,
            feedbackTitle: 'Perfect! That is absolutely a SCAM.',
            feedbackDesc: 'Superb spot! Remember two golden rules: First, your Social Security number CANNOT be suspended or blocked. Second, no real government agency or business will ever ask you to pay them using gift cards, prepaid debit cards, or cryptocurrency.'
        },
        {
            channel: 'fa-envelope',
            sender: 'From: Netflix Billing Support (support@netflix-update-billing.net)',
            text: 'Subject: Urgent: Update Your Billing Method\n\nWe were unable to renew your monthly Netflix subscription. Click this link: netflix-billing-update.net/login to update your credit card details or your account will be deleted in 24 hours.',
            isScam: true,
            feedbackTitle: 'Correct! That is a SCAM.',
            feedbackDesc: 'Great eye! Scammers send fake subscription renewal emails to steal credit card details. Notice the warning signs: look at the sender email address ("support@netflix-update-billing.net" instead of netflix.com) and the urgent 24-hour threat.'
        },
        {
            channel: 'fa-message',
            sender: 'From: Facebook Message (Dr. Thomas Harrison)',
            text: 'Message: "My dear, I am so glad we connected on Facebook. As a doctor serving overseas, it is lonely. I want to buy a ticket to come visit you, but the bank froze my emergency travel cards. Could you wire $300 to release my flights? I will refund you the second I arrive next Friday."',
            isScam: true,
            feedbackTitle: 'Exactly! That is a dangerous SCAM.',
            feedbackDesc: 'Wonderful! This is a classic online romance scam. Scammers build emotional connections quickly, then manufacture sudden emergency costs (travel, medical, customs fees) and ask for untraceable wired money. Never wire money to someone you haven\'t met in real life.'
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    const quizProgressFill = document.getElementById('quiz-progress-fill');
    const quizQuestionNumber = document.getElementById('quiz-question-number');
    const quizScoreBadge = document.getElementById('quiz-score-badge');
    const quizArena = document.getElementById('quiz-arena');
    const quizControls = document.getElementById('quiz-controls');
    const quizFeedback = document.getElementById('quiz-feedback');
    const quizResult = document.getElementById('quiz-result');
    
    const feedbackTitle = document.getElementById('feedback-title');
    const feedbackDesc = document.getElementById('feedback-desc');
    const btnNextQuestion = document.getElementById('btn-next-question');
    const btnRestartQuiz = document.getElementById('btn-restart-quiz');
    
    const btnQuizSafe = document.getElementById('btn-quiz-safe');
    const btnQuizScam = document.getElementById('btn-quiz-scam');

    const loadScenario = (index) => {
        if (index >= quizScenarios.length) {
            showQuizResults();
            return;
        }

        const scenario = quizScenarios[index];
        
        // Progress & Metadata updates
        const progressPercentage = ((index) / quizScenarios.length) * 100;
        quizProgressFill.style.width = `${progressPercentage}%`;
        quizQuestionNumber.textContent = `Question ${index + 1} of ${quizScenarios.length}`;
        quizScoreBadge.innerHTML = `<i class="fa-solid fa-shield-halved"></i> Shields: ${score}/${quizScenarios.length}`;

        // Reset display
        quizControls.classList.remove('hidden');
        quizFeedback.classList.add('hidden');
        quizResult.classList.add('hidden');

        // Update Scenario Card
        quizArena.innerHTML = `
            <div class="scenario-card">
                <div class="scenario-source">
                    <span class="source-type" id="scenario-channel-icon"><i class="fa-solid ${scenario.channel}"></i></span>
                    <span class="source-header-text" id="scenario-sender">${scenario.sender}</span>
                </div>
                <div class="scenario-body">
                    <p id="scenario-text">${scenario.text}</p>
                </div>
            </div>
        `;
    };

    const handleUserChoice = (userAnswerIsScam) => {
        const scenario = quizScenarios[currentQuestionIndex];
        const isCorrect = (userAnswerIsScam === scenario.isScam);

        quizControls.classList.add('hidden');

        if (isCorrect) {
            score++;
            quizFeedback.className = 'quiz-feedback-panel correct';
            feedbackTitle.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${scenario.feedbackTitle}`;
        } else {
            quizFeedback.className = 'quiz-feedback-panel incorrect';
            feedbackTitle.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Oops, it was actually a Scam!`;
            if (!scenario.isScam) {
                feedbackTitle.innerHTML = `<i class="fa-solid fa-circle-check"></i> Actually, this one was Safe!`;
            }
        }

        feedbackDesc.textContent = scenario.feedbackDesc;
        quizFeedback.classList.remove('hidden');
        
        // Update temporary score display
        quizScoreBadge.innerHTML = `<i class="fa-solid fa-shield-halved"></i> Shields: ${score}/${quizScenarios.length}`;
        
        // Scroll & Focus feedback for accessibility
        quizFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        btnNextQuestion.focus();
    };

    const showQuizResults = () => {
        quizProgressFill.style.width = `100%`;
        quizArena.innerHTML = '';
        quizControls.classList.add('hidden');
        quizFeedback.classList.add('hidden');

        const finalScoreVal = document.getElementById('final-score-value');
        const resultTitle = document.getElementById('result-title');
        const resultDesc = document.getElementById('result-desc');

        finalScoreVal.textContent = `${score} / ${quizScenarios.length}`;

        if (score === quizScenarios.length) {
            resultTitle.textContent = '🏅 SafeGuard Gold Shield Certified!';
            resultDesc.textContent = 'Perfect score! You successfully spotted every single scam and identified the safe messages. You have elite digital safety skills and are ready to browse online with confidence!';
        } else if (score >= 3) {
            resultTitle.textContent = '🥈 SafeGuard Security Officer!';
            resultDesc.textContent = 'Great work! You spotted most of the scams. With just a little more caution about urgent messages and strange payment links, you will be completely bulletproof online.';
        } else {
            resultTitle.textContent = '🛡️ Safety Shield Apprentice!';
            resultDesc.textContent = 'A good learning effort! Scammers are incredibly tricky, but now you know the red flags. Re-read the scam directory details and try again to build your scam-spotting muscles!';
        }

        quizResult.classList.remove('hidden');
        
        // Focus results for screen reader
        quizResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        quizResult.setAttribute('tabindex', '-1');
        quizResult.focus();
    };

    btnQuizSafe.addEventListener('click', () => handleUserChoice(false));
    btnQuizScam.addEventListener('click', () => handleUserChoice(true));

    btnNextQuestion.addEventListener('click', () => {
        currentQuestionIndex++;
        loadScenario(currentQuestionIndex);
    });

    btnRestartQuiz.addEventListener('click', () => {
        currentQuestionIndex = 0;
        score = 0;
        loadScenario(0);
    });

    // Initialize Quiz first question
    loadScenario(0);


    // ==========================================================================
    // 4. Interactive Red Flags Checklist Logic
    // ==========================================================================
    const chkUnexpected = document.getElementById('chk-unexpected');
    const chkUrgency = document.getElementById('chk-urgency');
    const chkGiftcards = document.getElementById('chk-giftcards');
    const chkSecret = document.getElementById('chk-secret');
    const checklistResult = document.getElementById('checklist-result');

    const updateChecklistAlert = () => {
        let selectedCount = 0;
        if (chkUnexpected.checked) selectedCount++;
        if (chkUrgency.checked) selectedCount++;
        if (chkGiftcards.checked) selectedCount++;
        if (chkSecret.checked) selectedCount++;

        if (selectedCount === 0) {
            checklistResult.classList.add('hidden');
            return;
        }

        checklistResult.classList.remove('hidden');

        if (selectedCount >= 2) {
            checklistResult.className = 'checklist-alert danger';
            checklistResult.innerHTML = `
                <div class="alert-title"><i class="fa-solid fa-triangle-exclamation"></i> HIGH SCAM DANGER! (${selectedCount} Red Flags)</div>
                <p class="alert-desc">
                    This interaction is highly dangerous. Scammers almost always use combinations of surprise, fear, and demand for weird payments. 
                    <strong>Stop all contact immediately!</strong> Do not send money, do not purchase gift cards, do not share codes, and call a family member or official support.
                </p>
            `;
        } else if (selectedCount === 1) {
            checklistResult.className = 'checklist-alert danger';
            
            // Specialize based on which one is clicked
            let warningDetail = '';
            if (chkUnexpected.checked) {
                warningDetail = 'They contacted you out of the blue. Remember to hang up and call them back on their official, publicly published number to verify.';
            } else if (chkUrgency.checked) {
                warningDetail = 'They are rushing you. Scammers try to make you panic so you do not think clearly. Slow down and discuss it with a friend first.';
            } else if (chkGiftcards.checked) {
                warningDetail = 'They are asking for unusual payment or sensitive passwords. <strong>No real company or official will ever ask you to pay via Gift Cards, Wire, or Crypto.</strong>';
            } else if (chkSecret.checked) {
                warningDetail = 'They are asking you to keep it a secret. This is a massive warning sign. Talk to a trusted family member or helper immediately.';
            }

            checklistResult.innerHTML = `
                <div class="alert-title"><i class="fa-solid fa-triangle-exclamation"></i> WARNING: Potential Scam Flag Detected!</div>
                <p class="alert-desc">${warningDetail}</p>
            `;
        }
    };

    [chkUnexpected, chkUrgency, chkGiftcards, chkSecret].forEach(checkbox => {
        checkbox.addEventListener('change', updateChecklistAlert);
    });

});
