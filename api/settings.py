from pydantic import BaseSettings


class Settings(BaseSettings):
    postgres_host: str
    postgres_port: str
    postgres_db: str
    postgres_name: str
    postgres_user: str
    postgres_password: str
    cors_origins: list[str] = [
        "http://localhost",
        "http://localhost:3001",
    ]

    @property
    def sqlalchemy_database_uri(self):
        return f"postgresql://{self.postgres_user}:{self.postgres_password}@{self.postgres_host}:{self.postgres_port}/{self.postgres_db}"


settings = Settings()
