# Giphy Search with Next
This is a small Next.js web application that uses the Giphy API to recover GIFs using the search endpoint.

## Usage
In order to search for a GIF, enter a query in the search input and results will load below. Use the search history to look for previous queries. You can clear the history. Use the "Next" and "Previous" navigation buttons to look at all results.

## Installation
Create a `.env.local` file based on the `.env.example` file provided in the web application folder. Then, create a `.env` file based on the `.env.example` file provided in the `api` folder.

To run this project, simply run:
```bash
$ npm install
$ npm run dev
```

Then run the API in a new terminal with:
```bash
$ cd api
$ npm install
$ npm run start
```

## References
1. [Next.js](https://nextjs.org/)
2. [Express.js](https://expressjs.com/)
3. [Giphy API](https://developers.giphy.com/)
