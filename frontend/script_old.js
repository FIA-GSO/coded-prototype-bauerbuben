const TAGE = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];
let currentRole = 'azubi';
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let selectedStartDate = null;
let selectedEndDate = null;
let isSelectingStart = true;
let currentWeekStart = new Date();
currentWeekStart.setDate(currentWeekStart.getDate() - currentWeekStart.getDay() + 1);

const monthNames = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
const dayNames = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

// Initialisierung
function initApp() {
    console.log('Initialisiere App...');
    
    // Role Selector mit Bootstrap-Unterstützung
    document.querySelectorAll('.role-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            console.log('Rolle gewählt:', this.dataset.role);
            document.querySelectorAll('.role-btn').forEach(b => {
                b.classList.remove('active');
                b.classList.add('btn-outline-success');
                b.classList.remove('btn-success');
            });
            this.classList.add('active');
            this.classList.remove('btn-outline-success');
            this.classList.add('btn-success');
        });
    });
    
    // Initialer Zustand für den ersten Button
    const firstBtn = document.querySelector('.role-btn.active');
    if (firstBtn) {
        firstBtn.classList.remove('btn-outline-success');
        firstBtn.classList.add('btn-success');
    }
    
    // Login Form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Login-Formular abgesendet');
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const selectedRoleBtn = document.querySelector('.role-btn.active');
            
            console.log('Username:', username, 'Password:', password, 'Role Button:', selectedRoleBtn);
            
            if (username && password && selectedRoleBtn) {
                const selectedRole = selectedRoleBtn.dataset.role;
                currentRole = selectedRole;
                
                console.log('Login erfolgreich, Rolle:', currentRole);
                
                document.getElementById('login-container').style.display = 'none';
                document.getElementById('app-container').style.display = 'block';
                
                if (currentRole === 'ausbilder') {
                    document.getElementById('role-indicator').innerHTML = '<div class="alert alert-info text-center fw-bold mb-3">Ausbilder-Modus aktiv</div>';
                }
                
                initWeekNavigation();
                initCalendar();
                updateWeekDisplay();
                init();
            } else {
                console.error('Login fehlgeschlagen - fehlende Daten');
            }
        });
    } else {
        console.error('Login-Formular nicht gefunden!');
    }
}

document.addEventListener('DOMContentLoaded', initApp);

function initWeekNavigation() {
    document.getElementById('prev-week').addEventListener('click', () => {
        currentWeekStart.setDate(currentWeekStart.getDate() - 7);
        updateWeekDisplay();
        resetEntries();
    });
    
    document.getElementById('next-week').addEventListener('click', () => {
        currentWeekStart.setDate(currentWeekStart.getDate() + 7);
        updateWeekDisplay();
        resetEntries();
    });
}

function updateWeekDisplay() {
    const weekEnd = new Date(currentWeekStart);
    weekEnd.setDate(weekEnd.getDate() + 4);
    document.getElementById('start-datum').value = formatDate(currentWeekStart);
    document.getElementById('end-datum').value = formatDate(weekEnd);
}

function resetEntries() {
    const container = document.getElementById('tage-container');
    container.innerHTML = '';
    TAGE.forEach(tag => container.appendChild(createDaySection(tag)));
}

function initCalendar() {
    const calendarToggle = document.getElementById('calendar-toggle');
    const calendarPopup = document.getElementById('calendar-popup');
    
    calendarToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        calendarPopup.classList.toggle('active');
        if (calendarPopup.classList.contains('active')) renderCalendar();
    });
    
    document.getElementById('calendar-close').addEventListener('click', () => calendarPopup.classList.remove('active'));
    
    document.getElementById('prev-month').addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) { currentMonth = 11; currentYear--; }
        renderCalendar();
    });
    
    document.getElementById('next-month').addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) { currentMonth = 0; currentYear++; }
        renderCalendar();
    });
    
    document.addEventListener('click', (e) => {
        if (!calendarPopup.contains(e.target) && e.target !== calendarToggle) {
            calendarPopup.classList.remove('active');
        }
    });
}

