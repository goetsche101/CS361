import os

def read_text_file(file_path):
    with open(file_path, 'r') as f:
        print(f.read()) #maybe get details from file, could use file name

def generate_response(file_details):
    with open("/temp2/"+file_details, "a") as out_file:
        out_file.write(str(file_details))

def delete_file(file_name):
    os.remove("/temp/"+file_name)

while True:
    if len(os.listdir("/temp")) != 0:
        for each_file in os.listdir("/temp"):
            read_text_file("/temp/" + each_file)
            generate_response(each_file)
            delete_file(each_file)
