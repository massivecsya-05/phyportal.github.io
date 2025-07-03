document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginPage = document.getElementById('login-page');
    const dashboardPage = document.getElementById('dashboard-page');
    const loginForm = document.getElementById('login-form');
    const forgotPasswordLink = document.getElementById('forgot-password');
    const forgotPasswordModal = document.getElementById('forgot-password-modal');
    const closeModal = document.querySelector('.close-modal');
    const resetPasswordForm = document.getElementById('reset-password-form');
    const logoutBtn = document.getElementById('logout-btn');
    const menuItems = document.querySelectorAll('.main-menu li');
    const contentSections = document.querySelectorAll('.content-section');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Sample student data
    const studentData = {
        name: "Kali Csya",
        program: "BSc Computer Science",
        semester: "Year 3, Semester 2",
        academicYear: "2024/2025",
        registrationNumber: "BSC/2024/123"
    };
    
    // Login functionality
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Simple validation (in a real app, this would check against a database)
        if (username && password) {
            // Update student info in dashboard
            document.getElementById('student-name').textContent = studentData.name;
            document.getElementById('sidebar-student-name').textContent = studentData.name;
            document.getElementById('sidebar-program').textContent = studentData.program;
            document.getElementById('sidebar-semester').textContent = studentData.semester;
            
            // Show dashboard
            loginPage.classList.add('hidden');
            dashboardPage.classList.remove('hidden');
            
            // Reset form
            loginForm.reset();
        } else {
            alert('Please enter both username and password');
        }
    });
    
    // Forgot password functionality
    forgotPasswordLink.addEventListener('click', function(e) {
        e.preventDefault();
        forgotPasswordModal.classList.remove('hidden');
    });
    
    closeModal.addEventListener('click', function() {
        forgotPasswordModal.classList.add('hidden');
    });
    
    resetPasswordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('reset-username').value;
        const email = document.getElementById('reset-email').value;
        
        // In a real app, this would send a reset link to the email
        alert(`Password reset link has been sent to ${email}`);
        forgotPasswordModal.classList.add('hidden');
        resetPasswordForm.reset();
    });
    
    // Logout functionality
    logoutBtn.addEventListener('click', function() {
        dashboardPage.classList.add('hidden');
        loginPage.classList.remove('hidden');
    });
    
    // Menu navigation
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all menu items
            menuItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Get the section to show
            const sectionId = this.getAttribute('data-section') + '-section';
            
            // Hide all sections
            contentSections.forEach(section => {
                section.classList.add('hidden');
            });
            
            // Show the selected section
            document.getElementById(sectionId).classList.remove('hidden');
        });
    });
    
    // Tab functionality
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the tab to show
            const tabId = this.getAttribute('data-tab') + '-tab';
            
            // Hide all tab contents
            tabContents.forEach(content => {
                content.classList.remove('active');
                content.classList.add('hidden');
            });
            
            // Show the selected tab content
            document.getElementById(tabId).classList.remove('hidden');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Sample data for tables (in a real app, this would come from an API)
    const transcriptData = [
        { code: "CS101", title: "Introduction to Programming", credits: 3, grade: "A", semester: "Year 1, Sem 1" },
        { code: "CS102", title: "Data Structures", credits: 3, grade: "B+", semester: "Year 1, Sem 2" },
        { code: "CS201", title: "Algorithms", credits: 3, grade: "A-", semester: "Year 2, Sem 1" },
        { code: "CS202", title: "Database Systems", credits: 3, grade: "A", semester: "Year 2, Sem 2" },
        { code: "CS301", title: "Operating Systems", credits: 3, grade: "B+", semester: "Year 3, Sem 1" }
    ];
    
    const gradesData = [
        { code: "CS302", title: "Computer Networks", credits: 3, midTerm: 75, finalExam: 82, total: 80 },
        { code: "CS303", title: "Software Engineering", credits: 3, midTerm: 68, finalExam: 74, total: 72 },
        { code: "CS304", title: "Artificial Intelligence", credits: 3, midTerm: 80, finalExam: 85, total: 83 },
        { code: "CS305", title: "Web Development", credits: 3, midTerm: 90, finalExam: 88, total: 89 }
    ];
    
    const coursesData = [
        { code: "CS302", title: "Computer Networks", credits: 3, lecturer: "Dr. Mwale", schedule: "Mon 10-12, Wed 2-4" },
        { code: "CS303", title: "Software Engineering", credits: 3, lecturer: "Prof. Mlatho", schedule: "Tue 8-10, Thu 10-12" },
        { code: "CS304", title: "Artificial Intelligence", credits: 3, lecturer: "Dr. Kashe", schedule: "Mon 2-4, Fri 8-10" },
        { code: "CS305", title: "Web Development", credits: 3, lecturer: "Dr. Mwale", schedule: "Wed 8-10, Fri 2-4" }
    ];
    
    const paymentHistory = [
        { date: "15 Sep 2023", reference: "PYM-2023-09-001", amount: "250,000.00", method: "Bank Transfer", status: "Completed" },
        { date: "15 Mar 2023", reference: "PYM-2023-03-001", amount: "250,000.00", method: "MPamba", status: "Completed" },
        { date: "15 Sep 2022", reference: "PYM-2022-09-001", amount: "250,000.00", method: "Bank Transfer", status: "Completed" }
    ];
    
    // Function to populate a table with data
    function populateTable(tableId, data, columns) {
        const tableBody = document.querySelector(`#${tableId} tbody`);
        tableBody.innerHTML = '';
        
        data.forEach(item => {
            const row = document.createElement('tr');
            
            columns.forEach(col => {
                const cell = document.createElement('td');
                cell.textContent = item[col];
                row.appendChild(cell);
            });
            
            tableBody.appendChild(row);
        });
    }
    
    // When academic records tab is clicked, populate the tables
    document.querySelector('[data-section="academic-records"]').addEventListener('click', function() {
        populateTable('transcript-tab', transcriptData, ['code', 'title', 'credits', 'grade', 'semester']);
        populateTable('grades-tab', gradesData, ['code', 'title', 'credits', 'midTerm', 'finalExam', 'total']);
        populateTable('courses-tab', coursesData, ['code', 'title', 'credits', 'lecturer', 'schedule']);
    });
    
    // When fee payment tab is clicked, populate the payment history
    document.querySelector('[data-section="fee-payment"]').addEventListener('click', function() {
        populateTable('payment-history', paymentHistory, ['date', 'reference', 'amount', 'method', 'status']);
    });
});