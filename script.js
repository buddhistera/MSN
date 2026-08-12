// --- Language Settings ---2055
    let currentLang = localStorage.getItem('appLang') || 'en';

    const i18n = {
        si: {
            title: "බුද්ධ වර්ෂය", dateLabel: "දිනය තෝරන්න ( ක්‍රි.ව) ⇓", atikkanta: "අතික්කන්ත\n(ඉකුත් වූ)", avasittha: "අවසිට්ඨ\n(ඉතිරි)",
            langBtn: "English 🇦🇺",sunMenu: "අරුණ | මධ්‍යහ්නය ☀️", poyaMenu: "පොහොය දින🌛", vasMenu: "වස් කාලය ⛈️", contactMenu: "ℹ️", poyaTitle: "පෝය දින ලැයිස්තුව ",darkMode: "අඳුරු තිරය 🌑",lightMode: "ආලෝකමත් තිරය💡",yearLabel: "වර්ෂය",monthLabel: "මාසය",dayLabel: "දිනය",   
            vasTitle: "", contactTitle: " තොරතුරු සහ බාගත කිරීම්", poyaSuffix: " පෝය",
            vas1: "පෙරවස් සමාදන්වීම", vas2: "පෙරවස් පවාරණය", vas3: "පසුවස් සමාදන්වීම", vas4: "පසුවස් පවාරණය",
            animals: ["සප්ප","අස්ස","අජ","කපි","කුක්කුට","සෝන","සූකර","මුසික"," වසභ","ව්‍යග්ග","සස","නාග"],
            seasons: { Hemanta: "හේමන්ත", Gimhana: "ගිම්හාන", Vassana: "වස්සාන", ReHemanta: "නැවත හේමන්ත" },
            paksha: { Kanha: "කණ්හ පක්ඛෙ", Sukka: "සුක්ක පක්ඛෙ" },
            week: ["රවිවාරං","චන්දවාරං","භුම්මවාරං","බුධවාරං","ගුරුවාරං","සුක්කවාරං","සෝරවාරං"],
            paliTemplate: (a, s, m, p, t, w) => `අයං\n${a} සංවච්ඡරෙ\n${s} උතු අස්මිං උතුම්හි\n${m} මාසස්ස\n${p}\n${t}\n${w}\nඉදන්ති දට්ඨබ්බං.`
        },
        en: {
            title: "Buddhist Era", dateLabel: "Select Date (C.E.) ⇓", atikkanta: "Atikkanta\n(Elapsed)", avasittha: "Avasiṭṭha\n(remaining)",
            langBtn: "සිංහල 🇱🇰", sunMenu: "Dawn | Noon ☀️", poyaMenu: " Uposatha Days🌛", vasMenu: "Vassa Season ⛈️", contactMenu: "ℹ️", poyaTitle: " Uposatha Calendar",darkMode: "Dark Mode 🌑",lightMode: "Light Mode 💡",yearLabel: "Year",monthLabel: "Month",dayLabel: "Day",
            vasTitle: "", contactTitle: "Contact & Downloads", poyaSuffix: "",
            vas1: "Entering the Early Rains Retreat", vas2: "Early Vassa Pavāraṇā", vas3: "Entering the Late Rains Retreat ", vas4: "Late Vassa Pavāraṇā ",
            animals: ["Sappa","Assa","Aja","Kapi","Kukkuṭa","Sona","Sūkara","Musika"," Vasabha","Vyaggha","Sasa","Nāga"],
            seasons: { Hemanta: "Hemanta", Gimhana: "Gimhāna", Vassana: "Vassāna", ReHemanta: "Late Hemanta" },
            paksha: { Kanha: "Kaṇha pakkhe", Sukka: "Sukka pakkhe" },
            week: ["Ravivāraṃ","Candavāraṃ","Bhummavāraṃ","Budhavāraṃ","Guruvāraṃ","Sukkavāraṃ","Soravāraṃ"],
            paliTemplate: (a, s, m, p, t, w) => `Ayaṃ\n${a} saṃvacchare\n${s} utu asmiṃ utumhi\n${m} māsassa\n${p}\n${t}\n${w}\nidanti daṭṭhabbaṃ.`
        }
    };   

const manualOverrides = {
    "2025-01-11": "2025-01-13",
    "2025-06-24": "2025-06-25",
    "2032-07-06": "2032-07-07",
    "2035-07-04": "2035-07-05",
    "2039-08-19": "2039-08-18",
    "2039-09-16": "2039-09-17",
    "2039-10-17": "2039-10-16",
    "2039-11-14": "2039-11-15",
    "2039-12-15": "2039-12-14",
    "2040-01-12": "2040-01-13",
    "2040-02-12": "2040-02-11",
    "2040-03-11": "2040-03-12",
    "2040-04-11": "2040-04-10",
    "2040-05-09": "2040-05-10",
    "2040-06-09": "2040-06-08",
    "2040-07-07": "2040-07-08",
    "2043-07-05": "2043-07-06",
    "2046-07-02": "2046-07-03",
    "2052-06-25": "2052-06-26",

};

const DISPLAY_DAY_ADJUST_MS = -1 * 24 * 60 * 60 * 1000;
const SL_OFFSET_MS = 5.5 * 60 * 60 * 1000;

function slYear(dateObj) { return new Date(dateObj.getTime() + SL_OFFSET_MS).getUTCFullYear(); }
function slMonth(dateObj) { return new Date(dateObj.getTime() + SL_OFFSET_MS).getUTCMonth(); }
function slDay(dateObj) { return new Date(dateObj.getTime() + SL_OFFSET_MS).getUTCDate(); }
function fmtISO(dateObj) {
    let d = new Date(dateObj.getTime() + SL_OFFSET_MS);
    let y = d.getUTCFullYear(), m = String(d.getUTCMonth() + 1).padStart(2, '0'), dd = String(d.getUTCDate()).padStart(2, '0');
    return `${y}-${m}-${dd}`;
}
function parseISO(s) {
    let p = s.split('-');
    return new Date(Date.UTC(parseInt(p[0]), parseInt(p[1]) - 1, parseInt(p[2])));
}

function detectPoyaType(dateObj) {
    let searchStart = new Date(dateObj.getTime() - (3 * 24 * 60 * 60 * 1000));
    let fullMoon = Astronomy.SearchMoonPhase(180, searchStart, 7);
    let newMoon = Astronomy.SearchMoonPhase(0, searchStart, 7);
    let diffFull = fullMoon ? Math.abs(fullMoon.date - dateObj) : Infinity;
    let diffNew = newMoon ? Math.abs(newMoon.date - dateObj) : Infinity;
    return (diffFull < diffNew) ? 'full' : 'new';
}

function findEsalaTarget(year) {
    let d = new Date(Date.UTC(year, 5, 1));
    let candidates = [];
    for (let i = 0; i < 4; i++) {
        let fm = Astronomy.SearchMoonPhase(180, d, 35);
        candidates.push(fm.date);
        d = new Date(fm.date.getTime() + 20 * 24 * 60 * 60 * 1000);
    }
    let leap = candidates.find(dt => {
        let m = slMonth(dt), dd = slDay(dt), y = slYear(dt);
        return y === year && ((m === 6 && dd >= 25) || (m === 7 && dd <= 4));
    });
    let normal = candidates.find(dt => {
        let m = slMonth(dt), y = slYear(dt);
        return y === year && m === 6;
    });
    return leap || normal;
}

function isLeapGimhanaYear(year) {
    let d = new Date(Date.UTC(year, 5, 1));
    let candidates = [];
    for (let i = 0; i < 4; i++) {
        let fm = Astronomy.SearchMoonPhase(180, d, 35);
        candidates.push(fm.date);
        d = new Date(fm.date.getTime() + 20 * 24 * 60 * 60 * 1000);
    }
    return !!candidates.find(dt => {
        let m = slMonth(dt), dd = slDay(dt), y = slYear(dt);
        return y === year && ((m === 6 && dd >= 25) || (m === 7 && dd <= 4));
    });
}

