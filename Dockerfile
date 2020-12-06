FROM node:lts-alpine

# Create app directory
RUN mkdir -p /home/codytech/server/node_modules && chown -R node:node /home/codytech/server
WORKDIR /home/codytech/server

COPY package.json yarn.* ./
USER node
RUN yarn

COPY --chown=node:node . .

EXPOSE 3001
CMD ["yarn", "dev"]