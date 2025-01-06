let currentLevel = 'easy';

function showLeaderboard(level) {
    // Update active button
    document.querySelectorAll('.level-buttons .btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.btn[onclick="showLeaderboard('${level}')"]`).classList.add('active');
    
    currentLevel = level;
    fetchLeaderboard(level);
}

function fetchLeaderboard(level) {
    fetch(`get_leaderboard.php?level=${level}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                updateLeaderboardTable(data.data);
            } else {
                console.error('Error fetching leaderboard:', data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function updateLeaderboardTable(data) {
    const tbody = document.getElementById('leaderboardBody');
    tbody.innerHTML = '';

    data.forEach((entry, index) => {
        const row = document.createElement('tr');
        
        // Add rank class for top 3
        const rankClass = index < 3 ? `rank-${index + 1}` : '';
        
        row.innerHTML = `
            <td class="${rankClass}">${index + 1}</td>
            <td>${entry.name}</td>
            <td>${entry.score}</td>
            <td>${entry.time_taken}</td>
            <td>${entry.completed_at}</td>
        `;
        
        tbody.appendChild(row);
    });

    // If no data, show message
    if (data.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td colspan="5" class="text-center">No records yet for ${currentLevel} level</td>
        `;
        tbody.appendChild(row);
    }
}

// Load initial leaderboard
document.addEventListener('DOMContentLoaded', () => {
    showLeaderboard('easy');
});
