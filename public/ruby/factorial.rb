# SOLUTION 1: RECURSIVITY

def fact_recursivity(num)
  return 1 if num <= 1

  num * fact_recursivity(num - 1)
end

puts fact_recursivity(5)

# SOLUTION 2: ITERATION

def fact_iteration(num)
  return 1 if num <= 1

  (1..num).inject(:*) # for over each element inject operator *
end

puts fact_iteration(5)
