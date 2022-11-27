from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.routers.accounts import router as account_router
from api.routers.categories import router as category_router
from api.routers.currencies import router as currency_router
from api.routers.operations import router as operation_router
from api.routers.reports import router as reports_router
from api.routers.users import router as user_router
from api.settings import settings

app = FastAPI()
app.include_router(router=user_router, prefix="/users")
app.include_router(router=category_router, prefix="/categories")
app.include_router(router=account_router, prefix="/accounts")
app.include_router(router=currency_router, prefix="/currencies")
app.include_router(router=operation_router, prefix="/operations")
app.include_router(router=reports_router, prefix="/reports")


app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/healthcheck")
def read_root():
    return {"status": "ok"}
