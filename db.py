from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, String
# from sqlalchemy.orm import sessionmaker, scoped_session

engine = create_engine("sqlite:///code.db", echo=False)
s = scoped_session(sessionmaker(
                                bind=engine,
                                autocommit = False,
                                autoflush = False))
Base = declarative_base()

### Class declarations go here
class Code(Base):
    pass

### End class declarations

def main():
    """In case we need this for something"""
    pass

if __name__ == "__main__":
    main()

