import urllib.request
import csv

header = """var data = (function() {
	function NamedPoint(name,  x,  y,  z) {
		this.x = x
		this.y = y
		this.z = z
		this.name = name
	}

	function coordinatesList() {
		var array = ["""

footer = """
		]

		return array;
	}

	return { data : coordinatesList() };
})();"""

def write_data(output):
    link = "https://eddb.io/archive/v6/systems_recently.csv"
    with urllib.request.urlopen(link) as csvfile:
         reader = csv.DictReader(csvfile.read().decode('utf-8').splitlines())
         for row in reader:
             output.write("new NamedPoint(\"{}\", {}, {}, {}),\n".format(row['name'], row['x'], row['y'], row['z']).encode())

with open("../data/data.js", "wb") as out:
    out.write(header.encode())
    write_data(out)
    out.write(footer.encode())

