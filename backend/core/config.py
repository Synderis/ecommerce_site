from pydantic_settings import BaseSettings
# from pydantic import dict as pydantic_dict
import logging
logger = logging.getLogger(__name__)

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
    
    stripe_secret_key: str
    
    # SMTP Config
    smtp_login: str
    smtp_password: str
    smtp_server: str
    smtp_port: str

    class Config:
        env_file = ".env"


settings = Settings()

class Blacklist:
    def __init__(self):
        self.blacklisted_tokens = set()

    def add_token(self, token):
        self.blacklisted_tokens.add(token)

    def is_token_blacklisted(self, token):
        logger.info(token)
        logger.info(self.blacklisted_tokens)
        if token in self.blacklisted_tokens:
            return True
        else:
            return False
        # return token in self.blacklisted_tokens


blacklist = Blacklist()
