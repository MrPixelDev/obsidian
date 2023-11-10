#pandas #ml #ds 

`import pandas as pd
`import numpy as np
`
`my_list = [1, 2, 3, 4, 5]
`a = np.array(my_list)
``
np.array - статический массив для одинаковых типов. Если типы разные - все приводится к строкам или ..?

```
np.array(my_list, 'float')
# array([1., 2., 3., 4., 5.])
```

```
a = np.asarray(my_list)
b = np.asarray(a)
# id(a) == id(b)

a = np.asarray(my_list)
a[0] = 'b'
b = np.asarray(a)
# id(a) != id(b)
```

```
names = ['Alex', 'John', 'Vitya']
ages = [1, 17, 39]
s = pd.Series(ages, index=names, name='Ages')
print(s) # 0to0 1to1 2to2, name: Ages
print(s.loc['Alex']) # 1
print(s[s > 20]) # Vitya 39


data = {
	'Bob': ['I Like That', 'That was awful'],
	'Susan': ['Pretty good', 'Tasty']
}
df = pd.DataFrame(data, index=['Product A', 'Product B'])
print(df) #     Bob Susan
	Product A   ilt pretty good
	Product B   twa tasty
```

```
array_5x5 = np.arrange(25) # [0, 2, ... , 24]
array_5x5.reshape(5, 5) # to matrix
array_sum = np.sum(array_5x5) # 300
array_5x5[:, 0] # 1 столбец
array_5x5[1, :] # 2 строка
array5x5[array_5x5 > 10] # list of x > 10
 
```

```
data = {
	'name': ['Alice', 'Bob', 'Charlie', 'David', 'Eva'],
	'Age': [25, 30, 35, 40, 45],
	'City': ['NY', 'SF', 'LA', 'CG', 'ST']
}
df = pd.DataFrame(data)
df.iloc[0] # Integer-based location (1st row)

df = pd.DataFrame(data, index=['A', ' B', 'C', 'D', 'E'])
df.loc['B'] # Label-based location (2nd row)
pima = df.copy()
pima['name'] = "John Malkovich" # Everyone is him
```