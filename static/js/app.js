// Initialize default active button values
let previousInterval = "Max"; 
let previousPeriod = "Day";

// function to build both charts
function buildCharts(blnPeriod, blnInterval) {
  
    d3.json("https://cmagor1819.github.io/team-7-project3/static/js/cleaned_data.json").then((data) => {

    // Get the days
    const timeOpen = data["timeOpen"];
    let days = []

    // Get the close price
    const close = data["close"]

    // Alternatively, use Object.entries for more control
    Object.entries(timeOpen).forEach(([key,value]) => {
    days.push(value);
    });
    // console.log('Days')
    // console.log(days)

    let closeValues = [];
    Object.values(close).forEach((value) => {
        closeValues.push(value)});
        
        // console.log('close');
        // console.log(closeValues);

    // Filter data based on blnDate
    let filteredIndices = [];
    if (blnPeriod === "Year") {
      filteredIndices = days
        .map((day, index) => (new Date(day).getMonth() === 0 && new Date(day).getDate() === 1 ? index : -1))
        .filter((index) => index !== -1);
    } else if (blnPeriod === "Month") {
      filteredIndices = days
        .map((day, index) => (new Date(day).getDate() === 1 ? index : -1))
        .filter((index) => index !== -1);
    } else if (blnPeriod === "Day") {
      filteredIndices = days.map((_, index) => index);
    }

    console.log("Filtered Indices:", filteredIndices);
    console.log("Filtered Days (before period filter):", filteredIndices.map((index) => days[index]));

    // Further filter by blnPeriod
    const currentTime = new Date().getTime();
    const oneMonthAgo = currentTime - 30 * 24 * 60 * 60 * 1000; // Approx. 1 month
    const sixMonthsAgo = currentTime - 6 * 30 * 24 * 60 * 60 * 1000; // Approx. 6 months
    const oneYearAgo = currentTime - 12 * 30 * 24 * 60 * 60 * 1000; // Approx. 1 year
    const fiveYearsAgo = currentTime - 5 * 365 * 24 * 60 * 60 * 1000; // Approx. 5 years
    // console.log("Current Time:", currentTime);
    // console.log("One Month Ago:", oneMonthAgo);
    // console.log("Six Months Ago:", sixMonthsAgo);
    // console.log("One Year Ago:", oneYearAgo);
    // console.log("Five Years Ago:", fiveYearsAgo);

    let periodFilter = [];

    // Data filtering based on selection
    if (blnInterval === "1M") {
      console.log("Applying 1 Month filter...");
      periodFilter = filteredIndices.filter((index) => {
        const timestamp = Number(days[index]);
        console.log(`Comparing Timestamp: ${timestamp} >= ${oneMonthAgo}`);
        return timestamp >= oneMonthAgo;
      });
    } else if (blnInterval === "6M") {
      console.log("Applying 6 Months filter...");
      periodFilter = filteredIndices.filter((index) => {
        const timestamp = Number(days[index]);
        console.log(`Comparing Timestamp: ${timestamp} >= ${sixMonthsAgo}`);
        return timestamp >= sixMonthsAgo;
      });
    } else if (blnInterval === "YTD") {
      console.log("Applying YTD (Year to Date) filter...");
      const startOfYear = new Date(new Date().getFullYear(), 0, 1).getTime();
      periodFilter = filteredIndices.filter((index) => {
        const timestamp = Number(days[index]);
        console.log(`Comparing Timestamp: ${timestamp} >= ${startOfYear}`);
        return timestamp >= startOfYear;
      });
    } else if (blnInterval === "1Y") {
      console.log("Applying 1 Year filter...");
      periodFilter = filteredIndices.filter((index) => {
        const timestamp = Number(days[index]);
        console.log(`Comparing Timestamp: ${timestamp} >= ${oneYearAgo}`);
        return timestamp >= oneYearAgo;
      });
    } else if (blnInterval === "5Y") {
      console.log("Applying 5 Year filter...");
      periodFilter = filteredIndices.filter((index) => {
        const timestamp = Number(days[index]);
        console.log(`Comparing Timestamp: ${timestamp} >= ${fiveYearsAgo}`);
        return timestamp >= fiveYearsAgo;
      });
    } else if (blnInterval === "Max") {
      console.log("Applying 'Max' filter...");
      periodFilter = filteredIndices; // No filtering if "Max"
    } else {
      console.log("Applying default filter...");
      periodFilter = filteredIndices; // Default: no filtering
    }

      // Filter the days and closeValues using the final indices
    const filteredDays = periodFilter.map((index) => days[index]);
    const filteredCloseValues = periodFilter.map((index) => closeValues[index]);

    const convertedDays = filteredDays.map((timestamp) => {
      return new Date(timestamp).toISOString().split("T")[0]; // Format: YYYY-MM-DD
    });

      // console.log("Period Filter Indices:", periodFilter);
      // console.log("Filtered Days (after period filter):", periodFilter.map((index) => days[index]));
      // console.log("Filtered Close Values:", periodFilter.map((index) => closeValues[index]));
      // console.log(convertedDays)

    // Reverse the filteredCloseValues array
    const reversedCloseValues = filteredCloseValues.slice().reverse(); // .slice() creates a copy to avoid mutating the original

    // Calculate percentage change from the reversed data
    let percentChange = reversedCloseValues.map((value, index) => {
      if (index === reversedCloseValues.length - 1) return null; // Skip the last value
      return (
        ((reversedCloseValues[index+1] - reversedCloseValues[index]) / reversedCloseValues[index]) * 100
      ); // Current - Next / Next
    });

    // Calculate dollar change from the reversed data
    let dollarChange = reversedCloseValues.map((value, index) => {
      if (index === reversedCloseValues.length - 1) return null; // Skip the last value
      return reversedCloseValues[index + 1] - reversedCloseValues[index]; // Next - Current
    });
      // console.log("test")
      // console.log("Percent Change ", percentChange)
      // console.log("dollarchange ",dollarChange)

// Build a Line Chart
let trace1 = {
  x: convertedDays,
  y: filteredCloseValues,
  text: filteredCloseValues,
  mode: "lines", 
  line: {
    color: "#17BECF",
    width: 2 
  }
};

// Set the data for the chart
let data1 = [trace1];

// Layout settings for the chart
let layout1 = {
  title: "Bitcoin Price Over Time",
  xaxis: { title: "Date" },
  yaxis: { title: "Price (USD)" },
};

// Create the plot with the provided data and layout
Plotly.newPlot("plot", data1, layout1);


// Calculate the min and max of the dollar change
let dollarChangeRange = [
  Math.min(...dollarChange.filter((val) => val !== null)),
  Math.max(...dollarChange.filter((val) => val !== null)),
];

let percentChangeRange = [
  Math.min(...percentChange.filter((val) => val !== null)),
  Math.max(...percentChange.filter((val) => val !== null)),
];

// console.log("Dollar Change Range:", dollarChangeRange);
// console.log("Percent Change Range:", percentChangeRange);

// Bin the data for heatmap
const binsX = 25; // Number of bins for percentage change
const binsY = 25; // Number of bins for dollar change
// console.log("binsX:", binsX);

const percentRange = [
  Math.min(...percentChange.filter((val) => val !== null)),
  Math.max(...percentChange.filter((val) => val !== null)),
];
const dollarRange = [
  Math.min(...dollarChange.filter((val) => val !== null)),
  Math.max(...dollarChange.filter((val) => val !== null)),
];

const binWidthX = (percentRange[1] - percentRange[0]) / binsX;
const binWidthY = (dollarRange[1] - dollarRange[0]) / binsY;

let z = Array(binsY)
  .fill(0)
  .map(() => Array(binsX).fill(0));

percentChange.slice(1).forEach((percent, index) => {
  if (percent === null || dollarChange[index + 1] === null) return;

  const xBin = Math.min(
    Math.floor((percent - percentRange[0]) / binWidthX),
    binsX - 1
  );
  const yBin = Math.min(
    Math.floor((dollarChange[index + 1] - dollarRange[0]) / binWidthY),
    binsY - 1
  );

  z[yBin][xBin] += 1; // Increment the count in the appropriate bin
});

// Heatmap data and layout
const maxZ = Math.max(...z.flat());

const heatmapTrace = {
  z: z,
  x: Array.from({ length: binsX }, (_, i) => percentRange[0] + i * binWidthX),
  y: Array.from({ length: binsY }, (_, i) => dollarRange[0] + i * binWidthY),
  type: "heatmap",
  hoverongaps: false,
  colorscale: [
    [0, "gray"],          // Custom color for 0
    [0.0001 / maxZ, "lightblue"], // Just above 0
    [0.5, "blue"],
    [1, "red"]           // Maximum value (normalized to 1)
  ],
  zmin: 0,               // Start the color scale at 0
  zmax: maxZ,            // End the color scale at the max value
};

    let data2 = [heatmapTrace];

    const layout2 = {
      title: "Price Change Heatmap",
      xaxis: { title: "Percentage Change (%)" },
      yaxis: { title: "Dollar Change ($)" },
      margin: { t: 50, l: 100, r: 50, b: 50 }, // Adjust margins for better spacing
    };

Plotly.newPlot("heat", data2, layout2);

});
}

