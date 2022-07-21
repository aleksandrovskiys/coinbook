from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.routers.users import router as user_router
from api.settings import settings

app = FastAPI()
app.include_router(router=user_router, prefix="/users")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}
