import morgan from "morgan";

export default morgan("[:date[iso]] :status :method :url :response-time :remote-addr");