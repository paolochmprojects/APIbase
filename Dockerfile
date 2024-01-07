FROM node:20-alpine3.18

ENV DATABASE_URL="file:../dev.db"
ENV JWT_SECRET_KEY="E2h1but3WntWjjhqHwc19Bqnqq7ZbCE0Qx5nB7q+zF0="
ENV PORT="5000"

WORKDIR /app

COPY  . .

RUN npm install

EXPOSE 5000

CMD ["npm", "run", "start"]