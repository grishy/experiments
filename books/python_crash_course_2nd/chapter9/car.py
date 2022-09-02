class Car:
	"""A simple attempt to represent a car."""

	def __init__(self, make, model, year):
		self.make = make
		self.model = model
		self.year = year
		self.odometer_reading = 0
		
	def get_descriptive_name(self):
		"""Returt a neatly formatted descriptive name."""
		long_name = f"{self.year} {self.make} {self.model}"
		return long_name.title()

	def read_odometer(self):
		"""Print a statement showing the car's mileage."""
		print(f"This car has {self.odometer_reading} miles on it.")

my_new_car = Car('audi', 'a4', 2019)

print(my_new_car.get_descriptive_name())
my_new_car.read_odometer()



class ElectricCar(Car):
	"""Represrnt aspects of a car, specific to electric vehicles."""
	def __init__(self, make, model, year):
		"""Initialize attributes of parent class"""
		super().__init__(make, model, year)
		
my_tesla = ElectricCar('tesla', 'model s', 2019)
print(my_tesla.get_descriptive_name())


