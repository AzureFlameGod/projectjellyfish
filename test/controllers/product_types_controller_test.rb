require 'test_helper'

class ProductTypesControllerTest < ActionDispatch::IntegrationTest
  test 'should gets list of product types' do
    headers = authorize users(:manager)
    get product_types_url, headers: headers

    assert_response :success
  end

  test 'should not allow non-managers to get product types' do
    headers = authorize users(:user)
    get product_types_url, headers: headers

    assert_response :forbidden
  end


  test 'should get a product type' do
    headers = authorize users(:manager)
    product_type = product_types :cloud_forms_automation

    get product_type_url(id: product_type.id), headers: headers

    assert_response :success
  end

  test 'should not allow non-managers to get a product type' do
    headers = authorize users(:user)
    product_type = product_types :cloud_forms_automation

    get product_type_url(id: product_type.id), headers: headers

    assert_response :forbidden
  end
end
