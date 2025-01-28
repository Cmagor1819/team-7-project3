# Bitcoin
## An Analysis of the First Cryptocurrency

## Team Members:
- Michele Aguilar
- Riley Laughlin
- Cameron Magor
- Mayra Martinez

# Project Overview and Questions
The purpose of this project is to provide a comprehensive understanding of Bitcoin, its historical price movements, and its potential as an investment. By examining Bitcoin’s origin, technological foundation, and market trends, this project aims to equip readers with the knowledge of bitcoin and what bitcoin is. The project seeks to explore the risks and benefits associated with Bitcoin.


## Tech Stack and Data / Manipulation
We used a number of different libraries/tools/resources for this project, including:

Python
Jupyter Notebook
Splinter
HTML
CSS
JavaScript
Plotly
Pandas
MatlotLib
D3
PIL

### Website Data:

Salary Data comes from Coin Market Cap https://coinmarketcap.com/currencies/bitcoin/historical-data/

ETF Data comes from Fidelity https://www.fidelity.com/

Here are some basic illustrations of the data flow from acquision and cleaning to storing.






As a group, we developed a variety of interactive graphs. Below is an explanation of how these graphs were created for this project.

High-low scatter plot that allows you to view the changes of bitcoin that occur in a day, 1 week, 1 month, 3 months, 1 year, and all. This tabs just reveal the price of bitcoin from the previous day, week, month, 3 months, year, and all of the data  

Creating the High-Low Scatter Plot
Part 1:We begin by examining the column data types to understand the data we are working with. This step helps us identify the correct column names for referencing and facilitates precise data manipulation.
Part 2:Next, we generate the high-low scatter plot using Matplotlib. Each line in the chart is defined with its corresponding values and colors. We add essential elements such as a title, x-axis and y-axis labels, x-axis ticks, and a legend, providing users with clear insights into the chart's content.

Creating the Candlestick Chart
Part 1:The process starts by constructing the candlestick base, where each line is assigned appropriate values and colors to represent the data accurately.
Part 2:We then enhance the chart’s appearance and interactivity by updating its layout. This includes adding a graph title, customizing the x-axis and y-axis labels, applying a dark mode template, and enabling a range slider for easier navigation.
To further improve usability, we configure the x-axis with interactive buttons that allow users to select specific timeframes—past day, week, month, 3 months, 1 year, or the entire dataset. The range slider ensures that it remains visible, and the type = data setting displays the x-axis as dates.

Generating the Interactive Line Chart
Part 1:We begin by creating the line chart with fig2 = go.Figure(). Traces are added for each price line, with assigned values and colors.
Part 2:The layout is then updated to include a title, x-axis and y-axis titles, a legend title, and the dark mode template for improved aesthetics. Finally, the chart is displayed using fig2.show().

The dashboard features three key charts:
Bitcoin Price Over Time – This chart tracks Bitcoin’s price, with the option to adjust the time unit to days, months, or years. Switching from days to months or years smooths out volatility by reducing the number of data points. This flexibility is crucial, as investors have different time horizons for liquidating their assets.

Dollar Change vs. Percentage Change Heatmap – This dynamic heatmap adjusts based on the selected time period and unit. Given Bitcoin’s long journey from just above $0 to over $100,000, the magnitude of dollar and percentage changes varies significantly depending on the timeframe.

Google Trends Bitcoin Search Interest – This data, sourced directly from Google Trends, assigns a search interest score to each state/region in the U.S. based on Bitcoin-related search activity. Notably, Nevada has the highest score in the country.

When using CoinMarketCap.com to obtain Bitcoin historical data for a project, ethical considerations are paramount to ensure data accuracy, transparency, and compliance with intellectual property rights. Efforts should include proper attribution to CoinMarketCap as the source of the data, adhering to their terms of service, and avoiding unauthorized data scraping. 

Additionally, the analysis must respect user privacy by refraining from collecting personal or identifying information associated with the data. It is essential to present findings objectively, avoiding manipulation or misrepresentation of the data to ensure trustworthiness and credibility. 

Lastly, sharing the insights derived from the data should prioritize educational and non-exploitative purposes, aligning with ethical research and reporting practices

Conclusion 
Bitcoin has evolved from an experimental digital currency to a globally recognized financial asset. Its value and popularity continue to fluctuate due to its speculative nature, evolving regulations, and the broader adoption of blockchain technology. While its future remains uncertain, Bitcoin remains a cornerstone of the cryptocurrency ecosystem and a symbol of financial decentralization.




o	References for the data source(s)/o	References for any code used that is not your own

The use of ChatGPT was essential in creating various lines of code in the 
Javascript file. Below is the code the creation of the heatmap.
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
  x: Array.from({ length: binsX }, (_, i) => percentRange[0] + i * 
binWidthX),
  y: Array.from({ length: binsY }, (_, i) => dollarRange[0] + i * 
binWidthY),
  type: "heatmap",
  hoverongaps: false,

## Setup and Dependencies

Before starting, ensure you have the following installed:

- Python (for running a local server)
- Javascript libraries:
    - D3.js
    - Plotly.js

## Running the Analysis
- Access the dashboard: https://rjlaughlin.github.io/belly-button-challenge/
- Clone the repository and navigate to the project directory.
- Install dependencies as shown above.
- Run the Jupyter Notebook main.iypnb to generate the analyses and visualizations.