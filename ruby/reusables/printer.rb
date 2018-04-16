puts 'hello, from module Printer'

# a module that just prints
module Printer
  def instance_printer
    'instance printer hello'
  end

  def self.class_printer
    'class printer hello'
  end
end
