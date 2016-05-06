"use strict";

import robot from "./api/js/robot";
import apiServer from "./api/js/server";
import appServer from "./front-end/js/server";

apiServer.on("led", robot.led);
apiServer.on("play", robot.play);
apiServer.on("stop", robot.stop);
