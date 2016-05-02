#!/bin/bash

if [ ! -z "${AFP_USER}" ]; then
    if [ ! -z "${AFP_UID}" ]; then
        cmd="$cmd --uid ${AFP_UID}"
    fi
    if [ ! -z "${AFP_GID}" ]; then
        cmd="$cmd --gid ${AFP_GID}"
    fi
    adduser $cmd --no-create-home --disabled-password --gecos '' "${AFP_USER}"
    if [ ! -z "${AFP_PASSWORD}" ]; then
        echo "${AFP_USER}:${AFP_PASSWORD}" | chpasswd
    fi
fi

if [ ! -d /media/share ]; then
  mkdir /media/share
  chown "${AFP_USER}" /media/share
  echo "use -v /my/dir/to/share:/media/share" > readme.txt
fi

sed -i'' -e "s,%USER%,${AFP_USER:-},g" /etc/afp.conf

echo ---begin-afp.conf--
cat /etc/afp.conf
echo ---end---afp.conf--

echo ---begin-avahi-daemon.conf--
cat /etc/avahi-daemon.conf
echo ---end---avahi-daemon.conf--

mkdir /var/run/dbus
dbus-daemon --system
if [ "${AVAHI}" == "1" ]; then
    #!/bin/bash
    set -e

    # Set host-name and enable-dbus
    sed -i -e "s@#enable-dbus=yes@enable-dbus=no@" -e "s@#host-name=foo@host-name=$(echo $RESIN_DEVICE_UUID | cut -c1-7)@" /etc/avahi-daemon.conf

    echo "s@#host-name=testbed@host-name=local@"

    # Restart service
    /etc/init.d/avahi-daemon restart

    bash
else
    echo "Skipping avahi daemon, enable with env variable AVAHI=1"
fi;

exec netatalk -d