const MONTH_CYCLE_SINHALA = ["ඵුස්ස", "මාඝ", "ඵග්ගුන", "චිත්ත", "වේසාඛ", "ජෙට්ඨ", "ආසාළ්හ", "සාවන", "පොට්ඨපාද", "අස්සයුජ", "කත්තික", "මාඝසිර"];

const SEED_DATE = new Date(Date.UTC(2020, 0, 9, 12, 0, 0));
const SEED_SEASON = 'hemanta';
const SEED_POS = 4;
const SEED_MONTH_IDX = 0; // reference calendar සමඟ calibrate කර ඇත

function buildRawChain(uptoYear) {
    let currentDate = SEED_DATE;
    let season = SEED_SEASON;
    let posInSeason = SEED_POS;
    let isFirst = true;
    let prevDisplayDate = null;
    let items = [];

    let monthIdx = SEED_MONTH_IDX;
    let thisGimhanaLeap = false;

    while (slYear(currentDate) <= uptoYear) {
        let actualDaysUsed = null;
        if (!isFirst) {
            let isChatPos = (posInSeason === 3 || posInSeason === 7);
            let days = isChatPos ? 14 : 15;
            currentDate = new Date(currentDate.getTime() + days * 24 * 60 * 60 * 1000);
            actualDaysUsed = days;
        }
        isFirst = false;

        let type = detectPoyaType(currentDate);

        let estimatedDisplayDate = new Date(currentDate.getTime() + DISPLAY_DAY_ADJUST_MS);
        let isoKey = fmtISO(estimatedDisplayDate);
        if (manualOverrides[isoKey]) {
            let correctedDisplay = parseISO(manualOverrides[isoKey]);
            let deltaMs = correctedDisplay.getTime() - estimatedDisplayDate.getTime();
            currentDate = new Date(currentDate.getTime() + deltaMs);
        }
        let displayDate = new Date(currentDate.getTime() + DISPLAY_DAY_ADJUST_MS);

        prevDisplayDate = displayDate;


        let monthName;
        if (season === 'gimhana' && thisGimhanaLeap && (posInSeason === 3 || posInSeason === 4)) {
            monthName = 'අධි' + MONTH_CYCLE_SINHALA[monthIdx];
        } else {
            monthName = MONTH_CYCLE_SINHALA[monthIdx];
        }

        let nextSeason, nextPos;
        if (season === 'hemanta' && posInSeason === 8) {
            nextSeason = 'gimhana'; nextPos = 1;
            thisGimhanaLeap = isLeapGimhanaYear(slYear(currentDate));
        } else if (season === 'gimhana') {
            let target = findEsalaTarget(slYear(currentDate));
            let isTarget = target && Math.abs(currentDate - target) < 2 * 24 * 60 * 60 * 1000;
            if (isTarget || posInSeason === 10) { nextSeason = 'vassana'; nextPos = 1; }
            else { nextSeason = 'gimhana'; nextPos = posInSeason + 1; }
        } else if (season === 'vassana' && posInSeason === 8) {
            nextSeason = 'hemanta'; nextPos = 1;
        } else if (season === 'vassana') {
            nextSeason = 'vassana'; nextPos = posInSeason + 1;
        } else {
            nextSeason = 'hemanta'; nextPos = posInSeason + 1;
        }

        items.push({ dateObj: displayDate, season, type, month: monthName });

        // full moon පෝයකට පසුව මාසය ඊළඟට යනවා - "අධිවේසාඛ"හි full moon
        // එකෙන් පසුව පමණක් හැර (එහිදී සැබෑ වේසාඛ මාසයම තවම ලැබී නැති නිසා).
        if (type === 'full') {
            let wasAdhiFull = (season === 'gimhana' && thisGimhanaLeap && posInSeason === 4);
            if (!wasAdhiFull) {
                monthIdx = (monthIdx + 1) % 12;
            }
        }

        season = nextSeason; posInSeason = nextPos;
    }
    return items;
}

function buildPoyaList(startYear, endYear) {
    const rawItems = buildRawChain(endYear);

    const seasonNameMap = { hemanta: "හේමන්ත", gimhana: "ගිම්හාන", vassana: "වස්සාන" };

    const typeNameMap = { full: "පසළොස්වක", new: "අමාවක" };

    return rawItems
        .filter(it => slYear(it.dateObj) >= startYear && slYear(it.dateObj) <= endYear)
        .map(it => ({
            d: fmtISO(it.dateObj),
            r: seasonNameMap[it.season],
            t: typeNameMap[it.type],
            m: it.month
        }));
}

const poyaList = buildPoyaList(2020, 2250);

function buildVesakDates(list, startYear, endYear) {
    const result = {};
    for (let y = startYear; y <= endYear; y++) {
        const candidates = list.filter(p => p.t === "පසළොස්වක" && p.d >= `${y}-05-04` && p.d <= `${y}-06-04`);
        const vesak = candidates.find(p => p.m === "වේසාඛ") || candidates[0];
        if (vesak) result[y] = vesak.d;
    }
    return result;
}

const vesakDates = buildVesakDates(poyaList, 2020, 2250);
    const tithiPaliS = ["","පඨමං","දුතියං","තතියං","චතුත්ථං","පඤ්චමං","ඡට්ඨමං","සත්තමං","අට්ඨමං","නවමං","දසමං","එකාදසමං","ද්වාදසමං","තෙරසමං","චුද්දසමං","පණ්ණරසමං"];
    const tithiPaliE = ["","Paṭhamaṃ","Dutiyaṃ","Tatiyaṃ","Catutthaṃ","Pañcamaṃ","Chaṭṭhamaṃ","Sattamaṃ","Aṭṭhamaṃ","Navamaṃ","Dasamaṃ","Ekādasamaṃ","Dvādasamaṃ","Terasamaṃ","Cuddasamaṃ","Paṇṇarasamaṃ"];

    function toggleMenu() {
        const d = document.getElementById("myDropdown");
        d.style.display = (d.style.display === "block") ? "none" : "block";
    }

   
    window.onclick = function(event) {
        if (!event.target.matches('.menu-dots')) {
            document.getElementById("myDropdown").style.display = "none";
        }
    }

    function toggleLanguage() {
        currentLang = (currentLang === 'si') ? 'en' : 'si';
        localStorage.setItem('appLang', currentLang);
        updateUI();
        calculateAll();    
        updateSunTimes(); 

    if (typeof updateSinhalaAstroDate === "function") {
        updateSinhalaAstroDate();
    }
}
    function updateUI() {
    const t = i18n[currentLang];
    const isDark = document.body.classList.contains('dark-mode');

    document.getElementById('ui-title').innerHTML = t.title + `<div class="menu-dots" onclick="toggleMenu()">&#8942;</div>`;
    document.getElementById('ui-label-date').innerText = t.dateLabel;
    document.getElementById('ui-label-year').innerText = t.yearLabel;
    document.getElementById('ui-label-month').innerText = t.monthLabel;
    document.getElementById('ui-label-day').innerText = t.dayLabel;
    document.getElementById('ui-menu-sun').innerText = t.sunMenu;
    document.getElementById('ui-menu-poya').innerText = t.poyaMenu;
    document.getElementById('ui-menu-vas').innerText = t.vasMenu;
    document.getElementById('ui-menu-contact').innerText = t.contactMenu;
    
    const darkBtn = document.getElementById('ui-dark-mode-btn');
    if (darkBtn) {
        darkBtn.innerText = isDark ? t.lightMode : t.darkMode;
    }

    const langBtn = document.getElementById('ui-lang-btn');
    if (langBtn) {
        langBtn.innerText = t.langBtn;
    }

    document.getElementById('ui-poya-title').innerText = t.poyaTitle;
    document.getElementById('ui-vas-title').innerText = t.vasTitle;
    document.getElementById('ui-label-atikkanta').innerText = t.atikkanta;
    document.getElementById('ui-label-avasittha').innerText = t.avasittha;

    const shortY = currentLang === 'si' ? 'ව' : 'Y';
    const shortM = currentLang === 'si' ? 'මා' : 'M';
    const shortD = currentLang === 'si' ? 'දි' : 'D';

    document.getElementById('ui-short-y1').innerText = shortY;
    document.getElementById('ui-short-m1').innerText = shortM;
    document.getElementById('ui-short-d1').innerText = shortD;
    document.getElementById('ui-short-y2').innerText = shortY;
    document.getElementById('ui-short-m2').innerText = shortM;
    document.getElementById('ui-short-d2').innerText = shortD;
    
}

