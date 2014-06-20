class Location

  def initialize(address)
    require 'httparty'
    address.gsub!(' ', '+')
    uri = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address
    response = HTTParty.get(uri)
    @parsed = JSON.parse(response.body)
  end

  def get_lat
    latitude = @parsed["results"][0]["geometry"]["location"]["lat"]
  end

  def get_long
    longitude = @parsed["results"][0]["geometry"]["location"]["lng"]
  end

end


# class Location
#   require "httparty"
#   base_uri '/maps.googleapis.com'
#   def initialize(address)
#
#     @options = { query: {address: address} }
#   end

#   def lat
#     self.class.get("/maps/api/geocode/json", @options)
#     parsed = JSON.parse(response.body)
#     longitude = parsed["results"][0]["geometry"]["location"]["lng"]
#   end

#   def long
#     self.class.get("/maps/api/geocode/json", @options)
#     parsed = JSON.parse(response.body)
#     latitude = parsed["results"][0]["geometry"]["location"]["lat"]
#   end
# end
