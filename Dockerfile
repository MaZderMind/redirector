FROM mhart/alpine-node:7

RUN mkdir /app
ADD index.js /app/
ADD functions.js /app/

EXPOSE 8080
CMD ["node", "/app/index.js"]
