# pls execute me with ruby main.rb if you have ruby installed

# Function Args: Pass by value or by reference?
# Resources:
# https://stackoverflow.com/questions/22827566/ruby-parameters-by-reference-or-by-value/22827949#22827949
# http://valve.github.io/blog/2014/07/04/from-object-to-functional-immutability/
# https://stackoverflow.com/questions/1872110/is-ruby-pass-by-reference-or-by-value

def change_string(str)
  # the value of str is a reference to a mutable (not frozen) string object
  # << is altering this object
  str << "by reference."
  # local var str will now contain a reference to another string object
  str = "this will never be shown"
end

original_str = "-"
change_string(original_str)
puts "Function Args: Pass by value or by reference?"
puts original_str

puts "-But we need to keep in mind that there are mutable and immutable objects." 
puts "-42, 42.0 and true are immutable objects. You can check with 42.frozen?"