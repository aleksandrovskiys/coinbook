from typing import Union

from fastapi import FastAPI

from api.routers.users import router as user_router
from api.settings import settings

app = FastAPI()
app.include_router(router=user_router, prefix="/users")


@app.get("/")
def read_root():
    return {"Hello": "World"}
