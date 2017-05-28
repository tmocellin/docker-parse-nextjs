FROM node:6

ENV PARSE_DASHBOARD_VERSION 1.0.25
RUN npm install -g parse-dashboard@${PARSE_DASHBOARD_VERSION}
ENV PORT 4040
EXPOSE $PORT

CMD ["parse-dashboard"]
