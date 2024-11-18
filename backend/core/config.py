from pydantic_settings import BaseSettings
# from pydantic import dict as pydantic_dict


class Settings(BaseSettings):
    def __init__(self):
        super().__init__()
        # print(dict(self))
    # Database Config
    db_username: str
    db_password: str
    db_hostname: str
    db_port: str
    db_name: str

    # JWT Config
    secret_key: str
    algorithm: str
    access_token_expire_minutes: int

    class Config:
        env_file = ".env"


settings = Settings()