import csv
import json

csv_file_path = "./dataset/traveldata.csv"
json_file_path = "./dataset/traveldata.json"

def csv_to_json(csv_file_path, json_file_path):
    column_mapping = {
        'Zone': 'Zone',
        'State': 'State',
        'City': 'City',
        'Name': 'Name',
        'Type': 'Type',
        'Establishment Year': 'EstablishmentYear',
        'time needed to visit in hrs': 'TimeNeededToVisit',
        'Google review rating': 'GoogleReviewRating',
        'Entrance Fee in INR': 'EntranceFeeINR',
        'Airport with 50km Radius': 'AirportWith50kmRadius',
        'Weekly Off': 'WeeklyOff',
        'Significance': 'Significance',
        'DSLR Allowed': 'DSLRAllowed',
        'Number of google review in lakhs': 'NumberOfGoogleReviewsInLakhs',
        'Best Time to visit': 'BestTimeToVisit',
    }

    data = []
    with open(csv_file_path, 'r') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        for row in csv_reader:
            new_row = {}
            for csv_column, json_column in column_mapping.items():
                if csv_column in ["Google review rating","Entrance Fee in INR","Number of google review in lakhs","time needed to visit in hrs"]:
                  new_row[json_column] = float(row[csv_column])  
                else:
                    new_row[json_column] = row[csv_column]
            data.append(new_row)

    with open(json_file_path, 'w') as json_file:
        json.dump(data, json_file, indent=4)

# Example usage:
csv_to_json(csv_file_path, json_file_path)

