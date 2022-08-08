"""create table accounts

Revision ID: 00003
Revises: 000002
Create Date: 2022-07-26 21:44:14.934295

"""
import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = "00003"
down_revision = "00002"
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "accounts",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(
            ["user_id"],
            ["users.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_accounts_id"), "accounts", ["id"], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f("ix_accounts_id"), table_name="accounts")
    op.drop_table("accounts")
    # ### end Alembic commands ###