function openPoyaModal() { 
    toggleMenu(); 
    document.getElementById("poyaModal").style.display = "flex"; 
    
    renderPoyaList(); 
    
    setTimeout(() => {
        const nextPoyaElement = document.getElementById("next-poya-item");
        const scrollContainer = document.getElementById("poyaListContent");
        
        if (nextPoyaElement && scrollContainer) {
            const topPos = nextPoyaElement.offsetTop;
            scrollContainer.scrollTo({
                top: topPos - 140, 
                behavior: 'smooth'
            });
        }
    }, 500); 
}

function openVasModal() { 
    toggleMenu();
    document.getElementById("vasModal").style.display = "flex"; 
}

function closeModal(id) { 
    document.getElementById(id).style.display = "none"; 
}


function renderPoyaList() {
    const container = document.getElementById("poyaListContent");
    const t = i18n[currentLang];
    const today = new Date().toISOString().split('T')[0];
    const selYear = new Date(document.getElementById('inputDate').value).getFullYear();
    
    let html = `<div style='text-align:center; font-size: 1.3em; font-weight:bold; color:var(--gold); margin-bottom:15px; border-bottom: 2px solid #eee; padding-bottom:5px;'>${selYear} ${t.poyaTitle}</div>`;
    
    const yearPoyas = poyaList.filter(p => p.d.startsWith(selYear));
    
  
    if (yearPoyas.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding:20px; color:#888;">දත්ත නොමැත / No Data</div>`;
        return;
    }

    
    const nextPoya = yearPoyas.find(p => p.d >= today);
    const nextPoyaDate = nextPoya ? nextPoya.d : null;

    const earlyHemantha = yearPoyas.filter(p => p.r === "හේමන්ත" && new Date(p.d).getMonth() < 6);
    let startCount = 8 - earlyHemantha.length + 1;
    let poyaCounters = { "හේමන්ත": startCount, "ගිම්හාන": 1, "වස්සාන": 1, "නැවත හේමන්ත": 1 };
    let lastDisplayedSeason = "";

    const firstPoyaIndexOfYear = poyaList.findIndex(p => p.d.startsWith(selYear));
    let lastPoyaDateObj = null;

    if (firstPoyaIndexOfYear > 0) {
        lastPoyaDateObj = new Date(poyaList[firstPoyaIndexOfYear - 1].d);
    }

    yearPoyas.forEach(p => {
        let dt = new Date(p.d);
        let rawSeason = p.r;
        
        if (rawSeason === "හේමන්ත" && dt.getMonth() >= 10) rawSeason = "නැවත හේමන්ත";
        
        let countInSeason = poyaCounters[rawSeason];
        poyaCounters[rawSeason]++;

        let seasonKey = Object.keys(i18n.si.seasons).find(k => i18n.si.seasons[k] === rawSeason) || "Hemanta";
        let displaySeasonName = t.seasons[seasonKey];

        if (lastDisplayedSeason !== displaySeasonName) {
            lastDisplayedSeason = displaySeasonName;
            html += `<div class="season-banner">${displaySeasonName}</div>`;
        }

        let currentPoyaDateObj = new Date(p.d); 
        let poyaType = "";

        if (lastPoyaDateObj) {
            let diffInTime = currentPoyaDateObj.getTime() - lastPoyaDateObj.getTime();
            let diffInDays = Math.round(diffInTime / (1000 * 3600 * 24));

            if (diffInDays === 14) {
                poyaType = (currentLang === 'si' ? "චාතුද්දසී" : "Cātuddasī");
            } else if (diffInDays === 15) {
                poyaType = (currentLang === 'si' ? "පණ්ණරසී" : "Paṇṇarasī");
            } else {
                poyaType = "Error"; 
                isError = true;
            }
        } else {
            poyaType = "Error"; 
            isError = true;
        }

        lastPoyaDateObj = currentPoyaDateObj;

        let poyaNameDisplay = p.t;
        if (currentLang !== 'si') {
            poyaNameDisplay = poyaNameDisplay
                .replace("පසළොස්වක", "Full Moon")
                .replace("අමාවක", " New Moon");
        }

        
        const isNextPoya = (p.d === nextPoyaDate);
        const isFullMoon = p.t.includes("පසළොස්වක");
        const isNewMoon = p.t.includes("අමාවක");

        let poyaClass = "";
        let scrollIdAttribute = ""; 
        if (isNextPoya) {
            poyaClass = "next-poya-bg"; 
            scrollIdAttribute = 'id="next-poya-item"';
        } else if (isFullMoon) {
            poyaClass = "full-moon-bg";
        } else if (isNewMoon) {
            poyaClass = "new-moon-bg";
        }
               
        const sinhalaMonths = [
            "ජනවාරි", "පෙබරවාරි", "මාර්තු", "අප්‍රේල්", "මැයි", "ජූනි", 
            "ජූලි", "අගෝස්තු", "සැප්තැම්බර්", "ඔක්තෝබර්", "නොවැම්බර්", "දෙසැම්බර්"
        ];

        let displayDate = currentLang === 'si' 
            ? sinhalaMonths[dt.getMonth()] + " " + dt.getDate() 
            : dt.getDate() + " " + dt.toLocaleString('en-US', { month: 'long' });
       
        html += `
            <div ${scrollIdAttribute} class="list-item ${poyaClass}">
                <div style="display: flex; flex-direction: column;">
                    <span style="font-weight: bold; color: var(--text); font-size: 1.05em;">
                        ${countInSeason}. ${displayDate}
                    </span>
                    <span class="poya-name">
                        ${poyaNameDisplay}${t.poyaSuffix} 
                    </span>
                </div>
                <div style="text-align: right;">
                    <span class="poya-tag" style="background: ${poyaType.includes("චාතුද්දසී") || poyaType.includes("Cātuddasī") ? '#c62828' : 'var(--orange)'};">
                        ${poyaType}
                    </span>
                </div>
            </div>`;
    });
 

    container.innerHTML = html;
}

    function openVasModal() {
    toggleMenu(); 
    document.getElementById("vasModal").style.display = "flex";
    const t = i18n[currentLang];
    const d = new Date(document.getElementById('inputDate').value);
    const y = d.getFullYear();
    
    const yearPoyas = poyaList.filter(p => p.d.startsWith(y));
    const gim = yearPoyas.filter(p => p.r === "ගිම්හාන");
    const vas = yearPoyas.filter(p => p.r === "වස්සාන");
    
    let p1="-", p2="-", p3="-", p4="-";
    const opt = { year:'numeric', month:'numeric', day:'numeric' };
    
    if(gim.length > 0) { 
        let d1 = new Date(gim[gim.length-1].d); 
        d1.setDate(d1.getDate()+1); 
        p1 = d1.toLocaleDateString(currentLang==='si'?'si-LK':'en-US', opt); 
    }
    if(vas.length >= 6) p2 = new Date(vas[5].d).toLocaleDateString(currentLang==='si'?'si-LK':'en-US', opt);
    if(vas.length >= 2) { 
        let d3 = new Date(vas[1].d); 
        d3.setDate(d3.getDate()+1); 
        p3 = d3.toLocaleDateString(currentLang==='si'?'si-LK':'en-US', opt); 
    }
    if(vas.length >= 8) p4 = new Date(vas[7].d).toLocaleDateString(currentLang==='si'?'si-LK':'en-US', opt);

    
    document.getElementById("vasContent").innerHTML = `
        <div class="vas-card">
            <span class="vas-label">${t.vas1}</span>
            <span class="vas-date-badge">${p1}</span>
        </div>
        <div class="vas-card">
            <span class="vas-label">${t.vas2}</span>
            <span class="vas-date-badge">${p2}</span>
        </div>
        <div class="vas-card">
            <span class="vas-label">${t.vas3}</span>
            <span class="vas-date-badge">${p3}</span>
        </div>
        <div class="vas-card">
            <span class="vas-label">${t.vas4}</span>
            <span class="vas-date-badge">${p4}</span>
        </div>
    `;
}

