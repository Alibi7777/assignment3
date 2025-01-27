document.addEventListener("DOMContentLoaded", function () {
  // Create a new Date object
  const now = new Date();

  // Get the date parts (day, month, year)
  const day = now.getDate();
  const month = now.getMonth() + 1; // Months are 0-based, so add 1
  const year = now.getFullYear();

  // Get the time parts (hours, minutes, seconds)
  let hours = now.getHours();
  let minutes = now.getMinutes();

  // Add a leading zero to minutes if they are less than 10
  // minutes = minutes < 10 ? "0" + minutes : minutes;
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  // Combine the date and time into a single string
  const date = `Date: ${month}/${day}/${year}`;
  const time = `Time: ${hours}:${minutes}`;

  // Display the date and time in the 'date-time' element
  document.getElementById("date").textContent = date;
  document.getElementById("time").textContent = time;
});
