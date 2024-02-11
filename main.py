import json
import pandas as pd

# Load the JSON data from the provided file
file_path = 'data.json'
with open(file_path, 'r') as file:
    data = json.load(file)

# Prepare data for CSV conversion
csv_data = []

for item in data:
    # Extract required fields
    id_ = item.get('id', '')
    name = item.get('name', '')
    price = item.get('price', '')
    images = ", ".join([image['url'] for image in item.get('images', [])])
    size_name = item.get('size', {}).get('name', '')
    color_name = item.get('color', {}).get('name', '')
    category_name = item.get('category', {}).get('name', '')
    
    # Append to the list as a tuple
    csv_data.append((id_, name, price, images, size_name, color_name, category_name))

# Convert list of tuples to DataFrame
df = pd.DataFrame(csv_data, columns=['ID', 'Name', 'Price', 'Images URL', 'Size Name', 'Color Name', 'Category Name'])

# Save DataFrame to CSV
csv_file_path = 'products.csv'
df.to_csv(csv_file_path, index=False)
