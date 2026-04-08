FROM node:22-alpine

COPY integrations/https-cert/rootCA.pem /root/integration-test.pem

# install the integration test certs
RUN apk --no-cache add ca-certificates && \
  rm -rf /var/cache/apk/* && \
  cp /root/integration-test.pem /usr/local/share/ca-certificates/ && \
  update-ca-certificates

RUN apk update && \
  apk add go

WORKDIR /src

# add pacakge.json first so we don't have to `npm install` unless it changes
ADD package.json /src/
RUN npm install

# keep this last so that once this docker image is built it can be used quickly
ADD . /src
