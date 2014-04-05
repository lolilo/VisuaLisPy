import db
# import csv

def load_code(session):
    # open the file
    f = open("code.csv")

    for raw_line in f:
        # parse and clean up the line
        line = raw_line.split('|||')
        clean_line = [x.strip().decode("latin-1") for x in line]
        # create object
        # must interact with model.py somehow
        print clean_line
        new_code = db.Code(
                    name=clean_line[0], 
                    code=clean_line[1],
                    language=clean_line[2],
                    description=clean_line[3])
        # add object to session
        session.add(new_code)
    # commit
    session.commit()

def main(session):
    load_code(s)

if __name__ == "__main__":
    s = db.connect()
    main(s)