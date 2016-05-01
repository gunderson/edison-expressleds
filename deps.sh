# /etc/apt/sources.list.d/dotdeb.org.list
echo "deb http://packages.dotdeb.org squeeze all" | sudo tee -a /etc/apt/sources.list.d/dotdeb.org.list
echo "deb-src http://packages.dotdeb.org squeeze all" | sudo tee -a /etc/apt/sources.list.d/dotdeb.org.list
wget -q -O - http://www.dotdeb.org/dotdeb.gpg | sudo apt-key add -

apt-get install build-essential pkg-config checkinstall git avahi-daemon libavahi-client-dev libcrack2-dev libwrap0-dev autotools-dev automake libtool libdb-dev libacl1-dev libdb5.1-dev db-util db5.1-util libgcrypt11 libgcrypt11-dev

# Build libevent from source:
cd /usr/local/src
wget https://github.com/downloads/libevent/libevent/libevent-2.0.21-stable.tar.gz
tar xfv libevent-2.0.21-stable.tar.gz
cd libevent-2.0.21-stable
./configure
 make
checkinstall --pkgname=libevent-2.0.21-stable --pkgversion="$(date +%Y%m%d%H%M)" --backup=no --deldoc=yes --default --fstrans=no
cd ../

# Download src:
git clone git://git.code.sf.net/p/netatalk/code netatalk-code
cd netatalk-code
./bootstrap

# Configure install

./configure --enable-debian --enable-zeroconf --with-cracklib --with-acls --enable-tcp-wrappers --with-init-style=debian
make

# Build!

cp afp.conf /usr/local/etc/afp.conf

checkinstall --pkgname=netatalk --pkgversion="$(date +%Y%m%d%H%M)" --backup=no --deldoc=yes --default --fstrans=no



apt-get update
apt-get install nodejs redis-server nginx postgresql-9.4 avahi-daemon netatalk
