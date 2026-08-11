from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Quotation Portal API"
    app_version: str = "1.0.0"
    environment: str = "development"
    supabase_url: str
    supabase_anon_key: str
    supabase_secret_key: str

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
    )


settings = Settings()