"""add balance correction

Revision ID: 00009
Revises: 00008
Create Date: 2022-08-25 00:19:51.360180

"""
from alembic import op
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = "00009"
down_revision = "00008"
branch_labels = None
depends_on = None

old_type = postgresql.ENUM("expense", "income", name="category_type", create_type=False)
new_type = postgresql.ENUM("expense", "income", "balance_correction", name="category_type", create_type=False)
tmp_type = postgresql.ENUM("expense", "income", "balance_correction", name="_category_type", create_type=False)


def upgrade() -> None:
    tmp_type.create(op.get_bind(), checkfirst=False)
    op.execute("ALTER TABLE categories ALTER COLUMN type TYPE _category_type USING type::text::_category_type")
    old_type.drop(op.get_bind(), checkfirst=False)
    new_type.create(op.get_bind(), checkfirst=False)
    op.execute("ALTER TABLE categories ALTER COLUMN type TYPE category_type USING type::text::category_type")
    tmp_type.drop(op.get_bind(), checkfirst=False)
    op.execute("INSERT INTO categories (name, type) VALUES ('Balance correction', 'balance_correction')")


def downgrade() -> None:
    tmp_type.create(op.get_bind(), checkfirst=False)
    op.execute("DELETE FROM categories WHERE type='balance_correction'")
    op.execute("ALTER TABLE categories ALTER COLUMN type TYPE _category_type USING type::text::_category_type")
    new_type.drop(op.get_bind(), checkfirst=False)
    old_type.create(op.get_bind(), checkfirst=False)
    op.execute("ALTER TABLE categories ALTER COLUMN type TYPE category_type USING type::text::category_type")
    tmp_type.drop(op.get_bind(), checkfirst=False)
