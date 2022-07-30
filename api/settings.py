from pydantic import BaseSettings


class Settings(BaseSettings):
    POSTGRES_HOST: str
    POSTGRES_PORT: str
    POSTGRES_DB: str
    POSTGRES_NAME: str
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    CORS_ORIGINS: list[str] = [
        "http://localhost",
        "http://localhost:3050",
    ]

    ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 12

    SECRET_KEY: str

    @property
    def sqlalchemy_database_uri(self):
        return f"postgresql://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"


settings = Settings()