function renderCalendar() {
    const monthYear = document.getElementById('month-year');
    const calendarGrid = document.getElementById('calendar-grid');
    
    monthYear.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    calendarGrid.innerHTML = '';
    
    dayNames.forEach(day => {
        const header = document.createElement('div');
        header.className = 'calendar-day-header';
        header.textContent = day;
        calendarGrid.appendChild(header);
    });
    
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();
    
    for (let i = firstDay - 1; i >= 0; i--) {
        const day = document.createElement('div');
        day.className = 'calendar-day other-month';
        day.textContent = prevMonthDays - i;
        calendarGrid.appendChild(day);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement('div');
        day.className = 'calendar-day';
        day.textContent = i;
        const currentDate = new Date(currentYear, currentMonth, i);
        
        if (selectedStartDate && isSameDay(currentDate, selectedStartDate)) day.classList.add('selected');
        if (selectedEndDate && isSameDay(currentDate, selectedEndDate)) day.classList.add('selected');
        if (selectedStartDate && selectedEndDate && currentDate > selectedStartDate && currentDate < selectedEndDate) {
            day.classList.add('in-range');
        }
        
        day.addEventListener('click', () => selectDate(currentDate));
        calendarGrid.appendChild(day);
    }
    
    const totalCells = calendarGrid.children.length - 7;
    const remainingCells = 42 - totalCells - 7;
    for (let i = 1; i <= remainingCells; i++) {
        const day = document.createElement('div');
        day.className = 'calendar-day other-month';
        day.textContent = i;
        calendarGrid.appendChild(day);
    }
}

