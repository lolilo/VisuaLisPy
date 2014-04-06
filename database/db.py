from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.orm import sessionmaker, scoped_session
import os

exp = os.environ.get("DATABASE_URL", "postgres://programs:programs@localhost/programs")
engine = create_engine(exp, echo=False)
# engine = create_engine("sqlite:///database/code.db", echo=False)

s = scoped_session(sessionmaker(
                                bind=engine,
                                autocommit = False,
                                autoflush = False))
Base = declarative_base()
Base.query = s.query_property()

### Class declarations go here
class Code(Base):
    __tablename__ = "programs"
    id = Column(Integer, primary_key=True)
    name = Column(String(64), nullable=True)
    code = Column(Text())
    language = Column(String(64), nullable=True)
    description = Column(String(64), nullable=True)

    # users will access saved code via url/id ~~ hash(id)?

    # s.query(Code).filter_by(id=1).one()
    # s.query(Code).filter_by(name='area').one()

### End class declarations

# new code 
def new_code(code):
    new_code = Code(code=code)
    s.add(new_code)
    s.commit()
    print "New code added to database."
    return new_code.id

### for initalizing database tables
def create_tables():
    # ENGINE exists once we call connect()
    Base.metadata.create_all(ENGINE)
### for seeding database via terminal via python seed.py
### can also play around directly with python -i db.py ~ python interactive mode
def connect():
    global ENGINE, SESSION
    exp = os.environ.get("DATABASE_URL", "postgres://programs:programs@localhost/programs")
    ENGINE = create_engine(exp, echo=False)
    SESSION = sessionmaker(bind=ENGINE)
    return SESSION()

def main():
    """In case we need this for something"""
    pass

if __name__ == "__main__":
    main()

