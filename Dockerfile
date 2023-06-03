FROM --platform=linux/amd64 node:18-alpine
WORKDIR /usr/app
COPY . .
ENV VITE_API_URL=http://20.19.69.214:8080/
RUN npm install
RUN npm run build
EXPOSE 80
CMD npm run preview