function selectDate(date) {
    if (isSelectingStart || !selectedStartDate) {
        selectedStartDate = date;
        selectedEndDate = null;
        isSelectingStart = false;
    } else {
        if (date < selectedStartDate) {
            selectedEndDate = selectedStartDate;
            selectedStartDate = date;
        } else {
            selectedEndDate = date;
        }
        
        const weekStart = new Date(selectedStartDate);
        const day = weekStart.getDay();
        const diff = day === 0 ? -6 : 1 - day;
        weekStart.setDate(weekStart.getDate() + diff);
        
        currentWeekStart = weekStart;
        updateWeekDisplay();
        resetEntries();
        isSelectingStart = true;
        document.getElementById('calendar-popup').classList.remove('active');
    }
    renderCalendar();
}

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}.${month}`;
}

function isSameDay(date1, date2) {
    return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
}

function init() {
    const container = document.getElementById('tage-container');
    container.innerHTML = '';
    TAGE.forEach(tag => container.appendChild(createDaySection(tag)));
}

function createDaySection(tag) {
    const section = document.createElement('div');
    section.className = 'col-12 col-md-6 col-lg-4 col-xl';
    section.dataset.day = tag.toLowerCase();
    section.innerHTML = `
        <div class="card h-100 day-section">
            <div class="card-header tag-header fw-bold">${tag}</div>
            <div class="card-body eintraege-container d-flex flex-column gap-2 overflow-auto">${createEntryHTML()}</div>
            <div class="card-footer">
                <button class="btn btn-success w-100 add-entry-btn">+ Neuer Eintrag</button>
            </div>
        </div>
    `;
    
    section.querySelector('.add-entry-btn').addEventListener('click', () => addEntry(section));
    section.querySelector('.tag-header').addEventListener('click', () => {
        if (window.innerWidth <= 768) section.querySelector('.day-section').classList.toggle('expanded');
    });
    section.querySelector('article').addEventListener('click', (e) => {
        if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'TEXTAREA') selectEntry(e.currentTarget);
    });
    section.querySelector('.delete-entry-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        deleteEntry(e.target.closest('article'));
    });
    
    const kommentarBtn = section.querySelector('.kommentar-btn');
    if (kommentarBtn) {
        kommentarBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            addKommentar(e.target.closest('article'));
        });
    }
    
    return section;
}

function createEntryHTML() {
    const kommentarSection = currentRole === 'ausbilder' ? `
        <div class="kommentar-section mt-2 pt-2 border-top">
            <div class="kommentar-header small fw-bold text-muted">Ausbilder-Kommentar:</div>
            <div class="kommentar-text small fst-italic bg-warning bg-opacity-25 p-2 rounded mb-2" style="display: none;"></div>
            <textarea class="form-control form-control-sm kommentar-input" placeholder="Kommentar hinzufügen..." rows="2"></textarea>
            <button class="btn btn-primary btn-sm w-100 mt-2 kommentar-btn">Kommentar speichern</button>
        </div>
    ` : `
        <div class="kommentar-section mt-2 pt-2 border-top" style="display: none;">
            <div class="kommentar-header small fw-bold text-muted">Ausbilder-Kommentar:</div>
            <div class="kommentar-text small fst-italic bg-warning bg-opacity-25 p-2 rounded"></div>
        </div>
    `;
    
    return `<article class="card mb-2 entry-card">
        <div class="card-body p-2">
            <textarea class="form-control form-control-sm border-0" placeholder="Hier eintragen..." rows="3"></textarea>
            ${kommentarSection}
            <button class="btn btn-danger btn-sm w-100 mt-2 delete-entry-btn">Löschen</button>
        </div>
    </article>`;
}

function addEntry(section) {
    const container = section.querySelector('.eintraege-container');
    const article = document.createElement('article');
    article.className = 'card mb-2 entry-card';
    
    const kommentarSection = currentRole === 'ausbilder' ? `
        <div class="kommentar-section mt-2 pt-2 border-top">
            <div class="kommentar-header small fw-bold text-muted">Ausbilder-Kommentar:</div>
            <div class="kommentar-text small fst-italic bg-warning bg-opacity-25 p-2 rounded mb-2" style="display: none;"></div>
            <textarea class="form-control form-control-sm kommentar-input" placeholder="Kommentar hinzufügen..." rows="2"></textarea>
            <button class="btn btn-primary btn-sm w-100 mt-2 kommentar-btn">Kommentar speichern</button>
        </div>
    ` : `
        <div class="kommentar-section mt-2 pt-2 border-top" style="display: none;">
            <div class="kommentar-header small fw-bold text-muted">Ausbilder-Kommentar:</div>
            <div class="kommentar-text small fst-italic bg-warning bg-opacity-25 p-2 rounded"></div>
        </div>
    `;
    
    article.innerHTML = `
        <div class="card-body p-2">
            <textarea class="form-control form-control-sm border-0" placeholder="Hier eintragen..." rows="3"></textarea>
            ${kommentarSection}
            <button class="btn btn-danger btn-sm w-100 mt-2 delete-entry-btn">Löschen</button>
        </div>
    `;
    
    article.addEventListener('click', (e) => {
        if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'TEXTAREA') selectEntry(article);
    });
    article.querySelector('.delete-entry-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        deleteEntry(article);
    });
    
    const kommentarBtn = article.querySelector('.kommentar-btn');
    if (kommentarBtn) {
        kommentarBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            addKommentar(article);
        });
    }
    
    container.appendChild(article);
}

function selectEntry(article) {
    document.querySelectorAll('article').forEach(a => a.classList.remove('selected', 'border-primary'));
    article.classList.add('selected', 'border-primary');
    
    if (currentRole === 'azubi') {
        const kommentarSection = article.querySelector('.kommentar-section');
        const kommentarText = article.querySelector('.kommentar-text');
        if (kommentarText && kommentarText.textContent.trim()) {
            kommentarSection.style.display = 'block';
        }
    }
}

function deleteEntry(article) {
    const container = article.closest('.eintraege-container');
    if (container.children.length <= 1) {
        alert('Mindestens ein Eintrag muss vorhanden bleiben.');
        return;
    }
    article.remove();
}

function addKommentar(article) {
    const kommentarInput = article.querySelector('.kommentar-input');
    const kommentarText = article.querySelector('.kommentar-text');
    
    if (kommentarInput && kommentarInput.value.trim()) {
        kommentarText.textContent = kommentarInput.value;
        kommentarText.style.display = 'block';
        kommentarInput.value = '';
        kommentarInput.style.display = 'none';
        article.querySelector('.kommentar-btn').textContent = 'Kommentar bearbeiten';
        article.querySelector('.kommentar-btn').onclick = (e) => {
            e.stopPropagation();
            editKommentar(article);
        };
    }
}

function editKommentar(article) {
    const kommentarInput = article.querySelector('.kommentar-input');
    const kommentarText = article.querySelector('.kommentar-text');
    
    kommentarInput.value = kommentarText.textContent;
    kommentarInput.style.display = 'block';
    article.querySelector('.kommentar-btn').textContent = 'Kommentar speichern';
    article.querySelector('.kommentar-btn').onclick = (e) => {
        e.stopPropagation();
        addKommentar(article);
    };
}
