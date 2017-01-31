module ErrorHandling
  def unauthorized_access!(_errors)
    render status: :forbidden, json: {
      errors: {
        detail: 'You do not have permission to access that resource.'
      }
    }
  end
end
