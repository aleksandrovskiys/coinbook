from typing import Union

from fastapi import FastAPI
from sqlalchemy import create_engine

from api.routers.users import router as user_router
from api.settings import settings

app = FastAPI()
db_engine = create_engine(settings.postgres_url)
app.include_router(router=user_router, prefix="/users")


@app.get("/")
def read_root():
    return {"Hello": "World"}
