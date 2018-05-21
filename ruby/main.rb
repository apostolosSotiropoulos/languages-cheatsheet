# pls execute me with ruby main.rb if you have ruby installed

# Function Args: Pass by value or by reference?
# Resources:
# https://stackoverflow.com/questions/22827566/ruby-parameters-by-reference-or-by-value/22827949#22827949
# http://valve.github.io/blog/2014/07/04/from-object-to-functional-immutability/
# https://stackoverflow.com/questions/1872110/is-ruby-pass-by-reference-or-by-value

def change_string(str)
  # the value of str is a reference to a mutable (not frozen) string object
  # << is altering this object
  str << 'by reference.'
  # local var str will now contain a reference to another string object
  str = 'this will never be shown'
end

original_str = '-'
change_string(original_str)
puts 'Function Args: Pass by value or by reference?'
puts original_str

puts '-But caution: there are mutable and immutable objects.'
puts '-42, 42.0 and true are immutable objects. You can check with 42.frozen?'

# Scope?
# Resources:
# https://www.sitepoint.com/understanding-scope-in-ruby/
# https://jacopretorius.net/2012/01/block-variable-scope-in-ruby.html
class Vehicle
  attr_reader :name # defines a class method name for class var name
  PURPOSE = 'transfer things and humans'.freeze # constant
  @@type = 'Vehicle' # class variable

  # class method
  def self.type
    @@type
  end

  def initialize(name)
    # instance variable : every instance can have a different value for it
    @name = name
  end

  # instance method
  def start
    "#{@@type} named #{@name} just started trying to #{PURPOSE}."
  end
end

some_vehicle = Vehicle.new 'fiab'
puts 'Scope?'
puts "-Class variable (i.e @@type = #{Vehicle.type}): Available from the\
 class definition and any sub-classes. Not available from anywhere outside."
puts "-Instance variable (i.e @name = #{some_vehicle.name}): Available\
 only within a specific object, across all methods in a class instance.\
 Not available directly from class definitions."
puts '-Global variable ($a_variable): Available everywhere within the script.'
puts '-Local variable (a_variable): It depends on the scope.'
puts '-- local variables created in the blocks are not available outside them'
puts '-- local variables created outside the block are available within them'

# Inheritance?
# Resources:
# https://learnrubythehardway.org/book/ex44.html
class Car < Vehicle
  def initialize(name, doors = 2)
    super name
    @doors = doors
  end

  def two_doored?
    @doors == 2
  end
end

some_car = Car.new 'aubi', 4
puts 'Inheritance?'
puts '-easy. For instance lets try starting my car: '
puts "-#{some_car.start}"
puts '-and btw this is a 2 doored car' if some_car.two_doored? # won't show

# Multiple Inheritance?
# Resources:
# https://ruby-doc.com/docs/ProgrammingRuby/html/tut_modules.html

# this is a module namespacing the methods defined in it
module Wheelable
  def wheels?
    true
  end
end

# multiple inheritance via use of include and modules
class MotorBike < Vehicle
  include Wheelable
end

some_bike = MotorBike.new 'yamada'
puts 'Multiple inheritance?'
puts '-is available via mixins. For instance lets check my bike'
puts "-#{MotorBike.type}, #{some_bike.name}, has wheels" if some_bike.wheels?
puts '-instances can also inherit multiple classes by using extend method to modules. ie:'
module Rideable; def ride; 'flows in the street'; end; end
some_bike.extend(Rideable)
puts "-my bike also #{some_bike.ride}"

# Composition? how to include other files, modules?
# Resources:
# https://stackoverflow.com/questions/318144/what-is-the-difference-between-include-and-require-in-ruby

# require is NEEDED for include
require "#{Dir.pwd}/ruby/reusables/printer.rb"

# class multiprinter to check how to call module Printer methods
class Multiprinter
  include Printer

  def test_printer
    puts "----#{instance_printer}"
    puts "----#{Printer.class_printer}"
  end
end

puts 'Composition? how to include other files, modules?'
puts '-there are 3 ways here. Include, require and load.'

puts "--Include: The include method takes all the methods from another module\
 and includes them into the current module. This is a language-level thing as\
 opposed to a file-level thing as with require. The include method is the\
 primary way to 'extend' classes with other modules (mix-ins). Let's check my\
 printer for instance:"
Multiprinter.new.test_printer

puts "--Require: runs another file. It also tracks history and does not\
 require the same file twice. Let's check my printer again:"
puts "----#{Printer::class_printer}"
puts "----#{Printer.class_printer}"

puts '--Load: runs another file every time. No history tracking.'
