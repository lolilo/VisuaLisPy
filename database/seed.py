import model
# import csv

def load_code(session):
    # open the file
    f = open("code.csv")

    for raw_line in f:
        # parse and clean up the line
        line = raw_line.split(',')
        clean_line = [x.strip().decode("latin-1") for x in line]
        # create object
        # must interact with model.py somehow
        new_code = model.Code(
                    name=clean_line[1], 
                    code=clean_line[2],
                    language=clean_line[3],
                    description=clean_line[4])
        # add object to session
        session.add(new_code)
    # commit
    session.commit()

def main(session):
    # You'll call each of the load_* functions with the session as an argument
    load_code(s)

if __name__ == "__main__":
    s = model.connect()
    main(s)