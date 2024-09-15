import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from gup.models import User, Post

# getting the name of the directory
# where the this file is present.
current = os.path.dirname(os.path.realpath(__file__))

# Getting the parent directory name
# where the current directory is present.
parent = os.path.dirname(current)

# adding the parent directory to
# the sys.path.
sys.path.append(parent)

from logging.config import fileConfig

from sqlalchemy import engine_from_config
from sqlalchemy import pool

from alembic import context

from flask import Flask
from wsgi import create_app
from gup.config import Config

# Create the Flask app
app = create_app(Config)

# This is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config

# Interpret the config file for Python logging.
# This line sets up loggers basically.
fileConfig(config.config_file_name)

# Set sqlalchemy.url
config.set_main_option("sqlalchemy.url", app.config['SQLALCHEMY_DATABASE_URI'])

# Add your model's MetaData object here
# for 'autogenerate' support

# other values from the config, defined by the needs of env.py,
# can be acquired:
# my_important_option = config.get_main_option("my_important_option")
# ... etc.

def run_migrations_offline():
  """Run migrations in 'offline' mode."""
  url = config.get_main_option("sqlalchemy.url")
  context.configure(
      url=url,
      literal_binds=True,
      dialect_opts={"paramstyle": "named"},
  )

  with context.begin_transaction():
      context.run_migrations()

def run_migrations_online():
  """Run migrations in 'online' mode."""

  def process_revision_directives(context, revision, directives):
      if getattr(config.cmd_opts, 'autogenerate', False):
          script = directives[0]
          if script.upgrade_ops.is_empty():
              directives[:] = []

  connectable = engine_from_config(
      config.get_section(config.config_ini_section),
      prefix="sqlalchemy.",
      poolclass=pool.NullPool,
  )

  with connectable.connect() as connection:
      context.configure(
          connection=connection,
          process_revision_directives=process_revision_directives,
      )

      with context.begin_transaction():
          context.run_migrations()

if context.is_offline_mode():
  run_migrations_offline()
else:
  run_migrations_online()
