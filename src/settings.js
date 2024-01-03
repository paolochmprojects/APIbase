const settings = {
    PORT: process.env.PORT || 3000,
    JWT_KEY_SECRET: process.env.JWT_KEY_SECRET || "secret",
    JWT_TOKEN_EXPIRES_IN: process.env.JWT_TOKEN_EXPIRES_IN || "1h",
}

export default settings