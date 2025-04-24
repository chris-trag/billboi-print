# billboi-print

A Node.js application that fetches top stories from The New York Times API and prints them to a Star TSP143IIIU receipt printer, emulating the iconic NYT typography and layout.

## Features

- Fetches the top 5 stories from the NYT API
- Formats stories with NYT-inspired typography
- Prints to a Star TSP143IIIU thermal receipt printer
- Automatically cuts the paper after printing
- Scheduled daily morning prints at 7:00 AM
- Manual print option for on-demand updates

## Prerequisites

- Node.js (v14 or higher)
- Star TSP143IIIU receipt printer connected via USB
- NYT API credentials

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/billboi-print.git
   cd billboi-print
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Copy the environment variables template and add your NYT API credentials:
   ```
   cp .env.sample .env
   ```
   Then edit the `.env` file with your NYT API credentials.

4. Install printer drivers:
   - Download and install the Star TSP100 drivers from the [Star Micronics website](https://www.starmicronics.com/support/default.aspx)
   - For macOS, you may need to configure the printer in System Preferences

## Usage

Start the application:
```
npm start
```

The application will:
1. Print the top stories immediately
2. Schedule daily prints at 7:00 AM
3. Keep running in the background

## Configuration

You can modify the following settings:
- Number of stories to print (in `src/nytApi.js`)
- Print schedule (in `index.js`)
- Typography and layout (in `src/printer.js`)

## Troubleshooting

If you encounter issues with the printer connection:
1. Check that the printer is powered on and connected
2. Verify the printer interface path in `src/printer.js`
3. Ensure printer drivers are installed correctly

## License

MIT
