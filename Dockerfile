# AUTOGENERATED FILE
FROM resin/edison-buildpack-deps:wheezy

ENV NODE_VERSION 6.0.0

RUN curl -SLO "http://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x86.tar.gz" \
	&& echo "142bdf1cb8793bd7c7da7974c73bd2d466933f8d5b496d9a28d3b1e343b62bd0  http://nodejs.org/dist/v6.0.0/node-v6.0.0-linux-x86.tar.gz" | sha256sum -c - \
	&& tar -xzf "node-v$NODE_VERSION-linux-x86.tar.gz" -C /usr/local --strip-components=1 \
	&& rm "node-v$NODE_VERSION-linux-x86.tar.gz" \
	&& npm install mraa \
	&& npm cache clear \
	&& npm config set unsafe-perm true -g --unsafe-perm \
	&& rm -rf /tmp/*

CMD ["echo","'No CMD command was set in Dockerfile! Details about CMD command could be found in Dockerfile Guide section in our Docs. Here's the link: http://docs.resin.io/#/pages/using/dockerfile.md"]
