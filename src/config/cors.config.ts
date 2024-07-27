import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
    credentials: true,
    origin: true,
    methods: [
        "GET",
        "POST",
        "PATCH",
        "DELETE",
    ],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Date",
        "Origin",
        "Accept",
        "Cookie",
        "Set-Cookie",
        "X-XSRF-TOKEN",
        "Accept-Language",
    ],
};
