# Tweetmash

https://github.com/user-attachments/assets/87ec7a16-a512-499d-8f03-6afb62125751

## Introduction

This project writes and posts tweets automatically on your behalf, based on topic, tone, time/date and recurrence. For example, if a user wants to tweet about "Web3 trends", the project will generate a ready-to-post tweet about Web3 trends. The tweet will match the specified tone (e.g., professional, humorous), include relevant hashtags if enabled, and be scheduled for posting at the optimal time. Users can set these tweets to post immediately or schedule them for specific dates/times, with options for recurring posts (daily/weekly/monthly).

## Setting up the project locally

- I have used `npm` for package management. You can install `npm` by following the instructions [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Client:
- Navigate to client/frontend directory, run `cd .\client`.
- To install the dependencies, run `npm install`.
- To start the development server, run `npm run dev`.
- To build the project for production, run `npm run build`.

Server:
- Navigate to server/backend directory, run `cd .\server`.
- To install the dependencies, run `npm install`.
- To start the development server, run `npm run dev`.
- To generate Swagger API documentation, run `npm run swagger`.
- To start the production server, run `npm run start`.

## Features

- AI-generated tweet content tailored to specified topics.
- Customize tweet's tone.
- Flexible scheduling with recurring post options.

