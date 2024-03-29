from pydantic import AnyHttpUrl
from pydantic import BaseSettings
from pydantic import Field
from pydantic import validator


class Settings(BaseSettings):
    POSTGRES_HOST: str
    POSTGRES_PORT: str
    POSTGRES_DB: str
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    CORS_ORIGINS: str | list[AnyHttpUrl] = Field(..., env="CORS_ORIGINS")

    ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 12

    SECRET_KEY: str

    @property
    def sqlalchemy_database_uri(self):
        return f"postgresql://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"

    @validator("CORS_ORIGINS", pre=True)
    def _assemble_cors_origins(cls, cors_origins):
        if isinstance(cors_origins, str):
            return [item.strip() for item in cors_origins.split(",")]
        return cors_origins


settings = Settings()
