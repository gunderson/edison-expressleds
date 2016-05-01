# /etc/apt/sources.list.d/dotdeb.org.list
echo "deb http://packages.dotdeb.org squeeze all" | sudo tee -a /etc/apt/sources.list.d/dotdeb.org.list
echo "deb-src http://packages.dotdeb.org squeeze all" | sudo tee -a /etc/apt/sources.list.d/dotdeb.org.list
wget -q -O - http://www.dotdeb.org/dotdeb.gpg | sudo apt-key add -

apt-get update
apt-get install nodejs redis-server nginx postgresql-9.4 avahi-daemon netatalk
