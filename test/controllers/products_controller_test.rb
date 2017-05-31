require 'test_helper'

class ProductsControllerTest < ActionDispatch::IntegrationTest
  test 'should gets list of products' do
    headers = authorize users(:user)
    get products_url, headers: headers

    assert_response :success
  end

  test 'should get a list of products with providers' do
    headers = authorize users(:user)
    get products_url, params: { include: 'provider' }, headers: headers

    assert_response :success
    assert json_body[:included].present?
    assert json_body[:data].first[:relationships].present?
    assert json_body[:data].first[:relationships].key? :provider
    refute json_body[:data].first[:relationships].key? :product_types
  end

  test 'should get a list filtered by name' do
    headers = authorize users(:user)
    get products_url, params: { filter: { name: 'AAA Automation Script'} }, headers: headers

    assert_response :success
    assert_equal 'AAA Automation Script', json_body[:data].first[:attributes][:name]
    assert_equal 1, json_body[:data].length
  end

  test 'should get a list filtered by tags' do
    headers = authorize users(:user)
    get products_url, params: { filter: { tagged_with: 'cloudforms,aaa'} }, headers: headers

    assert_response :success
    assert_equal 'AAA Automation Script', json_body[:data].first[:attributes][:name]
    assert_equal 1, json_body[:data].length
  end

  test 'should get a product' do
    headers = authorize users(:user)
    product = products :cloud_forms_automation

    get product_url(id: product.id), headers: headers

    assert_response :success
  end
end
