# Bitcoin: An Analysis of the First Cryptocurrency

## Team Members:
- Michele Aguilar
- Riley Laughlin
- Cameron Magor
- Mayra Martinez

## Project Overview
The project focuses on analyzing Bitccoin's historical price movements to provide insights into its markets trends and volatility.  Thorugh visualizations, this project aims to help readers understand Bitcoin's price behavior over time. In addition, this project explores the risks and benefits associated with Bitcoin.


## Tech Stack and Data Acquisition / Manipulation
We used a number of different libraries/tools/resources for this project, including:

- Python
- Jupyter Notebook
- Splinter
- HTML
- CSS
- JavaScript
- Plotly
- Pandas
- MatlotLib
- D3
- PIL

### Website Data:

Salary Data comes from Coin Market Cap https://coinmarketcap.com/currencies/bitcoin/historical-data/

ETF Data comes from Fidelity https://www.fidelity.com/

Here are some basic illustrations of the data flow from acquisition and cleaning to storing.
![Slide2](https://github.com/user-attachments/assets/89d37194-a1ec-481a-931d-9373a020b8f2)

![Slide3](https://github.com/user-attachments/assets/77609f08-fa51-4df4-a3ac-ab4852e6eae4)

## Visualizations

### 1. High-Low Scatter Plot

The high-low scatter plot allows users to view the daily changes in Bitcoin’s price over different timeframes: 1 day, 1 week, 1 month, 3 months, 1 year, or the entire dataset. These tabs reveal Bitcoin's price changes relative to the selected timeframe.

#### Creating the High-Low Scatter Plot
- **Part 1:** We begin by examining the column data types to understand the dataset. This step helps identify the correct column names for referencing and facilitates precise data manipulation.  
- **Part 2:** Using Matplotlib, we generate the high-low scatter plot. Each line in the chart is defined with its corresponding values and colors. Essential elements like a title, x-axis and y-axis labels, x-axis ticks, and a legend are added to provide clear insights into the chart’s content.

---

### 2. Candlestick Chart

The candlestick chart provides a detailed view of Bitcoin’s daily price movements, including the opening, closing, high, and low prices. Users can interact with the chart using time selectors and a range slider to analyze specific periods.

#### Creating the Candlestick Chart
- **Part 1:** The process starts with constructing the candlestick base, where each line is assigned appropriate values and colors to accurately represent the data.  
- **Part 2:** We enhance the chart’s appearance and interactivity by updating its layout. This includes:  
  - Adding a graph title.  
  - Customizing the x-axis and y-axis labels.  
  - Applying a dark mode template.  
  - Enabling a range slider for navigation.  
  - Configuring interactive x-axis buttons for selecting timeframes (day, week, month, 3 months, 1 year, or entire dataset). The range slider remains visible, with `type = data` ensuring the x-axis displays dates.

---

### 3. Interactive Line Chart

The interactive line chart visualizes Bitcoin’s price movements over time, allowing users to adjust the time unit (days, months, or years) to smooth out volatility and adapt to different investing horizons.

#### Generating the Interactive Line Chart
- **Part 1:** We create the line chart with `fig2 = go.Figure()`. Traces are added for each price line, with assigned values and colors.  
- **Part 2:** The layout is updated to include:  
  - A chart title.  
  - X-axis and y-axis titles.  
  - A legend title.  
  - A dark mode template for improved aesthetics.  
  Finally, the chart is displayed using `fig2.show()`.

---

### 4. Key Charts on the Dashboard

1. **Bitcoin Price Over Time**  
   This chart tracks Bitcoin’s price with adjustable time units (days, months, or years). Switching from days to months or years reduces volatility by displaying fewer data points, accommodating different investor time horizons.

2. **Dollar Change vs. Percentage Change Heatmap**  
   A dynamic heatmap that adjusts based on the selected timeframe and unit. Given Bitcoin’s evolution from near $0 to over $100,000, the magnitude of dollar and percentage changes varies significantly, making this visualization essential for contextual understanding.

3. **Google Trends Bitcoin Search Interest**  
   This chart uses data from Google Trends to assign a search interest score to each U.S. state/region based on Bitcoin-related search activity. Nevada notably has the highest score in the country.

---

## Conclusion 
Bitcoin has grown from an experimental digital currency to a globally recognized financial asset, driving innovation in blockchain technology and decentralized finance. While it offers benefits like financial inclusion and privacy, its volatility, environmental impact, and association with unethical activities pose significant risks. As the cryptocurrency landscape evolves, balancing its potential with thoughtful regulation and education will be crucial.

##	References

The use of ChatGPT was essential in creating various lines of code in the Javascript and Jupyter Notebook files. Below is the code for the creation of the heatmap in the Javascript code.

``` javascript
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
```

Below is the code for the creation of the candlestick visualization.
```python
#Load the data
data = pd.read_csv(‘/mnt/data/cleaned_data.csv’)

#Extract relevant columns
volume = data[‘volume’]
market_cap = data[‘marketCap’]
close_price = data[‘close’]
high_price = data[‘high’]

# Create scatter plot
plt.figure(figsize=(10, 8))
scatter = plt.scatter(volume, market_cap, s=close_price / 1000, c=high_price, cmap=‘viridis’, alpha=0.7, edgecolors=‘w’)

# Add labels and title
plt.title(“Bitcoin Scatter Plot: Volume vs Market Cap”, fontsize=16)
plt.xlabel(“Volume”, fontsize=14)
plt.ylabel(“Market Cap”, fontsize=14)

# Add color bar
plt.colorbar(scatter, label=“High Price”)

# Show the plot
plt.tight_layout()
plt.show()

plt.figure(figsize=(14, 7)) 
plt.plot(last_30_days['timeOpen'], last_30_days['close'], marker='o', linestyle='-', color='blue', markersize=6, linewidth=2)

# Ensure x-axis is limited to 30-day period
plt.gca().set_xlim([last_30_days['timeOpen'].min(), last_30_days['timeOpen'].max()])

# Set x-axis ticks to correspond to the data points
plt.gca().xaxis.set_major_locator(mdates.DayLocator())

#Rotate and align the x-axis labels for better readability
plt.xticks(rotation=45, ha='right')

# Add titles and labels 
plt.title('Bitcoin Price Changes Over the Last 30 Days', fontsize=18, weight='bold')
plt.xlabel('Date', fontsize=14)
plt.ylabel('Price in USD', fontsize=14)

# Add gridlines to improve readability
plt.grid(True, linestyle='--', alpha=0.7)

# Adjust layout to prevent clipping of labels
plt.tight_layout()

#Show the plot
plt.show()

fig2.add_trace(go.Scatter(x = df['timeOpen'], y = df['open'], mode = 'lines', name ='Open Price', line = dict(color = 'blue')))

fig2.update_layout(title = 'Bitcoin Price Over Years', xaxis_title = 'Date', yaxis_title = 'Price (USD)', legend_title = 'Price Type', template = 'plotly_dark')

fig1 = go.Figure(data = [go.Candlestick(x = df['timeOpen'], open = df['open'], high = df['high'], low = df['low'], close = df['close'], name = 'Candlestick'),

fig1.update_layout(xaxis = dict(rangeselector = dict(buttons = list([dict(count = 1, label = '1 Day', step = 'day', stepmode = 'backward'),
                                                                    dict(count = 7, label = '1 Week', step = 'day', stepmode = 'backward'),
                                                                    dict(count = 1, label = '1 Month', step = 'month', stepmode = 'backward'),
                                                                    dict(count = 3, label = '3 Months', step = 'month', stepmode = 'backward'),
                                                                    dict(count = 1, label = '1 Year', step = 'year', stepmode = 'backward'),
                                                                    dict(label = 'All', step = 'all'),])),
                                                                    rangeslider = dict(visible = True),
                                                                    type = 'date'))
```

## Setup and Dependencies

Before starting, ensure you have the following installed:

- Python
- Javascript libraries:
    - D3.js
    - Plotly.js

## Running the Analysis
- Access the dashboard: https://cmagor1819.github.io/team-7-project3/
- Clone the repository and navigate to the project directory.
- Install dependencies as shown above.
- Run the Jupyter Notebook main.iypnb to generate the analyses and visualizations.
