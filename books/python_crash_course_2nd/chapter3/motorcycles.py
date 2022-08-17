motorcycles = ['honda', 'yamaha', 'suzuki']
print(f"{motorcycles=}")

motorcycles[0] = 'ducati'
print(f"{motorcycles=}")


motorcycles.append('ducati')
print(f"{motorcycles=}")

motorcycles = []
motorcycles.append('honda')
motorcycles.append('yamaha')
motorcycles.append('suzuki')
print(f"{motorcycles=}")

print("-"*80)

motorcycles = ['honda', 'yamaha', 'suzuki']
motorcycles.insert(0, 'ducati')
print(f"{motorcycles=}")

print("-"*80)
motorcycles = ['honda', 'yamaha', 'suzuki']
print(f"{motorcycles=}")
del motorcycles[0]
print(f"{motorcycles=}")

print("-"*80)

motorcycles = ['honda', 'yamaha', 'suzuki']
print(f"{motorcycles=}")

popped_motorcycle = motorcycles.pop()
print(f"{motorcycles=}")
print(f"{popped_motorcycle=}")

print("-"*80)

motorcycles = ['honda', 'yamaha', 'suzuki']
first_owned = motorcycles.pop(0)
print(f"The first motorcycle I owned was a {first_owned.title()}.")

print("-"*80)
motorcycles = ['honda', 'yamaha', 'suzuki', 'ducati']
print(f"{motorcycles=}")
motorcycles.remove('ducati')
print(f"{motorcycles=}")
