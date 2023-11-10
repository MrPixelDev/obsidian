#python #prime #algoritm 

```
def is_prime(x):
    if num <= 1:
        return False;
    else:
        d = 2;
        while d ** 2 <= x and x % d != 0:
            d += 1;
        return d ** 2 > x;
```

Difficulty: O(sqrt(x))
