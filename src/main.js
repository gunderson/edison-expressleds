"use strict";

import * as robot from "./api/js/robot";
import * as apiServer from "./api/js/server";
import * as appServer from "./front-end/js/server";

apiServer.on("led", robot.led);
apiServer.on("play", robot.play);
apiServer.on("stop", robot.stop);
