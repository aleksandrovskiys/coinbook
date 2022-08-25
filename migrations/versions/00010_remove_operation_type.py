"""remove operation type

Revision ID: 00010
Revises: 00009
Create Date: 2022-08-25 21:40:56.532540

"""
import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = "00010"
down_revision = "00009"
branch_labels = None
depends_on = None

old_type = postgresql.ENUM("expense", "income", "balance_correction", name="operationtype")


def upgrade() -> None:
    op.drop_column("operations", "type")
    old_type.drop(op.get_bind(), checkfirst=False)


def downgrade() -> None:
    op.add_column("operations", sa.Column("type", old_type, autoincrement=False, nullable=True))
