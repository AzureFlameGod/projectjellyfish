require 'test_helper'

class ProductCategoriesControllerTest < ActionDispatch::IntegrationTest
  test 'should gets list of product categories' do
    headers = authorize users(:user)
    get product_categories_url, headers: headers

    assert_response :success
  end

  test 'should get a product category' do
    headers = authorize users(:user)
    product_category = product_categories :servers

    get product_category_url(id: product_category.id), headers: headers

    assert_response :success
  end
end
