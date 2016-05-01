# /etc/apt/sources.list.d/dotdeb.org.list
deb http://packages.dotdeb.org squeeze all
deb-src http://packages.dotdeb.org squeeze all
wget -q -O - http://www.dotdeb.org/dotdeb.gpg | sudo apt-key add -

apt-get update
apt-get install nodejs redis-server nginx postgresql-9.4
