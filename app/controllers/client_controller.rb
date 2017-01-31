class ClientController < ActionController:: Base
  def index
    render 'client/index', layout: 'client'
  end
end
