print("\t> Permanently")
cars = ['bmw', 'audi', 'toyota', 'subaru']
cars.sort()
print(f"{cars=}")

cars.sort(reverse=True)
print(f"{cars=}")

print("-"*80)
print("\t> Temporarily")
cars = ['bmw', 'audi', 'toyota', 'subaru']

print("Here is the original list:")
print(f"{cars=}")

print("\nHere is the sorted list:")
print(f"{sorted(cars)=}")

print("\nHere is the original list again:")
print(f"{cars=}")
print("-"*80)