// Function to run on page load

function init() {
  d3.json("https://cmagor1819.github.io/team-7-project3/static/js/cleaned_data.json").then((data) => {

    // Wait until the DOM is fully loaded

    // Build charts and metadata panel with the initial sample
    buildCharts(previousPeriod, previousInterval);

    // Set active buttons
    setActiveButtons(previousPeriod, previousInterval);

    // Trigger the optionChanged event to set the correct chart
    optionChanged();
  });
}

function setActiveButtons(statusDate, statusPeriod) {
  const dateButtons = document.querySelectorAll(".time-btn[data-period]"); // Period buttons (Day, Month, Year)
  const periodButtons = document.querySelectorAll(".time-btn[data-interval]"); // Interval buttons (1M, 6M, etc.)

  // Set the active class for period buttons based on statusDate
  dateButtons.forEach(button => {
    if (button.getAttribute("data-period") === statusDate) {
      button.classList.add("active");
    }
  });

  // Set the active class for interval buttons based on statusPeriod
  periodButtons.forEach(button => {
    if (button.getAttribute("data-interval") === statusPeriod) {
      button.classList.add("active");
    }
  });
}

// Option changed function for handling button clicks
function optionChanged() {
  const buttons = document.querySelectorAll(".time-btn");
  const chartContainer = document.getElementById("chart-container");

  // Ensure chartContainer exists
  if (!chartContainer) {
    console.error("Chart container not found.");
    return;
  }  

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      // Get the button's group (period or interval) by checking its classes
      const isPeriodButton = button.classList.contains("period-btn");
      const isIntervalButton = button.classList.contains("interval-btn");

      // Remove the 'active' class from all buttons in the same group
      if (isPeriodButton) {
        document.querySelectorAll(".period-btn").forEach(btn => btn.classList.remove("active"));
      } else if (isIntervalButton) {
        document.querySelectorAll(".interval-btn").forEach(btn => btn.classList.remove("active"));
      }

      // Add the active class to the clicked button
      button.classList.add("active");

      // Get the data attributes for interval and period
      const interval = button.getAttribute("data-interval");
      const period = button.getAttribute("data-period");

      // Use the previously stored values when calling buildCharts
      const newInterval = interval || previousInterval; // Use previousInterval if interval is not set
      const newPeriod = period || previousPeriod; // Use previousPeriod if period is not set

      // Update previous values
      if (interval) previousInterval = interval;
      if (period) previousPeriod = period;

      // Determine if the button is related to interval or period based on the attributes
      if (interval) {
        // It's an interval button
        buildCharts(previousPeriod, newInterval);  // Call buildCharts with updated interval and previous period
      } else if (period) {
        // It's a period button
        buildCharts(newPeriod, previousInterval);  // Call buildCharts with previous interval and updated period
      } else {
        // Default case if no interval or period attribute is present
        buildCharts(previousPeriod, previousInterval);  // Call buildCharts with previous values
      }
    });
  });
}

// Initialize the dashboard
init();
