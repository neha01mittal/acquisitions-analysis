import csv

# open the file in universal line ending mode
with open('AcquisitionDatabaseApple1.csv', 'rU') as infile:
  # read the file as a dictionary for each row ({header : value})
  reader = csv.DictReader(infile)
  data = {}
  for row in reader:
    for header, value in row.items():
      try:
        data[header].append(value)
      except KeyError:
        data[header] = [value]

# extract the variables you want
Categories = data['Categories']
print(Categories)

newdata = []
for element in Categories:
    if 'AI' in element.upper() or 'artificial intelligence' in element.lower() or 'machine learning' in element.lower() or 'ML' in element.upper() or 'analytics' in element.lower():
        newdata.append('AI/ML/Analytics')
    elif 'AR' in element.upper() or 'VR' in element.upper() or 'augmented' in element.lower() or 'virtual reality' in element.lower() or 'augmented reality' in element.lower():
        newdata.append('AR/VR')
    elif 'digital' in element.lower() or 'information' in element.lower() or 'software' in element.lower() or 'cloud' in element.lower() or 'web' in element.lower() or 'mobile' in element.lower() or 'ios' in element.lower() or 'android' in element.lower():
        newdata.append('Software')
    elif 'hardware' in element.lower() or 'electronics' in element.lower() or 'web' in element.lower():
        newdata.append('Hardware')
    elif 'ecommerce' in element.lower() or 'music' in element.lower() or 'media' in element.lower() or 'ad' in element.lower() or 'content' in element.lower() or 'advertisement' in element.lower():
        newdata.append('Media/Ad/Content')
    elif 'security' in element.lower() or 'cyber' in element.lower():
        newdata.append('Security')
    else:
        newdata.append('Uncategorised')



import pandas as pd

df = pd.read_csv('AcquisitionDatabaseApple1.csv')
new_column = pd.DataFrame({'Cleaned Categories': newdata})
df = df.merge(new_column, left_index=True, right_index=True)
df.to_csv('AcquisitionDatabaseAppleFixed.csv')
