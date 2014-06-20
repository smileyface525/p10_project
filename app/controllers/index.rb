get '/' do
 erb :index
end

get '/session/login' do
  erb :login
end

post '/session/login' do
  # log in the user
  # start session
  # redirect to '/users'
  if params
    user = User.find_by_username(params[:username])
    if user && user.password == params[:password]
      session[:id] = user.id
      redirect '/users'
    else
      redirect '/'
    end
  else
    redirect '/'
  end
end

get '/users/create' do
  erb :create_user
end

post '/users' do
  new_user = User.new(username: params[:username], email: params[:email])
  new_user.password = params[:password]
  if new_user.save
    session[:id] = new_user.id
    redirect '/users'
  end
end

get '/users' do
  if current_user
    @user = User.find(current_user)
    @location = Location.new(@user.address)
    @pet = Pet.find_by_user_id(@user.id)
    erb :user_page
  else
    redirect '/'
  end
end

get '/users/map' do
  if current_user
    @user = User.find(current_user)
    @location = Location.new(@user.address)
    content_type :json
    {lat: @location.lat, lng: @location.lng}.to_json
  end
end

get '/session/logout' do
  if current_user
    session[:id] = nil
    redirect '/'
  else
    redirect '/'
  end
end

get '/location' do
  user = User.first
  @location = Location.new(user.address)
  erb :test
  # address = '1085 S Redodno Blvd, Los Angeles, CA 90019'
  # address.gsub!(' ', '+')                  #=> "h*ll*"

  # @location = Location.new(address)
  # erb :test
  # uri = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address
  # require 'httparty'
  # response = HTTParty.get(uri)
  # response = HTTParty.get("https://maps.googleapis.com/maps/api/geocode/json?address=1085+South+Resdondo,+Los+Angeles,+CA")
  # parsed = JSON.parse(response.body)
  # longitude = parsed["results"][0]["geometry"]["location"]["lng"]
  # latitude = parsed["results"][0]["geometry"]["location"]["lat"]
  # p latitude
end