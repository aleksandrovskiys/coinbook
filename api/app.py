from fastapi import Depends
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api import models
from api.deps import get_current_user
from api.routers.categories import router as category_router
from api.routers.users import router as user_router
from api.settings import settings

app = FastAPI()
app.include_router(router=user_router, prefix="/users")
app.include_router(router=category_router, prefix="/categories")


app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root(user: models.User = Depends(get_current_user)):
    return {"Hello": "World", "user": user}
