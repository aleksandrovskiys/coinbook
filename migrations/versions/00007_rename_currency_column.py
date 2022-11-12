"""rename currency column

Revision ID: 00007
Revises: 00006
Create Date: 2022-08-08 14:55:49.398825

"""
import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = "00007"
down_revision = "00006"
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column("accounts", sa.Column("currency_code", sa.String(), nullable=True))
    op.create_foreign_key("accounts_currency_code_fkey", "accounts", "currencies", ["currency_code"], ["code"])
    op.drop_constraint("fk_account_currency", "accounts", type_="foreignkey")
    op.drop_column("accounts", "currency")
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint("accounts_currency_code_fkey", "accounts", type_="foreignkey")
    op.drop_column("accounts", "currency_code")
    op.add_column("accounts", sa.Column("currency", sa.VARCHAR(), autoincrement=False, nullable=True))
    op.create_foreign_key("fk_account_currency", "accounts", "currencies", ["currency"], ["code"])
    # ### end Alembic commands ###
