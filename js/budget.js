document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault();

        const budget = parseFloat(document.getElementById('budget').value);
        const dateOfHoliday = new Date(document.getElementById('date_of_holiday').value);

        if (isNaN(budget) || budget <= 0) {
            alert('Please enter a valid budget.');
            return;
        }

        if (!dateOfHoliday || dateOfHoliday < new Date()) {
            alert('Please enter a valid future holiday date.');
            return;
        }

        const today = new Date();
        const timeDifference = dateOfHoliday - today;
        const daysUntilHoliday = timeDifference / (1000 * 60 * 60 * 24);
        const weeksUntilHoliday = Math.ceil(daysUntilHoliday / 7);

        if (weeksUntilHoliday <= 0) {
            alert('Your holiday date must be at least a week from today.');
            return;
        }

        const weeklyBudget = (budget / weeksUntilHoliday).toFixed(2);

        alert(`Your total budget of $${budget} gives you $${weeklyBudget} per week for ${weeksUntilHoliday} weeks.`);
    });
});
