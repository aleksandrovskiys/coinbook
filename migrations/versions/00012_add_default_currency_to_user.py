"""add default currency to user

Revision ID: 00012
Revises: 00011
Create Date: 2023-01-11 20:45:55.366800

"""
import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = "00012"
down_revision = "00011"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column(
        "users", sa.Column("default_currency_code", sa.String(length=5), server_default="EUR", nullable=False)
    )
    op.create_foreign_key("user_default_currency_code_fkey", "users", "currencies", ["default_currency_code"], ["code"])


def downgrade() -> None:
    op.drop_constraint("user_default_currency_code_fkey", "users", type_="foreignkey")
    op.drop_column("users", "default_currency_code")