function calculateAll() {
    const t = i18n[currentLang];
    const ds = document.getElementById('inputDate').value;
    if (!ds) return;
    
    const d = new Date(ds); 
    d.setHours(0,0,0,0);
    const time = d.getTime(); 
    const y = d.getFullYear();
    
    const vD = new Date(vesakDates[y] || `${y}-05-01`).getTime();
    const bY = (time <= vD) ? (y + 543) : (y + 544);

    const pastFullMoons = poyaList.filter(p => p.t === "පසළොස්වක" && new Date(p.d).getTime() < time);
    const lastFullMoon = pastFullMoons.length > 0 ? pastFullMoons[pastFullMoons.length - 1] : null;
    let tithi = lastFullMoon ? Math.round((time - new Date(lastFullMoon.d).getTime()) / 86400000) : 1;
    if(tithi === 0) tithi = 1;

    const nextA = poyaList.find(p => p.t === "අමාවක" && new Date(p.d).getTime() >= time);
    const nextF = poyaList.find(p => p.t === "පසළොස්වක" && new Date(p.d).getTime() >= time);
    let paksha = (nextA && (!nextF || new Date(nextA.d).getTime() <= new Date(nextF.d).getTime())) ? t.paksha.Kanha : t.paksha.Sukka;

    const lastV = time <= vD ? y-1 : y;
    const lastVD = new Date(vesakDates[lastV]).getTime();
    const nextVD = new Date(vesakDates[lastV+1]).getTime();
    const totM = Math.round((nextVD - lastVD) / 2551442400);

    
    const nextFT = poyaList.find(p => p.t === "පසළොස්වක" && new Date(p.d).getTime() >= time);
    let bM = nextFT ? Math.round((new Date(nextFT.d).getTime() - lastVD) / 2551442400) : 1;
    bM = (bM <= 0) ? totM : (bM > totM ? totM : bM);

    const nextP = poyaList.find(p => new Date(p.d).getTime() >= time);

    const todayP = poyaList.find(p => p.d === ds);
    let poyaName = "";
    if (todayP) {
        if (currentLang === 'en') {
            poyaName = (todayP.t === "පසළොස්වක") ? "Full Moon" : "Amāvaka";
        } else {
            poyaName = todayP.t;
        }
    }
    document.getElementById('poyaStatus').innerText = poyaName ? poyaName + t.poyaSuffix : "";

    const monthMap = {
        "මාඝ": "Māgha", "ඵග්ගුන": "Phagguna", "චිත්ත": "Citta",
        "අධිවේසාඛ": "Adhivesākha", "වේසාඛ": "Vesākha", "ජෙට්ඨ": "Jeṭṭha",
        "ආසාළ්හ": "Āsāḷha", "සාවන": "Sāvana", "පොට්ඨපාද": "Poṭṭhapāda",
        "අස්සයුජ": "Assayuja", "කත්තික": "Kattika", "මාඝසිර": "Māghasira", "ඵුස්ස": "Phussa"
    };

  
    const nextSeasonEntry = poyaList.find(p => new Date(p.d).getTime() >= time);
    const rawS = nextSeasonEntry ? nextSeasonEntry.r : "හේමන්ත";
    
    const seasonKey = Object.keys(i18n.si.seasons).find(k => i18n.si.seasons[k] === rawS);
    const displayS = t.seasons[seasonKey];

    
    const animal = t.animals[bY % 12];

    const sMonth = nextP ? nextP.m : "වේසාඛ"; 
    const displayMonth = (currentLang === 'en') ? (monthMap[sMonth] || sMonth) : sMonth;

    let paliIndex = tithi; 
    let finalPaksha = paksha; 

    const pastAmavakas = poyaList.filter(p => p.t === "අමාවක" && new Date(p.d).getTime() < d.getTime());
    const lastAmavaka = pastAmavakas.length > 0 ? pastAmavakas[pastAmavakas.length - 1] : null;

    if (finalPaksha === t.paksha.Sukka && lastAmavaka) {
        const amavakaDate = new Date(lastAmavaka.d);
        amavakaDate.setHours(0,0,0,0);
        
        const diffTime = d.getTime() - amavakaDate.getTime();
        paliIndex = Math.round(diffTime / (1000 * 60 * 60 * 24));
    }

    if (paliIndex <= 0) paliIndex = 1;

        const tithiWord = currentLang === 'si' 
        ? (tithiPaliS[paliIndex] || "පණ්ණරසමං") 
        : (tithiPaliE[paliIndex] || "Paṇṇarasamaṃ");

    const weekDay = t.week[d.getDay()];

    
    document.getElementById('bYear').innerText = bY;
    document.getElementById('bMonth').innerText = bM;
    document.getElementById('bDay').innerText = tithi;
    document.getElementById('paliDisplay').innerText = t.paliTemplate(animal, displayS, displayMonth, finalPaksha, tithiWord, weekDay);

    let nextPoya = poyaList.find(p => {
        let pDate = new Date(p.d);
        pDate.setHours(0,0,0,0);
        return pDate >= d;
    });

    
    let nextFullMoon = poyaList.find(p => {
        let pDate = new Date(p.d);
        pDate.setHours(0,0,0,0);
        
        return pDate >= d && p.t.includes("පසළොස්වක");
    });

    let currentAvasitthaD = 0;
    let poyaMessage = "";
    let isPoyaDay = false;
    let statusAvasitthaD = 0; 

    if (nextPoya) {
        let targetD = new Date(nextPoya.d);
        targetD.setHours(0,0,0,0);
        statusAvasitthaD = Math.round((targetD.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));

if (statusAvasitthaD === 0) {
    isPoyaDay = true;
    poyaMessage = (currentLang === 'si') ? nextPoya.t : nextPoya.t.replace("පසළොස්වක", "Full Moon").replace("අමාවක", "New Moon");
} else {
    if (currentLang === 'si') {
        
        if (statusAvasitthaD === 1) {
            poyaMessage = "හෙට උපෝසථ දිනය";
        } else {
            poyaMessage = `උපෝසථයට තව දින - ${statusAvasitthaD}`;
        }
    } else {
        
        let poyaNameEN = nextPoya.t.replace("පසළොස්වක", "Full Moon").replace("අමාවක", "New Moon");
        if (statusAvasitthaD === 1) {
            poyaMessage = `Tomorrow is ${poyaNameEN} Uposatha Day`;
        } else {
            poyaMessage = `${statusAvasitthaD} days to ${poyaNameEN} Uposatha`;
        }
    }
}

}
if (nextFullMoon) {
        let fullMoonD = new Date(nextFullMoon.d);
        fullMoonD.setHours(0,0,0,0);
        currentAvasitthaD = Math.round((fullMoonD.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
    }

    const poyaDisplayElement = document.getElementById("poyaStatus"); 
    if (poyaDisplayElement) {
        if (isPoyaDay) {
            poyaDisplayElement.innerText = poyaMessage + t.poyaSuffix; 
            poyaDisplayElement.style.setProperty('color', '#c62828', 'important');
        } else {
            poyaDisplayElement.innerText = poyaMessage; 
            if (statusAvasitthaD > 0) {
                poyaDisplayElement.style.setProperty('color', '#2dbd6e', 'important');
            } else {
                poyaDisplayElement.style.setProperty('color', 'var(--text)', 'important');
            }
        }
        poyaDisplayElement.style.fontWeight = "bold";
    }

    
    document.getElementById('atikkantaY').innerText = bY - 1;
    document.getElementById('atikkantaM').innerText = bM - 1;
    document.getElementById('atikkantaD').innerText = tithi - 1;

    document.getElementById('avasitthaY').innerText = 5000 - bY;
    document.getElementById('avasitthaM').innerText = totM - bM;
    document.getElementById('avasitthaD').innerText = currentAvasitthaD;

    document.getElementById('ui-label-atikkanta').innerText = t.atikkanta;
    document.getElementById('ui-label-avasittha').innerText = t.avasittha;
}

function toggleDarkMode() {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    
    if (typeof updateUI === "function") {
        updateUI(); 
    }
}

function updateDarkModeBtnText() {
    const btn = document.getElementById('ui-dark-mode-btn');
    if (btn) {
        
        const isDark = document.body.classList.contains('dark-mode');
        btn.innerText = isDark ? "Light Mode" : "Dark Mode";
    }
}
let userLatitude = null;
let userLongitude = null;

function isEnglish() {
    return typeof currentLang !== 'undefined' && currentLang === 'en';
}

document.addEventListener("DOMContentLoaded", function() {
    localStorage.removeItem('selectedCalendarDate');

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
    
    if (typeof updateDarkModeBtnText === "function") updateDarkModeBtnText();
    if (typeof updateUI === "function") updateUI();
    
    const sunDateInput = document.getElementById('sunDateInput');
    if (sunDateInput) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        sunDateInput.value = `${yyyy}-${mm}-${dd}`;

        sunDateInput.addEventListener('change', function() {
            localStorage.setItem('selectedMoonPageDate', sunDateInput.value); 
            updateSunTimes(); 
        });
    }
    
    
    checkAndLoadSavedLocation();
    resetToToday();

  
    if (typeof updateSinhalaAstroDate === "function") {
        updateSinhalaAstroDate();
    }
}); 
function checkAndLoadSavedLocation() {
    const statusText = document.getElementById('locationStatus');
    
    const savedLat = localStorage.getItem('userLat');
    const savedLng = localStorage.getItem('userLng');
    const savedLocName = localStorage.getItem('userLocName');

    if (savedLat && savedLng) {        
        userLatitude = parseFloat(savedLat);
        userLongitude = parseFloat(savedLng);

        if (statusText) {
            const latFmt = userLatitude.toFixed(4);
            const lngFmt = userLongitude.toFixed(4);
            
            if (savedLocName) {
                statusText.innerHTML = isEnglish()
                    ? `📍 Location: <b>${savedLocName}</b><br><span class="loc-coords">(${latFmt}°, ${lngFmt}°)</span>`
                    : `📍 ස්ථානය: <b>${savedLocName}</b><br><span class="loc-coords">(${latFmt}°, ${lngFmt}°)</span>`;
            } else {
                statusText.innerHTML = isEnglish()
                    ? `📍 Location: <b>${latFmt}°, ${lngFmt}°</b>`
                    : `📍 ස්ථානය: <b>${latFmt}°, ${lngFmt}°</b>`;
            }
        }

        if (typeof updateSunTimes === "function") updateSunTimes();
    } else {
        if (statusText) {
            statusText.innerText = isEnglish()
                ? "ℹ️ Please click 'Get My Location' button."
                : "ℹ️ කරුණාකර 'Get My Location' බොත්තම ඔබන්න.";
        }
    }
}

function fetchLocationAndSunData() {
    const statusText = document.getElementById('locationStatus');
    const btn = document.getElementById('getLocationBtn');
    
    if (statusText) {
        statusText.innerText = isEnglish() 
            ? "📍 Detecting location (Please wait)..." 
            : "📍 ස්ථානය සොයමින් පවතී (කරුණාකර රැඳී සිටින්න)...";
    }
        
    if(btn) btn.disabled = true;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                userLatitude = position.coords.latitude;
                userLongitude = position.coords.longitude;

                localStorage.setItem('userLat', userLatitude);
                localStorage.setItem('userLng', userLongitude);
                
                if (navigator.onLine) {
                    if (statusText) {
                        statusText.innerText = isEnglish() 
                            ? `📍 Locating: ${userLatitude.toFixed(4)}°, ${userLongitude.toFixed(4)}...`
                            : `📍 ස්ථානය සොයමින්: ${userLatitude.toFixed(4)}°, ${userLongitude.toFixed(4)}...`;
                    }
                    
                    try {
                        const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${userLatitude}&longitude=${userLongitude}&localityLanguage=${currentLang}`);
                        const data = await response.json();

                        const locationName = data.city || data.locality || data.principalSubdivision || "Unknown";
                        localStorage.setItem('userLocName', locationName);

                        const latFmt = userLatitude.toFixed(4);
                        const lngFmt = userLongitude.toFixed(4);
                        if (statusText) {
                            statusText.innerHTML = isEnglish()
                                ? `📍 Location: <b>${locationName}</b><br><span class="loc-coords">(${latFmt}°, ${lngFmt}°)</span>`
                                : `📍 ස්ථානය: <b>${locationName}</b><br><span class="loc-coords">(${latFmt}°, ${lngFmt}°)</span>`;
                        }

                    } catch (error) {
                        showCoordinatesOnly(statusText);
                    }
                } else {
                    showCoordinatesOnly(statusText);
                }

                if(btn) btn.disabled = false;
                if (typeof updateSunTimes === "function") updateSunTimes();
            },
            (error) => {
                if(btn) btn.disabled = false;
                if (!statusText) return;

                if (isEnglish()) {
                    switch(error.code) {
                        case error.PERMISSION_DENIED: statusText.innerText = " Permission Denied. Please enable Location Access."; break;
                        case error.POSITION_UNAVAILABLE: statusText.innerText = " Device GPS is turned off."; break;
                        case error.TIMEOUT: statusText.innerText = "⏳ Location request timed out. Please try again."; break;
                        default: statusText.innerText = " Unable to retrieve location."; break;
                    }
                } else {
                    switch(error.code) {
                        case error.PERMISSION_DENIED: statusText.innerText = " අවසර නැත. කරුණාකර ලොකේෂන් අවසර ලබා දෙන්න."; break;
                        case error.POSITION_UNAVAILABLE: statusText.innerText = " දුරකථනයේ GPS ක්‍රියා විරහිත කර ඇත."; break;
                        case error.TIMEOUT: statusText.innerText = "⏳ කාලය ඉක්මවා ගියා. නැවත උත්සාහ කරන්න."; break;
                        default: statusText.innerText = " ස්ථානය ලබා ගැනීමට නොහැකි විය."; break;
                    }
                }
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    } else {
        if(btn) btn.disabled = false;
        if (statusText) {
            statusText.innerText = isEnglish() ? " GPS not supported." : " GPS පහසුකමට සහාය නොදක්වයි.";
        }
    }
}

function showCoordinatesOnly(statusText) {
    if (!statusText) return;
    const lat = userLatitude || localStorage.getItem('userLat');
    const lng = userLongitude || localStorage.getItem('userLng');
    
    if (lat && lng) {
        const latFmt = parseFloat(lat).toFixed(4);
        const lngFmt = parseFloat(lng).toFixed(4);
        statusText.innerHTML = isEnglish()
            ? `📍 Location: <b>${latFmt}°, ${lngFmt}°</b>`
            : `📍 ස්ථානය: <b>${latFmt}°, ${lngFmt}°</b>`;
    } else {
        statusText.innerText = isEnglish()
            ? "ℹ️ Please click 'Get My Location' button."
            : "ℹ️ කරුණාකර 'Get My Location' බොත්තම ඔබන්න.";
    }
}

function updateSunTimes() {
    const dateInput = document.getElementById('sunDateInput');
    const statusText = document.getElementById('locationStatus');

    if (dateInput && !dateInput.value) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        dateInput.value = `${yyyy}-${mm}-${dd}`;
    }
    
    if (!dateInput || !dateInput.value) return;

    const engMode = isEnglish();
    if (document.getElementById('lblDawn')) document.getElementById('lblDawn').innerText = engMode ? "Dawn" : "අරුණෝදය";
    if (document.getElementById('lblSunrise')) document.getElementById('lblSunrise').innerText = engMode ? "Sunrise" : "ඉර උදාව";
    if (document.getElementById('lblNoon')) document.getElementById('lblNoon').innerText = engMode ? "Noon" : "මධ්‍යහ්නය";
    if (document.getElementById('lblSunset')) document.getElementById('lblSunset').innerText = engMode ? "Sunset" : "ඉර බැසීම";
    if (document.getElementById('lblMoonrise')) document.getElementById('lblMoonrise').innerText = engMode ? "Moonrise" : "සඳ උදාව";
    if (document.getElementById('lblMoonset')) document.getElementById('lblMoonset').innerText = engMode ? "Moonset" : "සඳ බැසීම";

    const lat = userLatitude || localStorage.getItem('userLat');
    const lng = userLongitude || localStorage.getItem('userLng');

    if (!lat || !lng) {
        if (statusText) {
            statusText.innerText = engMode 
                ? "Please click 'Get My Location' button first." 
                : "කරුණාකර මුලින්ම 'Get My Location' බොත්තම ඔබන්න.";
        }
        return;
    }

    const selectedDate = new Date(dateInput.value);
    selectedDate.setHours(12,0,0,0); 

    let sunrise = null, solarNoon = null, sunset = null;
    let moonTimes = { rise: null, set: null };
    let fraction = 0;
    let phase = 0;

    try {
        if (typeof Astronomy !== 'undefined') {
            const observer = new Astronomy.Observer(parseFloat(lat), parseFloat(lng), 0);
            
            const startOfDay = new Date(selectedDate);
            startOfDay.setHours(0, 0, 0, 0);
            const astroStartOfDay = Astronomy.MakeTime(startOfDay);
            const astroSelectedDate = Astronomy.MakeTime(selectedDate);

            const sr = Astronomy.SearchRiseSet('Sun', observer, 1, astroStartOfDay, 1);
            sunrise = sr ? (sr.date || sr.time?.date || null) : null;

            const ss = Astronomy.SearchRiseSet('Sun', observer, -1, astroStartOfDay, 1);
            sunset = ss ? (ss.date || ss.time?.date || null) : null;

            if (sunrise && sunset) {
                solarNoon = new Date((sunrise.getTime() + sunset.getTime()) / 2);
            } else {
                const sn = Astronomy.SearchTransit('Sun', observer, astroStartOfDay);
                solarNoon = sn ? (sn.date || sn.time?.date || null) : null;
            }

            const mr = Astronomy.SearchRiseSet('Moon', observer, 1, astroStartOfDay, 1);
            moonTimes.rise = mr ? (mr.date || mr.time?.date || null) : null;

            const ms = Astronomy.SearchRiseSet('Moon', observer, -1, astroStartOfDay, 1);
            moonTimes.set = ms ? (ms.date || ms.time?.date || null) : null;

            const phaseAngle = Astronomy.MoonPhase(astroSelectedDate);
            phase = phaseAngle / 360.0; 
            
            fraction = (1 - Math.cos(phaseAngle * Math.PI / 180)) / 2;
        }
    } catch (e) {
        console.error("Astronomy Engine error:", e);
    }
    
    const arunodaya = sunrise ? new Date(sunrise.getTime() - (30 * 60000)) : null;

    const formatTime = (dateObj) => {
        if(!dateObj || isNaN(dateObj.getTime())) {
            return engMode ? "No Rise/Set" : "නොමැත";
        }
        let hours = dateObj.getHours();
        let minutes = dateObj.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return hours + ':' + minutes + ' ' + ampm;
    };

    if (document.getElementById('sunDawn')) document.getElementById('sunDawn').innerText = formatTime(arunodaya);
    if (document.getElementById('sunSunrise')) document.getElementById('sunSunrise').innerText = formatTime(sunrise);
    if (document.getElementById('sunNoon')) document.getElementById('sunNoon').innerText = formatTime(solarNoon);
    if (document.getElementById('sunSunset')) document.getElementById('sunSunset').innerText = formatTime(sunset);
    if (document.getElementById('sunMoonrise')) document.getElementById('sunMoonrise').innerText = formatTime(moonTimes.rise);
    if (document.getElementById('sunMoonset')) document.getElementById('sunMoonset').innerText = formatTime(moonTimes.set);
phaseName = "";
    const tithiSukha = ["පුර පෑලවිය", "පුර දියවක", "පුර තියවක", "පුර ජලවක", "පුර විසේනිය", "පුර සැටවක", "පුර සතවක", "පුර අටවක", "පුර නවවක", "පුර දසවක", "පුර එකොළොස්වක", "පුර දොළොස්වක", "පුර තෙළෙස්වක", "පුර තුදුස්වක", "පුර පසළොස්වක"];
    const tithiKanha = ["අව පෑලවිය", "අව දියවක", "අව තියවක", "අව ජලවක", "අව විසේනිය", "අව සැටවක", "අව සතවක", "අව අටවක", "අව නවවක", "අව දසවක", "අව එකොළොස්වක", "අව දොළොස්වක", "අව තෙළෙස්වක", "අව තුදුස්වක", "අමාවක"];

    const selectedDateStr = dateInput.value; 
    const d = new Date(selectedDateStr);
    d.setHours(0,0,0,0);

    let targetPoya = null;
    if (typeof poyaList !== 'undefined' && Array.isArray(poyaList)) {
        targetPoya = poyaList.find(p => {
            let pDate = new Date(p.d);
            pDate.setHours(0,0,0,0);
            return pDate >= d && (p.t.includes("පසළොස්වක") || p.t.includes("අමාවක"));
        });
    }

    if (targetPoya) {
        let poyaDate = new Date(targetPoya.d);
        poyaDate.setHours(0,0,0,0);
        
        let daysToPoya = Math.round((poyaDate.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
        const isSukha = targetPoya.t.includes("පසළොස්වක");

        if (daysToPoya === 0) {
            phaseName = engMode ? (isSukha ? "Full Moon" : "New Moon") : (isSukha ? "පුර පසළොස්වක පෝය" : "අමාවක පෝය");
        } else {
            let tithiIndex = 0;

            if (isSukha) {
                tithiIndex = 15 - daysToPoya - 1; 
                if (tithiIndex < 0) tithiIndex = 0;
                phaseName = engMode ? `Waxing ${tithiIndex + 1}` : tithiSukha[tithiIndex];
            } else {
                const pastFullMoons = poyaList.filter(p => p.t.includes("පසළොස්වක") && new Date(p.d).getTime() < poyaDate.getTime());
                const lastFullMoon = pastFullMoons.length > 0 ? pastFullMoons[pastFullMoons.length - 1] : null;

                let totalDaysInWaning = 15; 
                if (lastFullMoon) {
                    let lastFullMoonDate = new Date(lastFullMoon.d);
                    lastFullMoonDate.setHours(0,0,0,0);
                    totalDaysInWaning = Math.round((poyaDate.getTime() - lastFullMoonDate.getTime()) / (1000 * 60 * 60 * 24));
                }

                let elapsedDays = totalDaysInWaning - daysToPoya;
                tithiIndex = elapsedDays - 1;

                if (tithiIndex < 0) tithiIndex = 0;
                if (tithiIndex > 14) tithiIndex = 14;

                phaseName = engMode ? `Waning ${tithiIndex + 1}` : tithiKanha[tithiIndex];
            }
        }
    } else {
        let tithiFullIndex = Math.floor(phase * 30);
        if (tithiFullIndex >= 30) tithiFullIndex = 0;
        let fallbackIndex = tithiFullIndex <= 14 ? tithiFullIndex : tithiFullIndex - 15;
        if (fallbackIndex > 14) fallbackIndex = 14;
        
        phaseName = engMode 
            ? (phase <= 0.5 ? `Waxing ${fallbackIndex + 1}` : `Waning ${fallbackIndex + 1}`) 
            : (phase <= 0.5 ? tithiSukha[fallbackIndex] : tithiKanha[fallbackIndex]);
    }

    const moonVisual = document.getElementById('moonVisual');
    if (moonVisual) {
        moonVisual.style.boxShadow = `0 0 ${fraction * 20}px rgba(253, 224, 71, ${fraction * 0.6})`;
        moonVisual.style.position = 'relative';
        moonVisual.style.borderRadius = '50%';
        moonVisual.style.overflow = 'hidden'; 
        moonVisual.style.backgroundColor = '#222';
        moonVisual.innerHTML = ''; 

        if (fraction < 0.02) {
            moonVisual.style.boxShadow = 'none';
        } else if (fraction > 0.98) {
            moonVisual.style.backgroundColor = '#fde047';
        } else {
            const isWaxing = phase <= 0.5;
            const lightColor = '#fde047';
            const darkColor = '#222';            
            const baseHemisphere = isWaxing ? 'right: 0;' : 'left: 0;';
            const maskColor = fraction < 0.5 ? darkColor : lightColor;
            const scale = Math.abs(1 - (fraction * 2));

            moonVisual.innerHTML = `
                <div style="position: absolute; top: 0; ${baseHemisphere} width: 50%; height: 100%; background-color: ${lightColor};"></div>
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 50%; background-color: ${maskColor}; transform: scaleX(${scale});"></div>
            `;
        }
    }

        const percentage = Math.round(fraction * 100);
    const moonPhaseLabel = document.getElementById('moonPhaseLabel');
    if (moonPhaseLabel) moonPhaseLabel.innerText = phaseName;
    
    const moonIllumLabel = document.getElementById('moonIllumLabel');
    if (moonIllumLabel) moonIllumLabel.innerText = engMode ? `Illumination: ${percentage}%` : `දීප්තිය: ${percentage}%`;

    
    if (typeof updateSinhalaAstroDate === "function") {
        updateSinhalaAstroDate();
    }
} 
function openSunModal() {
    const sunModal = document.getElementById("sunModal");
    if (sunModal) sunModal.style.display = "flex";
    const myDropdown = document.getElementById("myDropdown");
    if (myDropdown) myDropdown.style.display = "none";
    
    updateSunTimes();
}

function closeSunModal() {
    const sunModal = document.getElementById("sunModal");
    if (sunModal) sunModal.style.display = "none";
}

function updateDisplay() {
    let input = document.getElementById('inputDate').value;
    let dateText = document.getElementById('dateText');
    
    if (input) {
        let d = new Date(input);
        let year = d.getFullYear();
        let month = String(d.getMonth() + 1).padStart(2, '0');
        let day = String(d.getDate()).padStart(2, '0');
        
        if (dateText) {
            dateText.innerText = year + "-" + month + "-" + day;
        }
        
        localStorage.setItem('selectedCalendarDate', input);

        if (typeof updateMiniMoon === "function") {
            updateMiniMoon(d);
        }
    }
}

function resetToToday() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const today = y + "-" + m + "-" + d;

    const dateInput = document.getElementById("inputDate");
    if (dateInput) {
        localStorage.setItem('selectedCalendarDate', today);
        dateInput.value = today;
    } 

    if (typeof calculateAll === "function") calculateAll();
    if (typeof updateDisplay === "function") updateDisplay(); 
    
    if (typeof updateSinhalaAstroDate === "function") {
        updateSinhalaAstroDate();
    }
} 

// =====================================================================
// Custom Wheel Date Picker (Year → Month → Date, easy year selection)
// Month/Date columns scroll continuously (loop around) - Year does not
// (bounded 2020-2250; further years can be added via manualOverrides
// as needed, so this range is generous headroom rather than a hard limit).
// =====================================================================
const WHEEL_MIN_YEAR = 2020;
const WHEEL_MAX_YEAR = 2250;
const WHEEL_ROW_H = 44;
const WHEEL_CYCLES = 9;              // odd number of repeated loops for circular columns
const WHEEL_MID_CYCLE = 4;           // Math.floor(WHEEL_CYCLES/2)
let wheelTargetInputId = null;
let wheelScrollTimers = { year: null, month: null, date: null };
let wheelCurrentMaxDay = 31;

function wheelMonthNames() {
    return (typeof currentLang !== 'undefined' && currentLang === 'si')
        ? ["ජන", "පෙබ", "මාර්", "අප්‍රේ", "මැයි", "ජූනි", "ජූලි", "අගෝ", "සැප්", "ඔක්", "නොවැ", "දෙසැ"]
        : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
}

function daysInMonth(year, monthIndex0) {
    return new Date(year, monthIndex0 + 1, 0).getDate();
}

// සාමාන්‍ය (bounded) column එකක් - වර්ෂය සඳහා පමණයි භාවිතා වේ.
function buildWheelColumnBounded(colEl, values, selectedIndex, key) {
    colEl.innerHTML = values.map((v, i) =>
        `<div class="wheel-item${i === selectedIndex ? ' wheel-selected' : ''}" data-idx="${i}">${v}</div>`
    ).join('');

    colEl.scrollTop = selectedIndex * WHEEL_ROW_H;

    colEl.onscroll = function () {
        clearTimeout(wheelScrollTimers[key]);
        wheelScrollTimers[key] = setTimeout(function () {
            const idx = Math.round(colEl.scrollTop / WHEEL_ROW_H);
            highlightWheelSelection(colEl, idx);
            refreshWheelDateColumn();
        }, 90);
    };
}

function buildWheelColumnCircular(colEl, values, selectedIndex, key) {
    const n = values.length;
    let html = '';
    for (let c = 0; c < WHEEL_CYCLES; c++) {
        for (let i = 0; i < n; i++) {
            html += `<div class="wheel-item" data-idx="${i}">${values[i]}</div>`;
        }
    }
    colEl.innerHTML = html;

    const midStart = WHEEL_MID_CYCLE * n;
    colEl.scrollTop = (midStart + selectedIndex) * WHEEL_ROW_H;
    highlightWheelSelection(colEl, midStart + selectedIndex);

    colEl.onscroll = function () {
        clearTimeout(wheelScrollTimers[key]);
        wheelScrollTimers[key] = setTimeout(function () {
            let raw = Math.round(colEl.scrollTop / WHEEL_ROW_H);
            const baseIdx = ((raw % n) + n) % n;
            const currentCycle = Math.floor(raw / n);


            if (currentCycle <= 0 || currentCycle >= WHEEL_CYCLES - 1) {
                raw = midStart + baseIdx;
                colEl.scrollTop = raw * WHEEL_ROW_H;
            }

            highlightWheelSelection(colEl, raw);
            if (key === 'month') refreshWheelDateColumn();
        }, 90);
    };
}

function highlightWheelSelection(colEl, idx) {
    const items = colEl.querySelectorAll('.wheel-item');
    items.forEach((it, i) => it.classList.toggle('wheel-selected', i === idx));
}

function getWheelValueIndex(colEl, cycleLength) {
    const raw = Math.round(colEl.scrollTop / WHEEL_ROW_H);
    if (!cycleLength) return raw; // bounded column (year) - raw එකම index
    return ((raw % cycleLength) + cycleLength) % cycleLength;
}

function refreshWheelDateColumn() {
    const yearCol = document.getElementById('wheelYear');
    const monthCol = document.getElementById('wheelMonth');
    const dateCol = document.getElementById('wheelDate');

    const year = WHEEL_MIN_YEAR + getWheelValueIndex(yearCol, null);
    const monthIdx = getWheelValueIndex(monthCol, 12);
    const maxDay = daysInMonth(year, monthIdx);

    const prevDay = getWheelValueIndex(dateCol, wheelCurrentMaxDay) + 1;
    const newSelectedDay = Math.min(prevDay, maxDay);
    wheelCurrentMaxDay = maxDay;

    const dayValues = [];
    for (let d = 1; d <= maxDay; d++) dayValues.push(d);
    buildWheelColumnCircular(dateCol, dayValues, newSelectedDay - 1, 'date');
}

function openWheelPicker(inputId) {
    wheelTargetInputId = inputId;
    const inputEl = document.getElementById(inputId);
    
    let baseDate = new Date();

    if (inputEl && inputEl.value) {
        const parsedDate = new Date(inputEl.value + 'T00:00:00');
        if (!isNaN(parsedDate.getTime())) {
            baseDate = parsedDate;
        }
    }

    const selYear = baseDate.getFullYear();
    const selMonth = baseDate.getMonth();
    const selDay = baseDate.getDate();

    document.getElementById('wheelPickerModal').style.display = 'flex';

    requestAnimationFrame(function () {
        const years = [];
        for (let y = WHEEL_MIN_YEAR; y <= WHEEL_MAX_YEAR; y++) years.push(y);
        
        // Year index එක safe bounds ඇතුළත පිහිටුවයි
        const yearIndex = Math.max(0, Math.min(selYear - WHEEL_MIN_YEAR, years.length - 1));
        buildWheelColumnBounded(document.getElementById('wheelYear'), years, yearIndex, 'year');

        buildWheelColumnCircular(document.getElementById('wheelMonth'), wheelMonthNames(), selMonth, 'month');

        const maxDay = daysInMonth(selYear, selMonth);
        wheelCurrentMaxDay = maxDay;
        const dayValues = [];
        for (let d = 1; d <= maxDay; d++) dayValues.push(d);
        buildWheelColumnCircular(document.getElementById('wheelDate'), dayValues, Math.min(selDay, maxDay) - 1, 'date');
    });
}

function closeWheelPicker() {
    document.getElementById('wheelPickerModal').style.display = 'none';
    wheelTargetInputId = null;
}

function confirmWheelPicker() {
    if (!wheelTargetInputId) { closeWheelPicker(); return; }

    const yearCol = document.getElementById('wheelYear');
    const monthCol = document.getElementById('wheelMonth');
    const dateCol = document.getElementById('wheelDate');

    const year = WHEEL_MIN_YEAR + getWheelValueIndex(yearCol, null);
    const monthIdx = getWheelValueIndex(monthCol, 12);
    const day = getWheelValueIndex(dateCol, wheelCurrentMaxDay) + 1;

    const mm = String(monthIdx + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    const value = `${year}-${mm}-${dd}`;

    const targetInput = document.getElementById(wheelTargetInputId);
    if (targetInput) {
        targetInput.value = value;
        targetInput.dispatchEvent(new Event('change', { bubbles: true }));
    }

    closeWheelPicker();
}

function updateMiniMoon(dateObj) {
    const miniMoonVisual = document.getElementById('miniMoonVisual');
    
    if (!miniMoonVisual) return;

    try {
        if (typeof Astronomy !== 'undefined') {
            const moonPhaseAngle = Astronomy.MoonPhase(dateObj);
            const phase = moonPhaseAngle / 360.0;
            
            const illumInfo = Astronomy.Illumination('Moon', dateObj);
            const fraction = illumInfo.phase_fraction;

            miniMoonVisual.innerHTML = ''; 

            if (fraction > 0.98) {
                miniMoonVisual.className = 'full-moon';
            } else if (fraction > 0.02) {
                miniMoonVisual.className = 'phase-moon';
                const isWaxing = phase <= 0.5;
                const scale = Math.abs(1 - (fraction * 2));
                const baseHemisphere = isWaxing ? 'right: 0;' : 'left: 0;';
                const maskColor = fraction < 0.5 ? '#000000' : '#fde047';
                
                miniMoonVisual.innerHTML = `
                    <div style="position: absolute; top: 0; ${baseHemisphere} width: 50%; height: 100%; background-color: #fde047;"></div>
                    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 50%; background-color: ${maskColor}; transform: scaleX(${scale});"></div>
                `;
            } else {
                miniMoonVisual.className = 'new-moon';
            }
        }
    } catch (e) {
        console.error("Astronomy Engine error:", e);
    }
}

let isAstroUpdating = false;

function updateSinhalaAstroDate() {
    if (isAstroUpdating) return;

    const mainDateInput = document.getElementById('inputDate');
    const sunDateInput = document.getElementById('sunDateInput'); 
    const tithiLabelElement = document.getElementById('sinhalaTithiLabel');
    const moonPhaseLabel = document.getElementById('moonPhaseLabel');
    const engMode = typeof isEnglish === "function" ? isEnglish() : false;

    const sunModal = document.getElementById("sunModal");
    const isModalOpen = sunModal && (sunModal.style.display === "flex" || sunModal.style.display === "block");

    if (!isModalOpen && mainDateInput && sunDateInput && mainDateInput.value !== sunDateInput.value) {
        try {
            isAstroUpdating = true; 
            sunDateInput.value = mainDateInput.value;
            
            if (typeof updateSunTimes === "function") {
                updateSunTimes(); 
            }
        } catch (error) {
            console.error("Error updating sun times:", error);
        } finally {
            isAstroUpdating = false; 
        }
    }

    if (tithiLabelElement && mainDateInput && mainDateInput.value) {
        const selectedDateObj = new Date(mainDateInput.value);
        
        let currentTithi = '';
        if (moonPhaseLabel && moonPhaseLabel.innerText && moonPhaseLabel.innerText !== '--') {
            currentTithi = moonPhaseLabel.innerText;
        } else if (typeof phaseName !== 'undefined' && phaseName !== '') {
            currentTithi = phaseName;
        }

        if (engMode) {
            const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };
            const formattedDate = selectedDateObj.toLocaleDateString('en-US', dateOptions);
            
            if (currentTithi && currentTithi !== '--') {
                tithiLabelElement.innerText = `${formattedDate}, ${currentTithi}`;
            } else {
                tithiLabelElement.innerText = formattedDate;
            }
        } else {
            
            const traditionalMonths = [
                "දුරුතු", "නවම්", "මැදින්", "බක්", "වෙසක්", "පොසොන්", 
                "ඇසළ", "නිකිණි", "බිනර", "වප්", "ඉල්", "උඳුවප්"
            ];

            const monthName = traditionalMonths[selectedDateObj.getMonth()];
            
            let tithiFormatted = '';
            if (currentTithi && currentTithi !== '--') {
                if (currentTithi.startsWith("Waxing") || currentTithi.startsWith("Waning")) {
                    tithiFormatted = ''; 
                } else {
                    tithiFormatted = `${currentTithi.replace("පෝය", "").trim()} ලත්`;
                }
            }

            const dayOfWeekIndex = selectedDateObj.getDay();
            const sinhalaDays = ["රවි දින", "සඳු දින", "කුජ දින", "බුධ දින", "ගුරු දින", "කිවි දින", "ශනි දින"];
            const sinhalaDayName = sinhalaDays[dayOfWeekIndex];

            if (tithiFormatted !== '') {
                tithiLabelElement.innerText = `${monthName} මස ${tithiFormatted} ${sinhalaDayName}`;
            } else {
                tithiLabelElement.innerText = `${monthName} මස ${sinhalaDayName}`;
            }
        }
    }
}

function openModal() {
    const modal = document.getElementById("infoModal");
    if (modal) {
        modal.style.display = "flex";
    }
}

function closeModal(modalId) {

    const idToClose = modalId ? modalId : "infoModal";
    const modal = document.getElementById(idToClose);
    if (modal) {
        modal.style.display = "none";
    }
}

window.addEventListener('click', function(e) {

    if (e.target.classList.contains('modal')) {
        e.target.style.display = "none";
    }

    let myDropdown = document.getElementById("myDropdown");
    if (myDropdown && !e.target.matches('.menu-dots')) {
        myDropdown.style.display = "none";
    }
});

function setupAutoDateUpdater() {
    const mainDateInput = document.getElementById('inputDate');
    if (!mainDateInput) return; 

    function getTodayDateString() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function checkAndUpdateDate() {
        const currentDateString = getTodayDateString();

        if (mainDateInput.value !== currentDateString) {

            mainDateInput.value = currentDateString;
            
            const changeEvent = new Event('change', { bubbles: true });
            mainDateInput.dispatchEvent(changeEvent);
        }
    }

    setInterval(checkAndUpdateDate, 3600000); 

    document.addEventListener("visibilitychange", function() {
        if (document.visibilityState === "visible") {
            checkAndUpdateDate();
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    setupAutoDateUpdater();

    const mainDateInput = document.getElementById('inputDate');
    if (mainDateInput) {
        // Date Picker එකෙහි මුල් අගය අද දිනයට (YYYY-MM-DD) සැකසීම
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const todayStr = `${year}-${month}-${day}`;

        // අද දිනය ඇතුළත් කර අදාළ ගණනය කිරීම් update කිරීම
        mainDateInput.value = todayStr;

        mainDateInput.addEventListener('change', function() {
            if (typeof updateSinhalaAstroDate === "function") {
                updateSinhalaAstroDate();
            }
        });

        if (typeof updateSinhalaAstroDate === "function") {
            updateSinhalaAstroDate();
        }
    }
});



if ('serviceWorker' in navigator) {

  window.addEventListener('load', async () => {

    try {

      const reg =
        await navigator.serviceWorker.register('./sw.js');

      console.log('Service Worker Registered');

      navigator.serviceWorker.addEventListener(
        'controllerchange',
        () => {
          window.location.reload();
        }
      );

    } catch (err) {

      console.error('SW Error:', err);

    }

  });

}